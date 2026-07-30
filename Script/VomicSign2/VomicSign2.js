/**
 * Vomic 漫画签到 v2.0.2
 * 
 * http-request  → 提取 Token
 * http-response → 打开App自动签到
 * cron          → 定时签到
 * 
 * Loon only
 */

var TOKEN_KEY = "VomicToken2";
var SIGN_DATE_KEY = "VomicSignDate2";
var DEBUG_KEY = "VomicDebug2";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.2";

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

function makeHeaders() {
  var t = read(TOKEN_KEY);
  if (!t) return null;
  return {
    "authorization": "Bearer " + t.replace(/^Bearer\s+/i, ""),
    "content-type": "application/json; charset=utf-8",
    "platform": "ios", "store": "ios", "version": "1.2.0", "name": "pics",
    "accept-encoding": "gzip"
  };
}

/******************** Cookie 提取 ********************/

function runCookie() {
  log("========== Cookie ==========");
  dbg("URL: " + ($request && $request.url ? $request.url : "?"));

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
          } else {
            log("Token未变化");
          }
        }
      } else {
        log("无Authorization");
      }
    } else {
      log("无请求头");
    }
  } catch(e) {
    log("异常: " + e.message);
  }
  log("======================");
  $done({});
}

/******************** 签到 ********************/

function doSignWork(callback) {
  var h = makeHeaders();
  if (!h) {
    log("无Token");
    callback("无Token");
    return;
  }

  var td = today();
  if (read(SIGN_DATE_KEY) === td) {
    log("今日已签 " + td);
    callback(null, "already_signed");
    return;
  }

  var range = monthRange();
  var ts = Math.floor(Date.now() / 1000);
  var checkUrl = BASE + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + ts;

  log("查询 " + range.start + "~" + range.end);
  dbg("查询URL: " + checkUrl);

  $httpClient.get({ url: checkUrl, headers: h }, function(err, resp, data) {
    if (err) { log("查询失败 " + err); callback("查询失败: " + err); return; }
    try {
      var r = JSON.parse(typeof data === "string" ? data : JSON.stringify(data));
      dbg("查询响应: " + JSON.stringify(r));
      if (r.code !== 200) { log("查询异常 code=" + r.code); callback("code=" + r.code); return; }

      var signed = r.date || [];
      if (signed.indexOf(td) >= 0) {
        write(SIGN_DATE_KEY, td);
        log("已签 " + td);
        callback(null, "already_signed");
        return;
      }

      var signUrl = BASE + "/pics_new/pics/c/signIn?t=" + ts;
      log("执行签到...");

      $httpClient.post({ url: signUrl, headers: h, body: "{}" }, function(err2, resp2, data2) {
        if (err2) { log("签到失败 " + err2); callback("签到失败: " + err2); return; }
        try {
          var r2 = JSON.parse(typeof data2 === "string" ? data2 : JSON.stringify(data2));
          dbg("签到响应: " + JSON.stringify(r2));
          if (r2.code === 200) {
            var d = r2.data || {};
            write(SIGN_DATE_KEY, td);
            log("签到成功!");
            callback(null, "success", d);
          } else {
            log("签到异常 code=" + r2.code);
            callback("code=" + r2.code);
          }
        } catch(e) {
          log("解析失败 " + e.message);
          callback(e.message);
        }
      });
    } catch(e) {
      log("解析失败 " + e.message);
      callback(e.message);
    }
  });
}

function runSign(doneCallback) {
  log("========== 签到 ==========");
  dbg("DEBUG=ON");

  // http-response 顺便抓 Token
  try {
    if (typeof $request !== "undefined" && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var tk = auth.replace(/^Bearer\s+/i, "");
        if (tk.length > 10 && read(TOKEN_KEY) !== tk) {
          write(TOKEN_KEY, tk);
          dbg("Token顺便更新 len=" + tk.length);
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
  var isHTTPRequest = false;
  var isHTTPResponse = false;

  // Loon http-request: 有 $request，无 $response
  // Loon http-response: 有 $request，有 $response
  // Loon cron: 都无

  try {
    if (typeof $request !== "undefined") {
      // 判断是 http-request 还是 http-response
      // http-response 中 $response 也存在
      try {
        if (typeof $response !== "undefined" && $response) {
          isHTTPResponse = true;
        } else {
          isHTTPRequest = true;
        }
      } catch(e) {
        // $response 不存在 → http-request
        isHTTPRequest = true;
      }
    }
  } catch(e) {}

  dbg("isHTTPRequest=" + isHTTPRequest + " isHTTPResponse=" + isHTTPResponse);

  if (isHTTPRequest) {
    runCookie();
  } else if (isHTTPResponse) {
    runSign(function() { $done({}); });
  } else {
    // cron
    runSign(function() { if (typeof $done !== "undefined") $done(); });
  }
})();
