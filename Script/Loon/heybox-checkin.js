/*
 * 小黑盒每日签到（Loon）
 * 功能：打开小黑盒时自动捕获 Cookie/设备参数；定时调用新版签到接口。
 * 注意：hkey 是小黑盒原生库动态签名，须配置自己的 Hkey Server。
 */

const NAME = "小黑盒签到";
const STORE_ACCOUNT = "xhh_account_v1";
const STORE_HKEY = "xhh_hkey_server";
const SIGN_PATH = "/task/sign_v3/sign";

const arg = parseArgument(typeof $argument === "string" ? $argument : "");

if (typeof $request !== "undefined") {
  capture();
} else {
  sign();
}

function capture() {
  try {
    const u = parseURL($request.url);
    const cookie = header($request.headers || {}, "Cookie");
    if (!cookie || !u.query.heybox_id) return $done({});

    const old = readJSON(STORE_ACCOUNT) || {};
    const account = {
      cookie: cookie,
      heybox_id: u.query.heybox_id,
      imei: u.query.imei || old.imei || "",
      version: u.query.version || old.version || "",
      params: cleanParams(u.query),
      updated_at: new Date().toISOString()
    };
    $persistentStore.write(JSON.stringify(account), STORE_ACCOUNT);

    if (old.heybox_id !== account.heybox_id) {
      notify("参数捕获成功", `账号 ID：${mask(account.heybox_id)}`, "现在可以运行定时签到脚本了");
    }
  } catch (e) {
    notify("参数捕获失败", "", String(e));
  }
  $done({});
}

function sign() {
  const account = readJSON(STORE_ACCOUNT);
  const hkeyServer = (arg.hkey || $persistentStore.read(STORE_HKEY) || "").trim();

  if (!account || !account.cookie) {
    notify("尚未获取账号", "", "请启用 HTTPS 解密后打开一次小黑盒 App");
    return $done();
  }
  if (!hkeyServer || /YOUR-HKEY-SERVER/i.test(hkeyServer)) {
    notify("缺少 Hkey Server", "", "请在插件 argument 中配置 hkey=https://你的服务/encode");
    return $done();
  }

  const nonce = randomString(32);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signPathForHkey = SIGN_PATH.endsWith("/") ? SIGN_PATH : SIGN_PATH + "/";
  const hkeyURL = hkeyServer + (hkeyServer.includes("?") ? "&" : "?") +
    "urlpath=" + encodeURIComponent(signPathForHkey) +
    "&timestamp=" + encodeURIComponent(timestamp) +
    "&nonce=" + encodeURIComponent(nonce);

  $httpClient.get({ url: hkeyURL, timeout: 15 }, (err, resp, body) => {
    if (err || !resp || resp.status < 200 || resp.status >= 300) {
      notify("签名服务请求失败", `HTTP ${resp ? resp.status : "-"}`, err || short(body));
      return $done();
    }
    const hkey = extractHkey(body);
    if (!hkey) {
      notify("签名服务返回无效", "", short(body));
      return $done();
    }

    const params = Object.assign({}, account.params || {}, {
      heybox_id: account.heybox_id,
      imei: account.imei,
      version: account.version,
      _time: timestamp,
      nonce: nonce,
      hkey: hkey
    });
    delete params.time_;
    const url = "https://api.xiaoheihe.cn" + SIGN_PATH + "?" + encodeQuery(params);
    const headers = {
      "Cookie": account.cookie,
      "User-Agent": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36 ApiMaxJia/1.0",
      "Referer": "http://api.maxjia.com/",
      "Accept": "application/json"
    };

    $httpClient.get({ url, headers, timeout: 20 }, (e, r, b) => {
      if (e) {
        notify("请求失败", "", String(e));
        return $done();
      }
      let data;
      try { data = JSON.parse(b); } catch (_) {}
      const status = data && data.status ? String(data.status) : `HTTP ${r.status}`;
      const msg = messageOf(data) || short(b) || "无返回内容";
      const ok = data && ["ok", "ignore"].includes(String(data.status).toLowerCase());
      notify(ok ? "签到完成" : "签到失败", status, msg);
      $done();
    });
  });
}

function cleanParams(q) {
  const out = {};
  Object.keys(q).forEach(k => {
    if (!["hkey", "nonce", "_time", "time_"].includes(k) && q[k] !== "") out[k] = q[k];
  });
  if (!out.x_app) out.x_app = "heybox";
  if (!out.x_client_type) out.x_client_type = "mobile";
  return out;
}

function extractHkey(body) {
  const s = String(body || "").trim();
  try {
    const j = JSON.parse(s);
    return String(j.hkey || (j.data && (j.data.hkey || j.data)) || j.result || "").trim();
  } catch (_) {
    return /^[A-Za-z0-9_+\/=.-]{8,512}$/.test(s) ? s : "";
  }
}

function messageOf(d) {
  if (!d) return "";
  if (typeof d.msg === "string" && d.msg) return d.msg;
  if (typeof d.message === "string" && d.message) return d.message;
  if (d.result && typeof d.result === "object") {
    return d.result.msg || d.result.message || d.result.toast || JSON.stringify(d.result);
  }
  return "";
}

function parseURL(url) {
  const i = url.indexOf("?");
  const query = {};
  if (i >= 0) url.slice(i + 1).split("&").forEach(x => {
    if (!x) return;
    const p = x.indexOf("=");
    const k = decodeURIComponent(p < 0 ? x : x.slice(0, p));
    const v = decodeURIComponent((p < 0 ? "" : x.slice(p + 1)).replace(/\+/g, " "));
    query[k] = v;
  });
  return { query };
}

function encodeQuery(obj) {
  return Object.keys(obj).filter(k => obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(String(obj[k]))).join("&");
}

function parseArgument(s) {
  const out = {};
  String(s).split(/[&,]/).forEach(x => {
    const i = x.indexOf("=");
    if (i > 0) out[x.slice(0, i).trim()] = decodeURIComponent(x.slice(i + 1).trim());
  });
  return out;
}

function readJSON(key) {
  try { return JSON.parse($persistentStore.read(key) || "null"); } catch (_) { return null; }
}
function header(h, name) {
  const key = Object.keys(h).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? h[key] : "";
}
function randomString(n) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let s = "";
  for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
function short(v) { const s = String(v || "").replace(/\s+/g, " "); return s.slice(0, 240); }
function mask(v) { const s = String(v); return s.length > 6 ? s.slice(0, 3) + "***" + s.slice(-3) : "***"; }
function notify(subtitle, extra, body) { $notification.post(NAME, [subtitle, extra].filter(Boolean).join(" · "), body || ""); }
