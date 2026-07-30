/**
 * Vomic 漫画签到 v2.0.5
 * 
 * 核心思路：拦截 App 的 getSignMonthInfo 响应
 *   从 $request.url 中提取 App 生成的 t 和 s（签名正确的）
 *   如果未签 → 复用 t 和 s 立即调用 signIn
 * 
 * http-request  → 提取 Token
 * http-response → 拦截查询响应 → 未签则自动签到
 * cron          → 定时签到（需要先有缓存的 t/s）
 * 
 * Loon only
 */

var TOKEN_KEY = "VomicToken5";
var SIGN_DATE_KEY = "VomicSignDate5";
var CACHED_TS_KEY = "VomicCachedTS";
var CACHED_S_KEY = "VomicCachedS";
var DEBUG_KEY = "VomicDebug5";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.5";

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

function getToken() {
  var t = read(TOKEN_KEY);
  return t ? t.replace(/^Bearer\s+/i, "") : null;
}

function makeHeaders() {
  var t = getToken();
  if (!t) return null;
  return {
    "authorization": "Bearer " + t,
    "content-type": "application/json; charset=utf-8",
    "platform": "ios", "store": "ios", "version": "1.2.0", "name": "pics",
    "accept-encoding": "gzip",
    "showsuccess": "false", "showtoast": "false",
    "hide-content": "0", "auditplatform": "default"
  };
}

// 从 URL 中提取 t 和 s 参数
function extractTS(url) {
  var t = "", s = "";
  try {
    var mt = url.match(/[?&]t=(\d+)/);
    var ms = url.match(/[?&]s=([a-f0-9]+)/);
    if (mt) t = mt[1];
    if (ms) s = ms[1];
  } catch(e) {}
  return { t: t, s: s };
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
      } else { dbg("无Authorization"); }
    }
  } catch(e) { log("异常: " + e.message); }
  log("======================");
  $done({});
}

/******************** 自动签到 (http-response getSignMonthInfo) ********************/

function runAutoSign(doneCallback) {
  log("========== 自动签到 ==========");

  // 1. 顺便抓 Token
  try {
    if ($request && $request.headers) {
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

  // 2. 从请求 URL 提取 t 和 s（App 生成的正确签名）
  var ts = { t: "", s: "" };
  if ($request && $request.url) {
    ts = extractTS($request.url);
    dbg("提取 t=" + ts.t + " s=" + ts.s);
  }

  // 3. 检查响应中是否已签
  var td = today();
  try {
    if ($response && $response.body) {
      var body = typeof $response.body === "string" ? $response.body : JSON.stringify($response.body);
      dbg("查询响应: " + body.substring(0, 500));
      var r = JSON.parse(body);
      if (r.code === 200) {
        var signed = r.date || [];
        if (signed.indexOf(td) >= 0) {
          write(SIGN_DATE_KEY, td);
          log("今日已签 " + td);
          log("==============================");
          if (doneCallback) doneCallback();
          return;
        }
      }
    }
  } catch(e) {
    dbg("解析查询响应异常: " + e.message);
  }

  // 4. 检查是否已签（持久化记录）
  if (read(SIGN_DATE_KEY) === td) {
    log("已签(缓存) " + td);
    log("==============================");
    if (doneCallback) doneCallback();
    return;
  }

  // 5. 有 t 和 s → 立即签到
  if (ts.t && ts.s) {
    log("未签，复用签名签到 t=" + ts.t + " s=" + ts.s);
    // 缓存 t 和 s 供 cron 使用
    write(CACHED_TS_KEY, ts.t);
    write(CACHED_S_KEY, ts.s);
    doSignWithTS(ts.t, ts.s, td, doneCallback);
  } else {
    log("无签名参数，跳过");
    log("==============================");
    if (doneCallback) doneCallback();
  }
}

function doSignWithTS(t, s, td, doneCallback) {
  var h = makeHeaders();
  if (!h) { log("无Token"); if (doneCallback) doneCallback(); return; }

  var signUrl = BASE + "/pics_new/pics/c/signIn?t=" + t + "&s=" + s;
  dbg("签到URL: " + signUrl);

  $httpClient.post({ url: signUrl, headers: h, body: "{}" }, function(err, resp, data) {
    if (err) {
      log("签到失败: " + err);
      notify("Vomic 签到", "失败", err);
      if (doneCallback) doneCallback();
      return;
    }

    var body = typeof data === "string" ? data : JSON.stringify(data);
    dbg("签到响应: " + body);

    try {
      var r = JSON.parse(body);
      if (r.code === 200) {
        var d = r.data || {};
        write(SIGN_DATE_KEY, td);
        log("签到成功!");
        notify("Vomic 签到", "签到成功",
          "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
          " 连续" + (d.streak||0) + "天 本月第" + (d.month_sign_day||0) + "天");
      } else {
        log("签到异常 code=" + r.code + " msg=" + (r.message || ""));
        notify("Vomic 签到", "失败", "code=" + r.code + " " + (r.message || ""));
      }
    } catch(e) {
      log("解析失败: " + e.message);
    }

    log("==============================");
    if (doneCallback) doneCallback();
  });
}

/******************** Cron 定时签到 ********************/

function runCronSign() {
  log("========== Cron签到 ==========");

  var td = today();
  if (read(SIGN_DATE_KEY) === td) {
    log("今日已签 " + td);
    log("========================");
    if (typeof $done !== "undefined") $done();
    return;
  }

  var h = makeHeaders();
  if (!h) { log("无Token"); if (typeof $done !== "undefined") $done(); return; }

  // cron 没有 App 的 t/s，尝试用缓存的
  var cachedT = read(CACHED_TS_KEY);
  var cachedS = read(CACHED_S_KEY);

  if (cachedT && cachedS) {
    log("使用缓存签名签到");
    doSignWithTS(cachedT, cachedS, td, function() {
      if (typeof $done !== "undefined") $done();
    });
  } else {
    // 没有缓存签名，自己查询+签到（可能失败）
    log("无缓存签名，尝试直接签到...");
    var t = Math.floor(Date.now() / 1000);
    var s = "";
    doSignWithTS(t, s, td, function() {
      if (typeof $done !== "undefined") $done();
    });
  }
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
    runAutoSign(function() { $done({}); });
  } else {
    runCronSign();
  }
})();
