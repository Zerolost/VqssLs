/**
 * Vomic 漫画签到 v2.0.4
 * 
 * http-request  → 提取 Token
 * http-response → 拦截签到结果，推送通知
 * 
 * 同时：拦截 getSignMonthInfo 响应，如果未签则用 App 的签名参数自动补签
 * 
 * Loon only
 */

var TOKEN_KEY = "VomicToken4";
var SIGN_DATE_KEY = "VomicSignDate4";
var DEBUG_KEY = "VomicDebug4";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.4";

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

/******************** Cookie 提取 (http-request) ********************/

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

/******************** 签到结果拦截 (http-response) ********************/

function runSignResult() {
  log("========== 签到结果 ==========");

  try {
    // 顺便抓 Token
    if ($request && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var token = auth.replace(/^Bearer\s+/i, "");
        if (token.length > 10 && read(TOKEN_KEY) !== token) {
          write(TOKEN_KEY, token);
          dbg("顺便更新Token");
        }
      }
    }
  } catch(e) {}

  // 解析签到响应
  try {
    if ($response && $response.body) {
      var body = typeof $response.body === "string" ? $response.body : JSON.stringify($response.body);
      dbg("签到响应body: " + body);

      var r = JSON.parse(body);
      if (r.code === 200) {
        var d = r.data || {};
        write(SIGN_DATE_KEY, today());
        log("签到成功!");
        notify("Vomic 签到", "签到成功",
          "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
          " 连续" + (d.streak||0) + "天 本月第" + (d.month_sign_day||0) + "天");
      } else {
        log("签到失败 code=" + r.code + " msg=" + (r.message || ""));
      }
    } else {
      log("无响应body");
    }
  } catch(e) {
    log("解析异常: " + e.message);
  }

  log("==============================");
  $done({});
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

  if (isReq) {
    runCookie();
  } else if (isResp) {
    runSignResult();
  } else {
    $done();
  }
})();
