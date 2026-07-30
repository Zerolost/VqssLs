/**
 * Vomic 漫画签到 v1.0.0
 * 
 * http-request → 提取 Authorization token
 * cron         → 签到
 * 
 * Loon only
 */

var TOKEN_KEY = "vomic_authorization";
var BASE_URL  = "https://api.vomicmh.com";
var VERSION   = "1.0.0";

function log(msg) {
  console.log("[Vomic v" + VERSION + "] " + msg);
}

function readPS(key) {
  try { return $persistentStore.read(key); } catch(e) { return null; }
}

function writePS(key, val) {
  try { $persistentStore.write(val, key); } catch(e) {}
}

function notify(title, sub, msg) {
  try { $notification.post(title, sub, msg); } catch(e) {}
}

function http(method, url, headers, body, cb) {
  var opts = { url: url, headers: headers || {} };
  if (body) opts.body = body;
  $httpClient[method.toLowerCase()](opts, function(err, resp, data) {
    if (err) { cb(err, null); return; }
    cb(null, typeof data === "string" ? data : JSON.stringify(data));
  });
}

function today() {
  var d = new Date();
  var m = d.getMonth() + 1;
  var day = d.getDate();
  return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
}

function monthRange() {
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth();
  var s = y + "-" + ((m + 1) < 10 ? "0" : "") + (m + 1) + "-01";
  var last = new Date(y, m + 1, 0).getDate();
  var e = y + "-" + ((m + 1) < 10 ? "0" : "") + (m + 1) + "-" + (last < 10 ? "0" : "") + last;
  return { start: s, end: e };
}

function randHex(n) {
  var s = "";
  while (s.length < n) s += Math.random().toString(16).substring(2);
  return s.substring(0, n);
}

function getToken() {
  var t = readPS(TOKEN_KEY);
  return t ? t.replace(/^Bearer\s+/i, "") : null;
}

function makeHeaders() {
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

/******************** 签到 ********************/

function checkSign(cb) {
  var h = makeHeaders();
  if (!h) return cb("Token为空");

  var range = monthRange();
  var t = Math.floor(Date.now() / 1000);
  var s = randHex(8);
  var url = BASE_URL + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + t + "&s=" + s;

  log("查询签到 " + range.start + " ~ " + range.end);

  http("GET", url, h, null, function(err, data) {
    if (err) return cb("查询失败: " + err);
    try {
      var r = JSON.parse(data);
      log("查询响应: " + JSON.stringify(r));
      if (r.code !== 200) return cb("查询异常 code=" + r.code);
      var signed = r.date || [];
      var td = today();
      var done = signed.indexOf(td) >= 0;
      log("今日" + td + " " + (done ? "已签" : "未签") + " 本月" + signed.length + "天");
      cb(null, { signed: signed, isSigned: done, today: td });
    } catch(e) {
      cb("解析失败: " + e.message);
    }
  });
}

function doSign(cb) {
  var h = makeHeaders();
  if (!h) return cb("Token为空");

  var t = Math.floor(Date.now() / 1000);
  var s = randHex(8);
  var url = BASE_URL + "/pics_new/pics/c/signIn?t=" + t + "&s=" + s;

  log("执行签到");

  http("POST", url, h, "{}", function(err, data) {
    if (err) return cb("签到失败: " + err);
    try {
      var r = JSON.parse(data);
      log("签到响应: " + JSON.stringify(r));
      if (r.code !== 200) return cb("签到异常 code=" + r.code);
      var d = r.data || {};
      log("签到成功 exp=" + d.exp + " coin=" + d.coin);
      cb(null, {
        exp: d.exp || 0,
        coin: d.coin || 0,
        streak: d.streak || 0,
        monthDay: d.month_sign_day || 0
      });
    } catch(e) {
      cb("解析失败: " + e.message);
    }
  });
}

function runSign() {
  log("========== 签到开始 ==========");
  log("时间 " + new Date().toISOString());
  log("Token长度 " + (readPS(TOKEN_KEY) || "").length);

  checkSign(function(err, st) {
    if (err) {
      log("失败 " + err);
      notify("Vomic 签到", "失败", err);
      log("========== 签到结束 ==========");
      return;
    }
    if (st.isSigned) {
      log("已签到，跳过");
      log("========== 签到结束 ==========");
      return;
    }
    doSign(function(err, r) {
      if (err) {
        log("签到失败 " + err);
        notify("Vomic 签到", "签到失败", err);
      } else {
        notify("Vomic 签到", "签到成功",
          "经验+" + r.exp + " 金币+" + r.coin + " 连续" + r.streak + "天 本月第" + r.monthDay + "天");
      }
      log("========== 签到结束 ==========");
    });
  });
}

/******************** Cookie ********************/

function runCookie() {
  log("========== Cookie提取 ==========");

  if (typeof $request === "undefined") {
    log("非http-request触发");
    log("==============================");
    return;
  }

  if (!$request.headers) {
    log("无headers");
    log("==============================");
    return;
  }

  var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
  log("URL " + ($request.url || "?"));
  log("Auth " + (auth ? "有(" + auth.length + ")" : "无"));

  if (!auth) {
    log("未找到Authorization");
    log("==============================");
    return;
  }

  var token = auth.replace(/^Bearer\s+/i, "");
  if (!token || token.length < 10) {
    log("Token无效 len=" + token.length);
    log("==============================");
    return;
  }

  var old = readPS(TOKEN_KEY);
  if (old === token) {
    log("Token未变");
  } else {
    writePS(TOKEN_KEY, token);
    log("Token已更新 len=" + token.length);
    notify("Vomic Cookie", "Token已更新", token.substring(0, 20) + "... len=" + token.length);
  }
  log("==============================");
}

/******************** 入口 ********************/

if (typeof $request !== "undefined") {
  runCookie();
  $done({});
} else {
  runSign();
  if (typeof $done !== "undefined") $done();
}
