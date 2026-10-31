/*7ef3b0e64eca*/
(function(){
const _0b7b9b06f571 = typeof $argument === "object" && $argument ? $argument : {};
const _e1294ee6c632 = $persistentStore;
const _6908fb3235de = String(_0b7b9b06f571.store || "f3k9m2_store");
const _2822d7c5274c = true;
const _2534ef591814 = { value: false };
const _854d7d044115 = [];
const _096873cf483d = values => values.join("");

function _1bd678778afa() {
  try { return JSON.parse(_e1294ee6c632.read(_6908fb3235de) || "{}") || {}; }
  catch (error) { return {}; }
}
function _fdc75db8ce03(_0ee925ae5f2e) { return _e1294ee6c632.write(JSON.stringify(_0ee925ae5f2e), _6908fb3235de); }
function _4779696dc8a2(name) { return String(_1bd678778afa()[name] || ""); }
function _07693da4431e(name, value) {
  const _0ee925ae5f2e = _1bd678778afa();
  if (value == null) delete _0ee925ae5f2e[name];
  else _0ee925ae5f2e[name] = String(value);
  return _fdc75db8ce03(_0ee925ae5f2e);
}
function _20ca2bdd3706(_d424098ff671, name) {
  const _709a5d180975 = Object.keys(_d424098ff671 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _709a5d180975 ? String(_d424098ff671[_709a5d180975] || "") : "";
}
function _598d31906b3f(_b6634f2eb479) {
  const _87cd5065aad8 = String(_b6634f2eb479);
  _854d7d044115.push(_87cd5065aad8);
  if (_2822d7c5274c) console.log(_87cd5065aad8);
}
function _264130f3bfec(value, size) {
  const _87cd5065aad8 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _87cd5065aad8.length > size ? _87cd5065aad8.slice(0, size) + "..." : _87cd5065aad8;
}
function _c410abb877f2(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _58244467aef0(value, _a4edb53be832, _91e869424019) {
  const _87cd5065aad8 = String(value || "");
  const _53d5ba9eecf1 = _87cd5065aad8.indexOf(_a4edb53be832);
  if (_53d5ba9eecf1 < 0) return "";
  const _3588bc74b231 = _53d5ba9eecf1 + _a4edb53be832.length;
  const _764cdc85b4e8 = _87cd5065aad8.indexOf(_91e869424019, _3588bc74b231);
  return _87cd5065aad8.slice(_3588bc74b231, _764cdc85b4e8 < 0 ? _3588bc74b231 + 16 : _764cdc85b4e8).trim();
}
function _a2241442b69e(value) { return _58244467aef0(value, "formhash=", "&").replace(/[^0-9a-fA-F]/g, "").slice(0, 8); }
function _fbe948464812(value) {
  const _d4e98abbca7e = _096873cf483d(["layer", ".msg('"]);
  const _87cd5065aad8 = String(value || "");
  const _a4edb53be832 = _87cd5065aad8.indexOf(_d4e98abbca7e);
  if (_a4edb53be832 < 0) return [];
  const _3588bc74b231 = _a4edb53be832 + _d4e98abbca7e.length;
  const _91e869424019 = _87cd5065aad8.indexOf("')", _3588bc74b231);
  return _91e869424019 < 0 ? [] : [_87cd5065aad8.slice(_3588bc74b231, _91e869424019)];
}
function _e81bc6672dd2(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _0bb2d348603c(ok, title, body) {
  if (_2534ef591814.value) return;
  _2534ef591814.value = true;
  _598d31906b3f("━━━━━━━━ 执行结束 ━━━━━━━━");
  _598d31906b3f(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _a511eabe741e = typeof $notification !== "undefined";
  if (_0b7b9b06f571.notify_enabled !== false && _a511eabe741e) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _264130f3bfec(body || _854d7d044115.join("\n"), 700));
  const _1395b39ec12f = typeof $done === "function";
  if (_1395b39ec12f) $done({});
}
function _816703c6f6d8(options, callback, attempt) {
  const _bc33d79a0a2d = String(options.method || "GET").toLowerCase();
  const _3410dff246c0 = $httpClient[_bc33d79a0a2d] || $httpClient.get;
  const _428a47e244af = {};
  _428a47e244af["url"] = String(options.url || "");
  _428a47e244af["headers"] = options.headers || {};
  _428a47e244af["body"] = options.body || "";
  _428a47e244af["timeout"] = options.timeout || 20000;
  _428a47e244af["auto-redirect"] = true;
  _428a47e244af["auto-cookie"] = true;
  _428a47e244af["alpn"] = "h2";
  _598d31906b3f("🌐 请求：" + _428a47e244af["url"]);
  _3410dff246c0(_428a47e244af, (error, response, _0ee925ae5f2e) => {
    const _87cd5065aad8 = String(error || "");
    if (_87cd5065aad8 && (attempt || 0) < 2 && (_87cd5065aad8.indexOf("timeout") >= 0 || _87cd5065aad8.indexOf("ETIMEDOUT") >= 0 || _87cd5065aad8.indexOf("closed") >= 0 || _87cd5065aad8.indexOf("timed out") >= 0)) {
      _598d31906b3f("🔁 连接中断，正在重试");
      return _816703c6f6d8(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_0ee925ae5f2e || ""));
  });
}
function _c23b9a1630f1(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _0531a7145acc = _096873cf483d(["ht", "tps", "://"]);
const _acc0f5367a6c = [121, 99, 111, 111, 46, 110, 101, 116].map(_9a2963819526 => String.fromCharCode(_9a2963819526)).join("");
function _18400e2dada3(path) { return _0531a7145acc + _acc0f5367a6c + String.fromCharCode(47) + String(path || ""); }
const _2ddebe0507b0 = _096873cf483d(["plu", "gin", ".", "php"]);
const _e678522c36d4 = _096873cf483d(["k", "_", "mi", "sign"]);
const _10b0f7bde034 = _096873cf483d(["view", "ui", "_", "lottery"]);
const _93e0fd72f02c = _096873cf483d(["jn", "farm"]);

function _ea91422adcff(_d424098ff671, name) {
  const _5c353775f0db = _20ca2bdd3706(_d424098ff671, name);
  return Array.isArray(_5c353775f0db) ? _5c353775f0db.join(",") : String(_5c353775f0db || "");
}
function _63cd7622fb12(value) {
  const _87cd5065aad8 = String(value || "");
  const _979898df38e6 = (_87cd5065aad8.match(/;/g) || []).length;
  const _fa338f629b78 = (_87cd5065aad8.match(/,/g) || []).length;
  const _c8b1b8037fe3 = _fa338f629b78 > _979898df38e6 ? "," : ";";
  return _87cd5065aad8.split(_c8b1b8037fe3).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _217ec9e970fd(_67a71c29daad, extra) {
  const _2e0248af919b = {};
  _63cd7622fb12(_67a71c29daad).concat(_63cd7622fb12(extra)).forEach(item => {
    const _7c8b6569eb93 = item.indexOf("=");
    _2e0248af919b[item.slice(0, _7c8b6569eb93)] = item.slice(_7c8b6569eb93 + 1);
  });
  return Object.keys(_2e0248af919b).map(_709a5d180975 => _709a5d180975 + "=" + _2e0248af919b[_709a5d180975]).join("; ");
}
function _c86c9bb9bbea() {
  try {
    const _4d038388251f = typeof $request !== "undefined" ? $request : {};
    const _9ddf110f8d4e = typeof $response !== "undefined" ? $response : {};
    const _99a67bc8e163 = String(_4d038388251f.url || "");
    const _da8b68ad6e50 = _ea91422adcff(_4d038388251f.headers, "Cookie");
    const _9c1ebd18adf5 = _ea91422adcff(_9ddf110f8d4e.headers, "Set-Cookie");
    const _ac02a8f13020 = _217ec9e970fd(_da8b68ad6e50, "");
    const _7d0f3bd0cc42 = _ac02a8f13020.split("; ").filter(Boolean);
    const _57d46cf32d43 = Object.keys(_4d038388251f.headers || {}).concat(Object.keys(_9ddf110f8d4e.headers || {}));
    const _fe3e427bc2d8 = _7d0f3bd0cc42.some(item => item.indexOf("auth=") >= 0);
    _598d31906b3f("🧪 调试模式：开启");
    _598d31906b3f("🍪 登录状态抓取");
    _598d31906b3f("🌐 页面：" + _264130f3bfec(_99a67bc8e163, 180));
    _598d31906b3f("📋 头名称：" + _57d46cf32d43.map(item => item.toLowerCase()).join(","));
    _598d31906b3f("🔑 请求长度：" + _da8b68ad6e50.length + "，字段：" + _7d0f3bd0cc42.length);
    _598d31906b3f("🏷️ 字段名：" + _7d0f3bd0cc42.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_fe3e427bc2d8) {
      _598d31906b3f("ℹ️ 当前响应没有完整登录状态");
      return _0bb2d348603c(true, "", "");
    }
    const _c642c3002a3a = _4779696dc8a2("session");
    const _8398773c3bbe = Number(_4779696dc8a2("notified") || 0);
    const _ea2e902250e1 = _07693da4431e("session", _ac02a8f13020);
    _07693da4431e("updated", new Date().toISOString());
    _598d31906b3f(_c642c3002a3a === _ac02a8f13020 ? "✅ 登录状态未变化" : "✅ 登录 Cookie 已保存");
    _598d31906b3f("💾 存储键：" + _6908fb3235de + "，写入：" + _ea2e902250e1 + "，回读长度：" + _4779696dc8a2("session").length);
    if (_c642c3002a3a !== _ac02a8f13020 && Date.now() - _8398773c3bbe > 60000) {
      _07693da4431e("notified", Date.now());
      $notification.post("登录 Cookie", "✅ 已保存", _7d0f3bd0cc42.length + " 项 / " + _ac02a8f13020.length);
    }
    _2534ef591814.value = true;
    if (typeof $done === "function") $done({});
  } catch (error) {
    _598d31906b3f("❌ 登录状态异常：" + error);
    _0bb2d348603c(false, "登录状态失败", String(error));
  }
}
function _1b2365866b9b(callback) {
  const _ac02a8f13020 = _4779696dc8a2("session");
  if (!_ac02a8f13020) return callback("missing");
  const _d424098ff671 = {};
  _d424098ff671[_096873cf483d(["C", "ookie"])] = _ac02a8f13020;
  _d424098ff671[_096873cf483d(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _d424098ff671.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _816703c6f6d8({ url: _18400e2dada3("forum.php"), _d424098ff671 }, (error, response, _0ee925ae5f2e) => {
    if (error) return callback(error);
    if (_0ee925ae5f2e.indexOf(_096873cf483d(["action", "=", "logout"])) < 0) return callback("expired");
    const _9a2963819526 = _a2241442b69e(_0ee925ae5f2e);
    if (!_9a2963819526) return callback("token");
    callback(null, { _d424098ff671, _9a2963819526 });
  });
}
function _d09e615af64f(ctx, callback) {
  const _d424098ff671 = Object.assign({}, ctx.headers);
  _d424098ff671.Referer = _18400e2dada3(_096873cf483d([_e678522c36d4, "-", "sign", ".", "html"]));
  _d424098ff671[_096873cf483d(["X", "-", "Requested", "-", "With"])] = _096873cf483d(["XML", "Http", "Request"]);
  _816703c6f6d8({ url: _18400e2dada3(_2ddebe0507b0 + "?id=" + _e678522c36d4 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _d424098ff671 }, (error, response, _0ee925ae5f2e) => {
    _598d31906b3f("📅 每日签到请求");
    if (error) return callback("❌ 请求失败：" + error);
    const _6b7bdaf62b8a = _0ee925ae5f2e.indexOf("今日已签") >= 0;
    const _d089b62d8cea = _6b7bdaf62b8a || _0ee925ae5f2e.indexOf("<![CDATA[]]>") >= 0;
    _816703c6f6d8({ url: _18400e2dada3(_096873cf483d([_e678522c36d4, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _658d5d0d5ff5 = _58244467aef0(page, "签到排名：", " ");
      const _e3652221451d = _58244467aef0(page, 'id="lxtdays" value="', '"');
      const _9f7ef8543027 = _58244467aef0(page, 'id="lxlevel" value="', '"');
      const _09b294e270dc = _58244467aef0(page, 'id="lxreward" value="', '"');
      _598d31906b3f(_6b7bdaf62b8a ? "ℹ️ 今日已经签到" : _d089b62d8cea ? "✅ 签到接口返回成功" : "⚠️ 签到接口返回异常");
      if (_658d5d0d5ff5) _598d31906b3f("🏆 当前排名：" + _658d5d0d5ff5);
      if (_e3652221451d) _598d31906b3f("📆 累计天数：" + _e3652221451d);
      if (_9f7ef8543027) _598d31906b3f("🏅 签到等级：LV." + _9f7ef8543027);
      if (_09b294e270dc) _598d31906b3f("💰 最近奖励：" + _09b294e270dc);
      callback([_6b7bdaf62b8a ? "ℹ️ 今日已签到" : _d089b62d8cea ? "✅ 签到接口成功" : "⚠️ 签到接口异常", _658d5d0d5ff5 ? "🏆 排名 " + rank : "", _e3652221451d ? "📆 累计 " + _e3652221451d + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _8d4dbf94037c(ctx, callback) {
  const _d424098ff671 = Object.assign({}, ctx.headers);
  _d424098ff671.Referer = _18400e2dada3(_2ddebe0507b0 + "?id=" + _10b0f7bde034);
  _d424098ff671[_096873cf483d(["X", "-", "Requested", "-", "With"])] = _096873cf483d(["XML", "Http", "Request"]);
  _d424098ff671.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _67a71c29daad = _18400e2dada3(_2ddebe0507b0 + "?id=" + _10b0f7bde034 + ":draw");
  const _a93fdff58177 = ["🎰 幸运抽奖"];
  const _920f3fd89be9 = guard => {
    if (guard <= 0) { _a93fdff58177.forEach(_598d31906b3f); return callback(_a93fdff58177.join("\n")); }
    _816703c6f6d8({ url: _67a71c29daad + "?drawnumber=1&inajax=1", _d424098ff671 }, (error, response, _0ee925ae5f2e) => {
      let _c05dc6bf8252 = {};
      try { _c05dc6bf8252 = JSON.parse(_0ee925ae5f2e); } catch (ignored) {}
      const _1f2c036099f0 = String((_c05dc6bf8252.data || {})["2"] || "");
      if (error || _c05dc6bf8252.result !== "succeed" || _1f2c036099f0.indexOf("抽奖券") < 0) {
        _a93fdff58177.push("ℹ️ " + (error || _c05dc6bf8252.msg || "没有可用抽奖券"));
        _a93fdff58177.forEach(_598d31906b3f);
        return callback(_a93fdff58177.join("\n"));
      }
      _816703c6f6d8({ url: _67a71c29daad + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _d424098ff671 }, (error2, response2, raw) => {
        let _0ccfc6ae4d8f = {};
        try { _0ccfc6ae4d8f = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _0ccfc6ae4d8f.result !== "succeed") {
          _a93fdff58177.push("⚠️ " + (error2 || _0ccfc6ae4d8f.msg || "抽奖失败"));
          _a93fdff58177.forEach(_598d31906b3f);
          return callback(_a93fdff58177.join("\n"));
        }
        const _479810a045d7 = (((_0ccfc6ae4d8f.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _53d5ba9eecf1 = String((_0ccfc6ae4d8f.data || {}).ticketnumber || "0");
        const _574e9c373456 = String((_0ccfc6ae4d8f.data || {}).creditnumber || "");
        _a93fdff58177.push("🎁 第 " + _a93fdff58177.length + " 次：" + (_479810a045d7.join("、") || _0ccfc6ae4d8f.msg || "成功"));
        _a93fdff58177.push("🎟️ 剩余抽奖券：" + _53d5ba9eecf1 + (_574e9c373456 ? "  💰 星币：" + credit : ""));
        if (_53d5ba9eecf1 === "0") { _a93fdff58177.forEach(_598d31906b3f); return callback(_a93fdff58177.join("\n")); }
        _920f3fd89be9(guard - 1);
      });
    });
  };
  _920f3fd89be9(10);
}
function _df78fce3b009(ctx, callback) {
  const _d424098ff671 = Object.assign({}, ctx.headers);
  _d424098ff671.Referer = _18400e2dada3(_2ddebe0507b0 + "?id=" + _93e0fd72f02c);
  _d424098ff671[_096873cf483d(["X", "-", "Requested", "-", "With"])] = _096873cf483d(["XML", "Http", "Request"]);
  const _11d70ff6f75e = ["🌾 农场与福利"];
  const _cc3638a0c025 = query => _18400e2dada3(_2ddebe0507b0 + "?id=" + _93e0fd72f02c + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _66c09e6d1903 = [
    ["每日免费领取", _096873cf483d(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _096873cf483d(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _dc8c0c246e8d = 1; _dc8c0c246e8d <= 8; _dc8c0c246e8d += 1) _66c09e6d1903.push(["地块 " + _dc8c0c246e8d, _096873cf483d(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _dc8c0c246e8d]);
  const _86f3a82ce584 = _dc8c0c246e8d => {
    if (_dc8c0c246e8d >= _66c09e6d1903.length) { _11d70ff6f75e.forEach(_598d31906b3f); return callback(_11d70ff6f75e.join("\n")); }
    const _d9edae7b1991 = _66c09e6d1903[_dc8c0c246e8d];
    _816703c6f6d8({ url: _cc3638a0c025(_d9edae7b1991[1]), _d424098ff671 }, (error, response, _0ee925ae5f2e) => {
      const _b6634f2eb479 = _fbe948464812(_0ee925ae5f2e)[0] || _264130f3bfec(_c410abb877f2(_0ee925ae5f2e), 80);
      const _fe80002c86e2 = _e81bc6672dd2(_b6634f2eb479, ["成功", "完成", "可领取"]) ? "✅" : _e81bc6672dd2(_b6634f2eb479, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _11d70ff6f75e.push(_fe80002c86e2 + " " + _d9edae7b1991[0] + "：" + (error || _b6634f2eb479 || "无返回"));
      const _528d3a3b777c = _58244467aef0(_d9edae7b1991[1], "jfid=", "&");
      if (_528d3a3b777c && _e81bc6672dd2(_0ee925ae5f2e, ["已枯萎", "清除"])) {
        return _816703c6f6d8({ url: _cc3638a0c025(_096873cf483d(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _528d3a3b777c), _d424098ff671 }, (error2, response2, cleared) => {
          _11d70ff6f75e.push((_e81bc6672dd2(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _528d3a3b777c);
          _816703c6f6d8({ url: _cc3638a0c025(_096873cf483d(["do=", "plant", "seed", "&seed=1&jfid="]) + _528d3a3b777c + "&timestamp=" + Math.floor(Date.now() / 1000)), _d424098ff671 }, (error3, response3, planted) => {
            _11d70ff6f75e.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _528d3a3b777c + "：" + (_fbe948464812(planted)[0] || "无返回"));
            _86f3a82ce584(_dc8c0c246e8d + 1);
          });
        });
      }
      _86f3a82ce584(_dc8c0c246e8d + 1);
    });
  };
  _816703c6f6d8({ url: _cc3638a0c025(_096873cf483d(["do=", "normal", "&ac=", "kuo", "zhan"])), _d424098ff671 }, (error, response, _0ee925ae5f2e) => {
    _11d70ff6f75e.push((_e81bc6672dd2(_fbe948464812(_0ee925ae5f2e)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _fbe948464812(_0ee925ae5f2e)[0] || "无返回"));
    _86f3a82ce584(0);
  });
}
function _9a8054057431() {
  _598d31906b3f("🧪 调试模式：开启");
  _598d31906b3f("🚀 论坛任务开始");
  _598d31906b3f("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _598d31906b3f("💾 存储键：" + _6908fb3235de + "，登录状态长度：" + _4779696dc8a2("session").length);
  _1b2365866b9b((error, ctx) => {
    if (error === "missing") return _0bb2d348603c(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _0bb2d348603c(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _0bb2d348603c(false, "论坛任务失败", String(error));
    _598d31906b3f("🔐 登录状态有效");
    _d09e615af64f(ctx, one => _8d4dbf94037c(ctx, two => _df78fce3b009(ctx, three => _0bb2d348603c(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_598d31906b3f("🧪 调试模式：开启");
_598d31906b3f("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录 Cookie 抓取" : "论坛任务"));
const _d947cb1901b8 = typeof $request !== "undefined";
if (_d947cb1901b8) _c86c9bb9bbea();
else _9a8054057431();

})();
