/*8126a48f2b61*/
(function(){
const _209927ef5bdc = typeof $argument === "object" && $argument ? $argument : {};
const _dc036145efca = $persistentStore;
const _da490563b028 = "f3k9m2_store";
const _5e9198a20708 = true;
const _8ba3273b2dcc = { value: false };
const _a7c8a4b46c4c = [];
const _a123441999bb = values => values.join("");

function _bcc91ff752e3() {
  try { return JSON.parse(_dc036145efca.read(_da490563b028) || "{}") || {}; }
  catch (error) { return {}; }
}
function _be545a51fd0d(_cf6ae15fccee) { return _dc036145efca.write(JSON.stringify(_cf6ae15fccee), _da490563b028); }
function _95823a29d9c9(name) { return String(_bcc91ff752e3()[name] || ""); }
function _507681024991(name, value) {
  const _cf6ae15fccee = _bcc91ff752e3();
  if (value == null) delete _cf6ae15fccee[name];
  else _cf6ae15fccee[name] = String(value);
  return _be545a51fd0d(_cf6ae15fccee);
}
function _c7d78cafa8a7(_04627959da08, name) {
  const _8e24f5bbeed6 = Object.keys(_04627959da08 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _8e24f5bbeed6 ? String(_04627959da08[_8e24f5bbeed6] || "") : "";
}
function _0e0cd041a60b(_2b9acf63bede) {
  const _36246f643d22 = String(_2b9acf63bede);
  _a7c8a4b46c4c.push(_36246f643d22);
  if (_5e9198a20708) console.log(_36246f643d22);
}
function _0632a007a973(value, size) {
  const _36246f643d22 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _36246f643d22.length > size ? _36246f643d22.slice(0, size) + "..." : _36246f643d22;
}
function _18e005c2ffd0(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _8f908be2313c(value, _18cb332b0ead, _39080fcb6978) {
  const _36246f643d22 = String(value || "");
  const _be2676d652eb = _36246f643d22.indexOf(_18cb332b0ead);
  if (_be2676d652eb < 0) return "";
  const _65af9b344de7 = _be2676d652eb + _18cb332b0ead.length;
  const _b680f318d0b8 = _36246f643d22.indexOf(_39080fcb6978, _65af9b344de7);
  return _36246f643d22.slice(_65af9b344de7, _b680f318d0b8 < 0 ? _65af9b344de7 + 16 : _b680f318d0b8).trim();
}
function _346a7c91c0b3(value) { return _8f908be2313c(value, _a123441999bb(["form", "hash", "="]), "&"); }
function _bfc7a055cb9a(value) {
  const _eb6b18b5bc5b = _a123441999bb(["layer", ".msg('"]);
  const _36246f643d22 = String(value || "");
  const _18cb332b0ead = _36246f643d22.indexOf(_eb6b18b5bc5b);
  if (_18cb332b0ead < 0) return [];
  const _65af9b344de7 = _18cb332b0ead + _eb6b18b5bc5b.length;
  const _39080fcb6978 = _36246f643d22.indexOf("')", _65af9b344de7);
  return _39080fcb6978 < 0 ? [] : [_36246f643d22.slice(_65af9b344de7, _39080fcb6978)];
}
function _465e60f7ff72(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _e9a50b88275f(ok, title, body) {
  if (_8ba3273b2dcc.value) return;
  _8ba3273b2dcc.value = true;
  _0e0cd041a60b("━━━━━━━━ 执行结束 ━━━━━━━━");
  _0e0cd041a60b(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _0c5751f0788e = typeof $notification !== "undefined";
  if (_209927ef5bdc.notify_enabled !== false && _0c5751f0788e) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _0632a007a973(body || _a7c8a4b46c4c.join("\n"), 700));
  const _64b48e461072 = typeof $done === "function";
  if (_64b48e461072) $done({});
}
function _df07d7b232bd(options, callback) {
  const _d136da0b1b2a = String(options.method || "GET").toLowerCase();
  const _f4a1d337e169 = $httpClient[_d136da0b1b2a] || $httpClient.get;
  const _8c82a93ea981 = { _29f0f6816f17: options.url, _04627959da08: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _8c82a93ea981[_a123441999bb(["auto", "-", "redirect"])] = true;
  _8c82a93ea981[_a123441999bb(["auto", "-", "cookie"])] = true;
  _f4a1d337e169(_8c82a93ea981, (error, response, _cf6ae15fccee) => callback(error, response || {}, String(_cf6ae15fccee || "")));
}
function _81427931b777(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _effb4bcdfc8a = _a123441999bb(["ht", "tps", "://"]);
const _60e99776cf61 = [121, 99, 111, 111, 46, 110, 101, 116].map(_3b5b1c53999a => String.fromCharCode(_3b5b1c53999a)).join("");
function _ba067cdfd407(path) { return _effb4bcdfc8a + _60e99776cf61 + String.fromCharCode(47) + String(path || ""); }
const _a18adbd0697b = _a123441999bb(["plu", "gin", ".", "php"]);
const _b753287b3ed4 = _a123441999bb(["k", "_", "mi", "sign"]);
const _4290e52da0cd = _a123441999bb(["view", "ui", "_", "lottery"]);
const _25d58932b11e = _a123441999bb(["jn", "farm"]);

function _c4ffa24435c2() {
  try {
    const _8fb7e6e7f25b = typeof $request !== "undefined" ? $request : {};
    const _04627959da08 = _8fb7e6e7f25b.headers || {};
    const _92caff178bc8 = Object.keys(_04627959da08);
    const _29f0f6816f17 = String(_8fb7e6e7f25b.url || "");
    const _ff8c521b308a = _c7d78cafa8a7(_04627959da08, "Cookie") || _c7d78cafa8a7(_04627959da08, "cookie");
    const _168d02312147 = _81427931b777(_ff8c521b308a);
    const _8a08f9d7a2bf = _168d02312147.split("; ").filter(Boolean);
    const _71a68eae6dc7 = _92caff178bc8.map(item => item.toLowerCase()).join(",");
    const _b627ff418046 = _8a08f9d7a2bf.some(item => item.indexOf("auth=") >= 0) && _8a08f9d7a2bf.length >= 3;
    _0e0cd041a60b("🧪 调试模式：开启");
    _0e0cd041a60b("🍪 登录状态抓取");
    _0e0cd041a60b("🌐 页面：" + _0632a007a973(_29f0f6816f17, 180));
    _0e0cd041a60b("📋 请求头：" + (_71a68eae6dc7 || "无"));
    _0e0cd041a60b("🔑 原始长度：" + _ff8c521b308a.length + "，字段：" + _8a08f9d7a2bf.length);
    if (!_b627ff418046) {
      _0e0cd041a60b("ℹ️ 当前请求没有完整登录状态");
      return _e9a50b88275f(true, "", "");
    }
    const _eab58e02bc50 = _95823a29d9c9("session");
    const _71b37331bf1c = Number(_95823a29d9c9("notified") || 0);
    const _5ac05a9b45a8 = _507681024991("session", _168d02312147);
    _507681024991("updated", new Date().toISOString());
    _0e0cd041a60b(_eab58e02bc50 === _168d02312147 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _0e0cd041a60b("💾 存储键：" + _da490563b028 + "，写入：" + _5ac05a9b45a8 + "，回读长度：" + _95823a29d9c9("session").length);
    if (_eab58e02bc50 !== _168d02312147 && Date.now() - _71b37331bf1c > 60000) {
      _507681024991("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _8a08f9d7a2bf.length + " 项 / " + _168d02312147.length);
    }
    _e9a50b88275f(true, "", "");
  } catch (error) {
    _0e0cd041a60b("❌ 登录状态异常：" + error);
    _e9a50b88275f(false, "登录状态失败", String(error));
  }
}
function _726986bbfa79(callback) {
  const _168d02312147 = _95823a29d9c9("session");
  if (!_168d02312147) return callback("missing");
  const _04627959da08 = {};
  _04627959da08[_a123441999bb(["C", "ookie"])] = _168d02312147;
  _04627959da08[_a123441999bb(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _04627959da08.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _df07d7b232bd({ _29f0f6816f17: _ba067cdfd407(""), _04627959da08 }, (error, response, _cf6ae15fccee) => {
    if (error) return callback(error);
    if (_cf6ae15fccee.indexOf(_a123441999bb(["action", "=", "logout"])) < 0) return callback("expired");
    const _3b5b1c53999a = _346a7c91c0b3(_cf6ae15fccee);
    if (!_3b5b1c53999a) return callback("token");
    callback(null, { _04627959da08, _3b5b1c53999a });
  });
}
function _b99db06b2737(ctx, callback) {
  const _04627959da08 = Object.assign({}, ctx.headers);
  _04627959da08.Referer = _ba067cdfd407(_a123441999bb([_b753287b3ed4, "-", "sign", ".", "html"]));
  _04627959da08[_a123441999bb(["X", "-", "Requested", "-", "With"])] = _a123441999bb(["XML", "Http", "Request"]);
  _df07d7b232bd({ _29f0f6816f17: _ba067cdfd407(_a18adbd0697b + "?id=" + _b753287b3ed4 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _04627959da08 }, (error, response, _cf6ae15fccee) => {
    _0e0cd041a60b("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _88acae9ba040 = _cf6ae15fccee.indexOf("今日已签") >= 0;
    const _51525e3cc667 = _88acae9ba040 || _cf6ae15fccee.indexOf("<![CDATA[]]>") >= 0;
    _df07d7b232bd({ _29f0f6816f17: _ba067cdfd407(_a123441999bb([_b753287b3ed4, "-", "sign", ".", "html"])), _04627959da08: ctx.headers }, (error2, response2, page) => {
      const _7f22e6d09d6e = _8f908be2313c(page, "签到排名：", " ");
      const _92c5355659e8 = _8f908be2313c(page, 'id="lxtdays" value="', '"');
      const _ba44d2044cf4 = _8f908be2313c(page, 'id="lxlevel" value="', '"');
      const _17df684acaf8 = _8f908be2313c(page, 'id="lxreward" value="', '"');
      _0e0cd041a60b(_88acae9ba040 ? "ℹ️ 今日已经签到" : _51525e3cc667 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_7f22e6d09d6e) _0e0cd041a60b("🏆 当前排名：" + _7f22e6d09d6e);
      if (_92c5355659e8) _0e0cd041a60b("📆 累计天数：" + _92c5355659e8);
      if (_ba44d2044cf4) _0e0cd041a60b("🏅 签到等级：LV." + _ba44d2044cf4);
      if (_17df684acaf8) _0e0cd041a60b("💰 最近奖励：" + _17df684acaf8);
      callback([_88acae9ba040 ? "ℹ️ 今日已签到" : _51525e3cc667 ? "✅ 签到成功" : "⚠️ 签到异常", _7f22e6d09d6e ? "🏆 排名 " + _7f22e6d09d6e : "", _92c5355659e8 ? "📆 累计 " + _92c5355659e8 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _8096c841ea45(ctx, callback) {
  const _04627959da08 = Object.assign({}, ctx.headers);
  _04627959da08.Referer = _ba067cdfd407(_a18adbd0697b + "?id=" + _4290e52da0cd);
  _04627959da08[_a123441999bb(["X", "-", "Requested", "-", "With"])] = _a123441999bb(["XML", "Http", "Request"]);
  _04627959da08.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _18065b112581 = _ba067cdfd407(_a18adbd0697b + "?id=" + _4290e52da0cd + ":draw");
  const _4961e6f56d00 = ["🎰 幸运抽奖"];
  const _dba94a70ede2 = guard => {
    if (guard <= 0) { _4961e6f56d00.forEach(_0e0cd041a60b); return callback(_4961e6f56d00.join("\n")); }
    _df07d7b232bd({ _29f0f6816f17: _18065b112581 + "?drawnumber=1&inajax=1", _04627959da08 }, (error, response, _cf6ae15fccee) => {
      let _9fa1807b188f = {};
      try { _9fa1807b188f = JSON.parse(_cf6ae15fccee); } catch (ignored) {}
      const _92bc487fcce9 = String((_9fa1807b188f.data || {})["2"] || "");
      if (error || _9fa1807b188f.result !== "succeed" || _92bc487fcce9.indexOf("抽奖券") < 0) {
        _4961e6f56d00.push("ℹ️ " + (error || _9fa1807b188f.msg || "没有可用抽奖券"));
        _4961e6f56d00.forEach(_0e0cd041a60b);
        return callback(_4961e6f56d00.join("\n"));
      }
      _df07d7b232bd({ _29f0f6816f17: _18065b112581 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _04627959da08 }, (error2, response2, _ff8c521b308a) => {
        let _f511c10ee79e = {};
        try { _f511c10ee79e = JSON.parse(_ff8c521b308a); } catch (ignored) {}
        if (error2 || _f511c10ee79e.result !== "succeed") {
          _4961e6f56d00.push("⚠️ " + (error2 || _f511c10ee79e.msg || "抽奖失败"));
          _4961e6f56d00.forEach(_0e0cd041a60b);
          return callback(_4961e6f56d00.join("\n"));
        }
        const _092f2330dc4f = (((_f511c10ee79e.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _be2676d652eb = String((_f511c10ee79e.data || {}).ticketnumber || "0");
        const _68d8f15b8630 = String((_f511c10ee79e.data || {}).creditnumber || "");
        _4961e6f56d00.push("🎁 第 " + _4961e6f56d00.length + " 次：" + (_092f2330dc4f.join("、") || _f511c10ee79e.msg || "成功"));
        _4961e6f56d00.push("🎟️ 剩余抽奖券：" + _be2676d652eb + (_68d8f15b8630 ? "  💰 星币：" + _68d8f15b8630 : ""));
        if (_be2676d652eb === "0") { _4961e6f56d00.forEach(_0e0cd041a60b); return callback(_4961e6f56d00.join("\n")); }
        _dba94a70ede2(guard - 1);
      });
    });
  };
  _dba94a70ede2(10);
}
function _bffa00b16ab8(ctx, callback) {
  const _04627959da08 = Object.assign({}, ctx.headers);
  _04627959da08.Referer = _ba067cdfd407(_a18adbd0697b + "?id=" + _25d58932b11e);
  _04627959da08[_a123441999bb(["X", "-", "Requested", "-", "With"])] = _a123441999bb(["XML", "Http", "Request"]);
  const _7a4c66546e68 = ["🌾 农场与福利"];
  const _3e272dff782f = query => _ba067cdfd407(_a18adbd0697b + "?id=" + _25d58932b11e + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _844572f571ca = [
    ["每日免费领取", _a123441999bb(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _a123441999bb(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _6804c1e19d46 = 1; _6804c1e19d46 <= 8; _6804c1e19d46 += 1) _844572f571ca.push(["地块 " + _6804c1e19d46, _a123441999bb(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _6804c1e19d46]);
  const _d0f74b9a1e76 = _6804c1e19d46 => {
    if (_6804c1e19d46 >= _844572f571ca.length) { _7a4c66546e68.forEach(_0e0cd041a60b); return callback(_7a4c66546e68.join("\n")); }
    const _ddf4bdd66d4d = _844572f571ca[_6804c1e19d46];
    _df07d7b232bd({ _29f0f6816f17: _3e272dff782f(_ddf4bdd66d4d[1]), _04627959da08 }, (error, response, _cf6ae15fccee) => {
      const _2b9acf63bede = _bfc7a055cb9a(_cf6ae15fccee)[0] || _0632a007a973(_18e005c2ffd0(_cf6ae15fccee), 80);
      const _47b89a709604 = _465e60f7ff72(_2b9acf63bede, ["成功", "完成", "可领取"]) ? "✅" : _465e60f7ff72(_2b9acf63bede, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _7a4c66546e68.push(_47b89a709604 + " " + _ddf4bdd66d4d[0] + "：" + (error || _2b9acf63bede || "无返回"));
      const _e09de8bd9a87 = _8f908be2313c(_ddf4bdd66d4d[1], "jfid=", "&");
      if (_e09de8bd9a87 && _465e60f7ff72(_cf6ae15fccee, ["已枯萎", "清除"])) {
        return _df07d7b232bd({ _29f0f6816f17: _3e272dff782f(_a123441999bb(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _e09de8bd9a87), _04627959da08 }, (error2, response2, cleared) => {
          _7a4c66546e68.push((_465e60f7ff72(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _e09de8bd9a87);
          _df07d7b232bd({ _29f0f6816f17: _3e272dff782f(_a123441999bb(["do=", "plant", "seed", "&seed=1&jfid="]) + _e09de8bd9a87 + "&timestamp=" + Math.floor(Date.now() / 1000)), _04627959da08 }, (error3, response3, planted) => {
            _7a4c66546e68.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _e09de8bd9a87 + "：" + (_bfc7a055cb9a(planted)[0] || "无返回"));
            _d0f74b9a1e76(_6804c1e19d46 + 1);
          });
        });
      }
      _d0f74b9a1e76(_6804c1e19d46 + 1);
    });
  };
  _df07d7b232bd({ _29f0f6816f17: _3e272dff782f(_a123441999bb(["do=", "normal", "&ac=", "kuo", "zhan"])), _04627959da08 }, (error, response, _cf6ae15fccee) => {
    _7a4c66546e68.push((_465e60f7ff72(_bfc7a055cb9a(_cf6ae15fccee)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _bfc7a055cb9a(_cf6ae15fccee)[0] || "无返回"));
    _d0f74b9a1e76(0);
  });
}
function _691ea6e05f9d() {
  _0e0cd041a60b("🧪 调试模式：开启");
  _0e0cd041a60b("🚀 论坛任务开始");
  _0e0cd041a60b("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _0e0cd041a60b("💾 存储键：" + _da490563b028 + "，登录状态长度：" + _95823a29d9c9("session").length);
  _726986bbfa79((error, ctx) => {
    if (error === "missing") return _e9a50b88275f(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _e9a50b88275f(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _e9a50b88275f(false, "论坛任务失败", String(error));
    _0e0cd041a60b("🔐 登录状态有效");
    _b99db06b2737(ctx, one => _8096c841ea45(ctx, two => _bffa00b16ab8(ctx, three => _e9a50b88275f(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _b9f8cb75681d = typeof $request !== "undefined";
if (_b9f8cb75681d) _c4ffa24435c2();
else _691ea6e05f9d();

})();
