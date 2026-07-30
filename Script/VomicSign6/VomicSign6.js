/**
 * Vomic 漫画签到 v2.0.6
 * 
 * http-request  → 提取 Token
 * http-response → signIn → 通知签到结果
 * http-response → getSignMonthInfo → 尝试自动签到（实验性）
 * 
 * Loon only
 */

var TOKEN_KEY = "VomicToken6";
var SIGN_DATE_KEY = "VomicSignDate6";
var BASE = "https://api.vomicmh.com";
var VER = "2.0.6";

function log(m) { console.log("[Vomic v" + VER + "] " + m); }
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
    "accept-encoding": "gzip"
  };
}

// 从 URL 提取参数
function getParam(url, name) {
  try {
    var m = url.match(new RegExp("[?&]" + name + "=([^&]+)"));
    return m ? m[1] : "";
  } catch(e) { return ""; }
}

/******************** Cookie 提取 ********************/

function runCookie() {
  log("Cookie提取");
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
            notify("Vomic Cookie", "已更新", "len=" + token.length);
          }
        }
      }
    }
  } catch(e) {}
  $done({});
}

/******************** 签到结果通知 (signIn http-response) ********************/

function runSignNotify() {
  log("签到结果拦截");

  // 顺便抓 Token
  try {
    if ($request && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var tk = auth.replace(/^Bearer\s+/i, "");
        if (tk.length > 10 && read(TOKEN_KEY) !== tk) {
          write(TOKEN_KEY, tk);
        }
      }
    }
  } catch(e) {}

  // 解析响应
  try {
    if ($response && $response.body) {
      var body = typeof $response.body === "string" ? $response.body : JSON.stringify($response.body);
      log("签到响应: " + body);
      var r = JSON.parse(body);
      if (r.code === 200) {
        var d = r.data || {};
        write(SIGN_DATE_KEY, today());
        notify("Vomic 签到", "签到成功",
          "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
          " 连续" + (d.streak||0) + "天 本月第" + (d.month_sign_day||0) + "天");
      } else {
        log("签到失败 code=" + r.code + " msg=" + (r.message || ""));
      }
    }
  } catch(e) {
    log("解析异常: " + e.message);
  }

  $done({});
}

/******************** 自动签到 (getSignMonthInfo http-response) ********************/

function runAutoSign() {
  log("自动签到检测");

  // 顺便抓 Token
  try {
    if ($request && $request.headers) {
      var auth = $request.headers["authorization"] || $request.headers["Authorization"] || "";
      if (auth) {
        var tk = auth.replace(/^Bearer\s+/i, "");
        if (tk.length > 10 && read(TOKEN_KEY) !== tk) {
          write(TOKEN_KEY, tk);
        }
      }
    }
  } catch(e) {}

  var td = today();

  // 检查响应
  try {
    if ($response && $response.body) {
      var body = typeof $response.body === "string" ? $response.body : JSON.stringify($response.body);
      log("查询响应: " + body.substring(0, 300));
      var r = JSON.parse(body);

      if (r.code === 200) {
        var signed = r.date || [];
        if (signed.indexOf(td) >= 0) {
          write(SIGN_DATE_KEY, td);
          log("今日已签 " + td);
          $done({});
          return;
        }
      }
    }
  } catch(e) {}

  // 检查缓存
  if (read(SIGN_DATE_KEY) === td) {
    log("已签(缓存)");
    $done({});
    return;
  }

  // 尝试签到：从请求URL提取 t 和 s
  var url = ($request && $request.url) ? $request.url : "";
  var t = getParam(url, "t");
  var s = getParam(url, "s");
  log("提取签名 t=" + t + " s=" + s);

  if (!t || !s) {
    log("无签名参数，跳过");
    $done({});
    return;
  }

  var h = makeHeaders();
  if (!h) { log("无Token"); $done({}); return; }

  // 尝试多种签到方式
  log("尝试签到...");

  // 方式1：POST 带 body={}
  var signUrl1 = BASE + "/pics_new/pics/c/signIn?t=" + t + "&s=" + s;
  log("方式1 POST: " + signUrl1);

  $httpClient.post({ url: signUrl1, headers: h, body: "{}" }, function(err, resp, data) {
    if (err) { log("方式1失败: " + err); $done({}); return; }
    var body = typeof data === "string" ? data : JSON.stringify(data);
    log("方式1响应: " + body);

    try {
      var r = JSON.parse(body);
      if (r.code === 200) {
        var d = r.data || {};
        write(SIGN_DATE_KEY, td);
        notify("Vomic 签到", "签到成功",
          "经验+" + (d.exp||0) + " 金币+" + (d.coin||0) +
          " 连续" + (d.streak||0) + "天");
      } else if (r.code === 400) {
        // 签名不对，尝试方式2：GET
        log("方式1签名错误，尝试GET...");
        $httpClient.get({ url: signUrl1, headers: h }, function(err2, resp2, data2) {
          if (err2) { log("GET也失败: " + err2); $done({}); return; }
          var body2 = typeof data2 === "string" ? data2 : JSON.stringify(data2);
          log("GET响应: " + body2);
          try {
            var r2 = JSON.parse(body2);
            if (r2.code === 200) {
              var d2 = r2.data || {};
              write(SIGN_DATE_KEY, td);
              notify("Vomic 签到", "签到成功(GET)",
                "经验+" + (d2.exp||0) + " 金币+" + (d2.coin||0));
            }
          } catch(e2) {}
          $done({});
        });
        return;
      }
    } catch(e) {}
    $done({});
  });
}

/******************** 入口 ********************/

(function() {
  var isReq = false, isResp = false;
  try {
    if (typeof $request !== "undefined") {
      try {
        if (typeof $response !== "undefined" && $response) isResp = true;
        else isReq = true;
      } catch(e) { isReq = true; }
    }
  } catch(e) {}

  // 根据 URL 判断具体触发哪个
  var url = "";
  try { if ($request && $request.url) url = $request.url; } catch(e) {}

  if (isReq) {
    runCookie();
  } else if (isResp && url.indexOf("signIn") >= 0) {
    runSignNotify();
  } else if (isResp && url.indexOf("getSignMonthInfo") >= 0) {
    runAutoSign();
  } else if (isResp) {
    runAutoSign();
  } else {
    if (typeof $done !== "undefined") $done();
  }
})();
