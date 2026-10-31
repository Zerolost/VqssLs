/*315c261d9e6a*/
(function(){
const _b34cd305ca08 = typeof $argument === "object" && $argument ? $argument : {};
const _235e74a5bbbe = $persistentStore;
const _74ea9e4f1ef3 = "f3k9m2_store";
const _337aba797de8 = true;
const _45118fbaeab5 = { value: false };
const _c1b36bd2263f = [];
const _30c8e35a7760 = values => values.join("");

function _efa44982ebbb() {
  try { return JSON.parse(_235e74a5bbbe.read(_74ea9e4f1ef3) || "{}") || {}; }
  catch (error) { return {}; }
}
function _37738d5ad38b(_93a2e3f86f8a) { return _235e74a5bbbe.write(JSON.stringify(_93a2e3f86f8a), _74ea9e4f1ef3); }
function _0331d849fcb2(name) { return String(_efa44982ebbb()[name] || ""); }
function _68e22d04f6c8(name, value) {
  const _93a2e3f86f8a = _efa44982ebbb();
  if (value == null) delete _93a2e3f86f8a[name];
  else _93a2e3f86f8a[name] = String(value);
  return _37738d5ad38b(_93a2e3f86f8a);
}
function _dc8d5eb12708(_e21e486b082e, name) {
  const _0a0d8822e04c = Object.keys(_e21e486b082e || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _0a0d8822e04c ? String(_e21e486b082e[_0a0d8822e04c] || "") : "";
}
function _ddaaa3ce3573(_974d8977f6a4) {
  const _aee2e79ce1aa = String(_974d8977f6a4);
  _c1b36bd2263f.push(_aee2e79ce1aa);
  if (_337aba797de8) console.log(_aee2e79ce1aa);
}
function _b39f8b8fff02(value, size) {
  const _aee2e79ce1aa = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _aee2e79ce1aa.length > size ? _aee2e79ce1aa.slice(0, size) + "..." : _aee2e79ce1aa;
}
function _c7e09955ebb2(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _cdd2a7a834f9(value, _9c26e70713ad, _0fde78914ee2) {
  const _aee2e79ce1aa = String(value || "");
  const _52771765e4de = _aee2e79ce1aa.indexOf(_9c26e70713ad);
  if (_52771765e4de < 0) return "";
  const _b0c1077ce01f = _52771765e4de + _9c26e70713ad.length;
  const _ea1a42e4ff7e = _aee2e79ce1aa.indexOf(_0fde78914ee2, _b0c1077ce01f);
  return _aee2e79ce1aa.slice(_b0c1077ce01f, _ea1a42e4ff7e < 0 ? _b0c1077ce01f + 16 : _ea1a42e4ff7e).trim();
}
function _ff4622631a46(value) { return _cdd2a7a834f9(value, _30c8e35a7760(["form", "hash", "="]), "&"); }
function _e17ddad6073f(value) {
  const _26a5e39ba10f = _30c8e35a7760(["layer", ".msg('"]);
  const _aee2e79ce1aa = String(value || "");
  const _9c26e70713ad = _aee2e79ce1aa.indexOf(_26a5e39ba10f);
  if (_9c26e70713ad < 0) return [];
  const _b0c1077ce01f = _9c26e70713ad + _26a5e39ba10f.length;
  const _0fde78914ee2 = _aee2e79ce1aa.indexOf("')", _b0c1077ce01f);
  return _0fde78914ee2 < 0 ? [] : [_aee2e79ce1aa.slice(_b0c1077ce01f, _0fde78914ee2)];
}
function _6407279ffb91(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _7bc2b2175c4f(ok, title, body) {
  if (_45118fbaeab5.value) return;
  _45118fbaeab5.value = true;
  _ddaaa3ce3573("━━━━━━━━ 执行结束 ━━━━━━━━");
  _ddaaa3ce3573(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _06b1ae6ff460 = typeof $notification !== "undefined";
  if (_b34cd305ca08.notify_enabled !== false && _06b1ae6ff460) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _b39f8b8fff02(body || _c1b36bd2263f.join("\n"), 700));
  const _1309b87ba052 = typeof $done === "function";
  if (_1309b87ba052) $done({});
}
function _bc9e5b057b36(options, callback) {
  const _3846e83533a9 = String(options.method || "GET").toLowerCase();
  const _3a59c95bc69b = $httpClient[_3846e83533a9] || $httpClient.get;
  const _f441b1e31beb = { _e697087b015e: options.url, _e21e486b082e: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _f441b1e31beb[_30c8e35a7760(["auto", "-", "redirect"])] = true;
  _f441b1e31beb[_30c8e35a7760(["auto", "-", "cookie"])] = true;
  _3a59c95bc69b(_f441b1e31beb, (error, response, _93a2e3f86f8a) => callback(error, response || {}, String(_93a2e3f86f8a || "")));
}
function _334756311e19(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _c64563a7699c = _30c8e35a7760(["ht", "tps", "://"]);
const _5e5ab342568a = [121, 99, 111, 111, 46, 110, 101, 116].map(_8e982e7f266b => String.fromCharCode(_8e982e7f266b)).join("");
function _33c4f5c8b447(path) { return _c64563a7699c + _5e5ab342568a + String.fromCharCode(47) + String(path || ""); }
const _234b2e092fc4 = _30c8e35a7760(["plu", "gin", ".", "php"]);
const _e826371f8c2e = _30c8e35a7760(["k", "_", "mi", "sign"]);
const _2d994e801ff9 = _30c8e35a7760(["view", "ui", "_", "lottery"]);
const _34446372d265 = _30c8e35a7760(["jn", "farm"]);

function _09887a5c18e7(_e21e486b082e, name) {
  const _3eeb16b36f00 = _dc8d5eb12708(_e21e486b082e, name);
  return Array.isArray(_3eeb16b36f00) ? _3eeb16b36f00.join(",") : String(_3eeb16b36f00 || "");
}
function _5929d48dea20(_1d32d66b808a, extra) {
  const _d058d1f0ab4c = {};
  [_1d32d66b808a, extra].join("; ").split(";").forEach(item => {
    const _aee2e79ce1aa = item.trim();
    const _df3c50e74105 = _aee2e79ce1aa.indexOf("=");
    if (_df3c50e74105 > 0) _d058d1f0ab4c[_aee2e79ce1aa.slice(0, _df3c50e74105)] = _aee2e79ce1aa.slice(_df3c50e74105 + 1);
  });
  return Object.keys(_d058d1f0ab4c).map(_0a0d8822e04c => _0a0d8822e04c + "=" + _d058d1f0ab4c[_0a0d8822e04c]).join("; ");
}
function _2e1fb225e5b6() {
  try {
    const _a4bc40558f33 = typeof $request !== "undefined" ? $request : {};
    const _458474a21c2f = typeof $response !== "undefined" ? $response : {};
    const _e697087b015e = String(_a4bc40558f33.url || "");
    const _a95695eaf8b0 = _09887a5c18e7(_a4bc40558f33.headers, "Cookie");
    const _5123dfe97590 = _09887a5c18e7(_458474a21c2f.headers, "Set-Cookie");
    const _9148b99d5315 = _5929d48dea20(_334756311e19(_a95695eaf8b0), _334756311e19(_5123dfe97590));
    const _423e37bd30ff = _9148b99d5315.split("; ").filter(Boolean);
    const _5f350496e5d3 = Object.keys(_a4bc40558f33.headers || {}).concat(Object.keys(_458474a21c2f.headers || {}));
    const _0539be3a7073 = _423e37bd30ff.some(item => item.indexOf("auth=") >= 0);
    _ddaaa3ce3573("🧪 调试模式：开启");
    _ddaaa3ce3573("🍪 登录状态抓取");
    _ddaaa3ce3573("🌐 页面：" + _b39f8b8fff02(_e697087b015e, 180));
    _ddaaa3ce3573("📋 头名称：" + _5f350496e5d3.map(item => item.toLowerCase()).join(","));
    _ddaaa3ce3573("🔑 请求长度：" + _a95695eaf8b0.length + "，响应长度：" + _5123dfe97590.length + "，合并字段：" + _423e37bd30ff.length);
    if (!_0539be3a7073) {
      _ddaaa3ce3573("ℹ️ 当前响应没有完整登录状态");
      return _7bc2b2175c4f(true, "", "");
    }
    const _61df0bf1fa02 = _0331d849fcb2("session");
    const _6837ef8dbe05 = Number(_0331d849fcb2("notified") || 0);
    const _52af63f0e23a = _68e22d04f6c8("session", _9148b99d5315);
    _68e22d04f6c8("updated", new Date().toISOString());
    _ddaaa3ce3573(_61df0bf1fa02 === _9148b99d5315 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _ddaaa3ce3573("💾 存储键：" + _74ea9e4f1ef3 + "，写入：" + _52af63f0e23a + "，回读长度：" + _0331d849fcb2("session").length);
    if (_61df0bf1fa02 !== _9148b99d5315 && Date.now() - _6837ef8dbe05 > 60000) {
      _68e22d04f6c8("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _423e37bd30ff.length + " 项 / " + _9148b99d5315.length);
    }
    _7bc2b2175c4f(true, "", "");
  } catch (error) {
    _ddaaa3ce3573("❌ 登录状态异常：" + error);
    _7bc2b2175c4f(false, "登录状态失败", String(error));
  }
}
function _e536d8ee7d56(callback) {
  const _9148b99d5315 = _0331d849fcb2("session");
  if (!_9148b99d5315) return callback("missing");
  const _e21e486b082e = {};
  _e21e486b082e[_30c8e35a7760(["C", "ookie"])] = _9148b99d5315;
  _e21e486b082e[_30c8e35a7760(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _e21e486b082e.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _bc9e5b057b36({ _e697087b015e: _33c4f5c8b447(""), _e21e486b082e }, (error, response, _93a2e3f86f8a) => {
    if (error) return callback(error);
    if (_93a2e3f86f8a.indexOf(_30c8e35a7760(["action", "=", "logout"])) < 0) return callback("expired");
    const _8e982e7f266b = _ff4622631a46(_93a2e3f86f8a);
    if (!_8e982e7f266b) return callback("token");
    callback(null, { _e21e486b082e, _8e982e7f266b });
  });
}
function _d09a06597c35(ctx, callback) {
  const _e21e486b082e = Object.assign({}, ctx.headers);
  _e21e486b082e.Referer = _33c4f5c8b447(_30c8e35a7760([_e826371f8c2e, "-", "sign", ".", "html"]));
  _e21e486b082e[_30c8e35a7760(["X", "-", "Requested", "-", "With"])] = _30c8e35a7760(["XML", "Http", "Request"]);
  _bc9e5b057b36({ _e697087b015e: _33c4f5c8b447(_234b2e092fc4 + "?id=" + _e826371f8c2e + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _e21e486b082e }, (error, response, _93a2e3f86f8a) => {
    _ddaaa3ce3573("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _b1e12057654f = _93a2e3f86f8a.indexOf("今日已签") >= 0;
    const _7fc5b8c4dad9 = _b1e12057654f || _93a2e3f86f8a.indexOf("<![CDATA[]]>") >= 0;
    _bc9e5b057b36({ _e697087b015e: _33c4f5c8b447(_30c8e35a7760([_e826371f8c2e, "-", "sign", ".", "html"])), _e21e486b082e: ctx.headers }, (error2, response2, page) => {
      const _c8b686cc62e2 = _cdd2a7a834f9(page, "签到排名：", " ");
      const _7f291518548d = _cdd2a7a834f9(page, 'id="lxtdays" value="', '"');
      const _c3f53594cfa5 = _cdd2a7a834f9(page, 'id="lxlevel" value="', '"');
      const _4f4cbfdef59d = _cdd2a7a834f9(page, 'id="lxreward" value="', '"');
      _ddaaa3ce3573(_b1e12057654f ? "ℹ️ 今日已经签到" : _7fc5b8c4dad9 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_c8b686cc62e2) _ddaaa3ce3573("🏆 当前排名：" + _c8b686cc62e2);
      if (_7f291518548d) _ddaaa3ce3573("📆 累计天数：" + _7f291518548d);
      if (_c3f53594cfa5) _ddaaa3ce3573("🏅 签到等级：LV." + _c3f53594cfa5);
      if (_4f4cbfdef59d) _ddaaa3ce3573("💰 最近奖励：" + _4f4cbfdef59d);
      callback([_b1e12057654f ? "ℹ️ 今日已签到" : _7fc5b8c4dad9 ? "✅ 签到成功" : "⚠️ 签到异常", _c8b686cc62e2 ? "🏆 排名 " + _c8b686cc62e2 : "", _7f291518548d ? "📆 累计 " + _7f291518548d + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _6a1560fd3029(ctx, callback) {
  const _e21e486b082e = Object.assign({}, ctx.headers);
  _e21e486b082e.Referer = _33c4f5c8b447(_234b2e092fc4 + "?id=" + _2d994e801ff9);
  _e21e486b082e[_30c8e35a7760(["X", "-", "Requested", "-", "With"])] = _30c8e35a7760(["XML", "Http", "Request"]);
  _e21e486b082e.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _1d32d66b808a = _33c4f5c8b447(_234b2e092fc4 + "?id=" + _2d994e801ff9 + ":draw");
  const _4fd640066467 = ["🎰 幸运抽奖"];
  const _5154de64de0c = guard => {
    if (guard <= 0) { _4fd640066467.forEach(_ddaaa3ce3573); return callback(_4fd640066467.join("\n")); }
    _bc9e5b057b36({ _e697087b015e: _1d32d66b808a + "?drawnumber=1&inajax=1", _e21e486b082e }, (error, response, _93a2e3f86f8a) => {
      let _aab1f1f47911 = {};
      try { _aab1f1f47911 = JSON.parse(_93a2e3f86f8a); } catch (ignored) {}
      const _8b364eb5b6d8 = String((_aab1f1f47911.data || {})["2"] || "");
      if (error || _aab1f1f47911.result !== "succeed" || _8b364eb5b6d8.indexOf("抽奖券") < 0) {
        _4fd640066467.push("ℹ️ " + (error || _aab1f1f47911.msg || "没有可用抽奖券"));
        _4fd640066467.forEach(_ddaaa3ce3573);
        return callback(_4fd640066467.join("\n"));
      }
      _bc9e5b057b36({ _e697087b015e: _1d32d66b808a + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _e21e486b082e }, (error2, response2, raw) => {
        let _9543a9240ea3 = {};
        try { _9543a9240ea3 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _9543a9240ea3.result !== "succeed") {
          _4fd640066467.push("⚠️ " + (error2 || _9543a9240ea3.msg || "抽奖失败"));
          _4fd640066467.forEach(_ddaaa3ce3573);
          return callback(_4fd640066467.join("\n"));
        }
        const _6f94082a3a19 = (((_9543a9240ea3.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _52771765e4de = String((_9543a9240ea3.data || {}).ticketnumber || "0");
        const _56295864539e = String((_9543a9240ea3.data || {}).creditnumber || "");
        _4fd640066467.push("🎁 第 " + _4fd640066467.length + " 次：" + (_6f94082a3a19.join("、") || _9543a9240ea3.msg || "成功"));
        _4fd640066467.push("🎟️ 剩余抽奖券：" + _52771765e4de + (_56295864539e ? "  💰 星币：" + _56295864539e : ""));
        if (_52771765e4de === "0") { _4fd640066467.forEach(_ddaaa3ce3573); return callback(_4fd640066467.join("\n")); }
        _5154de64de0c(guard - 1);
      });
    });
  };
  _5154de64de0c(10);
}
function _c320ad22fb43(ctx, callback) {
  const _e21e486b082e = Object.assign({}, ctx.headers);
  _e21e486b082e.Referer = _33c4f5c8b447(_234b2e092fc4 + "?id=" + _34446372d265);
  _e21e486b082e[_30c8e35a7760(["X", "-", "Requested", "-", "With"])] = _30c8e35a7760(["XML", "Http", "Request"]);
  const _a575e8c9a233 = ["🌾 农场与福利"];
  const _a13d62093226 = query => _33c4f5c8b447(_234b2e092fc4 + "?id=" + _34446372d265 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _997f9fee09bd = [
    ["每日免费领取", _30c8e35a7760(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _30c8e35a7760(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _1b41fd20cdf3 = 1; _1b41fd20cdf3 <= 8; _1b41fd20cdf3 += 1) _997f9fee09bd.push(["地块 " + _1b41fd20cdf3, _30c8e35a7760(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _1b41fd20cdf3]);
  const _a6294aa6fd26 = _1b41fd20cdf3 => {
    if (_1b41fd20cdf3 >= _997f9fee09bd.length) { _a575e8c9a233.forEach(_ddaaa3ce3573); return callback(_a575e8c9a233.join("\n")); }
    const _51b88d935d3b = _997f9fee09bd[_1b41fd20cdf3];
    _bc9e5b057b36({ _e697087b015e: _a13d62093226(_51b88d935d3b[1]), _e21e486b082e }, (error, response, _93a2e3f86f8a) => {
      const _974d8977f6a4 = _e17ddad6073f(_93a2e3f86f8a)[0] || _b39f8b8fff02(_c7e09955ebb2(_93a2e3f86f8a), 80);
      const _55d5ce74b14e = _6407279ffb91(_974d8977f6a4, ["成功", "完成", "可领取"]) ? "✅" : _6407279ffb91(_974d8977f6a4, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _a575e8c9a233.push(_55d5ce74b14e + " " + _51b88d935d3b[0] + "：" + (error || _974d8977f6a4 || "无返回"));
      const _d65fa2b58644 = _cdd2a7a834f9(_51b88d935d3b[1], "jfid=", "&");
      if (_d65fa2b58644 && _6407279ffb91(_93a2e3f86f8a, ["已枯萎", "清除"])) {
        return _bc9e5b057b36({ _e697087b015e: _a13d62093226(_30c8e35a7760(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _d65fa2b58644), _e21e486b082e }, (error2, response2, cleared) => {
          _a575e8c9a233.push((_6407279ffb91(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _d65fa2b58644);
          _bc9e5b057b36({ _e697087b015e: _a13d62093226(_30c8e35a7760(["do=", "plant", "seed", "&seed=1&jfid="]) + _d65fa2b58644 + "&timestamp=" + Math.floor(Date.now() / 1000)), _e21e486b082e }, (error3, response3, planted) => {
            _a575e8c9a233.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _d65fa2b58644 + "：" + (_e17ddad6073f(planted)[0] || "无返回"));
            _a6294aa6fd26(_1b41fd20cdf3 + 1);
          });
        });
      }
      _a6294aa6fd26(_1b41fd20cdf3 + 1);
    });
  };
  _bc9e5b057b36({ _e697087b015e: _a13d62093226(_30c8e35a7760(["do=", "normal", "&ac=", "kuo", "zhan"])), _e21e486b082e }, (error, response, _93a2e3f86f8a) => {
    _a575e8c9a233.push((_6407279ffb91(_e17ddad6073f(_93a2e3f86f8a)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _e17ddad6073f(_93a2e3f86f8a)[0] || "无返回"));
    _a6294aa6fd26(0);
  });
}
function _1790e46c50d1() {
  _ddaaa3ce3573("🧪 调试模式：开启");
  _ddaaa3ce3573("🚀 论坛任务开始");
  _ddaaa3ce3573("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _ddaaa3ce3573("💾 存储键：" + _74ea9e4f1ef3 + "，登录状态长度：" + _0331d849fcb2("session").length);
  _e536d8ee7d56((error, ctx) => {
    if (error === "missing") return _7bc2b2175c4f(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _7bc2b2175c4f(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _7bc2b2175c4f(false, "论坛任务失败", String(error));
    _ddaaa3ce3573("🔐 登录状态有效");
    _d09a06597c35(ctx, one => _6a1560fd3029(ctx, two => _c320ad22fb43(ctx, three => _7bc2b2175c4f(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _374a26cb8ddf = typeof $request !== "undefined";
if (_374a26cb8ddf) _2e1fb225e5b6();
else _1790e46c50d1();

})();
