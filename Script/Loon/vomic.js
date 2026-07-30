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
 *   VomicDebugEnable  → 调试模式（开启后输出详细日志）
 *   VomicSignCron     → 定时 cron
 *
 * 适用平台：Loon
 * GitHub: https://github.com/Zerolost/VqssLs/tree/main/Script/Loon
 */

/******************** 全局配置 ********************/
const CONFIG = {
  KEY_TOKEN: "vomic_authorization",
  BASE_URL: "https://api.vomicmh.com",
};

/******************** 环境 & 工具函数 ********************/
const isLoon = typeof $loon !== "undefined";
const isSurge = typeof $httpClient !== "undefined" && !isLoon;
const isQX = typeof $task !== "undefined";

// ─── 调试模式：同时读取 Plugin Argument 和持久化存储 ───
let DEBUG = false;

// 方式一：从 $argument（Plugin 传入）解析
if (typeof $argument !== "undefined" && $argument) {
  try {
    const argStr = String($argument);
    // Loon Plugin Argument 格式: "VomicSignEnable=true, VomicCookieEnable=true, VomicDebugEnable=true, VomicSignCron=30 8 * * *"
    const match = argStr.match(/VomicDebugEnable\s*=\s*(\S+?)(?:,|$)/);
    if (match) {
      DEBUG = match[1] === "true" || match[1] === "1";
    }
  } catch (e) {}
}

// 方式二：从持久化存储读取（允许运行时手动切换）
try {
  const stored = isLoon || isSurge
    ? $persistentStore.read("vomic_debug_mode")
    : (isQX ? $prefs.valueForKey("vomic_debug_mode") : null);
  if (stored === "true") DEBUG = true;
  if (stored === "false") DEBUG = false;
} catch (e) {}

// ─── 统一日志函数：Loon 中用 $loon.notify 配合 console.log ───
const LOG_PREFIX = "[Vomic]";
function log(...args) {
  // console.log 在 Loon 中可以通过「脚本」→「日志」查看
  console.log(LOG_PREFIX, ...args);
}

// ─── 持久化读写 ───
function read(key) {
  try {
    if (isLoon || isSurge) return $persistentStore.read(key);
    if (isQX) return $prefs.valueForKey(key);
  } catch (e) {
    log("读取存储失败:", e.message);
  }
  return null;
}

function write(key, val) {
  try {
    if (isLoon || isSurge) $persistentStore.write(val, key);
    if (isQX) $prefs.setValueForKey(val, key);
  } catch (e) {
    log("写入存储失败:", e.message);
  }
}

// ─── 通知 ───
function notify(title, subtitle, message) {
  try {
    if (isLoon) $notification.post(title, subtitle, message);
    else if (isSurge) $notification.post(title, subtitle, message);
    else if (isQX) $notify(title, subtitle, message);
  } catch (e) {
    log("通知发送失败:", e.message);
  }
}

// ─── HTTP 请求 ───
function http(options, callback) {
  const method = (options.method || "GET").toUpperCase();
  const req = {
    url: options.url,
    headers: options.headers || {},
    body: options.body || null,
  };

  if (DEBUG) {
    log(`HTTP ${method} ${req.url}`);
    log(`Headers: ${JSON.stringify(req.headers)}`);
    if (req.body) log(`Body: ${req.body}`);
  }

  if (isSurge || isLoon) {
    $httpClient[method.toLowerCase()](req, (err, resp, data) => {
      if (err) {
        log(`HTTP 错误:`, err);
        callback(err, null, null);
      } else {
        if (DEBUG) {
          const bodyPreview = typeof data === "string" ? data.substring(0, 800) : JSON.stringify(data).substring(0, 800);
          log(`HTTP 响应 ${resp.status}: ${bodyPreview}`);
        }
        callback(null, resp, data);
      }
    });
  } else if (isQX) {
    $task.fetch(req).then(
      (resp) => {
        if (DEBUG) log(`HTTP 响应: ${JSON.stringify(resp.body).substring(0, 800)}`);
        callback(null, resp, resp.body);
      },
      (err) => {
        log(`HTTP 错误:`, err);
        callback(err, null, null);
      }
    );
  }
}

