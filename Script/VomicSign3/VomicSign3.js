/**
 * Vomic 漫画签到 v2.0.3
 * 
 * http-request  → 提取 Token
 * http-response → 打开App自动签到
 * cron          → 定时签到
 * 
 * Loon only
 */

var TOKEN_KEY = "VomicToken3";
var SIGN_DATE_KEY = "VomicSignDate3";
var DEBUG_KEY = "VomicDebug3";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.3";

var DEBUG = false;
try { DEBUG = $persistentStore.read(DEBUG_KEY) === "true"; } catch(e) {}

function log(m) { console.log("[Vomic v" + VER + "] " + m); }
function dbg(m) { if (DEBUG) console.log("[Vomic DEBUG] " + m); }
function read(k) { try { return $persistentStore.read(k); } catch(e) { return null; } }
function write(k, v) { try { $persistentStore.write(v, k); } catch(e) {} }
function notify(t, s, m) { try { $notification.post(t, s, m); } catch(e) {} }

function today() {
  var d = new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
function pad(n) { return n < 10 ? "0" + n : "" + n; }

function monthRange() {
  var d = new Date(), y = d.getFullYear(), m = d.getMonth();
  return {
    start: y + "-" + pad(m + 1) + "-01",
    end: y + "-" + pad(m + 1) + "-" + pad(new Date(y, m + 1, 0).getDate())
  };
}

function randHex(n) {
  var s = "";
  while (s.length < n) s += Math.random().toString(16).substring(2);
  return s.substring(0, n);
}

function makeHeaders() {
  var t = read(TOKEN_KEY);
  if (!t) return null;
  return {
    "authorization": "Bearer " + t.replace(/^Bearer\s+/i, ""),
    "content-type": "application/json; charset=utf-8",
    "platform": "ios",
    "store": "ios",
    "version": "1.2.0",
    "name": "pics",
    "accept-encoding": "gzip",
    "showsuccess": "false",
    "showtoast": "false",
    "hide-content": "0",
    "auditplatform": "default"
  };
}

/******************** Cookie 提取 ********************/

function runCookie() {
  log("========== Cookie ==========");
  try {
    if ($request && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var token = auth.replace(/^Bearer\s+/i, "");
        if (token.length > 10) {
          var old = read(TOKEN_KEY);
          if (old !== token) {
            write(TOKEN_KEY, token);
            log("Token已更新 len=" + token.length);
            notify("Vomic Cookie", "Token已更新", "len=" + token.length);
          } else { log("Token未变化"); }
        }
      } else { log("无Authorization"); }
    }
  } catch(e) { log("异常: " + e.message); }
  log("======================");
  $done({});
}

/******************** 签到 ********************/

function doSignWork(callback) {
  var h = makeHeaders();
  if (!h) { callback("无Token"); return; }

  var td = today();
  if (read(SIGN_DATE_KEY) === td) {
    log("今日已签 " + td);
    callback(null, "already_signed");
    return;
  }

  var range = monthRange();
  var t = Math.floor(Date.now() / 1000);
  var s = randHex(8);
  // 完全按照你提供的 URL 格式：?start=...&end=...&t=...&s=...
  var checkUrl = BASE + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + t + "&s=" + s;

  log("查询签到 " + range.start + "~" + range.end);
  dbg("查询URL: " + checkUrl);

  $httpClient.get({ url: checkUrl, headers: h }, function(err, resp, data) {
    if (err) { log("查询失败: " + err); callback("查询失败: " + err); return; }

    var body = typeof data === "string" ? data : JSON.stringify(data);
    dbg("HTTP " + (resp ? resp.status : "?") + " 响应: " + body.substring(0, 500));

    try {
      var r = JSON.parse(body);
      if (r.code !== 200) {
        log("查询异常 code=" + r.code + " msg=" + (r.message || ""));
        // code=400 可能是已签到或参数问题，直接尝试签到
        log("跳过查询，直接尝试签到...");
        doSignRequest(h, t, s, td, callback);
        return;
      }

      var signed = r.date || [];
      if (signed.indexOf(td) >= 0) {
        write(SIGN_DATE_KEY, td);
        log("已签 " + td);
        callback(null, "already_signed");
        return;
      }

      log("今日未签，执行签到");
      doSignRequest(h, t, s, td, callback);

    } catch(e) {
      log("解析失败: " + e.message);
      // 解析失败也直接尝试签到
      doSignRequest(h, t, s, td, callback);
    }
  });
}

function doSignRequest(h, t, s, td, callback) {
  var signUrl = BASE + "/pics_new/pics/c/signIn?t=" + t + "&s=" + s;
  dbg("签到URL: " + signUrl);

  $httpClient.post({ url: signUrl, headers: h, body: "{}" }, function(err, resp, data) {
    if (err) { log("签到失败: " + err); callback("签到失败: " + err); return; }

    var body = typeof data === "string" ? data : JSON.stringify(data);
    dbg("HTTP " + (resp ? resp.status : "?") + " 签到响应: " + body);

    try {
      var r = JSON.parse(body);
      if (r.code === 200) {
        var d = r.data || {};
        write(SIGN_DATE_KEY, td);
        log("签到成功! exp=" + (d.exp||0) + " coin=" + (d.coin||0));
        callback(null, "success", d);
      } else {
        log("签到异常 code=" + r.code + " msg=" + (r.message || ""));
        callback("签到异常 code=" + r.code);
      }
    } catch(e) {
      log("解析签到响应失败: " + e.message);
      callback(e.message);
    }
  });
}

function runSign(doneCallback) {
  log("========== 签到 ==========");
  dbg("DEBUG=ON");

  // http-response 顺便抓 Token
  try {
    if (typeof $request !== "undefined" && $request && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var tk = auth.replace(/^Bearer\s+/i, "");
        if (tk.length > 10 && read(TOKEN_KEY) !== tk) {
          write(TOKEN_KEY, tk);
          dbg("顺便更新Token len=" + tk.length);
        }
      }
    }
  } catch(e) {}

  doSignWork(function(err, status, data) {
    if (err) {
      notify("Vomic 签到", "失败", err);
    } else if (status === "success") {
      notify("Vomic 签到", "签到成功",
        "经验+" + (data.exp||0) + " 金币+" + (data.coin||0) +
        " 连续" + (data.streak||0) + "天 本月第" + (data.month_sign_day||0) + "天");
    }
    log("========================");
    if (doneCallback) doneCallback();
  });
}

/******************** 入口 ********************/

(function() {
  var isReq = false, isResp = false;

  try {
    if (typeof $request !== "undefined") {
      try {
        if (typeof $response !== "undefined" && $response) {
          isResp = true;
        } else {
          isReq = true;
        }
      } catch(e) { isReq = true; }
    }
  } catch(e) {}

  dbg("isReq=" + isReq + " isResp=" + isResp);

  if (isReq) {
    runCookie();
  } else if (isResp) {
    runSign(function() { $done({}); });
  } else {
    runSign(function() { if (typeof $done !== "undefined") $done(); });
  }
})();
