/**
 * Vomic 漫画 — 签到 & Cookie 一体化脚本
 * 
 * 触发方式：
 *   http-request → 提取 Authorization token 并存储
 *   cron         → 查询签到状态，未签则签到
 * 
 * 适用平台：Loon
 * GitHub: https://github.com/Zerolost/VqssLs/tree/main/Script/Loon
 */

const TOKEN_KEY = "vomic_authorization";
const BASE_URL  = "https://api.vomicmh.com";

// ========== 工具函数 ==========

function log(msg) {
  console.log("[Vomic] " + msg);
}

function readPersistent(key) {
  try { return $persistentStore.read(key); } catch(e) { return null; }
}

function writePersistent(key, val) {
  try { $persistentStore.write(val, key); } catch(e) {}
}

function doNotify(title, subtitle, message) {
  try { $notification.post(title, subtitle, message); } catch(e) {}
}

function httpRequest(method, url, headers, body, callback) {
  var opts = { url: url, headers: headers || {} };
  if (body) opts.body = body;
  $httpClient[method.toLowerCase()](opts, function(err, resp, data) {
    if (err) { callback(err, null); return; }
    callback(null, typeof data === "string" ? data : JSON.stringify(data));
  });
}

function getToday() {
  var d = new Date();
  var m = d.getMonth() + 1;
  var day = d.getDate();
  return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
}

function getMonthRange() {
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth();
  var s = y + "-" + ((m + 1) < 10 ? "0" : "") + (m + 1) + "-01";
  var last = new Date(y, m + 1, 0).getDate();
  var e = y + "-" + ((m + 1) < 10 ? "0" : "") + (m + 1) + "-" + (last < 10 ? "0" : "") + last;
  return { start: s, end: e };
}

function randomHex(n) {
  var s = "";
  while (s.length < n) s += Math.random().toString(16).substring(2);
  return s.substring(0, n);
}

// ========== 签到模块 ==========

function getToken() {
  var t = readPersistent(TOKEN_KEY);
  if (!t) return null;
  return t.replace(/^Bearer\s+/i, "");
}

function signHeaders() {
  var token = getToken();
  if (!token) return null;
  return {
    "authorization": "Bearer " + token,
    "content-type": "application/json; charset=utf-8",
    "platform": "ios",
    "store": "ios",
    "version": "1.2.0",
    "name": "pics",
    "accept-encoding": "gzip"
  };
}

function checkSignStatus(callback) {
  var h = signHeaders();
  if (!h) {
    callback("Token为空，请先打开Vomic App确保Cookie已提取");
    return;
  }

  var range = getMonthRange();
  var t = Math.floor(Date.now() / 1000);
  var s = randomHex(8);
  var url = BASE_URL + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + t + "&s=" + s;

  log("查询签到: " + range.start + " ~ " + range.end);

  httpRequest("GET", url, h, null, function(err, data) {
    if (err) { callback("查询失败: " + err); return; }
    try {
      var r = JSON.parse(data);
      log("查询响应: " + JSON.stringify(r));
      if (r.code === 200) {
        var signed = r.date || [];
        var td = getToday();
        var done = signed.indexOf(td) >= 0;
        log("今日" + td + " → " + (done ? "已签" : "未签") + " (本月已签" + signed.length + "天)");
        callback(null, { signed: signed, isSigned: done, today: td });
      } else {
        callback("查询异常 code=" + r.code);
      }
    } catch(e) {
      callback("解析失败: " + e.message + " 原始:" + (data || "").substring(0, 300));
    }
  });
}

function doSignIn(callback) {
  var h = signHeaders();
  if (!h) {
    callback("Token为空");
    return;
  }

  var t = Math.floor(Date.now() / 1000);
  var s = randomHex(8);
  var url = BASE_URL + "/pics_new/pics/c/signIn?t=" + t + "&s=" + s;

  log("执行签到...");

  httpRequest("POST", url, h, "{}", function(err, data) {
    if (err) { callback("签到请求失败: " + err); return; }
    try {
      var r = JSON.parse(data);
      log("签到响应: " + JSON.stringify(r));
      if (r.code === 200) {
        var d = r.data || {};
        log("签到成功! exp=" + d.exp + " coin=" + d.coin + " streak=" + d.streak);
        callback(null, {
          exp: d.exp || 0,
          coin: d.coin || 0,
          streak: d.streak || 0,
          monthSignDay: d.month_sign_day || 0
        });
      } else {
        callback("签到异常 code=" + r.code);
      }
    } catch(e) {
      callback("解析失败: " + e.message + " 原始:" + (data || "").substring(0, 300));
    }
  });
}

function runSign() {
  log("========== 签到开始 ==========");
  log("时间: " + new Date().toISOString());
  log("今日: " + getToday());
  var tokenLen = (readPersistent(TOKEN_KEY) || "").length;
  log("Token长度: " + tokenLen);

  checkSignStatus(function(err, status) {
    if (err) {
      log("失败: " + err);
      doNotify("Vomic 签到", "失败", err);
      log("========== 签到结束 ==========");
      return;
    }
    if (status.isSigned) {
      log("今日已签到，跳过");
      log("========== 签到结束 ==========");
      return;
    }
    doSignIn(function(err, r) {
      if (err) {
        log("签到失败: " + err);
        doNotify("Vomic 签到", "签到失败", err);
      } else {
        doNotify("Vomic 签到", "签到成功",
          "经验+" + r.exp + " 金币+" + r.coin + " 连续" + r.streak + "天 本月第" + r.monthSignDay + "天");
      }
      log("========== 签到结束 ==========");
    });
  });
}

// ========== Cookie 提取模块 ==========

function runCookie() {
  log("========== Cookie提取开始 ==========");

  try {
    // $request 在 Loon http-request 场景下可用
    if (typeof $request === "undefined") {
      log("$request 不存在，非 http-request 触发");
      log("========== Cookie提取结束 ==========");
      return;
    }

    if (!$request.headers) {
      log("$request.headers 不存在");
      log("========== Cookie提取结束 ==========");
      return;
    }

    // Loon 中请求头 key 为小写
    var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
    log("请求URL: " + ($request.url || "未知"));
    log("Authorization: " + (auth ? "有(长度" + auth.length + ")" : "无"));

    if (!auth) {
      log("未找到 Authorization");
      log("========== Cookie提取结束 ==========");
      return;
    }

    var token = auth.replace(/^Bearer\s+/i, "");

    if (!token || token.length < 10) {
      log("Token无效，长度=" + token.length);
      log("========== Cookie提取结束 ==========");
      return;
    }

    var old = readPersistent(TOKEN_KEY);
    if (old === token) {
      log("Token未变化，跳过");
    } else {
      writePersistent(TOKEN_KEY, token);
      log("Token已更新! 长度=" + token.length);
      doNotify("Vomic Cookie", "Token已更新", "前缀:" + token.substring(0, 20) + "... 长度:" + token.length);
    }
  } catch(e) {
    log("Cookie提取异常: " + e.message);
  }
  log("========== Cookie提取结束 ==========");
}

// ========== 入口 ==========

if (typeof $request !== "undefined") {
  // http-request 触发 → 提取 Cookie
  runCookie();
  $done({});
} else {
  // cron 触发 → 签到
  runSign();
  if (typeof $done !== "undefined") $done();
}
