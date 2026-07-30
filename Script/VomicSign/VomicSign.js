/**
 * Vomic 漫画签到 v2.0.1
 * 
 * http-request  → 提取 Authorization Token
 * http-response → 打开App自动签到
 * 
 * Loon only
 */

var TOKEN_KEY = "VomicToken";
var SIGN_DATE_KEY = "VomicSignDate";
var DEBUG_KEY = "VomicDebug";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.1";

// 调试：持久化存储 VomicDebug = "true" 开启
var DEBUG = (function() {
  try { return $persistentStore.read(DEBUG_KEY) === "true"; } catch(e) { return false; }
})();

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

/******************** Cookie 提取 (http-request) ********************/

function runCookie() {
  log("========== Cookie提取 ==========");
  dbg("请求URL: " + ($request && $request.url ? $request.url : "?"));
  dbg("请求头keys: " + ($request && $request.headers ? Object.keys($request.headers).join(",") : "无"));

  try {
    if (!$request || !$request.headers) {
      log("无请求头");
      log("==============================");
      $done({});
      return;
    }

    var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
    dbg("Authorization: " + (auth ? "有(长度" + auth.length + ")" : "无"));

    if (!auth) {
      log("未找到Authorization");
      log("==============================");
      $done({});
      return;
    }

    var token = auth.replace(/^Bearer\s+/i, "");
    if (token.length < 10) {
      log("Token无效 len=" + token.length);
      log("==============================");
      $done({});
      return;
    }

    var old = read(TOKEN_KEY);
    if (old === token) {
      log("Token未变化");
    } else {
      write(TOKEN_KEY, token);
      log("Token已更新! len=" + token.length);
      notify("Vomic Cookie", "Token已更新", "len=" + token.length);
    }
  } catch(e) {
    log("异常: " + e.message);
  }
  log("==============================");
  $done({});
}

/******************** 签到 (http-response) ********************/

function runSign() {
  log("========== 签到 ==========");
  dbg("请求URL: " + ($request && $request.url ? $request.url : "?"));

  // 顺带也抓一下 Token（http-response 也能拿到请求头）
  try {
    if ($request && $request.headers) {
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

  // 检查 Token
  var h = makeHeaders();
  if (!h) {
    log("无Token，跳过签到（请先确保Cookie提取开关开启并打开一次App）");
    if (DEBUG) notify("Vomic 签到", "无Token", "请先确保MITM已开启并打开Vomic App");
    log("========================");
    $done({});
    return;
  }

  // 检查今日是否已签
  var td = today();
  if (read(SIGN_DATE_KEY) === td) {
    log("今日已签 " + td);
    log("========================");
    $done({});
    return;
  }

  // 查询签到状态
  var range = monthRange();
  var ts = Math.floor(Date.now() / 1000);
  var checkUrl = BASE + "/pics_new/pics/c/getSignMonthInfo?start=" + range.start + "&end=" + range.end + "&t=" + ts;

  log("查询 " + range.start + "~" + range.end);
  dbg("查询URL: " + checkUrl);

  $httpClient.get({ url: checkUrl, headers: h }, function(err, resp, data) {
    if (err) { log("查询失败 " + err); if (DEBUG) notify("Vomic 签到", "查询失败", err); $done({}); return; }

    try {
      var r = JSON.parse(typeof data === "string" ? data : JSON.stringify(data));
      dbg("查询响应: " + JSON.stringify(r));

      if (r.code !== 200) {
        log("查询异常 code=" + r.code);
        if (DEBUG) notify("Vomic 签到", "查询异常", "code=" + r.code);
        $done({});
        return;
      }

      var signed = r.date || [];
      if (signed.indexOf(td) >= 0) {
        write(SIGN_DATE_KEY, td);
        log("已签，记录 " + td);
        $done({});
        return;
      }

      // 执行签到
      var signUrl = BASE + "/pics_new/pics/c/signIn?t=" + ts;
      log("执行签到...");
      dbg("签到URL: " + signUrl);

      $httpClient.post({ url: signUrl, headers: h, body: "{}" }, function(err2, resp2, data2) {
        if (err2) {
          log("签到失败 " + err2);
          notify("Vomic 签到", "签到失败", err2);
          $done({});
          return;
        }

        try {
          var r2 = JSON.parse(typeof data2 === "string" ? data2 : JSON.stringify(data2));
          dbg("签到响应: " + JSON.stringify(r2));

          if (r2.code === 200) {
            var d = r2.data || {};
            write(SIGN_DATE_KEY, td);
            log("签到成功!");
            notify("Vomic 签到", "签到成功",
              "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
              " 连续" + (d.streak||0) + "天 本月第" + (d.month_sign_day||0) + "天");
          } else {
            log("签到异常 code=" + r2.code);
            notify("Vomic 签到", "签到失败", "code=" + r2.code);
          }
        } catch(e) {
          log("解析失败 " + e.message);
          if (DEBUG) notify("Vomic 签到", "解析失败", e.message);
        }
        $done({});
      });

    } catch(e) {
      log("解析失败 " + e.message);
      if (DEBUG) notify("Vomic 签到", "解析失败", e.message);
      $done({});
    }
  });
}

/******************** 入口 ********************/

// http-request → Cookie
if (typeof $request !== "undefined" && typeof $response === "undefined") {
  runCookie();
}
// http-response → 签到
else {
  runSign();
}
