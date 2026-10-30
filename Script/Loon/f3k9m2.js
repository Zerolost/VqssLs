/*97edab3afc25*/
(function(){
const _1d71007a4454 = typeof $argument === "object" && $argument ? $argument : {};
const _6e6dd8673d98 = $persistentStore;
const _7710c8df3559 = "a91e7c4d";
const _97ce5f83249e = { _4fa16a6f7a1e: false };
const _9a0ed948b38e = [];
const _36ad67225aaa = _da15fd247581 => _da15fd247581._36ad67225aaa("");

function _9f0d36719bf4(_9a7cfd2db348) { return _6e6dd8673d98._9f0d36719bf4(_7710c8df3559 + "." + _9a7cfd2db348) || ""; }
function _f3b5fb98448b(_9a7cfd2db348, _4fa16a6f7a1e) { return _6e6dd8673d98._f3b5fb98448b(_4fa16a6f7a1e == null ? undefined : String(_4fa16a6f7a1e), _7710c8df3559 + "." + _9a7cfd2db348); }
function _74f0bca0299b(_604d27521aa8, _9a7cfd2db348) {
  const _af47683c73a9 = Object._5b12b4130d20(_604d27521aa8 || {})._b10ad81d39cf(_d51255f09b55 => _d51255f09b55._a872ba91553e() === _9a7cfd2db348._a872ba91553e());
  return _af47683c73a9 ? String(_604d27521aa8[_af47683c73a9] || "") : "";
}
function _20ec7c08ba92(_f8ea0b6811d3) { _9a0ed948b38e._d81a80977ca5(String(_f8ea0b6811d3)); _e87c7bc3d899._89ed3af57abc(String(_f8ea0b6811d3)); }
function _b9d8cae3f923(_4fa16a6f7a1e, _c9d3030e0440) {
  const _8c35b6e4f3f1 = String(_4fa16a6f7a1e || "")._88288ce43403(String._e5bade84f822(32))._36ad67225aaa(" ")._8643593052b1();
  return _8c35b6e4f3f1._ad8b632f989f > _c9d3030e0440 ? _8c35b6e4f3f1._22c65e0f3e89(0, _c9d3030e0440) + "..." : _8c35b6e4f3f1;
}
function _1e9a9dfe552e(_4fa16a6f7a1e) { return String(_4fa16a6f7a1e || "")._88288ce43403("<")._36ad67225aaa(" ")._88288ce43403(">")._36ad67225aaa(" ")._8643593052b1(); }
function _404db6c1dd02(_4fa16a6f7a1e, _823c53036eaa, _86bfb7570a1f) {
  const _8c35b6e4f3f1 = String(_4fa16a6f7a1e || "");
  const _8d08c54012a4 = _8c35b6e4f3f1._25bcac5724d4(_823c53036eaa);
  if (_8d08c54012a4 < 0) return "";
  const _ebbb126433b9 = _8d08c54012a4 + _823c53036eaa._ad8b632f989f;
  const _856a699b4d56 = _8c35b6e4f3f1._25bcac5724d4(_86bfb7570a1f, _ebbb126433b9);
  return _8c35b6e4f3f1._22c65e0f3e89(_ebbb126433b9, _856a699b4d56 < 0 ? _ebbb126433b9 + 16 : _856a699b4d56)._8643593052b1();
}
function _3b68e7f07f54(_4fa16a6f7a1e) { return _404db6c1dd02(_4fa16a6f7a1e, _36ad67225aaa(["form", "hash", "="]), "&"); }
function _9ac5c9e3faaa(_4fa16a6f7a1e) {
  const _ea565b39d74d = _36ad67225aaa(["layer", ".msg('"]);
  const _8c35b6e4f3f1 = String(_4fa16a6f7a1e || "");
  const _823c53036eaa = _8c35b6e4f3f1._25bcac5724d4(_ea565b39d74d);
  if (_823c53036eaa < 0) return [];
  const _ebbb126433b9 = _823c53036eaa + _ea565b39d74d._ad8b632f989f;
  const _86bfb7570a1f = _8c35b6e4f3f1._25bcac5724d4("')", _ebbb126433b9);
  return _86bfb7570a1f < 0 ? [] : [_8c35b6e4f3f1._22c65e0f3e89(_ebbb126433b9, _86bfb7570a1f)];
}
function _31ab2a27d2e1(_4fa16a6f7a1e, _8a11c12dd82e) { return _8a11c12dd82e._ed6583212af4(_a017bde8f624 => String(_4fa16a6f7a1e || "")._25bcac5724d4(_a017bde8f624) >= 0); }
function _d35976662708(_d0ad1b82ff24, _9f10ce42ff8a, _6f96b1e0d7d4) {
  if (_97ce5f83249e._4fa16a6f7a1e) return;
  _97ce5f83249e._4fa16a6f7a1e = true;
  _20ec7c08ba92("━━━━━━━━ 执行结束 ━━━━━━━━");
  _20ec7c08ba92(_d0ad1b82ff24 ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _326d32a2d43b = typeof $notification !== "undefined";
  if (_1d71007a4454._16217e65d4c5 !== false && _326d32a2d43b) $notification._4448c4825ac9(_9f10ce42ff8a || "论坛任务", _d0ad1b82ff24 ? "✅ 已完成" : "❌ 未完成", _b9d8cae3f923(_6f96b1e0d7d4 || _9a0ed948b38e._36ad67225aaa("\n"), 700));
  const _d9b164734456 = typeof $done === "function";
  if (_d9b164734456) $done({});
}
function _842b5e9c3f31(_a11efe7e6553, _6d2acc215d3e) {
  const _f863cb8b871c = String(_a11efe7e6553._f863cb8b871c || "GET")._a872ba91553e();
  const _bd93a2837efa = $httpClient[_f863cb8b871c] || $httpClient._d4093a634bef;
  const _b6b8324d5a8e = { _ff8073249d23: _a11efe7e6553._ff8073249d23, _604d27521aa8: _a11efe7e6553._604d27521aa8, _6f96b1e0d7d4: _a11efe7e6553._6f96b1e0d7d4, _447fc0939266: _a11efe7e6553._447fc0939266 || 15000 };
  _b6b8324d5a8e[_36ad67225aaa(["auto", "-", "redirect"])] = true;
  _b6b8324d5a8e[_36ad67225aaa(["auto", "-", "cookie"])] = true;
  _bd93a2837efa(_b6b8324d5a8e, (_66c37e1c3ea6, _36eb3db2623f, _bd322afdbc54) => _6d2acc215d3e(_66c37e1c3ea6, _36eb3db2623f || {}, String(_bd322afdbc54 || "")));
}
function _53acf264c28b(_4fa16a6f7a1e) {
  const _70128b6ab6ad = String._e5bade84f822(44);
  const _98a4338f26a4 = String._e5bade84f822(59);
  return String(_4fa16a6f7a1e || "")._88288ce43403(_70128b6ab6ad)._78e8580e23b7(_d51255f09b55 => _d51255f09b55._88288ce43403(_98a4338f26a4)[0]._8643593052b1())._abcff57ec5b5(_46dac49c572e)._36ad67225aaa(_98a4338f26a4);
}
const _0774fd52cef1 = _36ad67225aaa(["ht", "tps", "://"]);
const _1171967d0c1b = [121, 99, 111, 111, 46, 110, 101, 116]._78e8580e23b7(_255aa18674b8 => String._e5bade84f822(_255aa18674b8))._36ad67225aaa("");
function _a899f5f82fc6(_e009678476e1) { return _0774fd52cef1 + _1171967d0c1b + String._e5bade84f822(47) + String(_e009678476e1 || ""); }
const _1bf04ad4fb14 = _36ad67225aaa(["plu", "gin", ".", "php"]);
const _973f1c96ec3c = _36ad67225aaa(["k", "_", "mi", "sign"]);
const _ebc1acdf1b58 = _36ad67225aaa(["view", "ui", "_", "lottery"]);
const _880743340aba = _36ad67225aaa(["jn", "farm"]);

function _b2e35d80ef32() {
  try {
    const _6befef661ec0 = typeof $request !== "undefined";
    const _e80e51c13d41 = _6befef661ec0 ? $request : {};
    const _14d5e3b1a211 = typeof $response !== "undefined";
    const _fab697962e7f = _14d5e3b1a211 ? $response : {};
    const _6f96b1e0d7d4 = String(_fab697962e7f._6f96b1e0d7d4 || "");
    const _c5b26ce5471b = _53acf264c28b(_74f0bca0299b(_e80e51c13d41._604d27521aa8, _36ad67225aaa(["C", "ookie"])) || _74f0bca0299b(_fab697962e7f._604d27521aa8, _36ad67225aaa(["Set", "-", "C", "ookie"])));
    const _5545c2e926df = _6f96b1e0d7d4._25bcac5724d4(_36ad67225aaa(["action", "=", "logout"])) >= 0 && _c5b26ce5471b._ad8b632f989f > 30;
    _20ec7c08ba92("🍪 登录状态抓取");
    _20ec7c08ba92("🌐 页面：" + _b9d8cae3f923(_e80e51c13d41._ff8073249d23, 180));
    _20ec7c08ba92("📦 页面长度：" + _6f96b1e0d7d4._ad8b632f989f);
    if (!_5545c2e926df) return _d35976662708(true, "登录状态未更新", "当前页面不是已登录状态");
    const _9a93a4bb415e = _9f0d36719bf4("session");
    _f3b5fb98448b("session", _c5b26ce5471b);
    _f3b5fb98448b("updated", new Date()._a9f861c4ed11());
    _20ec7c08ba92(_9a93a4bb415e === _c5b26ce5471b ? "✅ 登录状态未变化" : "✅ 登录状态已更新");
    _20ec7c08ba92("🔐 状态长度：" + _c5b26ce5471b._ad8b632f989f);
    $notification._4448c4825ac9("论坛登录状态", _9a93a4bb415e === _c5b26ce5471b ? "✅ 未变化" : "✅ 已更新", "长度 " + _c5b26ce5471b._ad8b632f989f);
    _d35976662708(true, "论坛登录状态", _9a93a4bb415e === _c5b26ce5471b ? "未变化" : "已更新");
  } catch (_66c37e1c3ea6) {
    _20ec7c08ba92("❌ 登录状态异常：" + _66c37e1c3ea6);
    _d35976662708(false, "登录状态失败", String(_66c37e1c3ea6));
  }
}
function _e04b4218f35c(_6d2acc215d3e) {
  const _c5b26ce5471b = _9f0d36719bf4("session");
  if (!_c5b26ce5471b) return _6d2acc215d3e("missing");
  const _604d27521aa8 = {};
  _604d27521aa8[_36ad67225aaa(["C", "ookie"])] = _c5b26ce5471b;
  _604d27521aa8[_36ad67225aaa(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _604d27521aa8._c3eccddce8b0 = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _842b5e9c3f31({ _ff8073249d23: _a899f5f82fc6(""), _604d27521aa8 }, (_66c37e1c3ea6, _36eb3db2623f, _bd322afdbc54) => {
    if (_66c37e1c3ea6) return _6d2acc215d3e(_66c37e1c3ea6);
    if (_bd322afdbc54._25bcac5724d4(_36ad67225aaa(["action", "=", "logout"])) < 0) return _6d2acc215d3e("expired");
    const _255aa18674b8 = _3b68e7f07f54(_bd322afdbc54);
    if (!_255aa18674b8) return _6d2acc215d3e("token");
    _6d2acc215d3e(null, { _604d27521aa8, _255aa18674b8 });
  });
}
function _3070dec17e82(_9410f1de6fd6, _6d2acc215d3e) {
  const _604d27521aa8 = Object._b67cd012f594({}, _9410f1de6fd6._604d27521aa8);
  _604d27521aa8._fdaad9f7b5c7 = _a899f5f82fc6(_36ad67225aaa([_973f1c96ec3c, "-", "sign", ".", "html"]));
  _604d27521aa8[_36ad67225aaa(["X", "-", "Requested", "-", "With"])] = _36ad67225aaa(["XML", "Http", "Request"]);
  _842b5e9c3f31({ _ff8073249d23: _a899f5f82fc6(_1bf04ad4fb14 + "?id=" + _973f1c96ec3c + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + _9410f1de6fd6._255aa18674b8), _604d27521aa8 }, (_66c37e1c3ea6, _36eb3db2623f, _bd322afdbc54) => {
    _20ec7c08ba92("📅 每日签到");
    if (_66c37e1c3ea6) return _6d2acc215d3e("❌ 请求失败：" + _66c37e1c3ea6);
    const _706c0a53ce8f = _bd322afdbc54._25bcac5724d4("今日已签") >= 0;
    const _9e73ea2b65b3 = _706c0a53ce8f || _bd322afdbc54._25bcac5724d4("<![CDATA[]]>") >= 0;
    _842b5e9c3f31({ _ff8073249d23: _a899f5f82fc6(_36ad67225aaa([_973f1c96ec3c, "-", "sign", ".", "html"])), _604d27521aa8: _9410f1de6fd6._604d27521aa8 }, (_435c78d71965, _44a5a278f8bc, _d1f44bfd9493) => {
      const _9778f5535ac4 = _404db6c1dd02(_d1f44bfd9493, "签到排名：", " ");
      const _773c81dfe82f = _404db6c1dd02(_d1f44bfd9493, 'id="lxtdays" value="', '"');
      const _bb0ce368a142 = _404db6c1dd02(_d1f44bfd9493, 'id="lxlevel" value="', '"');
      const _f42febc978eb = _404db6c1dd02(_d1f44bfd9493, 'id="lxreward" value="', '"');
      _20ec7c08ba92(_706c0a53ce8f ? "ℹ️ 今日已经签到" : _9e73ea2b65b3 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_9778f5535ac4) _20ec7c08ba92("🏆 当前排名：" + _9778f5535ac4);
      if (_773c81dfe82f) _20ec7c08ba92("📆 累计天数：" + _773c81dfe82f);
      if (_bb0ce368a142) _20ec7c08ba92("🏅 签到等级：LV." + _bb0ce368a142);
      if (_f42febc978eb) _20ec7c08ba92("💰 最近奖励：" + _f42febc978eb);
      _6d2acc215d3e([_706c0a53ce8f ? "ℹ️ 今日已签到" : _9e73ea2b65b3 ? "✅ 签到成功" : "⚠️ 签到异常", _9778f5535ac4 ? "🏆 排名 " + _9778f5535ac4 : "", _773c81dfe82f ? "📆 累计 " + _773c81dfe82f + " 天" : ""]._abcff57ec5b5(_46dac49c572e)._36ad67225aaa("\n"));
    });
  });
}
function _f46dca759472(_9410f1de6fd6, _6d2acc215d3e) {
  const _604d27521aa8 = Object._b67cd012f594({}, _9410f1de6fd6._604d27521aa8);
  _604d27521aa8._fdaad9f7b5c7 = _a899f5f82fc6(_1bf04ad4fb14 + "?id=" + _ebc1acdf1b58);
  _604d27521aa8[_36ad67225aaa(["X", "-", "Requested", "-", "With"])] = _36ad67225aaa(["XML", "Http", "Request"]);
  _604d27521aa8._c3eccddce8b0 = "application/json,text/javascript,*/*;q=0.8";
  const _685a8806a9eb = _a899f5f82fc6(_1bf04ad4fb14 + "?id=" + _ebc1acdf1b58 + ":draw");
  const _3661d71580e2 = ["🎰 幸运抽奖"];
  const _11a8867bcd56 = _786894d77aa3 => {
    if (_786894d77aa3 <= 0) { _3661d71580e2._7200113deb8b(_20ec7c08ba92); return _6d2acc215d3e(_3661d71580e2._36ad67225aaa("\n")); }
    _842b5e9c3f31({ _ff8073249d23: _685a8806a9eb + "?drawnumber=1&inajax=1", _604d27521aa8 }, (_66c37e1c3ea6, _36eb3db2623f, _bd322afdbc54) => {
      let _f5f18c7eb17f = {};
      try { _f5f18c7eb17f = JSON._d496733cef42(_bd322afdbc54); } catch (_84ef94af5d68) {}
      const _7074944b793a = String((_f5f18c7eb17f._bd322afdbc54 || {})["2"] || "");
      if (_66c37e1c3ea6 || _f5f18c7eb17f._960e623d5c02 !== "succeed" || _7074944b793a._25bcac5724d4("抽奖券") < 0) {
        _3661d71580e2._d81a80977ca5("ℹ️ " + (_66c37e1c3ea6 || _f5f18c7eb17f._7bb0945ce2e7 || "没有可用抽奖券"));
        _3661d71580e2._7200113deb8b(_20ec7c08ba92);
        return _6d2acc215d3e(_3661d71580e2._36ad67225aaa("\n"));
      }
      _842b5e9c3f31({ _ff8073249d23: _685a8806a9eb + "?drawnumber=1&pay=2&formhash=" + _9410f1de6fd6._255aa18674b8 + "&inajax=1", _604d27521aa8 }, (_435c78d71965, _44a5a278f8bc, _4d444091a1a4) => {
        let _960e623d5c02 = {};
        try { _960e623d5c02 = JSON._d496733cef42(_4d444091a1a4); } catch (_84ef94af5d68) {}
        if (_435c78d71965 || _960e623d5c02._960e623d5c02 !== "succeed") {
          _3661d71580e2._d81a80977ca5("⚠️ " + (_435c78d71965 || _960e623d5c02._7bb0945ce2e7 || "抽奖失败"));
          _3661d71580e2._7200113deb8b(_20ec7c08ba92);
          return _6d2acc215d3e(_3661d71580e2._36ad67225aaa("\n"));
        }
        const _5f88dec27769 = (((_960e623d5c02._bd322afdbc54 || {})._24d79e92347c) || [])._78e8580e23b7(_d51255f09b55 => (_d51255f09b55._7cbec977d16f || "奖品") + "：" + (_d51255f09b55._9a7cfd2db348 || "未知"));
        const _8d08c54012a4 = String((_960e623d5c02._bd322afdbc54 || {})._eb33427c8cd0 || "0");
        const _06c24d86f382 = String((_960e623d5c02._bd322afdbc54 || {})._593ca441ff60 || "");
        _3661d71580e2._d81a80977ca5("🎁 第 " + _3661d71580e2._ad8b632f989f + " 次：" + (_5f88dec27769._36ad67225aaa("、") || _960e623d5c02._7bb0945ce2e7 || "成功"));
        _3661d71580e2._d81a80977ca5("🎟️ 剩余抽奖券：" + _8d08c54012a4 + (_06c24d86f382 ? "  💰 星币：" + _06c24d86f382 : ""));
        if (_8d08c54012a4 === "0") { _3661d71580e2._7200113deb8b(_20ec7c08ba92); return _6d2acc215d3e(_3661d71580e2._36ad67225aaa("\n")); }
        _11a8867bcd56(_786894d77aa3 - 1);
      });
    });
  };
  _11a8867bcd56(10);
}
function _211362f7ddba(_9410f1de6fd6, _6d2acc215d3e) {
  const _604d27521aa8 = Object._b67cd012f594({}, _9410f1de6fd6._604d27521aa8);
  _604d27521aa8._fdaad9f7b5c7 = _a899f5f82fc6(_1bf04ad4fb14 + "?id=" + _880743340aba);
  _604d27521aa8[_36ad67225aaa(["X", "-", "Requested", "-", "With"])] = _36ad67225aaa(["XML", "Http", "Request"]);
  const _cf177feca821 = ["🌾 农场与福利"];
  const _468a6519a2ed = _3b0350cf5a2a => _a899f5f82fc6(_1bf04ad4fb14 + "?id=" + _880743340aba + "&" + _3b0350cf5a2a + "&formhash=" + _9410f1de6fd6._255aa18674b8 + "&inajax=1");
  const _e53d4f9cedbc = [
    ["每日免费领取", _36ad67225aaa(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _36ad67225aaa(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _55c0a070e202 = 1; _55c0a070e202 <= 8; _55c0a070e202 += 1) _e53d4f9cedbc._d81a80977ca5(["地块 " + _55c0a070e202, _36ad67225aaa(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _55c0a070e202]);
  const _f03a6722e822 = _55c0a070e202 => {
    if (_55c0a070e202 >= _e53d4f9cedbc._ad8b632f989f) { _cf177feca821._7200113deb8b(_20ec7c08ba92); return _6d2acc215d3e(_cf177feca821._36ad67225aaa("\n")); }
    const _7a24618b9524 = _e53d4f9cedbc[_55c0a070e202];
    _842b5e9c3f31({ _ff8073249d23: _468a6519a2ed(_7a24618b9524[1]), _604d27521aa8 }, (_66c37e1c3ea6, _36eb3db2623f, _bd322afdbc54) => {
      const _f8ea0b6811d3 = _9ac5c9e3faaa(_bd322afdbc54)[0] || _b9d8cae3f923(_1e9a9dfe552e(_bd322afdbc54), 80);
      const _0f35eff9f822 = _31ab2a27d2e1(_f8ea0b6811d3, ["成功", "完成", "可领取"]) ? "✅" : _31ab2a27d2e1(_f8ea0b6811d3, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _cf177feca821._d81a80977ca5(_0f35eff9f822 + " " + _7a24618b9524[0] + "：" + (_66c37e1c3ea6 || _f8ea0b6811d3 || "无返回"));
      const _ece80386529b = _404db6c1dd02(_7a24618b9524[1], "jfid=", "&");
      if (_ece80386529b && _31ab2a27d2e1(_bd322afdbc54, ["已枯萎", "清除"])) {
        return _842b5e9c3f31({ _ff8073249d23: _468a6519a2ed(_36ad67225aaa(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _ece80386529b), _604d27521aa8 }, (_435c78d71965, _44a5a278f8bc, _3d227f3cc3c5) => {
          _cf177feca821._d81a80977ca5((_31ab2a27d2e1(_3d227f3cc3c5, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _ece80386529b);
          _842b5e9c3f31({ _ff8073249d23: _468a6519a2ed(_36ad67225aaa(["do=", "plant", "seed", "&seed=1&jfid="]) + _ece80386529b + "&timestamp=" + Math._ea60d4e78040(Date._5fac37240378() / 1000)), _604d27521aa8 }, (_93b38a8c3f4a, _0c2d31562012, _0c93b92a653e) => {
            _cf177feca821._d81a80977ca5((_0c93b92a653e._25bcac5724d4("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _ece80386529b + "：" + (_9ac5c9e3faaa(_0c93b92a653e)[0] || "无返回"));
            _f03a6722e822(_55c0a070e202 + 1);
          });
        });
      }
      _f03a6722e822(_55c0a070e202 + 1);
    });
  };
  _842b5e9c3f31({ _ff8073249d23: _468a6519a2ed(_36ad67225aaa(["do=", "normal", "&ac=", "kuo", "zhan"])), _604d27521aa8 }, (_66c37e1c3ea6, _36eb3db2623f, _bd322afdbc54) => {
    _cf177feca821._d81a80977ca5((_31ab2a27d2e1(_9ac5c9e3faaa(_bd322afdbc54)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (_66c37e1c3ea6 || _9ac5c9e3faaa(_bd322afdbc54)[0] || "无返回"));
    _f03a6722e822(0);
  });
}
function _a076de1f5263() {
  _20ec7c08ba92("🚀 论坛任务开始");
  _20ec7c08ba92("🕒 " + new Date()._f2570fd5ac8f("zh-CN", { _9f4d82e99157: false }));
  _e04b4218f35c((_66c37e1c3ea6, _9410f1de6fd6) => {
    if (_66c37e1c3ea6 === "missing") return _d35976662708(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (_66c37e1c3ea6 === "expired") return _d35976662708(false, "论坛登录失效", "请重新登录论坛");
    if (_66c37e1c3ea6) return _d35976662708(false, "论坛任务失败", String(_66c37e1c3ea6));
    _20ec7c08ba92("🔐 登录状态有效");
    _3070dec17e82(_9410f1de6fd6, _7c7764057c61 => _f46dca759472(_9410f1de6fd6, _6ec3965f3510 => _211362f7ddba(_9410f1de6fd6, _7d54693e0adb => _d35976662708(true, "论坛任务完成", [_7c7764057c61, _6ec3965f3510, _7d54693e0adb]._36ad67225aaa("\n")))));
  });
}
const _6befef661ec0 = typeof $request !== "undefined";
if (_6befef661ec0) _b2e35d80ef32();
else _a076de1f5263();

})();
