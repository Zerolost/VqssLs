/**
 * Vomic 漫画 — 签到 & Cookie 一体化脚本
 * 
 * 触发方式：
 *   cron         → 执行签到
 *   http-request → 提取 Authorization token
 * 
 * Plugin 参数：
 *   VomicSignEnable   → 签到开关
 *   VomicCookieEnable → Cookie 提取开关
 *   VomicDebugEnable  → 调试模式（开启后输出详细日志 + 通知）
 *   VomicSignCron     → 定时 cron
 * 
 * 适用平台：Loon
 */

/******************** 全局配置 ********************/
const CONFIG = {
  KEY_TOKEN: "vomic_authorization",
  KEY_DEBUG: "vomic_debug_mode",
  BASE_URL: "https://api.vomicmh.com",
};

/******************** 工具函数 ********************/
const $ = (() => {
  const isLoon = typeof $loon !== "undefined";
  const isSurge = typeof $httpClient !== "undefined" && !isLoon;
  const isQX = typeof $task !== "undefined";

  // ====== 调试开关：读取 Plugin 参数 & 持久化存储 ======
  let _debug = false;
  const initDebug = () => {
    // 优先从 Plugin Argument 读取
    if (typeof $argument !== "undefined" && $argument) {
      try {
        const args = typeof $argument === "string" ? JSON.parse($argument) : $argument;
        if (args.VomicDebugEnable !== undefined) {
          _debug = args.VomicDebugEnable === "true" || args.VomicDebugEnable === true;
        }
      } catch (e) {
        // $argument 可能是 Loon 格式的键值对字符串
        const m = String($argument).match(/VomicDebugEnable\s*=\s*([^\s,]+)/);
        if (m) _debug = m[1] === "true" || m[1] === "1";
      }
    }
    // 也支持从持久化存储读取（运行时可切换）
    const stored = read("vomic_debug_mode");
    if (stored === "true") _debug = true;
    if (stored === "false") _debug = false;
  };

  const isDebug = () => _debug;

  const log = (...args) => {
    if (_debug) console.log("[Vomic DEBUG]", ...args);
  };

  const read = (key) => {
    if (isLoon || isSurge) return $persistentStore.read(key);
    if (isQX) return $prefs.valueForKey(key);
    return null;
  };

  const write = (key, val) => {
    if (isLoon || isSurge) $persistentStore.write(val, key);
    if (isQX) $prefs.setValueForKey(val, key);
  };

  const notify = (title, subtitle, message) => {
    if (isLoon) $notification.post(title, subtitle, message);
    if (isSurge) $notification.post(title, subtitle, message);
    if (isQX) $notify(title, subtitle, message);
  };

  const http = (options, callback) => {
    const method = (options.method || "GET").toUpperCase();
    const req = { url: options.url, headers: options.headers || {}, body: options.body || null };

    log(`HTTP ${method} ${req.url}`);
    log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
    if (req.body) log(`Body: ${req.body}`);

    if (isSurge || isLoon) {
      $httpClient[method.toLowerCase()](req, (err, resp, data) => {
        if (err) {
          log(`HTTP 错误: ${err}`);
        } else {
          log(`HTTP 响应 ${resp.status}: ${typeof data === "string" ? data.substring(0, 500) : JSON.stringify(data).substring(0, 500)}`);
        }
        err ? callback(err, null, null) : callback(null, resp, data);
      });
    } else if (isQX) {
      $task.fetch(req).then(
        (resp) => {
          log(`HTTP 响应: ${JSON.stringify(resp.body).substring(0, 500)}`);
          callback(null, resp, resp.body);
        },
        (err) => {
          log(`HTTP 错误: ${err}`);
          callback(err, null, null);
        }
      );
    }
  };

  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const monthRange = () => {
    const d = new Date();
    const y = d.getFullYear(), m = d.getMonth();
    const start = `${y}-${String(m + 1).padStart(2, "0")}-01`;
    const end = `${y}-${String(m + 1).padStart(2, "0")}-${String(new Date(y, m + 1, 0).getDate()).padStart(2, "0")}`;
    return { start, end };
  };

  // 初始化调试模式
  initDebug();

  return { isLoon, isSurge, isQX, isDebug, log, read, write, notify, http, today, monthRange };
})();

