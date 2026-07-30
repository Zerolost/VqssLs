/**
 * Vomic 漫画签到 v1.1.0
 * 
 * 触发方式：http-response
 *   监听 Vomic 首页 API 响应 → 提取Token → 查询签到 → 未签则签
 * 
 * Loon only
 */

var TOKEN_KEY = "vomic_authorization";
var LAST_SIGN_KEY = "vomic_last_sign_date";
var BASE_URL = "https://api.vomicmh.com";
var VERSION = "1.1.0";

function log(msg) { console.log("[Vomic v" + VERSION + "] " + msg); }
function readPS(k) { try { return $persistentStore.read(k); } catch(e) { return null; } }
function writePS(k, v) { try { $persistentStore.write(v, k); } catch(e) {} }
function notify(t, s, m) { try { $notification.post(t, s, m); } catch(e) {} }

function today() {
  var d = new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
function pad(n) { return (n < 10 ? "0" : "") + n; }

function monthRange() {
  var d = new Date(), y = d.getFullYear(), m = d.getMonth();
  return {
    start: y + "-" + pad(m + 1) + "-01",
    end: y + "-" + pad(m + 1) + "-" + pad(new Date(y, m + 1, 0).getDate())
  };
}

function getToken() {
  var t = readPS(TOKEN_KEY);
  return t ? t.replace(/^Bearer\s+/i, "") : null;
}

function makeHeaders() {
  var t = getToken();
  if (!t) return null;
  return {
    "authorization": "Bearer " + t,
    "content-type": "application/json; charset=utf-8",
    "platform": "ios", "store": "ios", "version": "1.2.0", "name": "pics",
    "accept-encoding": "gzip"
  };
}

/******************** 主逻辑 ********************/

function main() {
  log("========== 开始 ==========");

  // ── 1. 提取 Cookie ──
  try {
    if ($request && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var tk = auth.replace(/^Bearer\s+/i, "");
        if (tk && tk.length > 10 && readPS(TOKEN_KEY) !== tk) {
          writePS(TOKEN_KEY, tk);
          log("Token已更新 len=" + tk.length);
        }
      }
    }
  } catch(e) {}

  // ── 2. 今日是否已签 ──
  var td = today();
  if (readPS(LAST_SIGN_KEY) === td) {
    log("今日已签 " + td);
    log("========================");
    $done({});
    return;
  }

  // ── 3. 检查 Token ──
  var h = makeHeaders();
  if (!h) {
    log("无Token");
    log("========================");
    $done({});
    return;
  }

  // ── 4. 查询签到状态 ──
  var range = monthRange();
  var ts = Math.floor(Date.now() / 1000);
  var checkUrl = BASE_URL + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + ts;

  log("查询 " + range.start + "~" + range.end);

  $httpClient.get({ url: checkUrl, headers: h }, function(err, resp, data) {
    if (err) { log("查询失败 " + err); $done({}); return; }
    try {
      var r = JSON.parse(typeof data === "string" ? data : JSON.stringify(data));
      log("查询响应 " + JSON.stringify(r));
      if (r.code !== 200) { log("code=" + r.code); $done({}); return; }

      var signed = r.date || [];
      if (signed.indexOf(td) >= 0) {
        writePS(LAST_SIGN_KEY, td);
        log("已签，记录 " + td);
        $done({}); return;
      }

      // ── 5. 签到 ──
      log("未签，执行签到...");
      var signUrl = BASE_URL + "/pics_new/pics/c/signIn?t=" + ts;

      $httpClient.post({ url: signUrl, headers: h, body: "{}" }, function(err2, resp2, data2) {
        if (err2) { log("签到失败 " + err2); notify("Vomic 签到", "失败", err2); $done({}); return; }
        try {
          var r2 = JSON.parse(typeof data2 === "string" ? data2 : JSON.stringify(data2));
          log("签到响应 " + JSON.stringify(r2));
          if (r2.code === 200) {
            var d = r2.data || {};
            writePS(LAST_SIGN_KEY, td);
            log("签到成功!");
            notify("Vomic 签到", "签到成功",
              "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
              " 连续" + (d.streak||0) + "天 本月第" + (d.month_sign_day||0) + "天");
          } else {
            log("签到异常 code=" + r2.code);
            notify("Vomic 签到", "失败", "code=" + r2.code);
          }
        } catch(e) {
          log("解析失败 " + e.message);
        }
        $done({});
      });

    } catch(e) { log("解析失败 " + e.message); $done({}); }
  });
}

main();
