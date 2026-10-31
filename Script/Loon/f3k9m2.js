/*8ef1a61e04e3*/
(function(){
const _9a33564c6e0c = typeof $argument === "object" && $argument ? $argument : {};
const _91e2387efcd9 = $persistentStore;
const _b4940a83e3f1 = "f3k9m2_store";
const _8d0c157eb1c5 = true;
const _530d576468e9 = { value: false };
const _09bda585b344 = [];
const _c63f7962c492 = values => values.join("");

function _4ad8585358d0() {
  try { return JSON.parse(_91e2387efcd9.read(_b4940a83e3f1) || "{}") || {}; }
  catch (error) { return {}; }
}
function _5bb68cbdce22(_4c230ec43220) { return _91e2387efcd9.write(JSON.stringify(_4c230ec43220), _b4940a83e3f1); }
function _1dfc92d7e486(name) { return String(_4ad8585358d0()[name] || ""); }
function _df06be28b44c(name, value) {
  const _4c230ec43220 = _4ad8585358d0();
  if (value == null) delete _4c230ec43220[name];
  else _4c230ec43220[name] = String(value);
  return _5bb68cbdce22(_4c230ec43220);
}
function _61de94942de0(_e4df71e2a7f9, name) {
  const _8add33e333c5 = Object.keys(_e4df71e2a7f9 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _8add33e333c5 ? String(_e4df71e2a7f9[_8add33e333c5] || "") : "";
}
function _0cc95fbcc7d4(_89ad86888f1f) {
  const _ba9a264e7226 = String(_89ad86888f1f);
  _09bda585b344.push(_ba9a264e7226);
  if (_8d0c157eb1c5) console.log(_ba9a264e7226);
}
function _38b431904429(value, size) {
  const _ba9a264e7226 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _ba9a264e7226.length > size ? _ba9a264e7226.slice(0, size) + "..." : _ba9a264e7226;
}
function _fd207cf3b6c2(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _a33bcfa69048(value, _c0e9f5ab9b49, _cf4be1d900eb) {
  const _ba9a264e7226 = String(value || "");
  const _036cc5364f7e = _ba9a264e7226.indexOf(_c0e9f5ab9b49);
  if (_036cc5364f7e < 0) return "";
  const _9218add389bc = _036cc5364f7e + _c0e9f5ab9b49.length;
  const _79113f2a2df4 = _ba9a264e7226.indexOf(_cf4be1d900eb, _9218add389bc);
  return _ba9a264e7226.slice(_9218add389bc, _79113f2a2df4 < 0 ? _9218add389bc + 16 : _79113f2a2df4).trim();
}
function _2b775b9b14c9(value) { return _a33bcfa69048(value, _c63f7962c492(["form", "hash", "="]), "&"); }
function _b07019c9b3de(value) {
  const _450b3766ecb0 = _c63f7962c492(["layer", ".msg('"]);
  const _ba9a264e7226 = String(value || "");
  const _c0e9f5ab9b49 = _ba9a264e7226.indexOf(_450b3766ecb0);
  if (_c0e9f5ab9b49 < 0) return [];
  const _9218add389bc = _c0e9f5ab9b49 + _450b3766ecb0.length;
  const _cf4be1d900eb = _ba9a264e7226.indexOf("')", _9218add389bc);
  return _cf4be1d900eb < 0 ? [] : [_ba9a264e7226.slice(_9218add389bc, _cf4be1d900eb)];
}
function _978012864abf(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _3d093a72ec5b(ok, title, body) {
  if (_530d576468e9.value) return;
  _530d576468e9.value = true;
  _0cc95fbcc7d4("━━━━━━━━ 执行结束 ━━━━━━━━");
  _0cc95fbcc7d4(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _30992aa46c1f = typeof $notification !== "undefined";
  if (_9a33564c6e0c.notify_enabled !== false && _30992aa46c1f) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _38b431904429(body || _09bda585b344.join("\n"), 700));
  const _f161a9567270 = typeof $done === "function";
  if (_f161a9567270) $done({});
}
function _8ffd444ecddf(options, callback, attempt) {
  const _150ca1cdc6f8 = String(options.method || "GET").toLowerCase();
  const _8e8df23b8218 = $httpClient[_150ca1cdc6f8] || $httpClient.get;
  const _a03674d2605e = {};
  _a03674d2605e["url"] = String(options.url || "");
  _a03674d2605e["headers"] = options.headers || {};
  _a03674d2605e["body"] = options.body || "";
  _a03674d2605e["timeout"] = options.timeout || 20000;
  _a03674d2605e["auto-redirect"] = true;
  _a03674d2605e["auto-cookie"] = true;
  _a03674d2605e["alpn"] = "h2";
  _0cc95fbcc7d4("🌐 请求：" + _a03674d2605e["url"]);
  _8e8df23b8218(_a03674d2605e, (error, response, _4c230ec43220) => {
    const _ba9a264e7226 = String(error || "");
    if (_ba9a264e7226 && (attempt || 0) < 2 && (_ba9a264e7226.indexOf("closed") >= 0 || _ba9a264e7226.indexOf("timed out") >= 0)) {
      _0cc95fbcc7d4("🔁 连接中断，正在重试");
      return _8ffd444ecddf(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_4c230ec43220 || ""));
  });
}
function _21f88a74bcdc(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _42f66af6a4f1 = _c63f7962c492(["ht", "tps", "://"]);
const _f4ee44b403d9 = [121, 99, 111, 111, 46, 110, 101, 116].map(_76f9c8f26b43 => String.fromCharCode(_76f9c8f26b43)).join("");
function _4785c0002e4e(path) { return _42f66af6a4f1 + _f4ee44b403d9 + String.fromCharCode(47) + String(path || ""); }
const _8d2c38d240b6 = _c63f7962c492(["plu", "gin", ".", "php"]);
const _fd85b31cd520 = _c63f7962c492(["k", "_", "mi", "sign"]);
const _d4ecd1ac02c9 = _c63f7962c492(["view", "ui", "_", "lottery"]);
const _4bba7c7dfea1 = _c63f7962c492(["jn", "farm"]);

function _195f5e6ddb49(_e4df71e2a7f9, name) {
  const _3d600584df4d = _61de94942de0(_e4df71e2a7f9, name);
  return Array.isArray(_3d600584df4d) ? _3d600584df4d.join(",") : String(_3d600584df4d || "");
}
function _44448311c532(value) {
  const _ba9a264e7226 = String(value || "");
  const _791484989745 = (_ba9a264e7226.match(/;/g) || []).length;
  const _66aeaaef3c4c = (_ba9a264e7226.match(/,/g) || []).length;
  const _8c72d334d158 = _66aeaaef3c4c > _791484989745 ? "," : ";";
  return _ba9a264e7226.split(_8c72d334d158).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _1b7eb5f92094(_062224c6da08, extra) {
  const _cfe5fd8e6315 = {};
  _44448311c532(_062224c6da08).concat(_44448311c532(extra)).forEach(item => {
    const _15e5cd8debe9 = item.indexOf("=");
    _cfe5fd8e6315[item.slice(0, _15e5cd8debe9)] = item.slice(_15e5cd8debe9 + 1);
  });
  return Object.keys(_cfe5fd8e6315).map(_8add33e333c5 => _8add33e333c5 + "=" + _cfe5fd8e6315[_8add33e333c5]).join("; ");
}
function _5ae2fc4e8f27() {
  try {
    const _6de904e53a31 = typeof $request !== "undefined" ? $request : {};
    const _ae083ad34cd7 = typeof $response !== "undefined" ? $response : {};
    const _3c2a2247bff4 = String(_6de904e53a31.url || "");
    const _02f0609a5819 = _195f5e6ddb49(_6de904e53a31.headers, "Cookie");
    const _0b5c0c375556 = _195f5e6ddb49(_ae083ad34cd7.headers, "Set-Cookie");
    const _1c48c07622bf = _1b7eb5f92094(_02f0609a5819, "");
    const _e03b011253a8 = _1c48c07622bf.split("; ").filter(Boolean);
    const _b1ac4de06ade = Object.keys(_6de904e53a31.headers || {}).concat(Object.keys(_ae083ad34cd7.headers || {}));
    const _adf5fca2b250 = _e03b011253a8.some(item => item.indexOf("auth=") >= 0);
    _0cc95fbcc7d4("🧪 调试模式：开启");
    _0cc95fbcc7d4("🍪 登录状态抓取");
    _0cc95fbcc7d4("🌐 页面：" + _38b431904429(_3c2a2247bff4, 180));
    _0cc95fbcc7d4("📋 头名称：" + _b1ac4de06ade.map(item => item.toLowerCase()).join(","));
    _0cc95fbcc7d4("🔑 请求长度：" + _02f0609a5819.length + "，字段：" + _e03b011253a8.length);
    _0cc95fbcc7d4("🏷️ 字段名：" + _e03b011253a8.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_adf5fca2b250) {
      _0cc95fbcc7d4("ℹ️ 当前响应没有完整登录状态");
      return _3d093a72ec5b(true, "", "");
    }
    const _77ad53edd36d = _1dfc92d7e486("session");
    const _7a5560b0d89e = Number(_1dfc92d7e486("notified") || 0);
    const _3075fcafdec6 = _df06be28b44c("session", _1c48c07622bf);
    _df06be28b44c("updated", new Date().toISOString());
    _0cc95fbcc7d4(_77ad53edd36d === _1c48c07622bf ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _0cc95fbcc7d4("💾 存储键：" + _b4940a83e3f1 + "，写入：" + _3075fcafdec6 + "，回读长度：" + _1dfc92d7e486("session").length);
    if (_77ad53edd36d !== _1c48c07622bf && Date.now() - _7a5560b0d89e > 60000) {
      _df06be28b44c("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _e03b011253a8.length + " 项 / " + _1c48c07622bf.length);
    }
    _3d093a72ec5b(true, "", "");
  } catch (error) {
    _0cc95fbcc7d4("❌ 登录状态异常：" + error);
    _3d093a72ec5b(false, "登录状态失败", String(error));
  }
}
function _91abfff3f117(callback) {
  const _1c48c07622bf = _1dfc92d7e486("session");
  if (!_1c48c07622bf) return callback("missing");
  const _e4df71e2a7f9 = {};
  _e4df71e2a7f9[_c63f7962c492(["C", "ookie"])] = _1c48c07622bf;
  _e4df71e2a7f9[_c63f7962c492(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _e4df71e2a7f9.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _8ffd444ecddf({ url: _4785c0002e4e("forum.php"), _e4df71e2a7f9 }, (error, response, _4c230ec43220) => {
    if (error) return callback(error);
    if (_4c230ec43220.indexOf(_c63f7962c492(["action", "=", "logout"])) < 0) return callback("expired");
    const _76f9c8f26b43 = _2b775b9b14c9(_4c230ec43220);
    if (!_76f9c8f26b43) return callback("token");
    callback(null, { _e4df71e2a7f9, _76f9c8f26b43 });
  });
}
function _d5738ed920ba(ctx, callback) {
  const _e4df71e2a7f9 = Object.assign({}, ctx.headers);
  _e4df71e2a7f9.Referer = _4785c0002e4e(_c63f7962c492([_fd85b31cd520, "-", "sign", ".", "html"]));
  _e4df71e2a7f9[_c63f7962c492(["X", "-", "Requested", "-", "With"])] = _c63f7962c492(["XML", "Http", "Request"]);
  _8ffd444ecddf({ url: _4785c0002e4e(_8d2c38d240b6 + "?id=" + _fd85b31cd520 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _e4df71e2a7f9 }, (error, response, _4c230ec43220) => {
    _0cc95fbcc7d4("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _a25d103b432e = _4c230ec43220.indexOf("今日已签") >= 0;
    const _07d6fc310bd9 = _a25d103b432e || _4c230ec43220.indexOf("<![CDATA[]]>") >= 0;
    _8ffd444ecddf({ url: _4785c0002e4e(_c63f7962c492([_fd85b31cd520, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _a9ad15de6309 = _a33bcfa69048(page, "签到排名：", " ");
      const _11e48d72cce1 = _a33bcfa69048(page, 'id="lxtdays" value="', '"');
      const _a17bff654f52 = _a33bcfa69048(page, 'id="lxlevel" value="', '"');
      const _1815282a0184 = _a33bcfa69048(page, 'id="lxreward" value="', '"');
      _0cc95fbcc7d4(_a25d103b432e ? "ℹ️ 今日已经签到" : _07d6fc310bd9 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_a9ad15de6309) _0cc95fbcc7d4("🏆 当前排名：" + _a9ad15de6309);
      if (_11e48d72cce1) _0cc95fbcc7d4("📆 累计天数：" + _11e48d72cce1);
      if (_a17bff654f52) _0cc95fbcc7d4("🏅 签到等级：LV." + _a17bff654f52);
      if (_1815282a0184) _0cc95fbcc7d4("💰 最近奖励：" + _1815282a0184);
      callback([_a25d103b432e ? "ℹ️ 今日已签到" : _07d6fc310bd9 ? "✅ 签到成功" : "⚠️ 签到异常", _a9ad15de6309 ? "🏆 排名 " + rank : "", _11e48d72cce1 ? "📆 累计 " + _11e48d72cce1 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _16053f2d8960(ctx, callback) {
  const _e4df71e2a7f9 = Object.assign({}, ctx.headers);
  _e4df71e2a7f9.Referer = _4785c0002e4e(_8d2c38d240b6 + "?id=" + _d4ecd1ac02c9);
  _e4df71e2a7f9[_c63f7962c492(["X", "-", "Requested", "-", "With"])] = _c63f7962c492(["XML", "Http", "Request"]);
  _e4df71e2a7f9.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _062224c6da08 = _4785c0002e4e(_8d2c38d240b6 + "?id=" + _d4ecd1ac02c9 + ":draw");
  const _f74a619dcbfc = ["🎰 幸运抽奖"];
  const _faccb9320da0 = guard => {
    if (guard <= 0) { _f74a619dcbfc.forEach(_0cc95fbcc7d4); return callback(_f74a619dcbfc.join("\n")); }
    _8ffd444ecddf({ url: _062224c6da08 + "?drawnumber=1&inajax=1", _e4df71e2a7f9 }, (error, response, _4c230ec43220) => {
      let _fe4fa4c1b252 = {};
      try { _fe4fa4c1b252 = JSON.parse(_4c230ec43220); } catch (ignored) {}
      const _09cd95b52387 = String((_fe4fa4c1b252.data || {})["2"] || "");
      if (error || _fe4fa4c1b252.result !== "succeed" || _09cd95b52387.indexOf("抽奖券") < 0) {
        _f74a619dcbfc.push("ℹ️ " + (error || _fe4fa4c1b252.msg || "没有可用抽奖券"));
        _f74a619dcbfc.forEach(_0cc95fbcc7d4);
        return callback(_f74a619dcbfc.join("\n"));
      }
      _8ffd444ecddf({ url: _062224c6da08 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _e4df71e2a7f9 }, (error2, response2, raw) => {
        let _e8e52f67683a = {};
        try { _e8e52f67683a = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _e8e52f67683a.result !== "succeed") {
          _f74a619dcbfc.push("⚠️ " + (error2 || _e8e52f67683a.msg || "抽奖失败"));
          _f74a619dcbfc.forEach(_0cc95fbcc7d4);
          return callback(_f74a619dcbfc.join("\n"));
        }
        const _9e1ef1a5528f = (((_e8e52f67683a.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _036cc5364f7e = String((_e8e52f67683a.data || {}).ticketnumber || "0");
        const _9fb55b7e383b = String((_e8e52f67683a.data || {}).creditnumber || "");
        _f74a619dcbfc.push("🎁 第 " + _f74a619dcbfc.length + " 次：" + (_9e1ef1a5528f.join("、") || _e8e52f67683a.msg || "成功"));
        _f74a619dcbfc.push("🎟️ 剩余抽奖券：" + _036cc5364f7e + (_9fb55b7e383b ? "  💰 星币：" + credit : ""));
        if (_036cc5364f7e === "0") { _f74a619dcbfc.forEach(_0cc95fbcc7d4); return callback(_f74a619dcbfc.join("\n")); }
        _faccb9320da0(guard - 1);
      });
    });
  };
  _faccb9320da0(10);
}
function _bda4b8aeff56(ctx, callback) {
  const _e4df71e2a7f9 = Object.assign({}, ctx.headers);
  _e4df71e2a7f9.Referer = _4785c0002e4e(_8d2c38d240b6 + "?id=" + _4bba7c7dfea1);
  _e4df71e2a7f9[_c63f7962c492(["X", "-", "Requested", "-", "With"])] = _c63f7962c492(["XML", "Http", "Request"]);
  const _451165e7f92f = ["🌾 农场与福利"];
  const _9d1b60338048 = query => _4785c0002e4e(_8d2c38d240b6 + "?id=" + _4bba7c7dfea1 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _4511d04b98be = [
    ["每日免费领取", _c63f7962c492(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _c63f7962c492(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _b30e3f08fcd5 = 1; _b30e3f08fcd5 <= 8; _b30e3f08fcd5 += 1) _4511d04b98be.push(["地块 " + _b30e3f08fcd5, _c63f7962c492(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _b30e3f08fcd5]);
  const _03ccc3bdd444 = _b30e3f08fcd5 => {
    if (_b30e3f08fcd5 >= _4511d04b98be.length) { _451165e7f92f.forEach(_0cc95fbcc7d4); return callback(_451165e7f92f.join("\n")); }
    const _12217bf6db25 = _4511d04b98be[_b30e3f08fcd5];
    _8ffd444ecddf({ url: _9d1b60338048(_12217bf6db25[1]), _e4df71e2a7f9 }, (error, response, _4c230ec43220) => {
      const _89ad86888f1f = _b07019c9b3de(_4c230ec43220)[0] || _38b431904429(_fd207cf3b6c2(_4c230ec43220), 80);
      const _5939dcc0a6b4 = _978012864abf(_89ad86888f1f, ["成功", "完成", "可领取"]) ? "✅" : _978012864abf(_89ad86888f1f, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _451165e7f92f.push(_5939dcc0a6b4 + " " + _12217bf6db25[0] + "：" + (error || _89ad86888f1f || "无返回"));
      const _13691ce61534 = _a33bcfa69048(_12217bf6db25[1], "jfid=", "&");
      if (_13691ce61534 && _978012864abf(_4c230ec43220, ["已枯萎", "清除"])) {
        return _8ffd444ecddf({ url: _9d1b60338048(_c63f7962c492(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _13691ce61534), _e4df71e2a7f9 }, (error2, response2, cleared) => {
          _451165e7f92f.push((_978012864abf(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _13691ce61534);
          _8ffd444ecddf({ url: _9d1b60338048(_c63f7962c492(["do=", "plant", "seed", "&seed=1&jfid="]) + _13691ce61534 + "&timestamp=" + Math.floor(Date.now() / 1000)), _e4df71e2a7f9 }, (error3, response3, planted) => {
            _451165e7f92f.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _13691ce61534 + "：" + (_b07019c9b3de(planted)[0] || "无返回"));
            _03ccc3bdd444(_b30e3f08fcd5 + 1);
          });
        });
      }
      _03ccc3bdd444(_b30e3f08fcd5 + 1);
    });
  };
  _8ffd444ecddf({ url: _9d1b60338048(_c63f7962c492(["do=", "normal", "&ac=", "kuo", "zhan"])), _e4df71e2a7f9 }, (error, response, _4c230ec43220) => {
    _451165e7f92f.push((_978012864abf(_b07019c9b3de(_4c230ec43220)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _b07019c9b3de(_4c230ec43220)[0] || "无返回"));
    _03ccc3bdd444(0);
  });
}
function _d53433668211() {
  _0cc95fbcc7d4("🧪 调试模式：开启");
  _0cc95fbcc7d4("🚀 论坛任务开始");
  _0cc95fbcc7d4("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _0cc95fbcc7d4("💾 存储键：" + _b4940a83e3f1 + "，登录状态长度：" + _1dfc92d7e486("session").length);
  _91abfff3f117((error, ctx) => {
    if (error === "missing") return _3d093a72ec5b(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _3d093a72ec5b(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _3d093a72ec5b(false, "论坛任务失败", String(error));
    _0cc95fbcc7d4("🔐 登录状态有效");
    _d5738ed920ba(ctx, one => _16053f2d8960(ctx, two => _bda4b8aeff56(ctx, three => _3d093a72ec5b(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_0cc95fbcc7d4("🧪 调试模式：开启");
_0cc95fbcc7d4("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _73fad9b413bb = typeof $request !== "undefined";
if (_73fad9b413bb) _5ae2fc4e8f27();
else _d53433668211();

})();
