/*1c40dedeb603*/
(function(){
const _88f9d80b108d = typeof $argument === "object" && $argument ? $argument : {};
const _c3ab61aee56a = $persistentStore;
const _0e7726b570db = "f3k9m2_store";
const _2fad3be2f05d = true;
const _9c85fc3340c2 = { value: false };
const _0a9f9f1cab12 = [];
const _e55045d1c097 = values => values.join("");

function _d9f214d5f6a2() {
  try { return JSON.parse(_c3ab61aee56a.read(_0e7726b570db) || "{}") || {}; }
  catch (error) { return {}; }
}
function _372f2cb1db7d(_a9ba9f106a32) { return _c3ab61aee56a.write(JSON.stringify(_a9ba9f106a32), _0e7726b570db); }
function _98d29a14e7d3(name) { return String(_d9f214d5f6a2()[name] || ""); }
function _e14e47145e6c(name, value) {
  const _a9ba9f106a32 = _d9f214d5f6a2();
  if (value == null) delete _a9ba9f106a32[name];
  else _a9ba9f106a32[name] = String(value);
  return _372f2cb1db7d(_a9ba9f106a32);
}
function _8d2ce76f267f(_afb5b8297b17, name) {
  const _d2a905809477 = Object.keys(_afb5b8297b17 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _d2a905809477 ? String(_afb5b8297b17[_d2a905809477] || "") : "";
}
function _59d5a2475eb6(_0b1bdd8fbf45) {
  const _9c15bf2923b8 = String(_0b1bdd8fbf45);
  _0a9f9f1cab12.push(_9c15bf2923b8);
  if (_2fad3be2f05d) console.log(_9c15bf2923b8);
}
function _327e364458f9(value, size) {
  const _9c15bf2923b8 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _9c15bf2923b8.length > size ? _9c15bf2923b8.slice(0, size) + "..." : _9c15bf2923b8;
}
function _5f6152bf4db9(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _3e6d83c8c15c(value, _4efda3719351, _9d0070e70b60) {
  const _9c15bf2923b8 = String(value || "");
  const _0a6e50fa0043 = _9c15bf2923b8.indexOf(_4efda3719351);
  if (_0a6e50fa0043 < 0) return "";
  const _49a2b71f151e = _0a6e50fa0043 + _4efda3719351.length;
  const _3a289ad0d74b = _9c15bf2923b8.indexOf(_9d0070e70b60, _49a2b71f151e);
  return _9c15bf2923b8.slice(_49a2b71f151e, _3a289ad0d74b < 0 ? _49a2b71f151e + 16 : _3a289ad0d74b).trim();
}
function _541545ab1470(value) { return _3e6d83c8c15c(value, _e55045d1c097(["form", "hash", "="]), "&"); }
function _0081b9410de1(value) {
  const _0ff371cbd560 = _e55045d1c097(["layer", ".msg('"]);
  const _9c15bf2923b8 = String(value || "");
  const _4efda3719351 = _9c15bf2923b8.indexOf(_0ff371cbd560);
  if (_4efda3719351 < 0) return [];
  const _49a2b71f151e = _4efda3719351 + _0ff371cbd560.length;
  const _9d0070e70b60 = _9c15bf2923b8.indexOf("')", _49a2b71f151e);
  return _9d0070e70b60 < 0 ? [] : [_9c15bf2923b8.slice(_49a2b71f151e, _9d0070e70b60)];
}
function _cb5ff467d76f(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _ed40bdcb7d12(ok, title, body) {
  if (_9c85fc3340c2.value) return;
  _9c85fc3340c2.value = true;
  _59d5a2475eb6("━━━━━━━━ 执行结束 ━━━━━━━━");
  _59d5a2475eb6(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _18bc1982cf20 = typeof $notification !== "undefined";
  if (_88f9d80b108d.notify_enabled !== false && _18bc1982cf20) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _327e364458f9(body || _0a9f9f1cab12.join("\n"), 700));
  const _56d9db2c2845 = typeof $done === "function";
  if (_56d9db2c2845) $done({});
}
function _d394beb485ca(options, callback, attempt) {
  const _78dae3862acd = String(options.method || "GET").toLowerCase();
  const _d63c29b45a93 = $httpClient[_78dae3862acd] || $httpClient.get;
  const _4cfd4b0d123d = { url: options.url, headers: options.headers, body: options.body, timeout: options.timeout || 20000 };
  _4cfd4b0d123d[_e55045d1c097(["auto", "-", "redirect"])] = true;
  _4cfd4b0d123d[_e55045d1c097(["auto", "-", "cookie"])] = true;
  _4cfd4b0d123d.alpn = "h2";
  _d63c29b45a93(_4cfd4b0d123d, (error, response, _a9ba9f106a32) => {
    const _9c15bf2923b8 = String(error || "");
    if (_9c15bf2923b8 && (attempt || 0) < 2 && (_9c15bf2923b8.indexOf("closed") >= 0 || _9c15bf2923b8.indexOf("timed out") >= 0)) {
      _59d5a2475eb6("🔁 连接中断，正在重试");
      return _d394beb485ca(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_a9ba9f106a32 || ""));
  });
}
function _dab0e268f430(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _f8ffdba5c43f = _e55045d1c097(["ht", "tps", "://"]);
const _d308cabb29c6 = [121, 99, 111, 111, 46, 110, 101, 116].map(_56f56e1adfd0 => String.fromCharCode(_56f56e1adfd0)).join("");
function _96711cd3e320(path) { return _f8ffdba5c43f + _d308cabb29c6 + String.fromCharCode(47) + String(path || ""); }
const _9ae5a556d80a = _e55045d1c097(["plu", "gin", ".", "php"]);
const _33e154ced72c = _e55045d1c097(["k", "_", "mi", "sign"]);
const _19d92d2c24ab = _e55045d1c097(["view", "ui", "_", "lottery"]);
const _553b9b7cceaf = _e55045d1c097(["jn", "farm"]);

function _64e68f63cf8f(_afb5b8297b17, name) {
  const _ba903b9630c5 = _8d2ce76f267f(_afb5b8297b17, name);
  return Array.isArray(_ba903b9630c5) ? _ba903b9630c5.join(",") : String(_ba903b9630c5 || "");
}
function _aee060326ab7(_8e7694675d46, extra) {
  const _97147aeed018 = {};
  [_8e7694675d46, extra].join("; ").split(";").forEach(item => {
    const _9c15bf2923b8 = item.trim();
    const _32d0aa753c1e = _9c15bf2923b8.indexOf("=");
    if (_32d0aa753c1e > 0) _97147aeed018[_9c15bf2923b8.slice(0, _32d0aa753c1e)] = _9c15bf2923b8.slice(_32d0aa753c1e + 1);
  });
  return Object.keys(_97147aeed018).map(_d2a905809477 => _d2a905809477 + "=" + _97147aeed018[_d2a905809477]).join("; ");
}
function _ee264280074b() {
  try {
    const _3e7c98e2ce29 = typeof $request !== "undefined" ? $request : {};
    const _6dcc50334b7a = typeof $response !== "undefined" ? $response : {};
    const _2608e26fcbc3 = String(_3e7c98e2ce29.url || "");
    const _4beeff63d5c5 = _64e68f63cf8f(_3e7c98e2ce29.headers, "Cookie");
    const _4290c31e8d9e = _64e68f63cf8f(_6dcc50334b7a.headers, "Set-Cookie");
    const _a31892d0d822 = _aee060326ab7(_4beeff63d5c5, "");
    const _dff31898e393 = _a31892d0d822.split("; ").filter(Boolean);
    const _4520fb35bad3 = Object.keys(_3e7c98e2ce29.headers || {}).concat(Object.keys(_6dcc50334b7a.headers || {}));
    const _5e9651f9eb97 = _dff31898e393.some(item => item.indexOf("auth=") >= 0);
    _59d5a2475eb6("🧪 调试模式：开启");
    _59d5a2475eb6("🍪 登录状态抓取");
    _59d5a2475eb6("🌐 页面：" + _327e364458f9(_2608e26fcbc3, 180));
    _59d5a2475eb6("📋 头名称：" + _4520fb35bad3.map(item => item.toLowerCase()).join(","));
    _59d5a2475eb6("🔑 请求长度：" + _4beeff63d5c5.length + "，字段：" + _dff31898e393.length);
    _59d5a2475eb6("🏷️ 字段名：" + _dff31898e393.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_5e9651f9eb97) {
      _59d5a2475eb6("ℹ️ 当前响应没有完整登录状态");
      return _ed40bdcb7d12(true, "", "");
    }
    const _b614f484cfd3 = _98d29a14e7d3("session");
    const _6d0d0af085ee = Number(_98d29a14e7d3("notified") || 0);
    const _bd99b273f918 = _e14e47145e6c("session", _a31892d0d822);
    _e14e47145e6c("updated", new Date().toISOString());
    _59d5a2475eb6(_b614f484cfd3 === _a31892d0d822 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _59d5a2475eb6("💾 存储键：" + _0e7726b570db + "，写入：" + _bd99b273f918 + "，回读长度：" + _98d29a14e7d3("session").length);
    if (_b614f484cfd3 !== _a31892d0d822 && Date.now() - _6d0d0af085ee > 60000) {
      _e14e47145e6c("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _dff31898e393.length + " 项 / " + _a31892d0d822.length);
    }
    _ed40bdcb7d12(true, "", "");
  } catch (error) {
    _59d5a2475eb6("❌ 登录状态异常：" + error);
    _ed40bdcb7d12(false, "登录状态失败", String(error));
  }
}
function _2fbd45591d33(callback) {
  const _a31892d0d822 = _98d29a14e7d3("session");
  if (!_a31892d0d822) return callback("missing");
  const _afb5b8297b17 = {};
  _afb5b8297b17[_e55045d1c097(["C", "ookie"])] = _a31892d0d822;
  _afb5b8297b17[_e55045d1c097(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _afb5b8297b17.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _d394beb485ca({ url: _96711cd3e320("forum.php"), _afb5b8297b17 }, (error, response, _a9ba9f106a32) => {
    if (error) return callback(error);
    if (_a9ba9f106a32.indexOf(_e55045d1c097(["action", "=", "logout"])) < 0) return callback("expired");
    const _56f56e1adfd0 = _541545ab1470(_a9ba9f106a32);
    if (!_56f56e1adfd0) return callback("token");
    callback(null, { _afb5b8297b17, _56f56e1adfd0 });
  });
}
function _38a94a801bc5(ctx, callback) {
  const _afb5b8297b17 = Object.assign({}, ctx.headers);
  _afb5b8297b17.Referer = _96711cd3e320(_e55045d1c097([_33e154ced72c, "-", "sign", ".", "html"]));
  _afb5b8297b17[_e55045d1c097(["X", "-", "Requested", "-", "With"])] = _e55045d1c097(["XML", "Http", "Request"]);
  _d394beb485ca({ url: _96711cd3e320(_9ae5a556d80a + "?id=" + _33e154ced72c + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _afb5b8297b17 }, (error, response, _a9ba9f106a32) => {
    _59d5a2475eb6("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _4f67e7bbc8ab = _a9ba9f106a32.indexOf("今日已签") >= 0;
    const _6117a9b31590 = _4f67e7bbc8ab || _a9ba9f106a32.indexOf("<![CDATA[]]>") >= 0;
    _d394beb485ca({ url: _96711cd3e320(_e55045d1c097([_33e154ced72c, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _62ff004289d1 = _3e6d83c8c15c(page, "签到排名：", " ");
      const _141045242e5d = _3e6d83c8c15c(page, 'id="lxtdays" value="', '"');
      const _9463267fd0d7 = _3e6d83c8c15c(page, 'id="lxlevel" value="', '"');
      const _ce10e4535160 = _3e6d83c8c15c(page, 'id="lxreward" value="', '"');
      _59d5a2475eb6(_4f67e7bbc8ab ? "ℹ️ 今日已经签到" : _6117a9b31590 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_62ff004289d1) _59d5a2475eb6("🏆 当前排名：" + _62ff004289d1);
      if (_141045242e5d) _59d5a2475eb6("📆 累计天数：" + _141045242e5d);
      if (_9463267fd0d7) _59d5a2475eb6("🏅 签到等级：LV." + _9463267fd0d7);
      if (_ce10e4535160) _59d5a2475eb6("💰 最近奖励：" + _ce10e4535160);
      callback([_4f67e7bbc8ab ? "ℹ️ 今日已签到" : _6117a9b31590 ? "✅ 签到成功" : "⚠️ 签到异常", _62ff004289d1 ? "🏆 排名 " + rank : "", _141045242e5d ? "📆 累计 " + _141045242e5d + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _824bbe7b167d(ctx, callback) {
  const _afb5b8297b17 = Object.assign({}, ctx.headers);
  _afb5b8297b17.Referer = _96711cd3e320(_9ae5a556d80a + "?id=" + _19d92d2c24ab);
  _afb5b8297b17[_e55045d1c097(["X", "-", "Requested", "-", "With"])] = _e55045d1c097(["XML", "Http", "Request"]);
  _afb5b8297b17.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _8e7694675d46 = _96711cd3e320(_9ae5a556d80a + "?id=" + _19d92d2c24ab + ":draw");
  const _0ae7cfcd10fe = ["🎰 幸运抽奖"];
  const _2148cbf3f432 = guard => {
    if (guard <= 0) { _0ae7cfcd10fe.forEach(_59d5a2475eb6); return callback(_0ae7cfcd10fe.join("\n")); }
    _d394beb485ca({ url: _8e7694675d46 + "?drawnumber=1&inajax=1", _afb5b8297b17 }, (error, response, _a9ba9f106a32) => {
      let _aa7d11853a6f = {};
      try { _aa7d11853a6f = JSON.parse(_a9ba9f106a32); } catch (ignored) {}
      const _db2c7fb8a5fd = String((_aa7d11853a6f.data || {})["2"] || "");
      if (error || _aa7d11853a6f.result !== "succeed" || _db2c7fb8a5fd.indexOf("抽奖券") < 0) {
        _0ae7cfcd10fe.push("ℹ️ " + (error || _aa7d11853a6f.msg || "没有可用抽奖券"));
        _0ae7cfcd10fe.forEach(_59d5a2475eb6);
        return callback(_0ae7cfcd10fe.join("\n"));
      }
      _d394beb485ca({ url: _8e7694675d46 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _afb5b8297b17 }, (error2, response2, raw) => {
        let _7a84907bbcc6 = {};
        try { _7a84907bbcc6 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _7a84907bbcc6.result !== "succeed") {
          _0ae7cfcd10fe.push("⚠️ " + (error2 || _7a84907bbcc6.msg || "抽奖失败"));
          _0ae7cfcd10fe.forEach(_59d5a2475eb6);
          return callback(_0ae7cfcd10fe.join("\n"));
        }
        const _4394ec63a84d = (((_7a84907bbcc6.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _0a6e50fa0043 = String((_7a84907bbcc6.data || {}).ticketnumber || "0");
        const _434c9c1cfbf2 = String((_7a84907bbcc6.data || {}).creditnumber || "");
        _0ae7cfcd10fe.push("🎁 第 " + _0ae7cfcd10fe.length + " 次：" + (_4394ec63a84d.join("、") || _7a84907bbcc6.msg || "成功"));
        _0ae7cfcd10fe.push("🎟️ 剩余抽奖券：" + _0a6e50fa0043 + (_434c9c1cfbf2 ? "  💰 星币：" + credit : ""));
        if (_0a6e50fa0043 === "0") { _0ae7cfcd10fe.forEach(_59d5a2475eb6); return callback(_0ae7cfcd10fe.join("\n")); }
        _2148cbf3f432(guard - 1);
      });
    });
  };
  _2148cbf3f432(10);
}
function _368ad1120c3a(ctx, callback) {
  const _afb5b8297b17 = Object.assign({}, ctx.headers);
  _afb5b8297b17.Referer = _96711cd3e320(_9ae5a556d80a + "?id=" + _553b9b7cceaf);
  _afb5b8297b17[_e55045d1c097(["X", "-", "Requested", "-", "With"])] = _e55045d1c097(["XML", "Http", "Request"]);
  const _4548a9bb37f8 = ["🌾 农场与福利"];
  const _982a4a58fdbc = query => _96711cd3e320(_9ae5a556d80a + "?id=" + _553b9b7cceaf + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _62c076aa8c78 = [
    ["每日免费领取", _e55045d1c097(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _e55045d1c097(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _e1295f65c390 = 1; _e1295f65c390 <= 8; _e1295f65c390 += 1) _62c076aa8c78.push(["地块 " + _e1295f65c390, _e55045d1c097(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _e1295f65c390]);
  const _25668f65ad47 = _e1295f65c390 => {
    if (_e1295f65c390 >= _62c076aa8c78.length) { _4548a9bb37f8.forEach(_59d5a2475eb6); return callback(_4548a9bb37f8.join("\n")); }
    const _91551cd76bd2 = _62c076aa8c78[_e1295f65c390];
    _d394beb485ca({ url: _982a4a58fdbc(_91551cd76bd2[1]), _afb5b8297b17 }, (error, response, _a9ba9f106a32) => {
      const _0b1bdd8fbf45 = _0081b9410de1(_a9ba9f106a32)[0] || _327e364458f9(_5f6152bf4db9(_a9ba9f106a32), 80);
      const _ed7e832cee53 = _cb5ff467d76f(_0b1bdd8fbf45, ["成功", "完成", "可领取"]) ? "✅" : _cb5ff467d76f(_0b1bdd8fbf45, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _4548a9bb37f8.push(_ed7e832cee53 + " " + _91551cd76bd2[0] + "：" + (error || _0b1bdd8fbf45 || "无返回"));
      const _069002aba789 = _3e6d83c8c15c(_91551cd76bd2[1], "jfid=", "&");
      if (_069002aba789 && _cb5ff467d76f(_a9ba9f106a32, ["已枯萎", "清除"])) {
        return _d394beb485ca({ url: _982a4a58fdbc(_e55045d1c097(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _069002aba789), _afb5b8297b17 }, (error2, response2, cleared) => {
          _4548a9bb37f8.push((_cb5ff467d76f(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _069002aba789);
          _d394beb485ca({ url: _982a4a58fdbc(_e55045d1c097(["do=", "plant", "seed", "&seed=1&jfid="]) + _069002aba789 + "&timestamp=" + Math.floor(Date.now() / 1000)), _afb5b8297b17 }, (error3, response3, planted) => {
            _4548a9bb37f8.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _069002aba789 + "：" + (_0081b9410de1(planted)[0] || "无返回"));
            _25668f65ad47(_e1295f65c390 + 1);
          });
        });
      }
      _25668f65ad47(_e1295f65c390 + 1);
    });
  };
  _d394beb485ca({ url: _982a4a58fdbc(_e55045d1c097(["do=", "normal", "&ac=", "kuo", "zhan"])), _afb5b8297b17 }, (error, response, _a9ba9f106a32) => {
    _4548a9bb37f8.push((_cb5ff467d76f(_0081b9410de1(_a9ba9f106a32)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _0081b9410de1(_a9ba9f106a32)[0] || "无返回"));
    _25668f65ad47(0);
  });
}
function _671043fda1dd() {
  _59d5a2475eb6("🧪 调试模式：开启");
  _59d5a2475eb6("🚀 论坛任务开始");
  _59d5a2475eb6("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _59d5a2475eb6("💾 存储键：" + _0e7726b570db + "，登录状态长度：" + _98d29a14e7d3("session").length);
  _2fbd45591d33((error, ctx) => {
    if (error === "missing") return _ed40bdcb7d12(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _ed40bdcb7d12(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _ed40bdcb7d12(false, "论坛任务失败", String(error));
    _59d5a2475eb6("🔐 登录状态有效");
    _38a94a801bc5(ctx, one => _824bbe7b167d(ctx, two => _368ad1120c3a(ctx, three => _ed40bdcb7d12(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_59d5a2475eb6("🧪 调试模式：开启");
_59d5a2475eb6("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _84f82e09d695 = typeof $request !== "undefined";
if (_84f82e09d695) _ee264280074b();
else _671043fda1dd();

})();
