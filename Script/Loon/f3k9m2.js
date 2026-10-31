/*145aec78be7a*/
(function(){
const _8f226ac37c2f = typeof $argument === "object" && $argument ? $argument : {};
const _08202e51ffbd = $persistentStore;
const _ebb1d4e59ed4 = "f3k9m2_store";
const _706f8f142948 = true;
const _c48972a0b464 = { value: false };
const _63a6ed03ad5f = [];
const _bda9ce84a342 = values => values.join("");

function _0e4d5a0743b5() {
  try { return JSON.parse(_08202e51ffbd.read(_ebb1d4e59ed4) || "{}") || {}; }
  catch (error) { return {}; }
}
function _908da88dbfe1(_fa494b025aef) { return _08202e51ffbd.write(JSON.stringify(_fa494b025aef), _ebb1d4e59ed4); }
function _d26ef25b2ada(name) { return String(_0e4d5a0743b5()[name] || ""); }
function _f3db3baf65a1(name, value) {
  const _fa494b025aef = _0e4d5a0743b5();
  if (value == null) delete _fa494b025aef[name];
  else _fa494b025aef[name] = String(value);
  return _908da88dbfe1(_fa494b025aef);
}
function _9d6285b5dbdc(_0bfdb7080f8f, name) {
  const _0c0e2b0721aa = Object.keys(_0bfdb7080f8f || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _0c0e2b0721aa ? String(_0bfdb7080f8f[_0c0e2b0721aa] || "") : "";
}
function _f5d2e5c233d2(_de2dc5c01436) {
  const _723b8e3aef63 = String(_de2dc5c01436);
  _63a6ed03ad5f.push(_723b8e3aef63);
  if (_706f8f142948) console.log(_723b8e3aef63);
}
function _221ecb99e661(value, size) {
  const _723b8e3aef63 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _723b8e3aef63.length > size ? _723b8e3aef63.slice(0, size) + "..." : _723b8e3aef63;
}
function _3f942308ccaa(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _2446151a6a3d(value, _4d338a92cefa, _be17c0bcdf22) {
  const _723b8e3aef63 = String(value || "");
  const _88314bd66446 = _723b8e3aef63.indexOf(_4d338a92cefa);
  if (_88314bd66446 < 0) return "";
  const _66a43ef06d80 = _88314bd66446 + _4d338a92cefa.length;
  const _f443087de457 = _723b8e3aef63.indexOf(_be17c0bcdf22, _66a43ef06d80);
  return _723b8e3aef63.slice(_66a43ef06d80, _f443087de457 < 0 ? _66a43ef06d80 + 16 : _f443087de457).trim();
}
function _652e90c6190b(value) { return _2446151a6a3d(value, _bda9ce84a342(["form", "hash", "="]), "&"); }
function _fb1f998383dc(value) {
  const _b8701f8f0ac2 = _bda9ce84a342(["layer", ".msg('"]);
  const _723b8e3aef63 = String(value || "");
  const _4d338a92cefa = _723b8e3aef63.indexOf(_b8701f8f0ac2);
  if (_4d338a92cefa < 0) return [];
  const _66a43ef06d80 = _4d338a92cefa + _b8701f8f0ac2.length;
  const _be17c0bcdf22 = _723b8e3aef63.indexOf("')", _66a43ef06d80);
  return _be17c0bcdf22 < 0 ? [] : [_723b8e3aef63.slice(_66a43ef06d80, _be17c0bcdf22)];
}
function _1646c3f17e0b(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _c80a7e09f5f0(ok, title, body) {
  if (_c48972a0b464.value) return;
  _c48972a0b464.value = true;
  _f5d2e5c233d2("━━━━━━━━ 执行结束 ━━━━━━━━");
  _f5d2e5c233d2(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _2d7937ffbb5c = typeof $notification !== "undefined";
  if (_8f226ac37c2f.notify_enabled !== false && _2d7937ffbb5c) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _221ecb99e661(body || _63a6ed03ad5f.join("\n"), 700));
  const _fe8e12dce443 = typeof $done === "function";
  if (_fe8e12dce443) $done({});
}
function _b81066561e9a(options, callback) {
  const _457d57e938b7 = String(options.method || "GET").toLowerCase();
  const _905c18bf8953 = $httpClient[_457d57e938b7] || $httpClient.get;
  const _40aa7f8c881d = { _d6e2a0d1a331: options.url, _0bfdb7080f8f: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _40aa7f8c881d[_bda9ce84a342(["auto", "-", "redirect"])] = true;
  _40aa7f8c881d[_bda9ce84a342(["auto", "-", "cookie"])] = true;
  _905c18bf8953(_40aa7f8c881d, (error, response, _fa494b025aef) => callback(error, response || {}, String(_fa494b025aef || "")));
}
function _09d9f0e98956(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _e70be4614c67 = _bda9ce84a342(["ht", "tps", "://"]);
const _ac938dc1fdad = [121, 99, 111, 111, 46, 110, 101, 116].map(_1bfae432d9ec => String.fromCharCode(_1bfae432d9ec)).join("");
function _3f4d2d308fc6(path) { return _e70be4614c67 + _ac938dc1fdad + String.fromCharCode(47) + String(path || ""); }
const _6f22253e7322 = _bda9ce84a342(["plu", "gin", ".", "php"]);
const _f4a0891a9140 = _bda9ce84a342(["k", "_", "mi", "sign"]);
const _3639d9cb091d = _bda9ce84a342(["view", "ui", "_", "lottery"]);
const _fb94c38b4876 = _bda9ce84a342(["jn", "farm"]);

function _b4c2278e5677(_0bfdb7080f8f, name) {
  const _6a9a5897836e = _9d6285b5dbdc(_0bfdb7080f8f, name);
  return Array.isArray(_6a9a5897836e) ? _6a9a5897836e.join(",") : String(_6a9a5897836e || "");
}
function _10a1c9fda59f(_1f740cd6fb49, extra) {
  const _01927836d81c = {};
  [_1f740cd6fb49, extra].join("; ").split(";").forEach(item => {
    const _723b8e3aef63 = item.trim();
    const _02690db85dba = _723b8e3aef63.indexOf("=");
    if (_02690db85dba > 0) _01927836d81c[_723b8e3aef63.slice(0, _02690db85dba)] = _723b8e3aef63.slice(_02690db85dba + 1);
  });
  return Object.keys(_01927836d81c).map(_0c0e2b0721aa => _0c0e2b0721aa + "=" + _01927836d81c[_0c0e2b0721aa]).join("; ");
}
function _cff42210107d() {
  try {
    const _18177886b5f8 = typeof $request !== "undefined" ? $request : {};
    const _8522a1f2d20b = typeof $response !== "undefined" ? $response : {};
    const _d6e2a0d1a331 = String(_18177886b5f8.url || "");
    const _dac64b4c15a9 = _b4c2278e5677(_18177886b5f8.headers, "Cookie");
    const _8a8405350380 = _b4c2278e5677(_8522a1f2d20b.headers, "Set-Cookie");
    const _24b93f1918f5 = _10a1c9fda59f(_dac64b4c15a9, "");
    const _154e0175df3b = _24b93f1918f5.split("; ").filter(Boolean);
    const _149fcb251dbf = Object.keys(_18177886b5f8.headers || {}).concat(Object.keys(_8522a1f2d20b.headers || {}));
    const _37a01761828c = _154e0175df3b.some(item => item.indexOf("auth=") >= 0);
    _f5d2e5c233d2("🧪 调试模式：开启");
    _f5d2e5c233d2("🍪 登录状态抓取");
    _f5d2e5c233d2("🌐 页面：" + _221ecb99e661(_d6e2a0d1a331, 180));
    _f5d2e5c233d2("📋 头名称：" + _149fcb251dbf.map(item => item.toLowerCase()).join(","));
    _f5d2e5c233d2("🔑 请求长度：" + _dac64b4c15a9.length + "，字段：" + _154e0175df3b.length);
    _f5d2e5c233d2("🏷️ 字段名：" + _154e0175df3b.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_37a01761828c) {
      _f5d2e5c233d2("ℹ️ 当前响应没有完整登录状态");
      return _c80a7e09f5f0(true, "", "");
    }
    const _5381573c3411 = _d26ef25b2ada("session");
    const _b466ce906a5d = Number(_d26ef25b2ada("notified") || 0);
    const _38664ebcf23b = _f3db3baf65a1("session", _24b93f1918f5);
    _f3db3baf65a1("updated", new Date().toISOString());
    _f5d2e5c233d2(_5381573c3411 === _24b93f1918f5 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _f5d2e5c233d2("💾 存储键：" + _ebb1d4e59ed4 + "，写入：" + _38664ebcf23b + "，回读长度：" + _d26ef25b2ada("session").length);
    if (_5381573c3411 !== _24b93f1918f5 && Date.now() - _b466ce906a5d > 60000) {
      _f3db3baf65a1("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _154e0175df3b.length + " 项 / " + _24b93f1918f5.length);
    }
    _c80a7e09f5f0(true, "", "");
  } catch (error) {
    _f5d2e5c233d2("❌ 登录状态异常：" + error);
    _c80a7e09f5f0(false, "登录状态失败", String(error));
  }
}
function _4f029c744112(callback) {
  const _24b93f1918f5 = _d26ef25b2ada("session");
  if (!_24b93f1918f5) return callback("missing");
  const _0bfdb7080f8f = {};
  _0bfdb7080f8f[_bda9ce84a342(["C", "ookie"])] = _24b93f1918f5;
  _0bfdb7080f8f[_bda9ce84a342(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _0bfdb7080f8f.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _b81066561e9a({ _d6e2a0d1a331: _3f4d2d308fc6("forum.php"), _0bfdb7080f8f }, (error, response, _fa494b025aef) => {
    if (error) return callback(error);
    if (_fa494b025aef.indexOf(_bda9ce84a342(["action", "=", "logout"])) < 0) return callback("expired");
    const _1bfae432d9ec = _652e90c6190b(_fa494b025aef);
    if (!_1bfae432d9ec) return callback("token");
    callback(null, { _0bfdb7080f8f, _1bfae432d9ec });
  });
}
function _e410ad583e3c(ctx, callback) {
  const _0bfdb7080f8f = Object.assign({}, ctx.headers);
  _0bfdb7080f8f.Referer = _3f4d2d308fc6(_bda9ce84a342([_f4a0891a9140, "-", "sign", ".", "html"]));
  _0bfdb7080f8f[_bda9ce84a342(["X", "-", "Requested", "-", "With"])] = _bda9ce84a342(["XML", "Http", "Request"]);
  _b81066561e9a({ _d6e2a0d1a331: _3f4d2d308fc6(_6f22253e7322 + "?id=" + _f4a0891a9140 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _0bfdb7080f8f }, (error, response, _fa494b025aef) => {
    _f5d2e5c233d2("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _366603eeeaa2 = _fa494b025aef.indexOf("今日已签") >= 0;
    const _7fb594236c03 = _366603eeeaa2 || _fa494b025aef.indexOf("<![CDATA[]]>") >= 0;
    _b81066561e9a({ _d6e2a0d1a331: _3f4d2d308fc6(_bda9ce84a342([_f4a0891a9140, "-", "sign", ".", "html"])), _0bfdb7080f8f: ctx.headers }, (error2, response2, page) => {
      const _031386660acd = _2446151a6a3d(page, "签到排名：", " ");
      const _e377a78e975f = _2446151a6a3d(page, 'id="lxtdays" value="', '"');
      const _cc42109156a1 = _2446151a6a3d(page, 'id="lxlevel" value="', '"');
      const _1c8425830e08 = _2446151a6a3d(page, 'id="lxreward" value="', '"');
      _f5d2e5c233d2(_366603eeeaa2 ? "ℹ️ 今日已经签到" : _7fb594236c03 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_031386660acd) _f5d2e5c233d2("🏆 当前排名：" + _031386660acd);
      if (_e377a78e975f) _f5d2e5c233d2("📆 累计天数：" + _e377a78e975f);
      if (_cc42109156a1) _f5d2e5c233d2("🏅 签到等级：LV." + _cc42109156a1);
      if (_1c8425830e08) _f5d2e5c233d2("💰 最近奖励：" + _1c8425830e08);
      callback([_366603eeeaa2 ? "ℹ️ 今日已签到" : _7fb594236c03 ? "✅ 签到成功" : "⚠️ 签到异常", _031386660acd ? "🏆 排名 " + _031386660acd : "", _e377a78e975f ? "📆 累计 " + _e377a78e975f + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _aa1bb9177cc3(ctx, callback) {
  const _0bfdb7080f8f = Object.assign({}, ctx.headers);
  _0bfdb7080f8f.Referer = _3f4d2d308fc6(_6f22253e7322 + "?id=" + _3639d9cb091d);
  _0bfdb7080f8f[_bda9ce84a342(["X", "-", "Requested", "-", "With"])] = _bda9ce84a342(["XML", "Http", "Request"]);
  _0bfdb7080f8f.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _1f740cd6fb49 = _3f4d2d308fc6(_6f22253e7322 + "?id=" + _3639d9cb091d + ":draw");
  const _896548a7c8c8 = ["🎰 幸运抽奖"];
  const _2e08127d8c5f = guard => {
    if (guard <= 0) { _896548a7c8c8.forEach(_f5d2e5c233d2); return callback(_896548a7c8c8.join("\n")); }
    _b81066561e9a({ _d6e2a0d1a331: _1f740cd6fb49 + "?drawnumber=1&inajax=1", _0bfdb7080f8f }, (error, response, _fa494b025aef) => {
      let _562b4bae823d = {};
      try { _562b4bae823d = JSON.parse(_fa494b025aef); } catch (ignored) {}
      const _50f139fb689c = String((_562b4bae823d.data || {})["2"] || "");
      if (error || _562b4bae823d.result !== "succeed" || _50f139fb689c.indexOf("抽奖券") < 0) {
        _896548a7c8c8.push("ℹ️ " + (error || _562b4bae823d.msg || "没有可用抽奖券"));
        _896548a7c8c8.forEach(_f5d2e5c233d2);
        return callback(_896548a7c8c8.join("\n"));
      }
      _b81066561e9a({ _d6e2a0d1a331: _1f740cd6fb49 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _0bfdb7080f8f }, (error2, response2, raw) => {
        let _6a1c33c45cc0 = {};
        try { _6a1c33c45cc0 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _6a1c33c45cc0.result !== "succeed") {
          _896548a7c8c8.push("⚠️ " + (error2 || _6a1c33c45cc0.msg || "抽奖失败"));
          _896548a7c8c8.forEach(_f5d2e5c233d2);
          return callback(_896548a7c8c8.join("\n"));
        }
        const _b4fc1f2f99d0 = (((_6a1c33c45cc0.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _88314bd66446 = String((_6a1c33c45cc0.data || {}).ticketnumber || "0");
        const _e4ae1a294f57 = String((_6a1c33c45cc0.data || {}).creditnumber || "");
        _896548a7c8c8.push("🎁 第 " + _896548a7c8c8.length + " 次：" + (_b4fc1f2f99d0.join("、") || _6a1c33c45cc0.msg || "成功"));
        _896548a7c8c8.push("🎟️ 剩余抽奖券：" + _88314bd66446 + (_e4ae1a294f57 ? "  💰 星币：" + _e4ae1a294f57 : ""));
        if (_88314bd66446 === "0") { _896548a7c8c8.forEach(_f5d2e5c233d2); return callback(_896548a7c8c8.join("\n")); }
        _2e08127d8c5f(guard - 1);
      });
    });
  };
  _2e08127d8c5f(10);
}
function _ecb41f7eaed2(ctx, callback) {
  const _0bfdb7080f8f = Object.assign({}, ctx.headers);
  _0bfdb7080f8f.Referer = _3f4d2d308fc6(_6f22253e7322 + "?id=" + _fb94c38b4876);
  _0bfdb7080f8f[_bda9ce84a342(["X", "-", "Requested", "-", "With"])] = _bda9ce84a342(["XML", "Http", "Request"]);
  const _1bbe6fe09b89 = ["🌾 农场与福利"];
  const _2434dc59332d = query => _3f4d2d308fc6(_6f22253e7322 + "?id=" + _fb94c38b4876 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _bd086d3940b7 = [
    ["每日免费领取", _bda9ce84a342(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _bda9ce84a342(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _0747874509e3 = 1; _0747874509e3 <= 8; _0747874509e3 += 1) _bd086d3940b7.push(["地块 " + _0747874509e3, _bda9ce84a342(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _0747874509e3]);
  const _397f2a64498a = _0747874509e3 => {
    if (_0747874509e3 >= _bd086d3940b7.length) { _1bbe6fe09b89.forEach(_f5d2e5c233d2); return callback(_1bbe6fe09b89.join("\n")); }
    const _996037286059 = _bd086d3940b7[_0747874509e3];
    _b81066561e9a({ _d6e2a0d1a331: _2434dc59332d(_996037286059[1]), _0bfdb7080f8f }, (error, response, _fa494b025aef) => {
      const _de2dc5c01436 = _fb1f998383dc(_fa494b025aef)[0] || _221ecb99e661(_3f942308ccaa(_fa494b025aef), 80);
      const _aeed32a45c2f = _1646c3f17e0b(_de2dc5c01436, ["成功", "完成", "可领取"]) ? "✅" : _1646c3f17e0b(_de2dc5c01436, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _1bbe6fe09b89.push(_aeed32a45c2f + " " + _996037286059[0] + "：" + (error || _de2dc5c01436 || "无返回"));
      const _c308af24d02b = _2446151a6a3d(_996037286059[1], "jfid=", "&");
      if (_c308af24d02b && _1646c3f17e0b(_fa494b025aef, ["已枯萎", "清除"])) {
        return _b81066561e9a({ _d6e2a0d1a331: _2434dc59332d(_bda9ce84a342(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _c308af24d02b), _0bfdb7080f8f }, (error2, response2, cleared) => {
          _1bbe6fe09b89.push((_1646c3f17e0b(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _c308af24d02b);
          _b81066561e9a({ _d6e2a0d1a331: _2434dc59332d(_bda9ce84a342(["do=", "plant", "seed", "&seed=1&jfid="]) + _c308af24d02b + "&timestamp=" + Math.floor(Date.now() / 1000)), _0bfdb7080f8f }, (error3, response3, planted) => {
            _1bbe6fe09b89.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _c308af24d02b + "：" + (_fb1f998383dc(planted)[0] || "无返回"));
            _397f2a64498a(_0747874509e3 + 1);
          });
        });
      }
      _397f2a64498a(_0747874509e3 + 1);
    });
  };
  _b81066561e9a({ _d6e2a0d1a331: _2434dc59332d(_bda9ce84a342(["do=", "normal", "&ac=", "kuo", "zhan"])), _0bfdb7080f8f }, (error, response, _fa494b025aef) => {
    _1bbe6fe09b89.push((_1646c3f17e0b(_fb1f998383dc(_fa494b025aef)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _fb1f998383dc(_fa494b025aef)[0] || "无返回"));
    _397f2a64498a(0);
  });
}
function _f2026e991d56() {
  _f5d2e5c233d2("🧪 调试模式：开启");
  _f5d2e5c233d2("🚀 论坛任务开始");
  _f5d2e5c233d2("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _f5d2e5c233d2("💾 存储键：" + _ebb1d4e59ed4 + "，登录状态长度：" + _d26ef25b2ada("session").length);
  _4f029c744112((error, ctx) => {
    if (error === "missing") return _c80a7e09f5f0(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _c80a7e09f5f0(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _c80a7e09f5f0(false, "论坛任务失败", String(error));
    _f5d2e5c233d2("🔐 登录状态有效");
    _e410ad583e3c(ctx, one => _aa1bb9177cc3(ctx, two => _ecb41f7eaed2(ctx, three => _c80a7e09f5f0(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_f5d2e5c233d2("🧪 调试模式：开启");
_f5d2e5c233d2("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _a9362badf800 = typeof $request !== "undefined";
if (_a9362badf800) _cff42210107d();
else _f2026e991d56();

})();
