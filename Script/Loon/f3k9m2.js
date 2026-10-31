/*9d7eb4b88d4c*/
(function(){
const _9e8291110fe9 = typeof $argument === "object" && $argument ? $argument : {};
const _2d6075db370a = $persistentStore;
const _58ab6d1df1f1 = "a91e7c4d";
const _b9b0842e35a0 = { value: false };
const _d5a3a04f4fb0 = [];
const _6a523ba4da40 = values => values._6a523ba4da40("");

function _18d8aacd07ec(name) { return _2d6075db370a._18d8aacd07ec(_58ab6d1df1f1 + "." + name) || ""; }
function _fd0d543c8197(name, value) { return _2d6075db370a._fd0d543c8197(value == null ? undefined : String(value), _58ab6d1df1f1 + "." + name); }
function _f0cd2b303041(_bcdd208ef15d, name) {
  const _49dfb30fa8b7 = Object.keys(_bcdd208ef15d || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _49dfb30fa8b7 ? String(_bcdd208ef15d[_49dfb30fa8b7] || "") : "";
}
function _9233b554f8fb(_85e19d00fb78) { _d5a3a04f4fb0.push(String(_85e19d00fb78)); console.log(String(_85e19d00fb78)); }
function _d7bafd9d0d03(value, size) {
  const _90815a9b339d = String(value || "").split(String.fromCharCode(32))._6a523ba4da40(" ").trim();
  return _90815a9b339d.length > size ? _90815a9b339d.slice(0, size) + "..." : _90815a9b339d;
}
function _57fd84406777(value) { return String(value || "").split("<")._6a523ba4da40(" ").split(">")._6a523ba4da40(" ").trim(); }
function _74deaabfb921(value, _069c586667ed, _053a2dd37086) {
  const _90815a9b339d = String(value || "");
  const _756b7f0d3d99 = _90815a9b339d.indexOf(_069c586667ed);
  if (_756b7f0d3d99 < 0) return "";
  const _fbcec92898b3 = _756b7f0d3d99 + _069c586667ed.length;
  const _10931b64c64f = _90815a9b339d.indexOf(_053a2dd37086, _fbcec92898b3);
  return _90815a9b339d.slice(_fbcec92898b3, _10931b64c64f < 0 ? _fbcec92898b3 + 16 : _10931b64c64f).trim();
}
function _507bf745a4c5(value) { return _74deaabfb921(value, _6a523ba4da40(["form", "hash", "="]), "&"); }
function _7ac7477962e6(value) {
  const _7bd581d7969c = _6a523ba4da40(["layer", ".msg('"]);
  const _90815a9b339d = String(value || "");
  const _069c586667ed = _90815a9b339d.indexOf(_7bd581d7969c);
  if (_069c586667ed < 0) return [];
  const _fbcec92898b3 = _069c586667ed + _7bd581d7969c.length;
  const _053a2dd37086 = _90815a9b339d.indexOf("')", _fbcec92898b3);
  return _053a2dd37086 < 0 ? [] : [_90815a9b339d.slice(_fbcec92898b3, _053a2dd37086)];
}
function _ca8a950f9268(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _1ec483ceb107(ok, title, _e188cad5e77b) {
  if (_b9b0842e35a0.value) return;
  _b9b0842e35a0.value = true;
  _9233b554f8fb("━━━━━━━━ 执行结束 ━━━━━━━━");
  _9233b554f8fb(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _9ba4340629d9 = typeof $notification !== "undefined";
  if (_9e8291110fe9.notify_enabled !== false && _9ba4340629d9) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _d7bafd9d0d03(_e188cad5e77b || _d5a3a04f4fb0._6a523ba4da40("\n"), 700));
  const _cdad856f0a10 = typeof $done === "function";
  if (_cdad856f0a10) $done({});
}
function _0bbb9587f197(options, callback) {
  const _cbdc48c16563 = String(options._cbdc48c16563 || "GET").toLowerCase();
  const _26243aa9517e = $httpClient[_cbdc48c16563] || $httpClient.get;
  const _761c18dbff14 = { url: options.url, _bcdd208ef15d: options._bcdd208ef15d, _e188cad5e77b: options._e188cad5e77b, timeout: options.timeout || 15000 };
  _761c18dbff14[_6a523ba4da40(["auto", "-", "redirect"])] = true;
  _761c18dbff14[_6a523ba4da40(["auto", "-", "cookie"])] = true;
  _26243aa9517e(_761c18dbff14, (error, response, data) => callback(error, response || {}, String(data || "")));
}
function _2cb815153f15(value) {
  const _0bb987d8344d = String.fromCharCode(44);
  const _523169b24802 = String.fromCharCode(59);
  return String(value || "").split(_0bb987d8344d).map(item => item.split(_523169b24802)[0].trim()).filter(Boolean)._6a523ba4da40(_523169b24802);
}
const _4aa898e1b5f9 = _6a523ba4da40(["ht", "tps", "://"]);
const _214c76c9dcde = [121, 99, 111, 111, 46, 110, 101, 116].map(_35a9adb16f3c => String.fromCharCode(_35a9adb16f3c))._6a523ba4da40("");
function _10fc6695b51e(path) { return _4aa898e1b5f9 + _214c76c9dcde + String.fromCharCode(47) + String(path || ""); }
const _7cc6d94425de = _6a523ba4da40(["plu", "gin", ".", "php"]);
const _dbf7af2be63b = _6a523ba4da40(["k", "_", "mi", "sign"]);
const _212d158d9f71 = _6a523ba4da40(["view", "ui", "_", "lottery"]);
const _f3bec7c5ac13 = _6a523ba4da40(["jn", "farm"]);

function _b4769739fe80() {
  try {
    const _c9973ca66587 = typeof $request !== "undefined";
    const _f33a0b8a0372 = _c9973ca66587 ? $request : {};
    const _e77e238555a2 = typeof $response !== "undefined";
    const _1c2917cec859 = _e77e238555a2 ? $response : {};
    const _e188cad5e77b = String((_1c2917cec859 && _1c2917cec859._e188cad5e77b) || "");
    const _6c0f1e860a68 = _2cb815153f15(_f0cd2b303041(_f33a0b8a0372._bcdd208ef15d, _6a523ba4da40(["C", "ookie"])));
    const _7ed817fd76ef = _2cb815153f15(_f0cd2b303041(_1c2917cec859._bcdd208ef15d, _6a523ba4da40(["Set", "-", "C", "ookie"])));
    const _3a216a7a37bb = _6c0f1e860a68.length >= _7ed817fd76ef.length ? _6c0f1e860a68 : _7ed817fd76ef;
    const _9bf668b5e60a = _3a216a7a37bb.indexOf(_6a523ba4da40(["auth", "="])) >= 0 || _e188cad5e77b.indexOf(_6a523ba4da40(["action", "=", "logout"])) >= 0;
    _9233b554f8fb("🍪 登录状态抓取");
    _9233b554f8fb("🌐 页面：" + _d7bafd9d0d03(_f33a0b8a0372.url, 180));
    _9233b554f8fb("🔑 状态长度：" + _3a216a7a37bb.length);
    if (!_9bf668b5e60a || _3a216a7a37bb.length < 30) {
      _9233b554f8fb("ℹ️ 当前请求没有完整登录状态");
      return _1ec483ceb107(true, "登录状态未更新", "请打开已登录的论坛页面");
    }
    const _f91a96bb0003 = _18d8aacd07ec("session");
    _fd0d543c8197("session", _3a216a7a37bb);
    _fd0d543c8197("updated", new Date().toISOString());
    _9233b554f8fb(_f91a96bb0003 === _3a216a7a37bb ? "✅ 登录状态未变化" : "✅ 登录状态已更新");
    $notification.post("论坛登录状态", _f91a96bb0003 === _3a216a7a37bb ? "✅ 未变化" : "✅ 已获取", "长度 " + _3a216a7a37bb.length);
    _1ec483ceb107(true, "论坛登录状态", _f91a96bb0003 === _3a216a7a37bb ? "未变化" : "已获取");
  } catch (error) {
    _9233b554f8fb("❌ 登录状态异常：" + error);
    _1ec483ceb107(false, "登录状态失败", String(error));
  }
}
function _21e77ae9982b(callback) {
  const _3a216a7a37bb = _18d8aacd07ec("session");
  if (!_3a216a7a37bb) return callback("missing");
  const _bcdd208ef15d = {};
  _bcdd208ef15d[_6a523ba4da40(["C", "ookie"])] = _3a216a7a37bb;
  _bcdd208ef15d[_6a523ba4da40(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _bcdd208ef15d.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _0bbb9587f197({ url: _10fc6695b51e(""), _bcdd208ef15d }, (error, response, data) => {
    if (error) return callback(error);
    if (data.indexOf(_6a523ba4da40(["action", "=", "logout"])) < 0) return callback("expired");
    const _35a9adb16f3c = _507bf745a4c5(data);
    if (!_35a9adb16f3c) return callback("token");
    callback(null, { _bcdd208ef15d, _35a9adb16f3c });
  });
}
function _a1979484c833(ctx, callback) {
  const _bcdd208ef15d = Object.assign({}, ctx._bcdd208ef15d);
  _bcdd208ef15d.Referer = _10fc6695b51e(_6a523ba4da40([_dbf7af2be63b, "-", "sign", ".", "html"]));
  _bcdd208ef15d[_6a523ba4da40(["X", "-", "Requested", "-", "With"])] = _6a523ba4da40(["XML", "Http", "Request"]);
  _0bbb9587f197({ url: _10fc6695b51e(_7cc6d94425de + "?id=" + _dbf7af2be63b + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx._35a9adb16f3c), _bcdd208ef15d }, (error, response, data) => {
    _9233b554f8fb("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _b6f1bdb4b507 = data.indexOf("今日已签") >= 0;
    const _4b7448327970 = _b6f1bdb4b507 || data.indexOf("<![CDATA[]]>") >= 0;
    _0bbb9587f197({ url: _10fc6695b51e(_6a523ba4da40([_dbf7af2be63b, "-", "sign", ".", "html"])), _bcdd208ef15d: ctx._bcdd208ef15d }, (error2, response2, page) => {
      const _2b7f4902c83b = _74deaabfb921(page, "签到排名：", " ");
      const _a7cda1396a40 = _74deaabfb921(page, 'id="lxtdays" value="', '"');
      const _ef507c43e210 = _74deaabfb921(page, 'id="lxlevel" value="', '"');
      const _c3c5c0f440c9 = _74deaabfb921(page, 'id="lxreward" value="', '"');
      _9233b554f8fb(_b6f1bdb4b507 ? "ℹ️ 今日已经签到" : _4b7448327970 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_2b7f4902c83b) _9233b554f8fb("🏆 当前排名：" + _2b7f4902c83b);
      if (_a7cda1396a40) _9233b554f8fb("📆 累计天数：" + _a7cda1396a40);
      if (_ef507c43e210) _9233b554f8fb("🏅 签到等级：LV." + _ef507c43e210);
      if (_c3c5c0f440c9) _9233b554f8fb("💰 最近奖励：" + _c3c5c0f440c9);
      callback([_b6f1bdb4b507 ? "ℹ️ 今日已签到" : _4b7448327970 ? "✅ 签到成功" : "⚠️ 签到异常", _2b7f4902c83b ? "🏆 排名 " + _2b7f4902c83b : "", _a7cda1396a40 ? "📆 累计 " + _a7cda1396a40 + " 天" : ""].filter(Boolean)._6a523ba4da40("\n"));
    });
  });
}
function _11b63cda36ee(ctx, callback) {
  const _bcdd208ef15d = Object.assign({}, ctx._bcdd208ef15d);
  _bcdd208ef15d.Referer = _10fc6695b51e(_7cc6d94425de + "?id=" + _212d158d9f71);
  _bcdd208ef15d[_6a523ba4da40(["X", "-", "Requested", "-", "With"])] = _6a523ba4da40(["XML", "Http", "Request"]);
  _bcdd208ef15d.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _b9631c1d8851 = _10fc6695b51e(_7cc6d94425de + "?id=" + _212d158d9f71 + ":draw");
  const _1e6d0bda3651 = ["🎰 幸运抽奖"];
  const _7debac554165 = guard => {
    if (guard <= 0) { _1e6d0bda3651.forEach(_9233b554f8fb); return callback(_1e6d0bda3651._6a523ba4da40("\n")); }
    _0bbb9587f197({ url: _b9631c1d8851 + "?drawnumber=1&inajax=1", _bcdd208ef15d }, (error, response, data) => {
      let _725025e21894 = {};
      try { _725025e21894 = JSON.parse(data); } catch (ignored) {}
      const _b586ab28b362 = String((_725025e21894.data || {})["2"] || "");
      if (error || _725025e21894._f8584a68baa0 !== "succeed" || _b586ab28b362.indexOf("抽奖券") < 0) {
        _1e6d0bda3651.push("ℹ️ " + (error || _725025e21894.msg || "没有可用抽奖券"));
        _1e6d0bda3651.forEach(_9233b554f8fb);
        return callback(_1e6d0bda3651._6a523ba4da40("\n"));
      }
      _0bbb9587f197({ url: _b9631c1d8851 + "?drawnumber=1&pay=2&formhash=" + ctx._35a9adb16f3c + "&inajax=1", _bcdd208ef15d }, (error2, response2, raw) => {
        let _f8584a68baa0 = {};
        try { _f8584a68baa0 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _f8584a68baa0._f8584a68baa0 !== "succeed") {
          _1e6d0bda3651.push("⚠️ " + (error2 || _f8584a68baa0.msg || "抽奖失败"));
          _1e6d0bda3651.forEach(_9233b554f8fb);
          return callback(_1e6d0bda3651._6a523ba4da40("\n"));
        }
        const _abeadbb53ae4 = (((_f8584a68baa0.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _756b7f0d3d99 = String((_f8584a68baa0.data || {}).ticketnumber || "0");
        const _2530e88f32e3 = String((_f8584a68baa0.data || {}).creditnumber || "");
        _1e6d0bda3651.push("🎁 第 " + _1e6d0bda3651.length + " 次：" + (_abeadbb53ae4._6a523ba4da40("、") || _f8584a68baa0.msg || "成功"));
        _1e6d0bda3651.push("🎟️ 剩余抽奖券：" + _756b7f0d3d99 + (_2530e88f32e3 ? "  💰 星币：" + _2530e88f32e3 : ""));
        if (_756b7f0d3d99 === "0") { _1e6d0bda3651.forEach(_9233b554f8fb); return callback(_1e6d0bda3651._6a523ba4da40("\n")); }
        _7debac554165(guard - 1);
      });
    });
  };
  _7debac554165(10);
}
function _fdd9577ab2f3(ctx, callback) {
  const _bcdd208ef15d = Object.assign({}, ctx._bcdd208ef15d);
  _bcdd208ef15d.Referer = _10fc6695b51e(_7cc6d94425de + "?id=" + _f3bec7c5ac13);
  _bcdd208ef15d[_6a523ba4da40(["X", "-", "Requested", "-", "With"])] = _6a523ba4da40(["XML", "Http", "Request"]);
  const _6ec790965c4a = ["🌾 农场与福利"];
  const _01605c338829 = query => _10fc6695b51e(_7cc6d94425de + "?id=" + _f3bec7c5ac13 + "&" + query + "&formhash=" + ctx._35a9adb16f3c + "&inajax=1");
  const _77be3616c6cb = [
    ["每日免费领取", _6a523ba4da40(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _6a523ba4da40(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _ad67dadcfa34 = 1; _ad67dadcfa34 <= 8; _ad67dadcfa34 += 1) _77be3616c6cb.push(["地块 " + _ad67dadcfa34, _6a523ba4da40(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _ad67dadcfa34]);
  const _a3b0e8dc38a4 = _ad67dadcfa34 => {
    if (_ad67dadcfa34 >= _77be3616c6cb.length) { _6ec790965c4a.forEach(_9233b554f8fb); return callback(_6ec790965c4a._6a523ba4da40("\n")); }
    const _3bfabb372f17 = _77be3616c6cb[_ad67dadcfa34];
    _0bbb9587f197({ url: _01605c338829(_3bfabb372f17[1]), _bcdd208ef15d }, (error, response, data) => {
      const _85e19d00fb78 = _7ac7477962e6(data)[0] || _d7bafd9d0d03(_57fd84406777(data), 80);
      const _18d7c8b99d9f = _ca8a950f9268(_85e19d00fb78, ["成功", "完成", "可领取"]) ? "✅" : _ca8a950f9268(_85e19d00fb78, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _6ec790965c4a.push(_18d7c8b99d9f + " " + _3bfabb372f17[0] + "：" + (error || _85e19d00fb78 || "无返回"));
      const _99ca55d9cfb1 = _74deaabfb921(_3bfabb372f17[1], "jfid=", "&");
      if (_99ca55d9cfb1 && _ca8a950f9268(data, ["已枯萎", "清除"])) {
        return _0bbb9587f197({ url: _01605c338829(_6a523ba4da40(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _99ca55d9cfb1), _bcdd208ef15d }, (error2, response2, cleared) => {
          _6ec790965c4a.push((_ca8a950f9268(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _99ca55d9cfb1);
          _0bbb9587f197({ url: _01605c338829(_6a523ba4da40(["do=", "plant", "seed", "&seed=1&jfid="]) + _99ca55d9cfb1 + "&timestamp=" + Math.floor(Date.now() / 1000)), _bcdd208ef15d }, (error3, response3, planted) => {
            _6ec790965c4a.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _99ca55d9cfb1 + "：" + (_7ac7477962e6(planted)[0] || "无返回"));
            _a3b0e8dc38a4(_ad67dadcfa34 + 1);
          });
        });
      }
      _a3b0e8dc38a4(_ad67dadcfa34 + 1);
    });
  };
  _0bbb9587f197({ url: _01605c338829(_6a523ba4da40(["do=", "normal", "&ac=", "kuo", "zhan"])), _bcdd208ef15d }, (error, response, data) => {
    _6ec790965c4a.push((_ca8a950f9268(_7ac7477962e6(data)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _7ac7477962e6(data)[0] || "无返回"));
    _a3b0e8dc38a4(0);
  });
}
function _93310a022fa1() {
  _9233b554f8fb("🚀 论坛任务开始");
  _9233b554f8fb("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _21e77ae9982b((error, ctx) => {
    if (error === "missing") return _1ec483ceb107(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _1ec483ceb107(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _1ec483ceb107(false, "论坛任务失败", String(error));
    _9233b554f8fb("🔐 登录状态有效");
    _a1979484c833(ctx, one => _11b63cda36ee(ctx, two => _fdd9577ab2f3(ctx, three => _1ec483ceb107(true, "论坛任务完成", [one, two, three]._6a523ba4da40("\n")))));
  });
}
const _c9973ca66587 = typeof $request !== "undefined";
if (_c9973ca66587) _b4769739fe80();
else _93310a022fa1();

})();
