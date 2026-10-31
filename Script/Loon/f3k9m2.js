/*b094968cfa08*/
(function(){
const _e97bdb809767 = typeof $argument === "object" && $argument ? $argument : {};
const _7c91629fdb23 = $persistentStore;
const _34a9a3428de3 = "f3k9m2_store";
const _6e0d24003a77 = true;
const _234a37d0e495 = { value: false };
const _44e09fade787 = [];
const _2639dd1ab552 = values => values.join("");

function _9f985bf200c4() {
  try { return JSON.parse(_7c91629fdb23.read(_34a9a3428de3) || "{}") || {}; }
  catch (error) { return {}; }
}
function _8efd04d452c3(_2161c3b593e1) { return _7c91629fdb23.write(JSON.stringify(_2161c3b593e1), _34a9a3428de3); }
function _ce062d2cd91b(name) { return String(_9f985bf200c4()[name] || ""); }
function _773fb35357b3(name, value) {
  const _2161c3b593e1 = _9f985bf200c4();
  if (value == null) delete _2161c3b593e1[name];
  else _2161c3b593e1[name] = String(value);
  return _8efd04d452c3(_2161c3b593e1);
}
function _18849dd4e32d(_fc21e79d42b1, name) {
  const _88e38c3392e7 = Object.keys(_fc21e79d42b1 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _88e38c3392e7 ? String(_fc21e79d42b1[_88e38c3392e7] || "") : "";
}
function _dcf604642967(_168f9b8d64c0) {
  const _d357ad1843dd = String(_168f9b8d64c0);
  _44e09fade787.push(_d357ad1843dd);
  if (_6e0d24003a77) console.log(_d357ad1843dd);
}
function _376c78d19375(value, size) {
  const _d357ad1843dd = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _d357ad1843dd.length > size ? _d357ad1843dd.slice(0, size) + "..." : _d357ad1843dd;
}
function _e7b6cf97451e(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _7102d33c4171(value, _1c461df97296, _5c3c00bf99dd) {
  const _d357ad1843dd = String(value || "");
  const _d22f4df1bf39 = _d357ad1843dd.indexOf(_1c461df97296);
  if (_d22f4df1bf39 < 0) return "";
  const _7cb15bfff8c7 = _d22f4df1bf39 + _1c461df97296.length;
  const _748f9ea8839f = _d357ad1843dd.indexOf(_5c3c00bf99dd, _7cb15bfff8c7);
  return _d357ad1843dd.slice(_7cb15bfff8c7, _748f9ea8839f < 0 ? _7cb15bfff8c7 + 16 : _748f9ea8839f).trim();
}
function _1f1bef695949(value) { return _7102d33c4171(value, _2639dd1ab552(["form", "hash", "="]), "&"); }
function _cb7e2ae42c0b(value) {
  const _c29c0c36c541 = _2639dd1ab552(["layer", ".msg('"]);
  const _d357ad1843dd = String(value || "");
  const _1c461df97296 = _d357ad1843dd.indexOf(_c29c0c36c541);
  if (_1c461df97296 < 0) return [];
  const _7cb15bfff8c7 = _1c461df97296 + _c29c0c36c541.length;
  const _5c3c00bf99dd = _d357ad1843dd.indexOf("')", _7cb15bfff8c7);
  return _5c3c00bf99dd < 0 ? [] : [_d357ad1843dd.slice(_7cb15bfff8c7, _5c3c00bf99dd)];
}
function _0e71bb7c08b3(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _be8a4940f723(ok, title, body) {
  if (_234a37d0e495.value) return;
  _234a37d0e495.value = true;
  _dcf604642967("━━━━━━━━ 执行结束 ━━━━━━━━");
  _dcf604642967(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _553175c219c7 = typeof $notification !== "undefined";
  if (_e97bdb809767.notify_enabled !== false && _553175c219c7) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _376c78d19375(body || _44e09fade787.join("\n"), 700));
  const _d54da31908c1 = typeof $done === "function";
  if (_d54da31908c1) $done({});
}
function _e7df08d1dd04(options, callback) {
  const _f5dfc5816e73 = String(options.method || "GET").toLowerCase();
  const _41ea92db55cc = $httpClient[_f5dfc5816e73] || $httpClient.get;
  const _16e0e9db1045 = { _10a3137cc278: options.url, _fc21e79d42b1: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _16e0e9db1045[_2639dd1ab552(["auto", "-", "redirect"])] = true;
  _16e0e9db1045[_2639dd1ab552(["auto", "-", "cookie"])] = true;
  _41ea92db55cc(_16e0e9db1045, (error, response, _2161c3b593e1) => callback(error, response || {}, String(_2161c3b593e1 || "")));
}
function _d1c65289d526(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _00033a4ed623 = _2639dd1ab552(["ht", "tps", "://"]);
const _f9e477c29f8e = [121, 99, 111, 111, 46, 110, 101, 116].map(_35d1df0f41d7 => String.fromCharCode(_35d1df0f41d7)).join("");
function _de7d9b4d681c(path) { return _00033a4ed623 + _f9e477c29f8e + String.fromCharCode(47) + String(path || ""); }
const _46276d5b1d9f = _2639dd1ab552(["plu", "gin", ".", "php"]);
const _1e9962d77923 = _2639dd1ab552(["k", "_", "mi", "sign"]);
const _7e2c59e9d471 = _2639dd1ab552(["view", "ui", "_", "lottery"]);
const _57b76eee5bf2 = _2639dd1ab552(["jn", "farm"]);

function _828a3dcdbb44(_fc21e79d42b1, name) {
  const _b7a8f8ccb3ba = _18849dd4e32d(_fc21e79d42b1, name);
  return Array.isArray(_b7a8f8ccb3ba) ? _b7a8f8ccb3ba.join(",") : String(_b7a8f8ccb3ba || "");
}
function _df102af900bb(_b445266acfb0, extra) {
  const _034cc638f840 = {};
  [_b445266acfb0, extra].join("; ").split(";").forEach(item => {
    const _d357ad1843dd = item.trim();
    const _22e49572eb4f = _d357ad1843dd.indexOf("=");
    if (_22e49572eb4f > 0) _034cc638f840[_d357ad1843dd.slice(0, _22e49572eb4f)] = _d357ad1843dd.slice(_22e49572eb4f + 1);
  });
  return Object.keys(_034cc638f840).map(_88e38c3392e7 => _88e38c3392e7 + "=" + _034cc638f840[_88e38c3392e7]).join("; ");
}
function _f934d9ecb3a1() {
  try {
    const _3af942e44644 = typeof $request !== "undefined" ? $request : {};
    const _49668c41622a = typeof $response !== "undefined" ? $response : {};
    const _10a3137cc278 = String(_3af942e44644.url || "");
    const _65e3e4a52b92 = _828a3dcdbb44(_3af942e44644.headers, "Cookie");
    const _d4a7f85b554e = _828a3dcdbb44(_49668c41622a.headers, "Set-Cookie");
    const _7b1304721f6b = _df102af900bb(_65e3e4a52b92, "");
    const _eb67553d4c36 = _7b1304721f6b.split("; ").filter(Boolean);
    const _a738e9b716c1 = Object.keys(_3af942e44644.headers || {}).concat(Object.keys(_49668c41622a.headers || {}));
    const _63bb705e2525 = _eb67553d4c36.some(item => item.indexOf("auth=") >= 0);
    _dcf604642967("🧪 调试模式：开启");
    _dcf604642967("🍪 登录状态抓取");
    _dcf604642967("🌐 页面：" + _376c78d19375(_10a3137cc278, 180));
    _dcf604642967("📋 头名称：" + _a738e9b716c1.map(item => item.toLowerCase()).join(","));
    _dcf604642967("🔑 请求长度：" + _65e3e4a52b92.length + "，字段：" + _eb67553d4c36.length);
    _dcf604642967("🏷️ 字段名：" + _eb67553d4c36.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_63bb705e2525) {
      _dcf604642967("ℹ️ 当前响应没有完整登录状态");
      return _be8a4940f723(true, "", "");
    }
    const _0d9465b9c48f = _ce062d2cd91b("session");
    const _4b4f4d4183e4 = Number(_ce062d2cd91b("notified") || 0);
    const _d0a989312c66 = _773fb35357b3("session", _7b1304721f6b);
    _773fb35357b3("updated", new Date().toISOString());
    _dcf604642967(_0d9465b9c48f === _7b1304721f6b ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _dcf604642967("💾 存储键：" + _34a9a3428de3 + "，写入：" + _d0a989312c66 + "，回读长度：" + _ce062d2cd91b("session").length);
    if (_0d9465b9c48f !== _7b1304721f6b && Date.now() - _4b4f4d4183e4 > 60000) {
      _773fb35357b3("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _eb67553d4c36.length + " 项 / " + _7b1304721f6b.length);
    }
    _be8a4940f723(true, "", "");
  } catch (error) {
    _dcf604642967("❌ 登录状态异常：" + error);
    _be8a4940f723(false, "登录状态失败", String(error));
  }
}
function _f7a885f5ffe3(callback) {
  const _7b1304721f6b = _ce062d2cd91b("session");
  if (!_7b1304721f6b) return callback("missing");
  const _fc21e79d42b1 = {};
  _fc21e79d42b1[_2639dd1ab552(["C", "ookie"])] = _7b1304721f6b;
  _fc21e79d42b1[_2639dd1ab552(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _fc21e79d42b1.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _e7df08d1dd04({ _10a3137cc278: _de7d9b4d681c(""), _fc21e79d42b1 }, (error, response, _2161c3b593e1) => {
    if (error) return callback(error);
    if (_2161c3b593e1.indexOf(_2639dd1ab552(["action", "=", "logout"])) < 0) return callback("expired");
    const _35d1df0f41d7 = _1f1bef695949(_2161c3b593e1);
    if (!_35d1df0f41d7) return callback("token");
    callback(null, { _fc21e79d42b1, _35d1df0f41d7 });
  });
}
function _ac82590632d9(ctx, callback) {
  const _fc21e79d42b1 = Object.assign({}, ctx.headers);
  _fc21e79d42b1.Referer = _de7d9b4d681c(_2639dd1ab552([_1e9962d77923, "-", "sign", ".", "html"]));
  _fc21e79d42b1[_2639dd1ab552(["X", "-", "Requested", "-", "With"])] = _2639dd1ab552(["XML", "Http", "Request"]);
  _e7df08d1dd04({ _10a3137cc278: _de7d9b4d681c(_46276d5b1d9f + "?id=" + _1e9962d77923 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _fc21e79d42b1 }, (error, response, _2161c3b593e1) => {
    _dcf604642967("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _3a3a65a4d96d = _2161c3b593e1.indexOf("今日已签") >= 0;
    const _4fdf3a864816 = _3a3a65a4d96d || _2161c3b593e1.indexOf("<![CDATA[]]>") >= 0;
    _e7df08d1dd04({ _10a3137cc278: _de7d9b4d681c(_2639dd1ab552([_1e9962d77923, "-", "sign", ".", "html"])), _fc21e79d42b1: ctx.headers }, (error2, response2, page) => {
      const _c795cc7e9d25 = _7102d33c4171(page, "签到排名：", " ");
      const _f0980f7c0a14 = _7102d33c4171(page, 'id="lxtdays" value="', '"');
      const _15c8fbea434f = _7102d33c4171(page, 'id="lxlevel" value="', '"');
      const _a98dcd628105 = _7102d33c4171(page, 'id="lxreward" value="', '"');
      _dcf604642967(_3a3a65a4d96d ? "ℹ️ 今日已经签到" : _4fdf3a864816 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_c795cc7e9d25) _dcf604642967("🏆 当前排名：" + _c795cc7e9d25);
      if (_f0980f7c0a14) _dcf604642967("📆 累计天数：" + _f0980f7c0a14);
      if (_15c8fbea434f) _dcf604642967("🏅 签到等级：LV." + _15c8fbea434f);
      if (_a98dcd628105) _dcf604642967("💰 最近奖励：" + _a98dcd628105);
      callback([_3a3a65a4d96d ? "ℹ️ 今日已签到" : _4fdf3a864816 ? "✅ 签到成功" : "⚠️ 签到异常", _c795cc7e9d25 ? "🏆 排名 " + _c795cc7e9d25 : "", _f0980f7c0a14 ? "📆 累计 " + _f0980f7c0a14 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _a9e1a0287a90(ctx, callback) {
  const _fc21e79d42b1 = Object.assign({}, ctx.headers);
  _fc21e79d42b1.Referer = _de7d9b4d681c(_46276d5b1d9f + "?id=" + _7e2c59e9d471);
  _fc21e79d42b1[_2639dd1ab552(["X", "-", "Requested", "-", "With"])] = _2639dd1ab552(["XML", "Http", "Request"]);
  _fc21e79d42b1.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _b445266acfb0 = _de7d9b4d681c(_46276d5b1d9f + "?id=" + _7e2c59e9d471 + ":draw");
  const _9934768d7546 = ["🎰 幸运抽奖"];
  const _7509052f016c = guard => {
    if (guard <= 0) { _9934768d7546.forEach(_dcf604642967); return callback(_9934768d7546.join("\n")); }
    _e7df08d1dd04({ _10a3137cc278: _b445266acfb0 + "?drawnumber=1&inajax=1", _fc21e79d42b1 }, (error, response, _2161c3b593e1) => {
      let _e8f333a2c14e = {};
      try { _e8f333a2c14e = JSON.parse(_2161c3b593e1); } catch (ignored) {}
      const _8a7fe6c084fe = String((_e8f333a2c14e.data || {})["2"] || "");
      if (error || _e8f333a2c14e.result !== "succeed" || _8a7fe6c084fe.indexOf("抽奖券") < 0) {
        _9934768d7546.push("ℹ️ " + (error || _e8f333a2c14e.msg || "没有可用抽奖券"));
        _9934768d7546.forEach(_dcf604642967);
        return callback(_9934768d7546.join("\n"));
      }
      _e7df08d1dd04({ _10a3137cc278: _b445266acfb0 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _fc21e79d42b1 }, (error2, response2, raw) => {
        let _f8d5bf02cfb2 = {};
        try { _f8d5bf02cfb2 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _f8d5bf02cfb2.result !== "succeed") {
          _9934768d7546.push("⚠️ " + (error2 || _f8d5bf02cfb2.msg || "抽奖失败"));
          _9934768d7546.forEach(_dcf604642967);
          return callback(_9934768d7546.join("\n"));
        }
        const _3d31a09b368f = (((_f8d5bf02cfb2.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _d22f4df1bf39 = String((_f8d5bf02cfb2.data || {}).ticketnumber || "0");
        const _94c6c2051af5 = String((_f8d5bf02cfb2.data || {}).creditnumber || "");
        _9934768d7546.push("🎁 第 " + _9934768d7546.length + " 次：" + (_3d31a09b368f.join("、") || _f8d5bf02cfb2.msg || "成功"));
        _9934768d7546.push("🎟️ 剩余抽奖券：" + _d22f4df1bf39 + (_94c6c2051af5 ? "  💰 星币：" + _94c6c2051af5 : ""));
        if (_d22f4df1bf39 === "0") { _9934768d7546.forEach(_dcf604642967); return callback(_9934768d7546.join("\n")); }
        _7509052f016c(guard - 1);
      });
    });
  };
  _7509052f016c(10);
}
function _936cec44de11(ctx, callback) {
  const _fc21e79d42b1 = Object.assign({}, ctx.headers);
  _fc21e79d42b1.Referer = _de7d9b4d681c(_46276d5b1d9f + "?id=" + _57b76eee5bf2);
  _fc21e79d42b1[_2639dd1ab552(["X", "-", "Requested", "-", "With"])] = _2639dd1ab552(["XML", "Http", "Request"]);
  const _35703688769c = ["🌾 农场与福利"];
  const _b08e0d72b39b = query => _de7d9b4d681c(_46276d5b1d9f + "?id=" + _57b76eee5bf2 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _ca31c60b4a3b = [
    ["每日免费领取", _2639dd1ab552(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _2639dd1ab552(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _e6a5d060e6cf = 1; _e6a5d060e6cf <= 8; _e6a5d060e6cf += 1) _ca31c60b4a3b.push(["地块 " + _e6a5d060e6cf, _2639dd1ab552(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _e6a5d060e6cf]);
  const _9a357bcb40c6 = _e6a5d060e6cf => {
    if (_e6a5d060e6cf >= _ca31c60b4a3b.length) { _35703688769c.forEach(_dcf604642967); return callback(_35703688769c.join("\n")); }
    const _08c71ad25c39 = _ca31c60b4a3b[_e6a5d060e6cf];
    _e7df08d1dd04({ _10a3137cc278: _b08e0d72b39b(_08c71ad25c39[1]), _fc21e79d42b1 }, (error, response, _2161c3b593e1) => {
      const _168f9b8d64c0 = _cb7e2ae42c0b(_2161c3b593e1)[0] || _376c78d19375(_e7b6cf97451e(_2161c3b593e1), 80);
      const _4c6b4368de25 = _0e71bb7c08b3(_168f9b8d64c0, ["成功", "完成", "可领取"]) ? "✅" : _0e71bb7c08b3(_168f9b8d64c0, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _35703688769c.push(_4c6b4368de25 + " " + _08c71ad25c39[0] + "：" + (error || _168f9b8d64c0 || "无返回"));
      const _c757e138f6f9 = _7102d33c4171(_08c71ad25c39[1], "jfid=", "&");
      if (_c757e138f6f9 && _0e71bb7c08b3(_2161c3b593e1, ["已枯萎", "清除"])) {
        return _e7df08d1dd04({ _10a3137cc278: _b08e0d72b39b(_2639dd1ab552(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _c757e138f6f9), _fc21e79d42b1 }, (error2, response2, cleared) => {
          _35703688769c.push((_0e71bb7c08b3(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _c757e138f6f9);
          _e7df08d1dd04({ _10a3137cc278: _b08e0d72b39b(_2639dd1ab552(["do=", "plant", "seed", "&seed=1&jfid="]) + _c757e138f6f9 + "&timestamp=" + Math.floor(Date.now() / 1000)), _fc21e79d42b1 }, (error3, response3, planted) => {
            _35703688769c.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _c757e138f6f9 + "：" + (_cb7e2ae42c0b(planted)[0] || "无返回"));
            _9a357bcb40c6(_e6a5d060e6cf + 1);
          });
        });
      }
      _9a357bcb40c6(_e6a5d060e6cf + 1);
    });
  };
  _e7df08d1dd04({ _10a3137cc278: _b08e0d72b39b(_2639dd1ab552(["do=", "normal", "&ac=", "kuo", "zhan"])), _fc21e79d42b1 }, (error, response, _2161c3b593e1) => {
    _35703688769c.push((_0e71bb7c08b3(_cb7e2ae42c0b(_2161c3b593e1)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _cb7e2ae42c0b(_2161c3b593e1)[0] || "无返回"));
    _9a357bcb40c6(0);
  });
}
function _665b49829649() {
  _dcf604642967("🧪 调试模式：开启");
  _dcf604642967("🚀 论坛任务开始");
  _dcf604642967("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _dcf604642967("💾 存储键：" + _34a9a3428de3 + "，登录状态长度：" + _ce062d2cd91b("session").length);
  _f7a885f5ffe3((error, ctx) => {
    if (error === "missing") return _be8a4940f723(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _be8a4940f723(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _be8a4940f723(false, "论坛任务失败", String(error));
    _dcf604642967("🔐 登录状态有效");
    _ac82590632d9(ctx, one => _a9e1a0287a90(ctx, two => _936cec44de11(ctx, three => _be8a4940f723(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_dcf604642967("🧪 调试模式：开启");
_dcf604642967("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _e4cb49f442a1 = typeof $request !== "undefined";
if (_e4cb49f442a1) _f934d9ecb3a1();
else _665b49829649();

})();
