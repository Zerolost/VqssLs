/**
 * Vomic 漫画 — 签到 & Cookie 一体化脚本
 * 
 * 触发方式：
 *   cron        → 执行签到
 *   http-request → 提取 Authorization token 并存储
 * 
 * 适用平台：Loon / Surge / Quantumult X
 */

/******************** 工具函数 ********************/
const $ = (() => {
  const isLoon = typeof $loon !== "undefined";
  const isSurge = typeof $httpClient !== "undefined" && !isLoon;
  const isQX = typeof $task !== "undefined";

  const log = (...args) => console.log(...args);

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
    if (isSurge || isLoon) {
      $httpClient[method.toLowerCase()](req, (err, resp, data) => {
        err ? callback(err, null, null) : callback(null, resp, data);
      });
    } else if (isQX) {
      $task.fetch(req).then(
        (resp) => callback(null, resp, resp.body),
        (err) => callback(err, null, null)
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

  return { isLoon, isSurge, isQX, log, read, write, notify, http, today, monthRange };
})();

/******************** 签到模块 ********************/
const VomicSign = {
  baseUrl: "https://api.vomicmh.com",

  headers() {
    const token = $.read("vomic_authorization");
    if (!token) throw new Error("未找到 Authorization token，请先登录 Vomic App");
    return {
      authorization: `Bearer ${token.replace(/^Bearer\s+/i, "")}`,
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
    const url = `${this.baseUrl}/pics_new/pics/c/getSignMonthInfo?start=${start}&end=${end}&t=${t}&s=${s}`;
    $.log(`[Vomic] 查询签到: ${start} ~ ${end}`);
    $.http({ method: "GET", url, headers: this.headers() }, (err, resp, data) => {
      if (err) return callback(err);
      try {
        const r = typeof data === "string" ? JSON.parse(data) : data;
        $.log(`[Vomic] 签到状态: ${JSON.stringify(r)}`);
        if (r.code === 200) {
          const signed = r.date || [];
          callback(null, { signed, isSigned: signed.includes($.today()), today: $.today() });
        } else {
          callback(new Error(`查询异常 code: ${r.code}`));
        }
      } catch (e) {
        callback(e);
      }
    });
  },

  // 执行签到
  sign(callback) {
    const { t, s } = this.params();
    const url = `${this.baseUrl}/pics_new/pics/c/signIn?t=${t}&s=${s}`;
    $.log(`[Vomic] 执行签到`);
    $.http({ method: "POST", url, headers: this.headers(), body: "{}" }, (err, resp, data) => {
      if (err) return callback(err);
      try {
        const r = typeof data === "string" ? JSON.parse(data) : data;
        $.log(`[Vomic] 签到响应: ${JSON.stringify(r)}`);
        if (r.code === 200) {
          const d = r.data || {};
          callback(null, {
            success: true,
            exp: d.exp || 0,
            coin: d.coin || 0,
            streak: d.streak || 0,
            monthSignDay: d.month_sign_day || 0,
          });
        } else {
          callback(new Error(`签到异常 code: ${r.code}`));
        }
      } catch (e) {
        callback(e);
      }
    });
  },

  // 完整签到流程
  run() {
    $.log("========== Vomic 签到开始 ==========");
    this.check((err, status) => {
      if (err) return $.notify("Vomic 签到", "❌ 查询失败", err.message), $.log(`[Vomic] ${err.message}`);
      if (status.isSigned) {
        $.notify("Vomic 签到", "✅ 今日已签到", `本月已签 ${status.signed.length} 天 | ${status.today}`);
        return $.log("========== Vomic 签到结束 ==========");
      }
      this.sign((err, r) => {
        if (err) return $.notify("Vomic 签到", "❌ 签到失败", err.message), $.log(`[Vomic] ${err.message}`);
        $.notify("Vomic 签到", "🎉 签到成功", `经验 +${r.exp} | 金币 +${r.coin} | 连续 ${r.streak} 天 | 本月第 ${r.monthSignDay} 天`);
        $.log("========== Vomic 签到结束 ==========");
      });
    });
  },
};

/******************** Cookie 提取模块 ********************/
const VomicCookie = {
  run() {
    $.log("========== Vomic Cookie 提取 ==========");
    try {
      let auth = "";
      if (typeof $request !== "undefined" && $request.headers) {
        auth = $request.headers["Authorization"] || $request.headers["authorization"] || "";
      }
      if (!auth) {
        $.log("[Vomic] 未找到 Authorization");
        $.notify("Vomic Cookie", "⚠️ 未找到 Token", "请确保已登录 Vomic App");
        return;
      }
      const token = auth.replace(/^Bearer\s+/i, "");
      if (!token || token.length < 10) {
        $.log(`[Vomic] Token 无效`);
        $.notify("Vomic Cookie", "⚠️ Token 无效", "提取的 token 过短");
        return;
      }
      const old = $.read("vomic_authorization");
      if (old === token) {
        $.log("[Vomic] Token 未变化，跳过");
      } else {
        $.write("vomic_authorization", token);
        $.log(`[Vomic] Token 已更新: ${token.substring(0, 30)}...`);
        $.notify("Vomic Cookie", "✅ Token 已更新", `前缀: ${token.substring(0, 20)}...`);
      }
    } catch (e) {
      $.log(`[Vomic] Cookie 异常: ${e.message}`);
    }
    $.log("========== Vomic Cookie 提取完成 ==========");
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
