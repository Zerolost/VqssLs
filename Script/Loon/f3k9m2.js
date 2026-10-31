/*681a6e83fd0c*/
(function(){
const _7b5dc00661bc = typeof $argument === "object" && $argument ? $argument : {};
const _549f983dd7a7 = $persistentStore;
const _99d0c4c60a17 = "f3k9m2_store";
const _2fe67de9cd11 = true;
const _3bb1a293ec47 = { value: false };
const _451ced2206b6 = [];
const _d69433c8b3f2 = values => values.join("");

function _ebfe4552fa0e() {
  try { return JSON.parse(_549f983dd7a7.read(_99d0c4c60a17) || "{}") || {}; }
  catch (error) { return {}; }
}
function _c9dae61ed344(_a63a30556ade) { return _549f983dd7a7.write(JSON.stringify(_a63a30556ade), _99d0c4c60a17); }
function _eabde2ddb8d5(name) { return String(_ebfe4552fa0e()[name] || ""); }
function _286a9b9a7e7f(name, value) {
  const _a63a30556ade = _ebfe4552fa0e();
  if (value == null) delete _a63a30556ade[name];
  else _a63a30556ade[name] = String(value);
  return _c9dae61ed344(_a63a30556ade);
}
function _717430ad545e(_fc177196424b, name) {
  const _9b06b1d00615 = Object.keys(_fc177196424b || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _9b06b1d00615 ? String(_fc177196424b[_9b06b1d00615] || "") : "";
}
function _8cce3491e7b5(_7076f30fa419) {
  const _37821d43bfbf = String(_7076f30fa419);
  _451ced2206b6.push(_37821d43bfbf);
  if (_2fe67de9cd11) console.log(_37821d43bfbf);
}
function _e173a3b46e57(value, size) {
  const _37821d43bfbf = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _37821d43bfbf.length > size ? _37821d43bfbf.slice(0, size) + "..." : _37821d43bfbf;
}
function _4cdac2d3deba(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _e2ccc8975840(value, _96ed7985786e, _b5e614ea2a35) {
  const _37821d43bfbf = String(value || "");
  const _42177242a56a = _37821d43bfbf.indexOf(_96ed7985786e);
  if (_42177242a56a < 0) return "";
  const _d7441b6c9173 = _42177242a56a + _96ed7985786e.length;
  const _42cccc02e7f1 = _37821d43bfbf.indexOf(_b5e614ea2a35, _d7441b6c9173);
  return _37821d43bfbf.slice(_d7441b6c9173, _42cccc02e7f1 < 0 ? _d7441b6c9173 + 16 : _42cccc02e7f1).trim();
}
function _44b6c02119b4(value) { return _e2ccc8975840(value, _d69433c8b3f2(["form", "hash", "="]), "&"); }
function _1badeee3f698(value) {
  const _4a54b09b2472 = _d69433c8b3f2(["layer", ".msg('"]);
  const _37821d43bfbf = String(value || "");
  const _96ed7985786e = _37821d43bfbf.indexOf(_4a54b09b2472);
  if (_96ed7985786e < 0) return [];
  const _d7441b6c9173 = _96ed7985786e + _4a54b09b2472.length;
  const _b5e614ea2a35 = _37821d43bfbf.indexOf("')", _d7441b6c9173);
  return _b5e614ea2a35 < 0 ? [] : [_37821d43bfbf.slice(_d7441b6c9173, _b5e614ea2a35)];
}
function _762cde38f2f7(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _7585f8d3bbe1(ok, title, body) {
  if (_3bb1a293ec47.value) return;
  _3bb1a293ec47.value = true;
  _8cce3491e7b5("━━━━━━━━ 执行结束 ━━━━━━━━");
  _8cce3491e7b5(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _892917c0f9be = typeof $notification !== "undefined";
  if (_7b5dc00661bc.notify_enabled !== false && _892917c0f9be) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _e173a3b46e57(body || _451ced2206b6.join("\n"), 700));
  const _526969d66095 = typeof $done === "function";
  if (_526969d66095) $done({});
}
function _52399822d6ba(options, callback, attempt) {
  const _a7268f79a9d7 = String(options.method || "GET").toLowerCase();
  const _328af3e4f072 = $httpClient[_a7268f79a9d7] || $httpClient.get;
  const _e830d792a62c = {};
  _e830d792a62c["url"] = String(options.url || "");
  _e830d792a62c["headers"] = options.headers || {};
  _e830d792a62c["body"] = options.body || "";
  _e830d792a62c["timeout"] = options.timeout || 20000;
  _e830d792a62c["auto-redirect"] = true;
  _e830d792a62c["auto-cookie"] = true;
  _e830d792a62c["alpn"] = "h2";
  _8cce3491e7b5("🌐 请求：" + _e830d792a62c["url"]);
  _328af3e4f072(_e830d792a62c, (error, response, _a63a30556ade) => {
    const _37821d43bfbf = String(error || "");
    if (_37821d43bfbf && (attempt || 0) < 2 && (_37821d43bfbf.indexOf("closed") >= 0 || _37821d43bfbf.indexOf("timed out") >= 0)) {
      _8cce3491e7b5("🔁 连接中断，正在重试");
      return _52399822d6ba(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_a63a30556ade || ""));
  });
}
function _edb107873548(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _b72b32c9e3ae = _d69433c8b3f2(["ht", "tps", "://"]);
const _b270929ab7b4 = [121, 99, 111, 111, 46, 110, 101, 116].map(_3c103e5c1e40 => String.fromCharCode(_3c103e5c1e40)).join("");
function _4539cf3756f8(path) { return _b72b32c9e3ae + _b270929ab7b4 + String.fromCharCode(47) + String(path || ""); }
const _0bd1583661d0 = _d69433c8b3f2(["plu", "gin", ".", "php"]);
const _e30d61706a88 = _d69433c8b3f2(["k", "_", "mi", "sign"]);
const _085040eedfde = _d69433c8b3f2(["view", "ui", "_", "lottery"]);
const _0afdc47361ac = _d69433c8b3f2(["jn", "farm"]);

function _744fa0e42c1d(_fc177196424b, name) {
  const _368456cabf92 = _717430ad545e(_fc177196424b, name);
  return Array.isArray(_368456cabf92) ? _368456cabf92.join(",") : String(_368456cabf92 || "");
}
function _8b5416813705(value) {
  const _37821d43bfbf = String(value || "");
  const _47caf36a3662 = (_37821d43bfbf.match(/;/g) || []).length;
  const _edc6bec91c9e = (_37821d43bfbf.match(/,/g) || []).length;
  const _8e2147a501ce = _edc6bec91c9e > _47caf36a3662 ? "," : ";";
  return _37821d43bfbf.split(_8e2147a501ce).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _3189f5702eaf(_5703cd0874e4, extra) {
  const _819d3c7e4362 = {};
  _8b5416813705(_5703cd0874e4).concat(_8b5416813705(extra)).forEach(item => {
    const _95775f997a28 = item.indexOf("=");
    _819d3c7e4362[item.slice(0, _95775f997a28)] = item.slice(_95775f997a28 + 1);
  });
  return Object.keys(_819d3c7e4362).map(_9b06b1d00615 => _9b06b1d00615 + "=" + _819d3c7e4362[_9b06b1d00615]).join("; ");
}
function _50233b439839() {
  try {
    const _eac08c4723f4 = typeof $request !== "undefined" ? $request : {};
    const _f783e0635637 = typeof $response !== "undefined" ? $response : {};
    const _130feb3199eb = String(_eac08c4723f4.url || "");
    const _6e8d4a1470ee = _744fa0e42c1d(_eac08c4723f4.headers, "Cookie");
    const _86c14b057a3e = _744fa0e42c1d(_f783e0635637.headers, "Set-Cookie");
    const _8e451305e870 = _3189f5702eaf(_6e8d4a1470ee, "");
    const _76d6d2394703 = _8e451305e870.split("; ").filter(Boolean);
    const _ebe9a11a43c1 = Object.keys(_eac08c4723f4.headers || {}).concat(Object.keys(_f783e0635637.headers || {}));
    const _f084794e4867 = _76d6d2394703.some(item => item.indexOf("auth=") >= 0);
    _8cce3491e7b5("🧪 调试模式：开启");
    _8cce3491e7b5("🍪 登录状态抓取");
    _8cce3491e7b5("🌐 页面：" + _e173a3b46e57(_130feb3199eb, 180));
    _8cce3491e7b5("📋 头名称：" + _ebe9a11a43c1.map(item => item.toLowerCase()).join(","));
    _8cce3491e7b5("🔑 请求长度：" + _6e8d4a1470ee.length + "，字段：" + _76d6d2394703.length);
    _8cce3491e7b5("🏷️ 字段名：" + _76d6d2394703.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_f084794e4867) {
      _8cce3491e7b5("ℹ️ 当前响应没有完整登录状态");
      return _7585f8d3bbe1(true, "", "");
    }
    const _b9d30145a9f8 = _eabde2ddb8d5("session");
    const _9c14fb13da8e = Number(_eabde2ddb8d5("notified") || 0);
    const _47a2a400f4ac = _286a9b9a7e7f("session", _8e451305e870);
    _286a9b9a7e7f("updated", new Date().toISOString());
    _8cce3491e7b5(_b9d30145a9f8 === _8e451305e870 ? "✅ 登录状态未变化" : "✅ 登录 Cookie 已保存");
    _8cce3491e7b5("💾 存储键：" + _99d0c4c60a17 + "，写入：" + _47a2a400f4ac + "，回读长度：" + _eabde2ddb8d5("session").length);
    if (_b9d30145a9f8 !== _8e451305e870 && Date.now() - _9c14fb13da8e > 60000) {
      _286a9b9a7e7f("notified", Date.now());
      $notification.post("登录 Cookie", "✅ 已保存", _76d6d2394703.length + " 项 / " + _8e451305e870.length);
    }
    _7585f8d3bbe1(true, "", "");
  } catch (error) {
    _8cce3491e7b5("❌ 登录状态异常：" + error);
    _7585f8d3bbe1(false, "登录状态失败", String(error));
  }
}
function _05b7e997e14b(callback) {
  const _8e451305e870 = _eabde2ddb8d5("session");
  if (!_8e451305e870) return callback("missing");
  const _fc177196424b = {};
  _fc177196424b[_d69433c8b3f2(["C", "ookie"])] = _8e451305e870;
  _fc177196424b[_d69433c8b3f2(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _fc177196424b.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _52399822d6ba({ url: _4539cf3756f8("forum.php"), _fc177196424b }, (error, response, _a63a30556ade) => {
    if (error) return callback(error);
    if (_a63a30556ade.indexOf(_d69433c8b3f2(["action", "=", "logout"])) < 0) return callback("expired");
    const _3c103e5c1e40 = _44b6c02119b4(_a63a30556ade);
    if (!_3c103e5c1e40) return callback("token");
    callback(null, { _fc177196424b, _3c103e5c1e40 });
  });
}
function _6ce22180010e(ctx, callback) {
  const _fc177196424b = Object.assign({}, ctx.headers);
  _fc177196424b.Referer = _4539cf3756f8(_d69433c8b3f2([_e30d61706a88, "-", "sign", ".", "html"]));
  _fc177196424b[_d69433c8b3f2(["X", "-", "Requested", "-", "With"])] = _d69433c8b3f2(["XML", "Http", "Request"]);
  _52399822d6ba({ url: _4539cf3756f8(_0bd1583661d0 + "?id=" + _e30d61706a88 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _fc177196424b }, (error, response, _a63a30556ade) => {
    _8cce3491e7b5("📅 每日签到请求");
    if (error) return callback("❌ 请求失败：" + error);
    const _28d4513c0895 = _a63a30556ade.indexOf("今日已签") >= 0;
    const _df1b43ce80f8 = _28d4513c0895 || _a63a30556ade.indexOf("<![CDATA[]]>") >= 0;
    _52399822d6ba({ url: _4539cf3756f8(_d69433c8b3f2([_e30d61706a88, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _af6a678e03b0 = _e2ccc8975840(page, "签到排名：", " ");
      const _cf8d34316807 = _e2ccc8975840(page, 'id="lxtdays" value="', '"');
      const _e852d34f073a = _e2ccc8975840(page, 'id="lxlevel" value="', '"');
      const _d186fc00fac3 = _e2ccc8975840(page, 'id="lxreward" value="', '"');
      _8cce3491e7b5(_28d4513c0895 ? "ℹ️ 今日已经签到" : _df1b43ce80f8 ? "✅ 签到接口返回成功" : "⚠️ 签到接口返回异常");
      if (_af6a678e03b0) _8cce3491e7b5("🏆 当前排名：" + _af6a678e03b0);
      if (_cf8d34316807) _8cce3491e7b5("📆 累计天数：" + _cf8d34316807);
      if (_e852d34f073a) _8cce3491e7b5("🏅 签到等级：LV." + _e852d34f073a);
      if (_d186fc00fac3) _8cce3491e7b5("💰 最近奖励：" + _d186fc00fac3);
      callback([_28d4513c0895 ? "ℹ️ 今日已签到" : _df1b43ce80f8 ? "✅ 签到接口成功" : "⚠️ 签到接口异常", _af6a678e03b0 ? "🏆 排名 " + rank : "", _cf8d34316807 ? "📆 累计 " + _cf8d34316807 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _100e83a5ba69(ctx, callback) {
  const _fc177196424b = Object.assign({}, ctx.headers);
  _fc177196424b.Referer = _4539cf3756f8(_0bd1583661d0 + "?id=" + _085040eedfde);
  _fc177196424b[_d69433c8b3f2(["X", "-", "Requested", "-", "With"])] = _d69433c8b3f2(["XML", "Http", "Request"]);
  _fc177196424b.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _5703cd0874e4 = _4539cf3756f8(_0bd1583661d0 + "?id=" + _085040eedfde + ":draw");
  const _dd6ed03bbd0d = ["🎰 幸运抽奖"];
  const _614438d4e959 = guard => {
    if (guard <= 0) { _dd6ed03bbd0d.forEach(_8cce3491e7b5); return callback(_dd6ed03bbd0d.join("\n")); }
    _52399822d6ba({ url: _5703cd0874e4 + "?drawnumber=1&inajax=1", _fc177196424b }, (error, response, _a63a30556ade) => {
      let _8333fe4d3cf4 = {};
      try { _8333fe4d3cf4 = JSON.parse(_a63a30556ade); } catch (ignored) {}
      const _a3cf8ad0f45a = String((_8333fe4d3cf4.data || {})["2"] || "");
      if (error || _8333fe4d3cf4.result !== "succeed" || _a3cf8ad0f45a.indexOf("抽奖券") < 0) {
        _dd6ed03bbd0d.push("ℹ️ " + (error || _8333fe4d3cf4.msg || "没有可用抽奖券"));
        _dd6ed03bbd0d.forEach(_8cce3491e7b5);
        return callback(_dd6ed03bbd0d.join("\n"));
      }
      _52399822d6ba({ url: _5703cd0874e4 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _fc177196424b }, (error2, response2, raw) => {
        let _d6dc45a1991e = {};
        try { _d6dc45a1991e = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _d6dc45a1991e.result !== "succeed") {
          _dd6ed03bbd0d.push("⚠️ " + (error2 || _d6dc45a1991e.msg || "抽奖失败"));
          _dd6ed03bbd0d.forEach(_8cce3491e7b5);
          return callback(_dd6ed03bbd0d.join("\n"));
        }
        const _bc58916e6d51 = (((_d6dc45a1991e.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _42177242a56a = String((_d6dc45a1991e.data || {}).ticketnumber || "0");
        const _1a828db11cc6 = String((_d6dc45a1991e.data || {}).creditnumber || "");
        _dd6ed03bbd0d.push("🎁 第 " + _dd6ed03bbd0d.length + " 次：" + (_bc58916e6d51.join("、") || _d6dc45a1991e.msg || "成功"));
        _dd6ed03bbd0d.push("🎟️ 剩余抽奖券：" + _42177242a56a + (_1a828db11cc6 ? "  💰 星币：" + credit : ""));
        if (_42177242a56a === "0") { _dd6ed03bbd0d.forEach(_8cce3491e7b5); return callback(_dd6ed03bbd0d.join("\n")); }
        _614438d4e959(guard - 1);
      });
    });
  };
  _614438d4e959(10);
}
function _a48f8a179f74(ctx, callback) {
  const _fc177196424b = Object.assign({}, ctx.headers);
  _fc177196424b.Referer = _4539cf3756f8(_0bd1583661d0 + "?id=" + _0afdc47361ac);
  _fc177196424b[_d69433c8b3f2(["X", "-", "Requested", "-", "With"])] = _d69433c8b3f2(["XML", "Http", "Request"]);
  const _154eb59d5b22 = ["🌾 农场与福利"];
  const _e82a3c64bea2 = query => _4539cf3756f8(_0bd1583661d0 + "?id=" + _0afdc47361ac + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _af27927601d4 = [
    ["每日免费领取", _d69433c8b3f2(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _d69433c8b3f2(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _23ec633c2eff = 1; _23ec633c2eff <= 8; _23ec633c2eff += 1) _af27927601d4.push(["地块 " + _23ec633c2eff, _d69433c8b3f2(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _23ec633c2eff]);
  const _14fd6dc772b7 = _23ec633c2eff => {
    if (_23ec633c2eff >= _af27927601d4.length) { _154eb59d5b22.forEach(_8cce3491e7b5); return callback(_154eb59d5b22.join("\n")); }
    const _76b790d2b478 = _af27927601d4[_23ec633c2eff];
    _52399822d6ba({ url: _e82a3c64bea2(_76b790d2b478[1]), _fc177196424b }, (error, response, _a63a30556ade) => {
      const _7076f30fa419 = _1badeee3f698(_a63a30556ade)[0] || _e173a3b46e57(_4cdac2d3deba(_a63a30556ade), 80);
      const _5484dd22c746 = _762cde38f2f7(_7076f30fa419, ["成功", "完成", "可领取"]) ? "✅" : _762cde38f2f7(_7076f30fa419, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _154eb59d5b22.push(_5484dd22c746 + " " + _76b790d2b478[0] + "：" + (error || _7076f30fa419 || "无返回"));
      const _c3cf01a05e76 = _e2ccc8975840(_76b790d2b478[1], "jfid=", "&");
      if (_c3cf01a05e76 && _762cde38f2f7(_a63a30556ade, ["已枯萎", "清除"])) {
        return _52399822d6ba({ url: _e82a3c64bea2(_d69433c8b3f2(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _c3cf01a05e76), _fc177196424b }, (error2, response2, cleared) => {
          _154eb59d5b22.push((_762cde38f2f7(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _c3cf01a05e76);
          _52399822d6ba({ url: _e82a3c64bea2(_d69433c8b3f2(["do=", "plant", "seed", "&seed=1&jfid="]) + _c3cf01a05e76 + "&timestamp=" + Math.floor(Date.now() / 1000)), _fc177196424b }, (error3, response3, planted) => {
            _154eb59d5b22.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _c3cf01a05e76 + "：" + (_1badeee3f698(planted)[0] || "无返回"));
            _14fd6dc772b7(_23ec633c2eff + 1);
          });
        });
      }
      _14fd6dc772b7(_23ec633c2eff + 1);
    });
  };
  _52399822d6ba({ url: _e82a3c64bea2(_d69433c8b3f2(["do=", "normal", "&ac=", "kuo", "zhan"])), _fc177196424b }, (error, response, _a63a30556ade) => {
    _154eb59d5b22.push((_762cde38f2f7(_1badeee3f698(_a63a30556ade)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _1badeee3f698(_a63a30556ade)[0] || "无返回"));
    _14fd6dc772b7(0);
  });
}
function _fc042825472a() {
  _8cce3491e7b5("🧪 调试模式：开启");
  _8cce3491e7b5("🚀 论坛任务开始");
  _8cce3491e7b5("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _8cce3491e7b5("💾 存储键：" + _99d0c4c60a17 + "，登录状态长度：" + _eabde2ddb8d5("session").length);
  _05b7e997e14b((error, ctx) => {
    if (error === "missing") return _7585f8d3bbe1(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _7585f8d3bbe1(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _7585f8d3bbe1(false, "论坛任务失败", String(error));
    _8cce3491e7b5("🔐 登录状态有效");
    _6ce22180010e(ctx, one => _100e83a5ba69(ctx, two => _a48f8a179f74(ctx, three => _7585f8d3bbe1(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_8cce3491e7b5("🧪 调试模式：开启");
_8cce3491e7b5("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录 Cookie 抓取" : "论坛任务"));
const _b1c4433b2831 = typeof $request !== "undefined";
if (_b1c4433b2831) _50233b439839();
else _fc042825472a();

})();