// ─── 日期工具 ───
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function monthRange() {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth();
  const start = `${y}-${String(m + 1).padStart(2, "0")}-01`;
  const lastDay = new Date(y, m + 1, 0).getDate();
  const end = `${y}-${String(m + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { start, end };
}

// ─── 随机参数 ───
function buildParams() {
  return {
    t: Math.floor(Date.now() / 1000).toString(),
    s: Math.random().toString(16).substring(2, 10),
  };
}

/******************** 签到模块 ********************/
const SignModule = {
  getToken() {
    const token = read(CONFIG.KEY_TOKEN);
    if (!token) return null;
    return token.replace(/^Bearer\s+/i, "");
  },

  headers() {
    const token = this.getToken();
    if (!token) return null;
    if (DEBUG) log("使用 Token 长度:", token.length, "前缀:", token.substring(0, 20) + "...");
    return {
      authorization: `Bearer ${token}`,
      "content-type": "application/json; charset=utf-8",
      platform: "ios",
      store: "ios",
      version: "1.2.0",
      name: "pics",
      "accept-encoding": "gzip",
    };
  },

  checkStatus(callback) {
    const h = this.headers();
    if (!h) {
      callback(new Error("Token 为空，请先确保 Cookie 提取正常"));
      return;
    }

    const { start, end } = monthRange();
    const { t, s } = buildParams();
    const url = `${CONFIG.BASE_URL}/pics_new/pics/c/getSignMonthInfo?start=${start}&end=${end}&t=${t}&s=${s}`;

    log("查询签到状态:", start, "~", end);

    http({ method: "GET", url, headers: h }, (err, resp, data) => {
      if (err) {
        log("查询失败:", err);
        callback(err);
        return;
      }
      try {
        const r = typeof data === "string" ? JSON.parse(data) : data;
        if (r.code === 200) {
          const signed = r.date || [];
          const td = today();
          const done = signed.includes(td);
          log("已签日期:", JSON.stringify(signed));
          log(`今日 ${td} → ${done ? "已签" : "未签"}`);
          callback(null, { signed, isSigned: done, today: td });
        } else {
          log("查询异常 code:", r.code, JSON.stringify(r));
          callback(new Error("查询异常 code: " + r.code));
        }
      } catch (e) {
        log("解析失败:", e.message, String(data).substring(0, 500));
        callback(e);
      }
    });
  },

  doSignIn(callback) {
    const h = this.headers();
    if (!h) {
      callback(new Error("Token 为空"));
      return;
    }

    const { t, s } = buildParams();
    const url = `${CONFIG.BASE_URL}/pics_new/pics/c/signIn?t=${t}&s=${s}`;

    log("执行签到...");

    http({ method: "POST", url, headers: h, body: "{}" }, (err, resp, data) => {
      if (err) {
        log("签到请求失败:", err);
        callback(err);
        return;
      }
      try {
        const r = typeof data === "string" ? JSON.parse(data) : data;
        if (r.code === 200) {
          const d = r.data || {};
          log(`签到成功: exp=${d.exp} coin=${d.coin} streak=${d.streak} month=${d.month_sign_day}`);
          callback(null, {
            success: true,
            exp: d.exp || 0,
            coin: d.coin || 0,
            streak: d.streak || 0,
            monthSignDay: d.month_sign_day || 0,
          });
        } else {
          log("签到异常 code:", r.code, JSON.stringify(r));
          callback(new Error("签到异常 code: " + r.code));
        }
      } catch (e) {
        log("解析签到响应失败:", e.message, String(data).substring(0, 500));
        callback(e);
      }
    });
  },

  run() {
    log("========================================");
    log("Vomic 签到开始");
    log("调试模式:", DEBUG ? "开启" : "关闭");
    log("当前时间:", new Date().toISOString());
    log("今日日期:", today());
    log("运行环境:", isLoon ? "Loon" : isSurge ? "Surge" : isQX ? "QX" : "未知");
    log("存储 Token 长度:", (read(CONFIG.KEY_TOKEN) || "").length);

    this.checkStatus((err, status) => {
      if (err) {
        log("签到流程失败:", err.message);
        notify("Vomic 签到", "❌ 失败", err.message);
        log("========================================");
        return;
      }

      if (status.isSigned) {
        log("今日已签到，跳过");
        if (DEBUG) {
          notify("Vomic 签到", "✅ 今日已签到", `本月已签 ${status.signed.length} 天 | ${status.today}`);
        }
        log("========================================");
        return;
      }

      this.doSignIn((err, r) => {
        if (err) {
          log("签到失败:", err.message);
          notify("Vomic 签到", "❌ 签到失败", err.message);
          log("========================================");
          return;
        }
        notify(
          "Vomic 签到",
          "🎉 签到成功",
          `经验 +${r.exp} | 金币 +${r.coin} | 连续 ${r.streak} 天 | 本月第 ${r.monthSignDay} 天`
        );
        log("========================================");
      });
    });
  },
};

/******************** Cookie 提取模块 ********************/
const CookieModule = {
  run() {
    log("========================================");
    log("Vomic Cookie 提取开始");
    log("调试模式:", DEBUG ? "开启" : "关闭");

    try {
      let auth = "";

      // Loon http-request: $request 是全局对象
      if (typeof $request !== "undefined") {
        log("$request 存在, 类型:", typeof $request);

        if ($request.headers) {
          const keys = Object.keys($request.headers);
          log("请求头 key 数量:", keys.length);
          if (DEBUG) log("请求头 keys:", keys.join(", "));

          // Loon 中请求头 key 全部是小写
          auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";

          if (auth) {
            log("找到 Authorization, 长度:", auth.length);
          } else {
            log("未找到 Authorization 头，尝试打印所有头:");
            for (const k of keys) {
              if (k.toLowerCase().includes("auth") || k.toLowerCase().includes("token")) {
                log(`  候选头 [${k}]: ${$request.headers[k]}`);
              }
            }
          }
        } else {
          log("$request.headers 不存在!");
          log("$request keys:", Object.keys($request).join(", "));
        }

        if ($request.url) {
          log("请求 URL:", $request.url);
        }
      } else {
        log("$request 不存在 — 这可能不是 http-request 触发");
      }

      if (!auth) {
        log("未找到 Authorization，提取失败");
        if (DEBUG) {
          notify("Vomic Cookie", "⚠️ 未找到 Token", "请求头中无 Authorization，请检查 MITM 是否开启");
        }
        log("========================================");
        return;
      }

      // 去除 Bearer 前缀
      const token = auth.replace(/^Bearer\s+/i, "");

      if (!token || token.length < 10) {
        log("Token 无效, 长度:", token.length);
        if (DEBUG) {
          notify("Vomic Cookie", "⚠️ Token 无效", "长度仅 " + token.length);
        }
        log("========================================");
        return;
      }

      const old = read(CONFIG.KEY_TOKEN);
      if (old === token) {
        log("Token 未变化，跳过更新");
        if (DEBUG) {
          notify("Vomic Cookie", "ℹ️ Token 无变化", "前缀: " + token.substring(0, 20) + "...");
        }
      } else {
        write(CONFIG.KEY_TOKEN, token);
        log("Token 已更新! 长度:", token.length);
        notify("Vomic Cookie", "✅ Token 已更新", "前缀: " + token.substring(0, 20) + "... 长度: " + token.length);
      }
    } catch (e) {
      log("Cookie 提取异常:", e.message);
      if (DEBUG) notify("Vomic Cookie", "❌ 异常", e.message);
    }
    log("========================================");
  },
};

/******************** 入口 ********************/
// http-request 触发 → 提取 Cookie
if (typeof $request !== "undefined") {
  CookieModule.run();
  $done({});
}
// cron 触发 → 签到
else {
  SignModule.run();
  // Loon cron 脚本不需要 $done()
  if (typeof $done !== "undefined") $done();
}
