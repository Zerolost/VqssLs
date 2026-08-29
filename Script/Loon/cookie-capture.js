
/*
 * 小黑盒 Cookie / 账号参数抓取（Loon）
 * Author: Zerolost
 * 与 heybox-checkin.js 共用存储键 xhh_account_v1。
 */

const NAME = "小黑盒 Cookie";
const ACCOUNT_KEY = "xhh_account_v1";
const COOKIE_KEY = "xhh_cookie";
const options = ($argument && typeof $argument === "object") ? $argument : {};
const notifyUpdate = options.cookie_notify === true || /notify=always/i.test(typeof $argument === "string" ? $argument : "");

try {
  const headers = (typeof $request !== "undefined" && $request.headers) || {};
  const cookie = getHeader(headers, "Cookie");
  const query = parseQuery((typeof $request !== "undefined" && $request.url) || "");
  const old = readJSON(ACCOUNT_KEY) || {};

  if (!cookie || cookie.length < 10) {
    $done({});
  } else {
    const id = query.heybox_id || old.heybox_id || cookieValue(cookie, "heybox_id") || "";
    const params = Object.assign({}, old.params || {}, cleanParams(query));
    const account = {
      cookie: cookie,
      heybox_id: id,
      imei: query.imei || old.imei || "",
      version: query.version || old.version || "",
      params: params,
      updated_at: new Date().toISOString()
    };

    const changed = old.cookie !== cookie || old.heybox_id !== id;
    const ok1 = $persistentStore.write(JSON.stringify(account), ACCOUNT_KEY);
    const ok2 = $persistentStore.write(cookie, COOKIE_KEY);

    if (!old.cookie || old.heybox_id !== id) {
      $notification.post(
        NAME,
        ok1 && ok2 ? "抓取成功" : "保存失败",
        `账号：${mask(id)}\nCookie：已保存（${cookie.length} 字符）\nIMEI：${account.imei ? "已获取" : "暂未获取"}\n版本：${account.version || "暂未获取"}`
      );
    } else if (changed && notifyUpdate) {
      $notification.post(NAME, "Cookie 已更新", `账号：${mask(id)}`);
    }
    $done({});
  }
} catch (e) {
  $notification.post(NAME, "抓取失败", String(e));
  $done({});
}

function getHeader(headers, target) {
  const key = Object.keys(headers).find(k => k.toLowerCase() === target.toLowerCase());
  return key ? String(headers[key]) : "";
}

function parseQuery(url) {
  const out = {};
  const pos = url.indexOf("?");
  if (pos < 0) return out;
  url.slice(pos + 1).split("&").forEach(item => {
    if (!item) return;
    const i = item.indexOf("=");
    const rawKey = i < 0 ? item : item.slice(0, i);
    const rawVal = i < 0 ? "" : item.slice(i + 1);
    try {
      out[decodeURIComponent(rawKey)] = decodeURIComponent(rawVal.replace(/\+/g, " "));
    } catch (_) {
      out[rawKey] = rawVal;
    }
  });
  return out;
}

function cleanParams(query) {
  const ignored = ["hkey", "nonce", "_time", "time_"];
  const out = {};
  Object.keys(query).forEach(k => {
    if (!ignored.includes(k) && query[k] !== "") out[k] = query[k];
  });
  if (!out.x_app) out.x_app = "heybox";
  if (!out.x_client_type) out.x_client_type = "mobile";
  return out;
}

function cookieValue(cookie, name) {
  const hit = cookie.split(";").map(x => x.trim()).find(x => x.startsWith(name + "="));
  return hit ? hit.slice(name.length + 1) : "";
}

function readJSON(key) {
  try { return JSON.parse($persistentStore.read(key) || "null"); }
  catch (_) { return null; }
}

function mask(value) {
  const s = String(value || "未知");
  return s.length > 6 ? s.slice(0, 3) + "***" + s.slice(-3) : s;
}