/******************** 签到模块 ********************/
const VomicSign = {
  headers() {
    const token = $.read(CONFIG.KEY_TOKEN);
    if (!token) throw new Error("未找到 Authorization token，请先登录 Vomic App 并确保 Cookie 提取开关已开启");
    const clean = token.replace(/^Bearer\s+/i, "");
    $.log(`使用 Token: ${clean.substring(0, 30)}...（长度: ${clean.length}）`);
    return {
      authorization: `Bearer ${clean}`,
      "content-type": "application/json; charset=utf-8",
      platform: "ios",
      store: "ios",
      version: "1.2.0",
      name: "pics",
      "accept-encoding": "gzip",
    };
  },

  params() {
    return {
      t: Math.floor(Date.now() / 1000).toString(),
      s: Math.random().toString(16).substring(2, 10),
    };
  },

  // 查询本月签到状态
  check(callback) {
    const { start, end } = $.monthRange();
    const { t, s } = this.params();
    const url = `${CONFIG.BASE_URL}/pics_new/pics/c/getSignMonthInfo?start=${start}&end=${end}&t=${t}&s=${s}`;
    $.log(`查询签到范围: ${start} ~ ${end}`);

    $.http({ method: "GET", url, headers: this.headers() }, (err, resp, data) => {
      if (err) {
        $.log(`查询失败: ${err}`);
        return callback(err);
      }
      try {
        const r = typeof data === "string" ? JSON.parse(data) : data;
        if (r.code === 200) {
          const signed = r.date || [];
          const isSigned = signed.includes($.today());
          $.log(`已签日期: ${JSON.stringify(signed)}`);
          $.log(`今日 ${$.today()} → ${isSigned ? "已签到" : "未签到"}`);
          callback(null, { signed, isSigned, today: $.today() });
        } else {
          $.log(`查询返回异常 code: ${r.code}, 完整响应: ${JSON.stringify(r)}`);
          callback(new Error(`查询异常 code: ${r.code}`));
        }
      } catch (e) {
        $.log(`解析响应失败: ${e.message}, 原始数据: ${String(data).substring(0, 500)}`);
        callback(e);
      }
    });
  },

  // 执行签到
  sign(callback) {
    const { t, s } = this.params();
    const url = `${CONFIG.BASE_URL}/pics_new/pics/c/signIn?t=${t}&s=${s}`;

    $.http({ method: "POST", url, headers: this.headers(), body: "{}" }, (err, resp, data) => {
      if (err) {
        $.log(`签到请求失败: ${err}`);
        return callback(err);
      }
      try {
        const r = typeof data === "string" ? JSON.parse(data) : data;
        if (r.code === 200) {
          const d = r.data || {};
          $.log(`签到成功: exp=${d.exp} coin=${d.coin} streak=${d.streak} month=${d.month_sign_day}`);
          callback(null, {
            success: true,
            exp: d.exp || 0,
            coin: d.coin || 0,
            streak: d.streak || 0,
            monthSignDay: d.month_sign_day || 0,
          });
        } else {
          $.log(`签到返回异常 code: ${r.code}, 完整响应: ${JSON.stringify(r)}`);
          callback(new Error(`签到异常 code: ${r.code}`));
        }
      } catch (e) {
        $.log(`解析签到响应失败: ${e.message}, 原始数据: ${String(data).substring(0, 500)}`);
        callback(e);
      }
    });
  },

  // 完整签到流程
  run() {
    console.log("========== Vomic 签到开始 ==========");
    $.log(`调试模式: ${$.isDebug() ? "开启" : "关闭"}`);
    $.log(`当前时间: ${new Date().toISOString()}`);
    $.log(`今日日期: ${$.today()}`);

    // 调试模式：打印环境信息
    if ($.isDebug()) {
      $.log(`运行环境: ${$.isLoon ? "Loon" : $.isSurge ? "Surge" : $.isQX ? "QX" : "未知"}`);
      $.log(`存储 Token 长度: ${($.read(CONFIG.KEY_TOKEN) || "").length}`);
    }

    this.check((err, status) => {
      if (err) {
        console.log(`[Vomic] 查询失败: ${err.message}`);
        $.notify("Vomic 签到", "❌ 查询失败", err.message);
        console.log("========== Vomic 签到结束 ==========");
        return;
      }

      if (status.isSigned) {
        console.log(`[Vomic] 今日已签到，跳过`);
        if ($.isDebug()) {
          $.notify("Vomic 签到", "✅ 今日已签到（调试）", `本月已签 ${status.signed.length} 天 | ${status.today}`);
        }
        console.log("========== Vomic 签到结束 ==========");
        return;
      }

      this.sign((err, r) => {
        if (err) {
          console.log(`[Vomic] 签到失败: ${err.message}`);
          $.notify("Vomic 签到", "❌ 签到失败", err.message);
          console.log("========== Vomic 签到结束 ==========");
          return;
        }
        $.notify("Vomic 签到", "🎉 签到成功", `经验 +${r.exp} | 金币 +${r.coin} | 连续 ${r.streak} 天 | 本月第 ${r.monthSignDay} 天`);
        console.log("========== Vomic 签到结束 ==========");
      });
    });
  },
};

