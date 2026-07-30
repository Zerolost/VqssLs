/**
 * Vomic 漫画签到 v2.0.0
 * http-response 触发：打开App → 拦截首页API响应 → 自动签到
 * Loon only
 */

var TOKEN_KEY = "VomicToken";
var SIGN_DATE_KEY = "VomicSignDate";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.0";

function log(m) { console.log("[Vomic v" + VER + "] " + m); }
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

function headers() {
  var t = read(TOKEN_KEY);
  if (!t) return null;
  return {
    "authorization": "Bearer " + t.replace(/^Bearer\s+/i, ""),
    "content-type": "application/json; charset=utf-8",
    "platform": "ios", "store": "ios", "version": "1.2.0", "name": "pics",
    "accept-encoding": "gzip"
  };
}

function saveToken() {
  try {
    if ($request && $request.headers) {
      var a = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (a) {
        var t = a.replace(/^Bearer\s+/i, "");
        if (t.length > 10 && read(TOKEN_KEY) !== t) {
          write(TOKEN_KEY, t);
          log("Token已更新 len=" + t.length);
        }
      }
    }
  } catch(e) {}
}

function doSign() {
  var h = headers();
  if (!h) { log("无Token"); $done({}); return; }

  var range = monthRange();
  var ts = Math.floor(Date.now() / 1000);
  var url = BASE + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + ts;

  log("查询 " + range.start + "~" + range.end);

  $httpClient.get({ url: url, headers: h }, function(err, resp, data) {
    if (err) { log("查询失败 " + err); $done({}); return; }

    try {
      var r = JSON.parse(typeof data === "string" ? data : JSON.stringify(data));
      log("查询结果 " + JSON.stringify(r));
      if (r.code !== 200) { log("code=" + r.code); $done({}); return; }

      var td = today();
      if ((r.date || []).indexOf(td) >= 0) {
        write(SIGN_DATE_KEY, td);
        log("今日已签 " + td);
        $done({});
        return;
      }

      log("执行签到...");
      $httpClient.post({ url: BASE + "/pics_new/pics/c/signIn?t=" + ts, headers: h, body: "{}" },
        function(err2, resp2, data2) {
          if (err2) { log("签到失败 " + err2); notify("Vomic 签到", "失败", err2); $done({}); return; }
          try {
            var r2 = JSON.parse(typeof data2 === "string" ? data2 : JSON.stringify(data2));
            log("签到结果 " + JSON.stringify(r2));
            if (r2.code === 200) {
              var d = r2.data || {};
              write(SIGN_DATE_KEY, td);
              notify("Vomic 签到", "签到成功",
                "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
                " 连续" + (d.streak||0) + "天 本月第" + (d.month_sign_day||0) + "天");
            } else {
              notify("Vomic 签到", "失败", "code=" + r2.code);
            }
          } catch(e) { log("解析失败 " + e.message); }
          $done({});
        });
    } catch(e) { log("解析失败 " + e.message); $done({}); }
  });
}

log("========== v" + VER + " ==========");
saveToken();

var last = read(SIGN_DATE_KEY);
if (last === today()) {
  log("今日已签 " + last);
  log("======================");
  $done({});
} else {
  doSign();
}
