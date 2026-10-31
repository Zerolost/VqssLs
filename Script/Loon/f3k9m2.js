/*6dbd4c67347d*/
(function(){
const _6d9963992602 = typeof $argument === "object" && $argument ? $argument : {};
const _b7248b0cc667 = $persistentStore;
const _218fb8c096ee = "f3k9m2_store";
const _69cd1eed0e5e = true;
const _d34e3156adf1 = { value: false };
const _a8b3eafd88cd = [];
const _e47e6ea5f54f = values => values.join("");

function _44e666a110ee() {
  try { return JSON.parse(_b7248b0cc667.read(_218fb8c096ee) || "{}") || {}; }
  catch (error) { return {}; }
}
function _d287e828487c(_682f9d8f3ee1) { return _b7248b0cc667.write(JSON.stringify(_682f9d8f3ee1), _218fb8c096ee); }
function _06bc2aa6a701(name) { return String(_44e666a110ee()[name] || ""); }
function _372886f4f7d2(name, value) {
  const _682f9d8f3ee1 = _44e666a110ee();
  if (value == null) delete _682f9d8f3ee1[name];
  else _682f9d8f3ee1[name] = String(value);
  return _d287e828487c(_682f9d8f3ee1);
}
function _a813a1321bd7(_056aed0fe8c2, name) {
  const _6b300cd8fa82 = Object.keys(_056aed0fe8c2 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _6b300cd8fa82 ? String(_056aed0fe8c2[_6b300cd8fa82] || "") : "";
}
function _f44b36e07b67(_a59116e683eb) {
  const _f7027044ec5e = String(_a59116e683eb);
  _a8b3eafd88cd.push(_f7027044ec5e);
  if (_69cd1eed0e5e) console.log(_f7027044ec5e);
}
function _8af04c39821f(value, size) {
  const _f7027044ec5e = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _f7027044ec5e.length > size ? _f7027044ec5e.slice(0, size) + "..." : _f7027044ec5e;
}
function _b122ff74dc43(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _69282dce1223(value, _ff5344be3480, _88a5a95b7598) {
  const _f7027044ec5e = String(value || "");
  const _529828167f14 = _f7027044ec5e.indexOf(_ff5344be3480);
  if (_529828167f14 < 0) return "";
  const _bfa38f1bab37 = _529828167f14 + _ff5344be3480.length;
  const _8c81ff557146 = _f7027044ec5e.indexOf(_88a5a95b7598, _bfa38f1bab37);
  return _f7027044ec5e.slice(_bfa38f1bab37, _8c81ff557146 < 0 ? _bfa38f1bab37 + 16 : _8c81ff557146).trim();
}
function _61568c46e9e7(value) { return _69282dce1223(value, _e47e6ea5f54f(["form", "hash", "="]), "&"); }
function _8351a9621615(value) {
  const _1c912ce0f340 = _e47e6ea5f54f(["layer", ".msg('"]);
  const _f7027044ec5e = String(value || "");
  const _ff5344be3480 = _f7027044ec5e.indexOf(_1c912ce0f340);
  if (_ff5344be3480 < 0) return [];
  const _bfa38f1bab37 = _ff5344be3480 + _1c912ce0f340.length;
  const _88a5a95b7598 = _f7027044ec5e.indexOf("')", _bfa38f1bab37);
  return _88a5a95b7598 < 0 ? [] : [_f7027044ec5e.slice(_bfa38f1bab37, _88a5a95b7598)];
}
function _1cccbbd58763(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _748057e6c777(ok, title, body) {
  if (_d34e3156adf1.value) return;
  _d34e3156adf1.value = true;
  _f44b36e07b67("━━━━━━━━ 执行结束 ━━━━━━━━");
  _f44b36e07b67(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _6933f4b22811 = typeof $notification !== "undefined";
  if (_6d9963992602.notify_enabled !== false && _6933f4b22811) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _8af04c39821f(body || _a8b3eafd88cd.join("\n"), 700));
  const _2eb776d6adac = typeof $done === "function";
  if (_2eb776d6adac) $done({});
}
function _7e3fd21331a4(options, callback, attempt) {
  const _741f74e82c95 = String(options.method || "GET").toLowerCase();
  const _082b816e82ca = $httpClient[_741f74e82c95] || $httpClient.get;
  const _99211a4cc9d7 = {};
  _99211a4cc9d7["url"] = String(options.url || "");
  _99211a4cc9d7["headers"] = options.headers || {};
  _99211a4cc9d7["body"] = options.body || "";
  _99211a4cc9d7["timeout"] = options.timeout || 20000;
  _99211a4cc9d7["auto-redirect"] = true;
  _99211a4cc9d7["auto-cookie"] = true;
  _99211a4cc9d7["alpn"] = "h2";
  _f44b36e07b67("🌐 请求：" + _99211a4cc9d7["url"]);
  _082b816e82ca(_99211a4cc9d7, (error, response, _682f9d8f3ee1) => {
    const _f7027044ec5e = String(error || "");
    if (_f7027044ec5e && (attempt || 0) < 2 && (_f7027044ec5e.indexOf("closed") >= 0 || _f7027044ec5e.indexOf("timed out") >= 0)) {
      _f44b36e07b67("🔁 连接中断，正在重试");
      return _7e3fd21331a4(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_682f9d8f3ee1 || ""));
  });
}
function _f9098e1594e3(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _fef6b93644eb = _e47e6ea5f54f(["ht", "tps", "://"]);
const _bcc43284cfd6 = [121, 99, 111, 111, 46, 110, 101, 116].map(_0d78860de6b6 => String.fromCharCode(_0d78860de6b6)).join("");
function _da54f96ed75c(path) { return _fef6b93644eb + _bcc43284cfd6 + String.fromCharCode(47) + String(path || ""); }
const _5f6f47fe78a4 = _e47e6ea5f54f(["plu", "gin", ".", "php"]);
const _602a964fc51d = _e47e6ea5f54f(["k", "_", "mi", "sign"]);
const _ec74aeef963f = _e47e6ea5f54f(["view", "ui", "_", "lottery"]);
const _6c0ace6d2026 = _e47e6ea5f54f(["jn", "farm"]);

function _420d1013c97a(_056aed0fe8c2, name) {
  const _61af4ffa9cb9 = _a813a1321bd7(_056aed0fe8c2, name);
  return Array.isArray(_61af4ffa9cb9) ? _61af4ffa9cb9.join(",") : String(_61af4ffa9cb9 || "");
}
function _9f17ef33f94e(_517a3547972a, extra) {
  const _006a5c5e6d7a = {};
  [_517a3547972a, extra].join("; ").split(";").forEach(item => {
    const _f7027044ec5e = item.trim();
    const _efcad6b6fd1c = _f7027044ec5e.indexOf("=");
    if (_efcad6b6fd1c > 0) _006a5c5e6d7a[_f7027044ec5e.slice(0, _efcad6b6fd1c)] = _f7027044ec5e.slice(_efcad6b6fd1c + 1);
  });
  return Object.keys(_006a5c5e6d7a).map(_6b300cd8fa82 => _6b300cd8fa82 + "=" + _006a5c5e6d7a[_6b300cd8fa82]).join("; ");
}
function _e11859aaed89() {
  try {
    const _6d474cdc7e4a = typeof $request !== "undefined" ? $request : {};
    const _8213e5b6ff83 = typeof $response !== "undefined" ? $response : {};
    const _778c96c04d02 = String(_6d474cdc7e4a.url || "");
    const _46e9b16b170b = _420d1013c97a(_6d474cdc7e4a.headers, "Cookie");
    const _3d9788b91bd6 = _420d1013c97a(_8213e5b6ff83.headers, "Set-Cookie");
    const _8c8778b258f0 = _9f17ef33f94e(_46e9b16b170b, "");
    const _a7c0a82ef455 = _8c8778b258f0.split("; ").filter(Boolean);
    const _721f68244e60 = Object.keys(_6d474cdc7e4a.headers || {}).concat(Object.keys(_8213e5b6ff83.headers || {}));
    const _22d6b254d13a = _a7c0a82ef455.some(item => item.indexOf("auth=") >= 0);
    _f44b36e07b67("🧪 调试模式：开启");
    _f44b36e07b67("🍪 登录状态抓取");
    _f44b36e07b67("🌐 页面：" + _8af04c39821f(_778c96c04d02, 180));
    _f44b36e07b67("📋 头名称：" + _721f68244e60.map(item => item.toLowerCase()).join(","));
    _f44b36e07b67("🔑 请求长度：" + _46e9b16b170b.length + "，字段：" + _a7c0a82ef455.length);
    _f44b36e07b67("🏷️ 字段名：" + _a7c0a82ef455.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_22d6b254d13a) {
      _f44b36e07b67("ℹ️ 当前响应没有完整登录状态");
      return _748057e6c777(true, "", "");
    }
    const _576fb7c78bb1 = _06bc2aa6a701("session");
    const _25713c39db96 = Number(_06bc2aa6a701("notified") || 0);
    const _0cd646465c36 = _372886f4f7d2("session", _8c8778b258f0);
    _372886f4f7d2("updated", new Date().toISOString());
    _f44b36e07b67(_576fb7c78bb1 === _8c8778b258f0 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _f44b36e07b67("💾 存储键：" + _218fb8c096ee + "，写入：" + _0cd646465c36 + "，回读长度：" + _06bc2aa6a701("session").length);
    if (_576fb7c78bb1 !== _8c8778b258f0 && Date.now() - _25713c39db96 > 60000) {
      _372886f4f7d2("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _a7c0a82ef455.length + " 项 / " + _8c8778b258f0.length);
    }
    _748057e6c777(true, "", "");
  } catch (error) {
    _f44b36e07b67("❌ 登录状态异常：" + error);
    _748057e6c777(false, "登录状态失败", String(error));
  }
}
function _f94761614334(callback) {
  const _8c8778b258f0 = _06bc2aa6a701("session");
  if (!_8c8778b258f0) return callback("missing");
  const _056aed0fe8c2 = {};
  _056aed0fe8c2[_e47e6ea5f54f(["C", "ookie"])] = _8c8778b258f0;
  _056aed0fe8c2[_e47e6ea5f54f(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _056aed0fe8c2.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _7e3fd21331a4({ url: _da54f96ed75c("forum.php"), _056aed0fe8c2 }, (error, response, _682f9d8f3ee1) => {
    if (error) return callback(error);
    if (_682f9d8f3ee1.indexOf(_e47e6ea5f54f(["action", "=", "logout"])) < 0) return callback("expired");
    const _0d78860de6b6 = _61568c46e9e7(_682f9d8f3ee1);
    if (!_0d78860de6b6) return callback("token");
    callback(null, { _056aed0fe8c2, _0d78860de6b6 });
  });
}
function _eecf73a12cc7(ctx, callback) {
  const _056aed0fe8c2 = Object.assign({}, ctx.headers);
  _056aed0fe8c2.Referer = _da54f96ed75c(_e47e6ea5f54f([_602a964fc51d, "-", "sign", ".", "html"]));
  _056aed0fe8c2[_e47e6ea5f54f(["X", "-", "Requested", "-", "With"])] = _e47e6ea5f54f(["XML", "Http", "Request"]);
  _7e3fd21331a4({ url: _da54f96ed75c(_5f6f47fe78a4 + "?id=" + _602a964fc51d + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _056aed0fe8c2 }, (error, response, _682f9d8f3ee1) => {
    _f44b36e07b67("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _10ba331fd7b2 = _682f9d8f3ee1.indexOf("今日已签") >= 0;
    const _9923b2537f34 = _10ba331fd7b2 || _682f9d8f3ee1.indexOf("<![CDATA[]]>") >= 0;
    _7e3fd21331a4({ url: _da54f96ed75c(_e47e6ea5f54f([_602a964fc51d, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _bfe17c3d2315 = _69282dce1223(page, "签到排名：", " ");
      const _b27ee5efce42 = _69282dce1223(page, 'id="lxtdays" value="', '"');
      const _b6d8023b24ad = _69282dce1223(page, 'id="lxlevel" value="', '"');
      const _1291f29a0ebd = _69282dce1223(page, 'id="lxreward" value="', '"');
      _f44b36e07b67(_10ba331fd7b2 ? "ℹ️ 今日已经签到" : _9923b2537f34 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_bfe17c3d2315) _f44b36e07b67("🏆 当前排名：" + _bfe17c3d2315);
      if (_b27ee5efce42) _f44b36e07b67("📆 累计天数：" + _b27ee5efce42);
      if (_b6d8023b24ad) _f44b36e07b67("🏅 签到等级：LV." + _b6d8023b24ad);
      if (_1291f29a0ebd) _f44b36e07b67("💰 最近奖励：" + _1291f29a0ebd);
      callback([_10ba331fd7b2 ? "ℹ️ 今日已签到" : _9923b2537f34 ? "✅ 签到成功" : "⚠️ 签到异常", _bfe17c3d2315 ? "🏆 排名 " + rank : "", _b27ee5efce42 ? "📆 累计 " + _b27ee5efce42 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _017cb210d089(ctx, callback) {
  const _056aed0fe8c2 = Object.assign({}, ctx.headers);
  _056aed0fe8c2.Referer = _da54f96ed75c(_5f6f47fe78a4 + "?id=" + _ec74aeef963f);
  _056aed0fe8c2[_e47e6ea5f54f(["X", "-", "Requested", "-", "With"])] = _e47e6ea5f54f(["XML", "Http", "Request"]);
  _056aed0fe8c2.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _517a3547972a = _da54f96ed75c(_5f6f47fe78a4 + "?id=" + _ec74aeef963f + ":draw");
  const _e61a4134fa61 = ["🎰 幸运抽奖"];
  const _196b40e6fa97 = guard => {
    if (guard <= 0) { _e61a4134fa61.forEach(_f44b36e07b67); return callback(_e61a4134fa61.join("\n")); }
    _7e3fd21331a4({ url: _517a3547972a + "?drawnumber=1&inajax=1", _056aed0fe8c2 }, (error, response, _682f9d8f3ee1) => {
      let _d31641f7a088 = {};
      try { _d31641f7a088 = JSON.parse(_682f9d8f3ee1); } catch (ignored) {}
      const _70d977a4d8d9 = String((_d31641f7a088.data || {})["2"] || "");
      if (error || _d31641f7a088.result !== "succeed" || _70d977a4d8d9.indexOf("抽奖券") < 0) {
        _e61a4134fa61.push("ℹ️ " + (error || _d31641f7a088.msg || "没有可用抽奖券"));
        _e61a4134fa61.forEach(_f44b36e07b67);
        return callback(_e61a4134fa61.join("\n"));
      }
      _7e3fd21331a4({ url: _517a3547972a + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _056aed0fe8c2 }, (error2, response2, raw) => {
        let _26097ef80609 = {};
        try { _26097ef80609 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _26097ef80609.result !== "succeed") {
          _e61a4134fa61.push("⚠️ " + (error2 || _26097ef80609.msg || "抽奖失败"));
          _e61a4134fa61.forEach(_f44b36e07b67);
          return callback(_e61a4134fa61.join("\n"));
        }
        const _79a50cec0a93 = (((_26097ef80609.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _529828167f14 = String((_26097ef80609.data || {}).ticketnumber || "0");
        const _712874f68717 = String((_26097ef80609.data || {}).creditnumber || "");
        _e61a4134fa61.push("🎁 第 " + _e61a4134fa61.length + " 次：" + (_79a50cec0a93.join("、") || _26097ef80609.msg || "成功"));
        _e61a4134fa61.push("🎟️ 剩余抽奖券：" + _529828167f14 + (_712874f68717 ? "  💰 星币：" + credit : ""));
        if (_529828167f14 === "0") { _e61a4134fa61.forEach(_f44b36e07b67); return callback(_e61a4134fa61.join("\n")); }
        _196b40e6fa97(guard - 1);
      });
    });
  };
  _196b40e6fa97(10);
}
function _df2d789d573a(ctx, callback) {
  const _056aed0fe8c2 = Object.assign({}, ctx.headers);
  _056aed0fe8c2.Referer = _da54f96ed75c(_5f6f47fe78a4 + "?id=" + _6c0ace6d2026);
  _056aed0fe8c2[_e47e6ea5f54f(["X", "-", "Requested", "-", "With"])] = _e47e6ea5f54f(["XML", "Http", "Request"]);
  const _b7671a8b62b5 = ["🌾 农场与福利"];
  const _c291dbff33bc = query => _da54f96ed75c(_5f6f47fe78a4 + "?id=" + _6c0ace6d2026 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _27d1ddd51a43 = [
    ["每日免费领取", _e47e6ea5f54f(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _e47e6ea5f54f(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _ff6530605c51 = 1; _ff6530605c51 <= 8; _ff6530605c51 += 1) _27d1ddd51a43.push(["地块 " + _ff6530605c51, _e47e6ea5f54f(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _ff6530605c51]);
  const _c91994f8641e = _ff6530605c51 => {
    if (_ff6530605c51 >= _27d1ddd51a43.length) { _b7671a8b62b5.forEach(_f44b36e07b67); return callback(_b7671a8b62b5.join("\n")); }
    const _975fff5e66e2 = _27d1ddd51a43[_ff6530605c51];
    _7e3fd21331a4({ url: _c291dbff33bc(_975fff5e66e2[1]), _056aed0fe8c2 }, (error, response, _682f9d8f3ee1) => {
      const _a59116e683eb = _8351a9621615(_682f9d8f3ee1)[0] || _8af04c39821f(_b122ff74dc43(_682f9d8f3ee1), 80);
      const _a7a88c6f6bac = _1cccbbd58763(_a59116e683eb, ["成功", "完成", "可领取"]) ? "✅" : _1cccbbd58763(_a59116e683eb, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _b7671a8b62b5.push(_a7a88c6f6bac + " " + _975fff5e66e2[0] + "：" + (error || _a59116e683eb || "无返回"));
      const _1a3260b8a861 = _69282dce1223(_975fff5e66e2[1], "jfid=", "&");
      if (_1a3260b8a861 && _1cccbbd58763(_682f9d8f3ee1, ["已枯萎", "清除"])) {
        return _7e3fd21331a4({ url: _c291dbff33bc(_e47e6ea5f54f(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _1a3260b8a861), _056aed0fe8c2 }, (error2, response2, cleared) => {
          _b7671a8b62b5.push((_1cccbbd58763(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _1a3260b8a861);
          _7e3fd21331a4({ url: _c291dbff33bc(_e47e6ea5f54f(["do=", "plant", "seed", "&seed=1&jfid="]) + _1a3260b8a861 + "&timestamp=" + Math.floor(Date.now() / 1000)), _056aed0fe8c2 }, (error3, response3, planted) => {
            _b7671a8b62b5.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _1a3260b8a861 + "：" + (_8351a9621615(planted)[0] || "无返回"));
            _c91994f8641e(_ff6530605c51 + 1);
          });
        });
      }
      _c91994f8641e(_ff6530605c51 + 1);
    });
  };
  _7e3fd21331a4({ url: _c291dbff33bc(_e47e6ea5f54f(["do=", "normal", "&ac=", "kuo", "zhan"])), _056aed0fe8c2 }, (error, response, _682f9d8f3ee1) => {
    _b7671a8b62b5.push((_1cccbbd58763(_8351a9621615(_682f9d8f3ee1)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _8351a9621615(_682f9d8f3ee1)[0] || "无返回"));
    _c91994f8641e(0);
  });
}
function _f43e47f181f7() {
  _f44b36e07b67("🧪 调试模式：开启");
  _f44b36e07b67("🚀 论坛任务开始");
  _f44b36e07b67("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _f44b36e07b67("💾 存储键：" + _218fb8c096ee + "，登录状态长度：" + _06bc2aa6a701("session").length);
  _f94761614334((error, ctx) => {
    if (error === "missing") return _748057e6c777(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _748057e6c777(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _748057e6c777(false, "论坛任务失败", String(error));
    _f44b36e07b67("🔐 登录状态有效");
    _eecf73a12cc7(ctx, one => _017cb210d089(ctx, two => _df2d789d573a(ctx, three => _748057e6c777(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_f44b36e07b67("🧪 调试模式：开启");
_f44b36e07b67("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _3aa9d3f04826 = typeof $request !== "undefined";
if (_3aa9d3f04826) _e11859aaed89();
else _f43e47f181f7();

})();
