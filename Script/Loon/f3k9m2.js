/*236cc0646962*/
(function(){
const _dfc29f464e8c = typeof $argument === "object" && $argument ? $argument : {};
const _aac704cd8445 = $persistentStore;
const _c4bf04586878 = "f3k9m2_store";
const _2819133d727c = true;
const _1be719292b50 = { value: false };
const _e1e8d793779d = [];
const _6c99ddcec2df = values => values.join("");

function _c9732e9a68e0() {
  try { return JSON.parse(_aac704cd8445.read(_c4bf04586878) || "{}") || {}; }
  catch (error) { return {}; }
}
function _59b9a5633dbf(_f4ecc667142a) { return _aac704cd8445.write(JSON.stringify(_f4ecc667142a), _c4bf04586878); }
function _fb4d27da9e6c(name) { return String(_c9732e9a68e0()[name] || ""); }
function _581029a568c8(name, value) {
  const _f4ecc667142a = _c9732e9a68e0();
  if (value == null) delete _f4ecc667142a[name];
  else _f4ecc667142a[name] = String(value);
  return _59b9a5633dbf(_f4ecc667142a);
}
function _531ecbd1a3b9(_8f3a22fe6f4d, name) {
  const _a4bb26aadf27 = Object.keys(_8f3a22fe6f4d || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _a4bb26aadf27 ? String(_8f3a22fe6f4d[_a4bb26aadf27] || "") : "";
}
function _ccebeec9eb64(_eefad3ee373e) {
  const _79d39495dcfa = String(_eefad3ee373e);
  _e1e8d793779d.push(_79d39495dcfa);
  if (_2819133d727c) console.log(_79d39495dcfa);
}
function _b3737bffd389(value, size) {
  const _79d39495dcfa = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _79d39495dcfa.length > size ? _79d39495dcfa.slice(0, size) + "..." : _79d39495dcfa;
}
function _246f23876eb9(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _809375f5182e(value, _3e498af6f1de, _0bb991855502) {
  const _79d39495dcfa = String(value || "");
  const _5aa783747d86 = _79d39495dcfa.indexOf(_3e498af6f1de);
  if (_5aa783747d86 < 0) return "";
  const _06c05938d58b = _5aa783747d86 + _3e498af6f1de.length;
  const _5c441c66a1bd = _79d39495dcfa.indexOf(_0bb991855502, _06c05938d58b);
  return _79d39495dcfa.slice(_06c05938d58b, _5c441c66a1bd < 0 ? _06c05938d58b + 16 : _5c441c66a1bd).trim();
}
function _fc68c5c10b2f(value) { return _809375f5182e(value, _6c99ddcec2df(["form", "hash", "="]), "&"); }
function _0564483f65ad(value) {
  const _3bb7cc772811 = _6c99ddcec2df(["layer", ".msg('"]);
  const _79d39495dcfa = String(value || "");
  const _3e498af6f1de = _79d39495dcfa.indexOf(_3bb7cc772811);
  if (_3e498af6f1de < 0) return [];
  const _06c05938d58b = _3e498af6f1de + _3bb7cc772811.length;
  const _0bb991855502 = _79d39495dcfa.indexOf("')", _06c05938d58b);
  return _0bb991855502 < 0 ? [] : [_79d39495dcfa.slice(_06c05938d58b, _0bb991855502)];
}
function _df997a78cad7(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _fd58400feb44(ok, title, body) {
  if (_1be719292b50.value) return;
  _1be719292b50.value = true;
  _ccebeec9eb64("━━━━━━━━ 执行结束 ━━━━━━━━");
  _ccebeec9eb64(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _f5f649a88178 = typeof $notification !== "undefined";
  if (_dfc29f464e8c.notify_enabled !== false && _f5f649a88178) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _b3737bffd389(body || _e1e8d793779d.join("\n"), 700));
  const _c6176550d75f = typeof $done === "function";
  if (_c6176550d75f) $done({});
}
function _66bce2ee5f30(options, callback, attempt) {
  const _4358a1c412c9 = String(options.method || "GET").toLowerCase();
  const _2513d5c8b683 = $httpClient[_4358a1c412c9] || $httpClient.get;
  const _2ff3e00840a7 = {};
  _2ff3e00840a7["url"] = String(options.url || "");
  _2ff3e00840a7["headers"] = options.headers || {};
  _2ff3e00840a7["body"] = options.body || "";
  _2ff3e00840a7["timeout"] = options.timeout || 20000;
  _2ff3e00840a7["auto-redirect"] = true;
  _2ff3e00840a7["auto-cookie"] = true;
  _2ff3e00840a7["alpn"] = "h2";
  _ccebeec9eb64("🌐 请求：" + _2ff3e00840a7["url"]);
  _2513d5c8b683(_2ff3e00840a7, (error, response, _f4ecc667142a) => {
    const _79d39495dcfa = String(error || "");
    if (_79d39495dcfa && (attempt || 0) < 2 && (_79d39495dcfa.indexOf("closed") >= 0 || _79d39495dcfa.indexOf("timed out") >= 0)) {
      _ccebeec9eb64("🔁 连接中断，正在重试");
      return _66bce2ee5f30(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_f4ecc667142a || ""));
  });
}
function _d61aace05c0d(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _1917aa52c72f = _6c99ddcec2df(["ht", "tps", "://"]);
const _3a943ee755b8 = [121, 99, 111, 111, 46, 110, 101, 116].map(_95b89a491f07 => String.fromCharCode(_95b89a491f07)).join("");
function _258bd8142f03(path) { return _1917aa52c72f + _3a943ee755b8 + String.fromCharCode(47) + String(path || ""); }
const _66c54a1ef2fa = _6c99ddcec2df(["plu", "gin", ".", "php"]);
const _8a69dc25c750 = _6c99ddcec2df(["k", "_", "mi", "sign"]);
const _0d7de42da487 = _6c99ddcec2df(["view", "ui", "_", "lottery"]);
const _5b82a5f1ce85 = _6c99ddcec2df(["jn", "farm"]);

function _a62b357c83f9(_8f3a22fe6f4d, name) {
  const _72f9fbd04ed6 = _531ecbd1a3b9(_8f3a22fe6f4d, name);
  return Array.isArray(_72f9fbd04ed6) ? _72f9fbd04ed6.join(",") : String(_72f9fbd04ed6 || "");
}
function _8e071dd7cda2(value) {
  const _79d39495dcfa = String(value || "");
  const _4608869dc602 = (_79d39495dcfa.match(/;/g) || []).length;
  const _fe2cbd60e6e6 = (_79d39495dcfa.match(/,/g) || []).length;
  const _5a33ed603683 = _fe2cbd60e6e6 > _4608869dc602 ? "," : ";";
  return _79d39495dcfa.split(_5a33ed603683).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _344589a0c214(_c727b706a45f, extra) {
  const _94f59f5f03ee = {};
  _8e071dd7cda2(_c727b706a45f).concat(_8e071dd7cda2(extra)).forEach(item => {
    const _abeaf0803420 = item.indexOf("=");
    _94f59f5f03ee[item.slice(0, _abeaf0803420)] = item.slice(_abeaf0803420 + 1);
  });
  return Object.keys(_94f59f5f03ee).map(_a4bb26aadf27 => _a4bb26aadf27 + "=" + _94f59f5f03ee[_a4bb26aadf27]).join("; ");
}
function _520e32b9d225() {
  try {
    const _65a8f3f8ad4f = typeof $request !== "undefined" ? $request : {};
    const _c1160db372d6 = typeof $response !== "undefined" ? $response : {};
    const _f86da40dcd64 = String(_65a8f3f8ad4f.url || "");
    const _d137823a2c2a = _a62b357c83f9(_65a8f3f8ad4f.headers, "Cookie");
    const _a90d806c8512 = _a62b357c83f9(_c1160db372d6.headers, "Set-Cookie");
    const _920acad9112a = _344589a0c214(_d137823a2c2a, "");
    const _a650aa4a4e1e = _920acad9112a.split("; ").filter(Boolean);
    const _f4807a90d450 = Object.keys(_65a8f3f8ad4f.headers || {}).concat(Object.keys(_c1160db372d6.headers || {}));
    const _8130163811e8 = _a650aa4a4e1e.some(item => item.indexOf("auth=") >= 0);
    _ccebeec9eb64("🧪 调试模式：开启");
    _ccebeec9eb64("🍪 登录状态抓取");
    _ccebeec9eb64("🌐 页面：" + _b3737bffd389(_f86da40dcd64, 180));
    _ccebeec9eb64("📋 头名称：" + _f4807a90d450.map(item => item.toLowerCase()).join(","));
    _ccebeec9eb64("🔑 请求长度：" + _d137823a2c2a.length + "，字段：" + _a650aa4a4e1e.length);
    _ccebeec9eb64("🏷️ 字段名：" + _a650aa4a4e1e.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_8130163811e8) {
      _ccebeec9eb64("ℹ️ 当前响应没有完整登录状态");
      return _fd58400feb44(true, "", "");
    }
    const _fa8160f8f0ef = _fb4d27da9e6c("session");
    const _6aab2968c675 = Number(_fb4d27da9e6c("notified") || 0);
    const _5c96c116e23c = _581029a568c8("session", _920acad9112a);
    _581029a568c8("updated", new Date().toISOString());
    _ccebeec9eb64(_fa8160f8f0ef === _920acad9112a ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _ccebeec9eb64("💾 存储键：" + _c4bf04586878 + "，写入：" + _5c96c116e23c + "，回读长度：" + _fb4d27da9e6c("session").length);
    if (_fa8160f8f0ef !== _920acad9112a && Date.now() - _6aab2968c675 > 60000) {
      _581029a568c8("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _a650aa4a4e1e.length + " 项 / " + _920acad9112a.length);
    }
    _fd58400feb44(true, "", "");
  } catch (error) {
    _ccebeec9eb64("❌ 登录状态异常：" + error);
    _fd58400feb44(false, "登录状态失败", String(error));
  }
}
function _4a52df2f588c(callback) {
  const _920acad9112a = _fb4d27da9e6c("session");
  if (!_920acad9112a) return callback("missing");
  const _8f3a22fe6f4d = {};
  _8f3a22fe6f4d[_6c99ddcec2df(["C", "ookie"])] = _920acad9112a;
  _8f3a22fe6f4d[_6c99ddcec2df(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _8f3a22fe6f4d.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _66bce2ee5f30({ url: _258bd8142f03("forum.php"), _8f3a22fe6f4d }, (error, response, _f4ecc667142a) => {
    if (error) return callback(error);
    if (_f4ecc667142a.indexOf(_6c99ddcec2df(["action", "=", "logout"])) < 0) return callback("expired");
    const _95b89a491f07 = _fc68c5c10b2f(_f4ecc667142a);
    if (!_95b89a491f07) return callback("token");
    callback(null, { _8f3a22fe6f4d, _95b89a491f07 });
  });
}
function _b268fca41f38(ctx, callback) {
  const _8f3a22fe6f4d = Object.assign({}, ctx.headers);
  _8f3a22fe6f4d.Referer = _258bd8142f03(_6c99ddcec2df([_8a69dc25c750, "-", "sign", ".", "html"]));
  _8f3a22fe6f4d[_6c99ddcec2df(["X", "-", "Requested", "-", "With"])] = _6c99ddcec2df(["XML", "Http", "Request"]);
  _66bce2ee5f30({ url: _258bd8142f03(_66c54a1ef2fa + "?id=" + _8a69dc25c750 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _8f3a22fe6f4d }, (error, response, _f4ecc667142a) => {
    _ccebeec9eb64("📅 每日签到请求");
    if (error) return callback("❌ 请求失败：" + error);
    const _f591281839ed = _f4ecc667142a.indexOf("今日已签") >= 0;
    const _42cf1619a88f = _f591281839ed || _f4ecc667142a.indexOf("<![CDATA[]]>") >= 0;
    _66bce2ee5f30({ url: _258bd8142f03(_6c99ddcec2df([_8a69dc25c750, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _04fb616e386d = _809375f5182e(page, "签到排名：", " ");
      const _e1a78ef33984 = _809375f5182e(page, 'id="lxtdays" value="', '"');
      const _eeb900a44f99 = _809375f5182e(page, 'id="lxlevel" value="', '"');
      const _00dc7c97d81e = _809375f5182e(page, 'id="lxreward" value="', '"');
      _ccebeec9eb64(_f591281839ed ? "ℹ️ 今日已经签到" : _42cf1619a88f ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_04fb616e386d) _ccebeec9eb64("🏆 当前排名：" + _04fb616e386d);
      if (_e1a78ef33984) _ccebeec9eb64("📆 累计天数：" + _e1a78ef33984);
      if (_eeb900a44f99) _ccebeec9eb64("🏅 签到等级：LV." + _eeb900a44f99);
      if (_00dc7c97d81e) _ccebeec9eb64("💰 最近奖励：" + _00dc7c97d81e);
      callback([_f591281839ed ? "ℹ️ 今日已签到" : _42cf1619a88f ? "✅ 签到成功" : "⚠️ 签到异常", _04fb616e386d ? "🏆 排名 " + rank : "", _e1a78ef33984 ? "📆 累计 " + _e1a78ef33984 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _31a5ff0c877c(ctx, callback) {
  const _8f3a22fe6f4d = Object.assign({}, ctx.headers);
  _8f3a22fe6f4d.Referer = _258bd8142f03(_66c54a1ef2fa + "?id=" + _0d7de42da487);
  _8f3a22fe6f4d[_6c99ddcec2df(["X", "-", "Requested", "-", "With"])] = _6c99ddcec2df(["XML", "Http", "Request"]);
  _8f3a22fe6f4d.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _c727b706a45f = _258bd8142f03(_66c54a1ef2fa + "?id=" + _0d7de42da487 + ":draw");
  const _69f8173a887c = ["🎰 幸运抽奖"];
  const _fda682d6dfff = guard => {
    if (guard <= 0) { _69f8173a887c.forEach(_ccebeec9eb64); return callback(_69f8173a887c.join("\n")); }
    _66bce2ee5f30({ url: _c727b706a45f + "?drawnumber=1&inajax=1", _8f3a22fe6f4d }, (error, response, _f4ecc667142a) => {
      let _d8a3e13d1744 = {};
      try { _d8a3e13d1744 = JSON.parse(_f4ecc667142a); } catch (ignored) {}
      const _2cd455fdbcf6 = String((_d8a3e13d1744.data || {})["2"] || "");
      if (error || _d8a3e13d1744.result !== "succeed" || _2cd455fdbcf6.indexOf("抽奖券") < 0) {
        _69f8173a887c.push("ℹ️ " + (error || _d8a3e13d1744.msg || "没有可用抽奖券"));
        _69f8173a887c.forEach(_ccebeec9eb64);
        return callback(_69f8173a887c.join("\n"));
      }
      _66bce2ee5f30({ url: _c727b706a45f + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _8f3a22fe6f4d }, (error2, response2, raw) => {
        let _ff80c162ab7a = {};
        try { _ff80c162ab7a = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _ff80c162ab7a.result !== "succeed") {
          _69f8173a887c.push("⚠️ " + (error2 || _ff80c162ab7a.msg || "抽奖失败"));
          _69f8173a887c.forEach(_ccebeec9eb64);
          return callback(_69f8173a887c.join("\n"));
        }
        const _e67148d4b0d9 = (((_ff80c162ab7a.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _5aa783747d86 = String((_ff80c162ab7a.data || {}).ticketnumber || "0");
        const _e8ad96a47445 = String((_ff80c162ab7a.data || {}).creditnumber || "");
        _69f8173a887c.push("🎁 第 " + _69f8173a887c.length + " 次：" + (_e67148d4b0d9.join("、") || _ff80c162ab7a.msg || "成功"));
        _69f8173a887c.push("🎟️ 剩余抽奖券：" + _5aa783747d86 + (_e8ad96a47445 ? "  💰 星币：" + credit : ""));
        if (_5aa783747d86 === "0") { _69f8173a887c.forEach(_ccebeec9eb64); return callback(_69f8173a887c.join("\n")); }
        _fda682d6dfff(guard - 1);
      });
    });
  };
  _fda682d6dfff(10);
}
function _aa7084b24052(ctx, callback) {
  const _8f3a22fe6f4d = Object.assign({}, ctx.headers);
  _8f3a22fe6f4d.Referer = _258bd8142f03(_66c54a1ef2fa + "?id=" + _5b82a5f1ce85);
  _8f3a22fe6f4d[_6c99ddcec2df(["X", "-", "Requested", "-", "With"])] = _6c99ddcec2df(["XML", "Http", "Request"]);
  const _e0b999271e86 = ["🌾 农场与福利"];
  const _c21c2329c6fb = query => _258bd8142f03(_66c54a1ef2fa + "?id=" + _5b82a5f1ce85 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _26f4db6e8085 = [
    ["每日免费领取", _6c99ddcec2df(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _6c99ddcec2df(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _8fa2e53bf1ee = 1; _8fa2e53bf1ee <= 8; _8fa2e53bf1ee += 1) _26f4db6e8085.push(["地块 " + _8fa2e53bf1ee, _6c99ddcec2df(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _8fa2e53bf1ee]);
  const _cb2fcbf7f632 = _8fa2e53bf1ee => {
    if (_8fa2e53bf1ee >= _26f4db6e8085.length) { _e0b999271e86.forEach(_ccebeec9eb64); return callback(_e0b999271e86.join("\n")); }
    const _5013d151f72c = _26f4db6e8085[_8fa2e53bf1ee];
    _66bce2ee5f30({ url: _c21c2329c6fb(_5013d151f72c[1]), _8f3a22fe6f4d }, (error, response, _f4ecc667142a) => {
      const _eefad3ee373e = _0564483f65ad(_f4ecc667142a)[0] || _b3737bffd389(_246f23876eb9(_f4ecc667142a), 80);
      const _9467d08ecda2 = _df997a78cad7(_eefad3ee373e, ["成功", "完成", "可领取"]) ? "✅" : _df997a78cad7(_eefad3ee373e, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _e0b999271e86.push(_9467d08ecda2 + " " + _5013d151f72c[0] + "：" + (error || _eefad3ee373e || "无返回"));
      const _4803152051f4 = _809375f5182e(_5013d151f72c[1], "jfid=", "&");
      if (_4803152051f4 && _df997a78cad7(_f4ecc667142a, ["已枯萎", "清除"])) {
        return _66bce2ee5f30({ url: _c21c2329c6fb(_6c99ddcec2df(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _4803152051f4), _8f3a22fe6f4d }, (error2, response2, cleared) => {
          _e0b999271e86.push((_df997a78cad7(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _4803152051f4);
          _66bce2ee5f30({ url: _c21c2329c6fb(_6c99ddcec2df(["do=", "plant", "seed", "&seed=1&jfid="]) + _4803152051f4 + "&timestamp=" + Math.floor(Date.now() / 1000)), _8f3a22fe6f4d }, (error3, response3, planted) => {
            _e0b999271e86.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _4803152051f4 + "：" + (_0564483f65ad(planted)[0] || "无返回"));
            _cb2fcbf7f632(_8fa2e53bf1ee + 1);
          });
        });
      }
      _cb2fcbf7f632(_8fa2e53bf1ee + 1);
    });
  };
  _66bce2ee5f30({ url: _c21c2329c6fb(_6c99ddcec2df(["do=", "normal", "&ac=", "kuo", "zhan"])), _8f3a22fe6f4d }, (error, response, _f4ecc667142a) => {
    _e0b999271e86.push((_df997a78cad7(_0564483f65ad(_f4ecc667142a)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _0564483f65ad(_f4ecc667142a)[0] || "无返回"));
    _cb2fcbf7f632(0);
  });
}
function _411bc3ef92a2() {
  _ccebeec9eb64("🧪 调试模式：开启");
  _ccebeec9eb64("🚀 论坛任务开始");
  _ccebeec9eb64("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _ccebeec9eb64("💾 存储键：" + _c4bf04586878 + "，登录状态长度：" + _fb4d27da9e6c("session").length);
  _4a52df2f588c((error, ctx) => {
    if (error === "missing") return _fd58400feb44(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _fd58400feb44(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _fd58400feb44(false, "论坛任务失败", String(error));
    _ccebeec9eb64("🔐 登录状态有效");
    _b268fca41f38(ctx, one => _31a5ff0c877c(ctx, two => _aa7084b24052(ctx, three => _fd58400feb44(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_ccebeec9eb64("🧪 调试模式：开启");
_ccebeec9eb64("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录 Cookie 抓取" : "论坛任务"));
const _eef23e41d6df = typeof $request !== "undefined";
if (_eef23e41d6df) _520e32b9d225();
else _411bc3ef92a2();

})();
