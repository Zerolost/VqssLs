/**
 * 源论坛每日签到
 */

const HOST = "ycoo.net";
const COOKIE_KEY = "ycoo_cookie";
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

if (typeof $request !== "undefined") {
  captureCookie();
} else {
  runSignIn();
}

//----------抓取Cookie----------
function captureCookie() {
  const headers = $request.headers || {};
  const cookie = headers["Cookie"] || headers["cookie"] || "";
  const respBody = ($response && $response.body) || "";

  // 用页面里是否有"退出登录"链接判断这次请求是不是已登录状态
  // 避免把游客Cookie存进去,覆盖掉之前保存的有效Cookie
  const looksLoggedIn = cookie.length > 20 && respBody.indexOf("action=logout") !== -1;

  if (looksLoggedIn) {
    $persistentStore.write(cookie, COOKIE_KEY);
    console.log("[源论坛] 已捕获并保存登录Cookie,长度: " + cookie.length);
  } else {
    console.log("[源论坛] 本次请求未检测到登录状态,不保存Cookie");
  }

  $done({});
}

// ----------cron定时任务----------
function extractFormhash(html) {
  let m = html.match(/name="formhash"\s+value="([0-9a-zA-Z]+)"/);
  if (!m) m = html.match(/formhash['"]?\s*[:=]\s*['"]([0-9a-zA-Z]+)['"]/);
  return m ? m[1] : null;
}

function notify(title, subtitle, body) {
  $notification.post(title, subtitle, body);
}

function runSignIn() {
  const cookie = $persistentStore.read(COOKIE_KEY);

  if (!cookie) {
    notify("源论坛签到未运行 ⚠️", "还没有捕获到Cookie", "请打开ycoo.net网页登录浏览一次(保持自动抓取Cookie开关开启)");
    $done();
    return;
  }

  $httpClient.get({
    url: `https://${HOST}/k_misign-sign.html`,
    headers: { "Cookie": cookie, "User-Agent": UA }
  }, (err, resp, body) => {
    if (err) {
      notify("源论坛签到失败 ❌", "获取页面出错", String(err));
      $done();
      return;
    }

    if (body.indexOf("action=login") !== -1 && body.indexOf("action=logout") === -1) {
      notify("源论坛签到失败 ❌", "Cookie已失效", "请重新登录ycoo.net一次,让脚本重新捕获Cookie");
      $done();
      return;
    }

    const formhash = extractFormhash(body);
    if (!formhash) {
      notify("源论坛签到失败 ❌", "未提取到formhash", "页面结构可能有变化,需要人工检查一下源码");
      $done();
      return;
    }

    const signUrl = `https://${HOST}/plugin.php?id=k_misign:sign&operation=qiandao&format=button&formhash=${formhash}&inajax=1`;

    $httpClient.get({
      url: signUrl,
      headers: { "Cookie": cookie, "User-Agent": UA, "X-Requested-With": "XMLHttpRequest" }
    }, (err2, resp2, body2) => {
      if (err2) {
        notify("源论坛签到失败 ❌", "签到请求出错", String(err2));
        $done();
        return;
      }

      let result = "已提交签到请求,建议去论坛核实一下结果";
      if (body2.indexOf("您今天已经签到") !== -1 || body2.indexOf("已经签到过") !== -1) {
        result = "今天已经签到过啦 ✅";
      } else if (body2.indexOf("签到成功") !== -1) {
        result = "签到成功!🎉";
      }

      notify("源论坛签到 ycoo.net", "", result);
      $done();
    });
  });
}
