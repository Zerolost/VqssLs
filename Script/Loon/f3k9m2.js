/*4f4753ed9d61*/
(function(){
const _f7d01470cc0b = typeof $argument === "object" && $argument ? $argument : {};
const _0f1539608950 = $persistentStore;
const _6b9cb52e4d14 = "a91e7c4d";
const _3296db6c5e4e = { _9e27e002d5e6: false };
const _19dfe8b3d2b0 = [];
const join = _f827a8c30836 => _f827a8c30836.join("");

function _f426bc373328(_4fa2f1d938ff) { return _0f1539608950._f426bc373328(_6b9cb52e4d14 + "." + _4fa2f1d938ff) || ""; }
function _bc16676233c9(_4fa2f1d938ff, _9e27e002d5e6) { return _0f1539608950._bc16676233c9(_9e27e002d5e6 == null ? undefined : String(_9e27e002d5e6), _6b9cb52e4d14 + "." + _4fa2f1d938ff); }
function _aa579aca9eec(_3a79c9f1af7c, _4fa2f1d938ff) {
  const _d80c595e70fd = Object.keys(_3a79c9f1af7c || {}).find(_c91e7552dfd8 => _c91e7552dfd8.toLowerCase() === _4fa2f1d938ff.toLowerCase());
  return _d80c595e70fd ? String(_3a79c9f1af7c[_d80c595e70fd] || "") : "";
}
function _361bed695202(_1889360f1bb7) { _19dfe8b3d2b0.push(String(_1889360f1bb7)); _2b7a89f930b4._62ef2a5c6166(String(_1889360f1bb7)); }
function _5fa7c91ff379(_9e27e002d5e6, _5450e233860c) {
  const _85a57b7a4a41 = String(_9e27e002d5e6 || "").split(String.fromCharCode(32)).join(" ").trim();
  return _85a57b7a4a41.length > _5450e233860c ? _85a57b7a4a41.slice(0, _5450e233860c) + "..." : _85a57b7a4a41;
}
function _0579e622e38f(_9e27e002d5e6) { return String(_9e27e002d5e6 || "").split("<").join(" ").split(">").join(" ").trim(); }
function _deca9d545453(_9e27e002d5e6, _f9e19cb198c3, _97a58371ca9e) {
  const _85a57b7a4a41 = String(_9e27e002d5e6 || "");
  const _ffb2c099e127 = _85a57b7a4a41.indexOf(_f9e19cb198c3);
  if (_ffb2c099e127 < 0) return "";
  const _d0cd04013029 = _ffb2c099e127 + _f9e19cb198c3.length;
  const _eac8fda3e582 = _85a57b7a4a41.indexOf(_97a58371ca9e, _d0cd04013029);
  return _85a57b7a4a41.slice(_d0cd04013029, _eac8fda3e582 < 0 ? _d0cd04013029 + 16 : _eac8fda3e582).trim();
}
function _32e580f97679(_9e27e002d5e6) { return _deca9d545453(_9e27e002d5e6, join(["form", "hash", "="]), "&"); }
function _5810b53e4d16(_9e27e002d5e6) {
  const _cdde261069ce = join(["layer", ".msg('"]);
  const _85a57b7a4a41 = String(_9e27e002d5e6 || "");
  const _f9e19cb198c3 = _85a57b7a4a41.indexOf(_cdde261069ce);
  if (_f9e19cb198c3 < 0) return [];
  const _d0cd04013029 = _f9e19cb198c3 + _cdde261069ce.length;
  const _97a58371ca9e = _85a57b7a4a41.indexOf("')", _d0cd04013029);
  return _97a58371ca9e < 0 ? [] : [_85a57b7a4a41.slice(_d0cd04013029, _97a58371ca9e)];
}
function _fb7bb97e5e14(_9e27e002d5e6, _9e58ddefec67) { return _9e58ddefec67.some(_3e6e464c1f8c => String(_9e27e002d5e6 || "").indexOf(_3e6e464c1f8c) >= 0); }
function _8294b54b7621(_424c64063e33, _d411623b9f38, _60548553ed83) {
  if (_3296db6c5e4e._9e27e002d5e6) return;
  _3296db6c5e4e._9e27e002d5e6 = true;
  _361bed695202("━━━━━━━━ 执行结束 ━━━━━━━━");
  _361bed695202(_424c64063e33 ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _fa95498b2225 = typeof $notification !== "undefined";
  if (_f7d01470cc0b._35cea089b527 !== false && _fa95498b2225) $notification._10cd01465c4c(_d411623b9f38 || "论坛任务", _424c64063e33 ? "✅ 已完成" : "❌ 未完成", _5fa7c91ff379(_60548553ed83 || _19dfe8b3d2b0.join("\n"), 700));
  const _9993493b7923 = typeof $done === "function";
  if (_9993493b7923) $done({});
}
function _a7cf1a586676(_3d61e252cb2a, _ccc4a01be6e3) {
  const _d589927f5393 = String(_3d61e252cb2a._d589927f5393 || "GET").toLowerCase();
  const _e23f07423199 = $httpClient[_d589927f5393] || $httpClient._b9a8cf46fca6;
  const _24e799adc8ed = { _8b184317be4b: _3d61e252cb2a._8b184317be4b, _3a79c9f1af7c: _3d61e252cb2a._3a79c9f1af7c, _60548553ed83: _3d61e252cb2a._60548553ed83, _fac8dcd00624: _3d61e252cb2a._fac8dcd00624 || 15000 };
  _24e799adc8ed[join(["auto", "-", "redirect"])] = true;
  _24e799adc8ed[join(["auto", "-", "cookie"])] = true;
  _e23f07423199(_24e799adc8ed, (_5eea2aeaf97c, _a7e8def3f500, _0d86898dc613) => _ccc4a01be6e3(_5eea2aeaf97c, _a7e8def3f500 || {}, String(_0d86898dc613 || "")));
}
function _f529a6aaff43(_9e27e002d5e6) {
  const _50714b04b985 = String.fromCharCode(44);
  const _3e8a9b808f4b = String.fromCharCode(59);
  return String(_9e27e002d5e6 || "").split(_50714b04b985).map(_c91e7552dfd8 => _c91e7552dfd8.split(_3e8a9b808f4b)[0].trim()).filter(_a906e7a636a4).join(_3e8a9b808f4b);
}
const _f1c72e66ed5e = join(["ht", "tps", "://"]);
const _1927dfc685e3 = [121, 99, 111, 111, 46, 110, 101, 116].map(_78c7a66210e5 => String.fromCharCode(_78c7a66210e5)).join("");
function _560da5066b03(_3e9db9327b77) { return _f1c72e66ed5e + _1927dfc685e3 + String.fromCharCode(47) + String(_3e9db9327b77 || ""); }
const _c07acee1d24d = join(["plu", "gin", ".", "php"]);
const _f6ecf53f20ff = join(["k", "_", "mi", "sign"]);
const _145624b4c79c = join(["view", "ui", "_", "lottery"]);
const _d79e87d8d153 = join(["jn", "farm"]);

function _e84f971c72ab() {
  try {
    const _c242b648d7a8 = typeof $request !== "undefined";
    const _75ab8a0dba07 = _c242b648d7a8 ? $request : {};
    const _b9a5949b8215 = typeof $response !== "undefined";
    const _41ded40ade36 = _b9a5949b8215 ? $response : {};
    const _60548553ed83 = String(_41ded40ade36._60548553ed83 || "");
    const _3a04cb44b7ba = _f529a6aaff43(_aa579aca9eec(_75ab8a0dba07._3a79c9f1af7c, join(["C", "ookie"])) || _aa579aca9eec(_41ded40ade36._3a79c9f1af7c, join(["Set", "-", "C", "ookie"])));
    const _f45095fde009 = _60548553ed83.indexOf(join(["action", "=", "logout"])) >= 0 && _3a04cb44b7ba.length > 30;
    _361bed695202("🍪 登录状态抓取");
    _361bed695202("🌐 页面：" + _5fa7c91ff379(_75ab8a0dba07._8b184317be4b, 180));
    _361bed695202("📦 页面长度：" + _60548553ed83.length);
    if (!_f45095fde009) return _8294b54b7621(true, "登录状态未更新", "当前页面不是已登录状态");
    const _167b49026dc8 = _f426bc373328("session");
    _bc16676233c9("session", _3a04cb44b7ba);
    _bc16676233c9("updated", new Date().toISOString());
    _361bed695202(_167b49026dc8 === _3a04cb44b7ba ? "✅ 登录状态未变化" : "✅ 登录状态已更新");
    _361bed695202("🔐 状态长度：" + _3a04cb44b7ba.length);
    $notification._10cd01465c4c("论坛登录状态", _167b49026dc8 === _3a04cb44b7ba ? "✅ 未变化" : "✅ 已更新", "长度 " + _3a04cb44b7ba.length);
    _8294b54b7621(true, "论坛登录状态", _167b49026dc8 === _3a04cb44b7ba ? "未变化" : "已更新");
  } catch (_5eea2aeaf97c) {
    _361bed695202("❌ 登录状态异常：" + _5eea2aeaf97c);
    _8294b54b7621(false, "登录状态失败", String(_5eea2aeaf97c));
  }
}
function _76a2d53b585f(_ccc4a01be6e3) {
  const _3a04cb44b7ba = _f426bc373328("session");
  if (!_3a04cb44b7ba) return _ccc4a01be6e3("missing");
  const _3a79c9f1af7c = {};
  _3a79c9f1af7c[join(["C", "ookie"])] = _3a04cb44b7ba;
  _3a79c9f1af7c[join(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _3a79c9f1af7c._67f83ecc124f = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _a7cf1a586676({ _8b184317be4b: _560da5066b03(""), _3a79c9f1af7c }, (_5eea2aeaf97c, _a7e8def3f500, _0d86898dc613) => {
    if (_5eea2aeaf97c) return _ccc4a01be6e3(_5eea2aeaf97c);
    if (_0d86898dc613.indexOf(join(["action", "=", "logout"])) < 0) return _ccc4a01be6e3("expired");
    const _78c7a66210e5 = _32e580f97679(_0d86898dc613);
    if (!_78c7a66210e5) return _ccc4a01be6e3("token");
    _ccc4a01be6e3(null, { _3a79c9f1af7c, _78c7a66210e5 });
  });
}
function _34572a910683(_274851cc0cd3, _ccc4a01be6e3) {
  const _3a79c9f1af7c = Object.assign({}, _274851cc0cd3._3a79c9f1af7c);
  _3a79c9f1af7c._124af66b9d88 = _560da5066b03(join([_f6ecf53f20ff, "-", "sign", ".", "html"]));
  _3a79c9f1af7c[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  _a7cf1a586676({ _8b184317be4b: _560da5066b03(_c07acee1d24d + "?id=" + _f6ecf53f20ff + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + _274851cc0cd3._78c7a66210e5), _3a79c9f1af7c }, (_5eea2aeaf97c, _a7e8def3f500, _0d86898dc613) => {
    _361bed695202("📅 每日签到");
    if (_5eea2aeaf97c) return _ccc4a01be6e3("❌ 请求失败：" + _5eea2aeaf97c);
    const _cd6354c7db7a = _0d86898dc613.indexOf("今日已签") >= 0;
    const _4a5a1decf0a1 = _cd6354c7db7a || _0d86898dc613.indexOf("<![CDATA[]]>") >= 0;
    _a7cf1a586676({ _8b184317be4b: _560da5066b03(join([_f6ecf53f20ff, "-", "sign", ".", "html"])), _3a79c9f1af7c: _274851cc0cd3._3a79c9f1af7c }, (_fe60409c2ca8, _5f03e16c3b1b, _5a60648a99e6) => {
      const _ced884df1157 = _deca9d545453(_5a60648a99e6, "签到排名：", " ");
      const _2c75be76da02 = _deca9d545453(_5a60648a99e6, 'id="lxtdays" value="', '"');
      const _df0636bfbf9a = _deca9d545453(_5a60648a99e6, 'id="lxlevel" value="', '"');
      const _2a9ca5823b9a = _deca9d545453(_5a60648a99e6, 'id="lxreward" value="', '"');
      _361bed695202(_cd6354c7db7a ? "ℹ️ 今日已经签到" : _4a5a1decf0a1 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_ced884df1157) _361bed695202("🏆 当前排名：" + _ced884df1157);
      if (_2c75be76da02) _361bed695202("📆 累计天数：" + _2c75be76da02);
      if (_df0636bfbf9a) _361bed695202("🏅 签到等级：LV." + _df0636bfbf9a);
      if (_2a9ca5823b9a) _361bed695202("💰 最近奖励：" + _2a9ca5823b9a);
      _ccc4a01be6e3([_cd6354c7db7a ? "ℹ️ 今日已签到" : _4a5a1decf0a1 ? "✅ 签到成功" : "⚠️ 签到异常", _ced884df1157 ? "🏆 排名 " + _ced884df1157 : "", _2c75be76da02 ? "📆 累计 " + _2c75be76da02 + " 天" : ""].filter(_a906e7a636a4).join("\n"));
    });
  });
}
function _2386b7e8c966(_274851cc0cd3, _ccc4a01be6e3) {
  const _3a79c9f1af7c = Object.assign({}, _274851cc0cd3._3a79c9f1af7c);
  _3a79c9f1af7c._124af66b9d88 = _560da5066b03(_c07acee1d24d + "?id=" + _145624b4c79c);
  _3a79c9f1af7c[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  _3a79c9f1af7c._67f83ecc124f = "application/json,text/javascript,*/*;q=0.8";
  const _8099e7110e49 = _560da5066b03(_c07acee1d24d + "?id=" + _145624b4c79c + ":draw");
  const _796be1a5daf7 = ["🎰 幸运抽奖"];
  const _33d2a3487159 = _5bda1eaf2dc6 => {
    if (_5bda1eaf2dc6 <= 0) { _796be1a5daf7.forEach(_361bed695202); return _ccc4a01be6e3(_796be1a5daf7.join("\n")); }
    _a7cf1a586676({ _8b184317be4b: _8099e7110e49 + "?drawnumber=1&inajax=1", _3a79c9f1af7c }, (_5eea2aeaf97c, _a7e8def3f500, _0d86898dc613) => {
      let _c52ae09c5c7c = {};
      try { _c52ae09c5c7c = JSON.parse(_0d86898dc613); } catch (_990ea491c34f) {}
      const _1bb1fa64c0e4 = String((_c52ae09c5c7c._0d86898dc613 || {})["2"] || "");
      if (_5eea2aeaf97c || _c52ae09c5c7c._afce44e793ab !== "succeed" || _1bb1fa64c0e4.indexOf("抽奖券") < 0) {
        _796be1a5daf7.push("ℹ️ " + (_5eea2aeaf97c || _c52ae09c5c7c._ecd5695bb8e4 || "没有可用抽奖券"));
        _796be1a5daf7.forEach(_361bed695202);
        return _ccc4a01be6e3(_796be1a5daf7.join("\n"));
      }
      _a7cf1a586676({ _8b184317be4b: _8099e7110e49 + "?drawnumber=1&pay=2&formhash=" + _274851cc0cd3._78c7a66210e5 + "&inajax=1", _3a79c9f1af7c }, (_fe60409c2ca8, _5f03e16c3b1b, _f1e8fa60920e) => {
        let _afce44e793ab = {};
        try { _afce44e793ab = JSON.parse(_f1e8fa60920e); } catch (_990ea491c34f) {}
        if (_fe60409c2ca8 || _afce44e793ab._afce44e793ab !== "succeed") {
          _796be1a5daf7.push("⚠️ " + (_fe60409c2ca8 || _afce44e793ab._ecd5695bb8e4 || "抽奖失败"));
          _796be1a5daf7.forEach(_361bed695202);
          return _ccc4a01be6e3(_796be1a5daf7.join("\n"));
        }
        const _af77d88da983 = (((_afce44e793ab._0d86898dc613 || {})._5d1b97e44ece) || []).map(_c91e7552dfd8 => (_c91e7552dfd8._09e955e08963 || "奖品") + "：" + (_c91e7552dfd8._4fa2f1d938ff || "未知"));
        const _ffb2c099e127 = String((_afce44e793ab._0d86898dc613 || {})._6e6f5126b9de || "0");
        const _e0ff7e55e6bb = String((_afce44e793ab._0d86898dc613 || {})._6370d63bc4bf || "");
        _796be1a5daf7.push("🎁 第 " + _796be1a5daf7.length + " 次：" + (_af77d88da983.join("、") || _afce44e793ab._ecd5695bb8e4 || "成功"));
        _796be1a5daf7.push("🎟️ 剩余抽奖券：" + _ffb2c099e127 + (_e0ff7e55e6bb ? "  💰 星币：" + _e0ff7e55e6bb : ""));
        if (_ffb2c099e127 === "0") { _796be1a5daf7.forEach(_361bed695202); return _ccc4a01be6e3(_796be1a5daf7.join("\n")); }
        _33d2a3487159(_5bda1eaf2dc6 - 1);
      });
    });
  };
  _33d2a3487159(10);
}
function _c34217ce4c14(_274851cc0cd3, _ccc4a01be6e3) {
  const _3a79c9f1af7c = Object.assign({}, _274851cc0cd3._3a79c9f1af7c);
  _3a79c9f1af7c._124af66b9d88 = _560da5066b03(_c07acee1d24d + "?id=" + _d79e87d8d153);
  _3a79c9f1af7c[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  const _b60c7c999a84 = ["🌾 农场与福利"];
  const _7bfea746076c = _07e6fe9a4022 => _560da5066b03(_c07acee1d24d + "?id=" + _d79e87d8d153 + "&" + _07e6fe9a4022 + "&formhash=" + _274851cc0cd3._78c7a66210e5 + "&inajax=1");
  const _d357136f57f9 = [
    ["每日免费领取", join(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", join(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _a5b30df33cba = 1; _a5b30df33cba <= 8; _a5b30df33cba += 1) _d357136f57f9.push(["地块 " + _a5b30df33cba, join(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _a5b30df33cba]);
  const _c07ae6293aae = _a5b30df33cba => {
    if (_a5b30df33cba >= _d357136f57f9.length) { _b60c7c999a84.forEach(_361bed695202); return _ccc4a01be6e3(_b60c7c999a84.join("\n")); }
    const _88b7a74d97b8 = _d357136f57f9[_a5b30df33cba];
    _a7cf1a586676({ _8b184317be4b: _7bfea746076c(_88b7a74d97b8[1]), _3a79c9f1af7c }, (_5eea2aeaf97c, _a7e8def3f500, _0d86898dc613) => {
      const _1889360f1bb7 = _5810b53e4d16(_0d86898dc613)[0] || _5fa7c91ff379(_0579e622e38f(_0d86898dc613), 80);
      const _d10b38ecd89c = _fb7bb97e5e14(_1889360f1bb7, ["成功", "完成", "可领取"]) ? "✅" : _fb7bb97e5e14(_1889360f1bb7, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _b60c7c999a84.push(_d10b38ecd89c + " " + _88b7a74d97b8[0] + "：" + (_5eea2aeaf97c || _1889360f1bb7 || "无返回"));
      const _308104b49084 = _deca9d545453(_88b7a74d97b8[1], "jfid=", "&");
      if (_308104b49084 && _fb7bb97e5e14(_0d86898dc613, ["已枯萎", "清除"])) {
        return _a7cf1a586676({ _8b184317be4b: _7bfea746076c(join(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _308104b49084), _3a79c9f1af7c }, (_fe60409c2ca8, _5f03e16c3b1b, _7e829bf86129) => {
          _b60c7c999a84.push((_fb7bb97e5e14(_7e829bf86129, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _308104b49084);
          _a7cf1a586676({ _8b184317be4b: _7bfea746076c(join(["do=", "plant", "seed", "&seed=1&jfid="]) + _308104b49084 + "&timestamp=" + Math.floor(Date.now() / 1000)), _3a79c9f1af7c }, (_bf571b3e5b2f, _51c2641d0f2a, _a76704526143) => {
            _b60c7c999a84.push((_a76704526143.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _308104b49084 + "：" + (_5810b53e4d16(_a76704526143)[0] || "无返回"));
            _c07ae6293aae(_a5b30df33cba + 1);
          });
        });
      }
      _c07ae6293aae(_a5b30df33cba + 1);
    });
  };
  _a7cf1a586676({ _8b184317be4b: _7bfea746076c(join(["do=", "normal", "&ac=", "kuo", "zhan"])), _3a79c9f1af7c }, (_5eea2aeaf97c, _a7e8def3f500, _0d86898dc613) => {
    _b60c7c999a84.push((_fb7bb97e5e14(_5810b53e4d16(_0d86898dc613)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (_5eea2aeaf97c || _5810b53e4d16(_0d86898dc613)[0] || "无返回"));
    _c07ae6293aae(0);
  });
}
function _e411cc4e2eb4() {
  _361bed695202("🚀 论坛任务开始");
  _361bed695202("🕒 " + new Date().toLocaleString("zh-CN", { _e7f16d530f58: false }));
  _76a2d53b585f((_5eea2aeaf97c, _274851cc0cd3) => {
    if (_5eea2aeaf97c === "missing") return _8294b54b7621(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (_5eea2aeaf97c === "expired") return _8294b54b7621(false, "论坛登录失效", "请重新登录论坛");
    if (_5eea2aeaf97c) return _8294b54b7621(false, "论坛任务失败", String(_5eea2aeaf97c));
    _361bed695202("🔐 登录状态有效");
    _34572a910683(_274851cc0cd3, _9745d482f465 => _2386b7e8c966(_274851cc0cd3, _6b96bbd145f6 => _c34217ce4c14(_274851cc0cd3, _d0ff2b67b8b1 => _8294b54b7621(true, "论坛任务完成", [_9745d482f465, _6b96bbd145f6, _d0ff2b67b8b1].join("\n")))));
  });
}
const _c242b648d7a8 = typeof $request !== "undefined";
if (_c242b648d7a8) _e84f971c72ab();
else _e411cc4e2eb4();

})();