/******************** Cookie 提取模块 ********************/
const VomicCookie = {
  run() {
    console.log("========== Vomic Cookie 提取 ==========");
    $.log(`调试模式: ${$.isDebug() ? "开启" : "关闭"}`);

    try {
      let auth = "";

      // Loon http-request 场景：$request.headers 直接可用
      if (typeof $request !== "undefined") {
        $.log(`$request 类型: ${typeof $request}`);

        if ($request.headers) {
          $.log(`请求头 keys: ${Object.keys($request.headers).join(", ")}`);
          auth = $request.headers["Authorization"] || $request.headers["authorization"] || "";
          $.log(`Authorization 原始值: ${auth ? auth.substring(0, 60) + "..." : "(空)"}`);
        }

        // 也尝试从 URL 判断
        if ($request.url) {
          $.log(`请求 URL: ${$request.url}`);
        }
      }

      if (!auth) {
        console.log("[Vomic] 未在请求头中找到 Authorization");
        if ($.isDebug()) {
          $.notify("Vomic Cookie", "⚠️ 未找到 Token（调试）", "请求头中无 Authorization 字段，请确认 MITM 已开启");
        }
        return;
      }

      const token = auth.replace(/^Bearer\s+/i, "");

      if (!token || token.length < 10) {
        console.log(`[Vomic] Token 无效，长度: ${token.length}`);
        if ($.isDebug()) {
          $.notify("Vomic Cookie", "⚠️ Token 无效（调试）", `提取的 token 长度仅 ${token.length}，请检查`);
        }
        return;
      }

      const old = $.read(CONFIG.KEY_TOKEN);
      if (old === token) {
        console.log("[Vomic] Token 未变化，跳过更新");
        if ($.isDebug()) {
          $.notify("Vomic Cookie", "ℹ️ Token 无变化（调试）", `前缀: ${token.substring(0, 20)}...`);
        }
      } else {
        $.write(CONFIG.KEY_TOKEN, token);
        console.log(`[Vomic] Token 已更新，长度: ${token.length}`);
        $.notify("Vomic Cookie", "✅ Token 已更新", `前缀: ${token.substring(0, 20)}...（长度: ${token.length}）`);
      }
    } catch (e) {
      console.log(`[Vomic] Cookie 提取异常: ${e.message}`);
      if ($.isDebug()) {
        $.notify("Vomic Cookie", "❌ 异常（调试）", e.message);
      }
    }
    console.log("========== Vomic Cookie 提取完成 ==========");
  },
};

/******************** 入口：自动判断触发方式 ********************/
(() => {
  // http-request 触发 → 提取 Cookie
  if (typeof $request !== "undefined") {
    VomicCookie.run();
    $done({});
    return;
  }

  // cron 触发 → 执行签到
  VomicSign.run();
  $done();
})();
