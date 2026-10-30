/*2b422fc46006*/
(function(){
const _c3e003280ee1 = typeof $argument === "object" && $argument ? $argument : {};
const _15169434bd20 = $persistentStore;
const _933eff2fa37b = "a91e7c4d";
const _8863d300bb15 = { _0d98803918a2: false };
const _a2ab7019ce86 = [];
const join = _d19be9bfd583 => _d19be9bfd583.join("");

function read(_9fbaf369d4b0) { return _15169434bd20.read(_933eff2fa37b + "." + _9fbaf369d4b0) || ""; }
function write(_9fbaf369d4b0, _0d98803918a2) { return _15169434bd20.write(_0d98803918a2 == null ? undefined : String(_0d98803918a2), _933eff2fa37b + "." + _9fbaf369d4b0); }
function _92596f5bc59b(_19e6fd41bcd7, _9fbaf369d4b0) {
  const _6af049e38dc8 = Object.keys(_19e6fd41bcd7 || {}).find(_3196755bb8d1 => _3196755bb8d1.toLowerCase() === _9fbaf369d4b0.toLowerCase());
  return _6af049e38dc8 ? String(_19e6fd41bcd7[_6af049e38dc8] || "") : "";
}
function _f54dd2fcdb44(_059f51f11772) { _a2ab7019ce86.push(String(_059f51f11772)); console.log(String(_059f51f11772)); }
function _c3b338ebb345(_0d98803918a2, _b18ca5e55c30) {
  const _571dc520ac2d = String(_0d98803918a2 || "").split(String.fromCharCode(32)).join(" ").trim();
  return _571dc520ac2d.length > _b18ca5e55c30 ? _571dc520ac2d.slice(0, _b18ca5e55c30) + "..." : _571dc520ac2d;
}
function _5ce6229b4d14(_0d98803918a2) { return String(_0d98803918a2 || "").split("<").join(" ").split(">").join(" ").trim(); }
function _190d34ee60eb(_0d98803918a2, _34c3fb8e7482, _f56a86a0c585) {
  const _571dc520ac2d = String(_0d98803918a2 || "");
  const _6e012323f08a = _571dc520ac2d.indexOf(_34c3fb8e7482);
  if (_6e012323f08a < 0) return "";
  const _259ddd65bd94 = _6e012323f08a + _34c3fb8e7482.length;
  const _ae4de557c4c0 = _571dc520ac2d.indexOf(_f56a86a0c585, _259ddd65bd94);
  return _571dc520ac2d.slice(_259ddd65bd94, _ae4de557c4c0 < 0 ? _259ddd65bd94 + 16 : _ae4de557c4c0).trim();
}
function _121b9b8155cc(_0d98803918a2) { return _190d34ee60eb(_0d98803918a2, join(["form", "hash", "="]), "&"); }
function _efcee532dbd2(_0d98803918a2) {
  const _af022097db38 = join(["layer", ".msg('"]);
  const _571dc520ac2d = String(_0d98803918a2 || "");
  const _34c3fb8e7482 = _571dc520ac2d.indexOf(_af022097db38);
  if (_34c3fb8e7482 < 0) return [];
  const _259ddd65bd94 = _34c3fb8e7482 + _af022097db38.length;
  const _f56a86a0c585 = _571dc520ac2d.indexOf("')", _259ddd65bd94);
  return _f56a86a0c585 < 0 ? [] : [_571dc520ac2d.slice(_259ddd65bd94, _f56a86a0c585)];
}
function _e8e6cf216fb4(_0d98803918a2, _83bfb4bee8c6) { return _83bfb4bee8c6.some(_7572f72b8f53 => String(_0d98803918a2 || "").indexOf(_7572f72b8f53) >= 0); }
function _69ae9b4e797d(_4f00034d9b8b, _b92cf75403b3, _842f30832cc0) {
  if (_8863d300bb15._0d98803918a2) return;
  _8863d300bb15._0d98803918a2 = true;
  _f54dd2fcdb44("━━━━━━━━ 执行结束 ━━━━━━━━");
  _f54dd2fcdb44(_4f00034d9b8b ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _a586dee08ca3 = typeof $notification !== "undefined";
  if (_c3e003280ee1._9ffb9503b187 !== false && _a586dee08ca3) $notification.post(_b92cf75403b3 || "论坛任务", _4f00034d9b8b ? "✅ 已完成" : "❌ 未完成", _c3b338ebb345(_842f30832cc0 || _a2ab7019ce86.join("\n"), 700));
  const _698027e3277c = typeof $done === "function";
  if (_698027e3277c) $done({});
}
function _a501c1d9059f(_7c3adc33d171, _036fb542a18f) {
  const _e61980edff72 = String(_7c3adc33d171._e61980edff72 || "GET").toLowerCase();
  const _14964e46dab3 = $httpClient[_e61980edff72] || $httpClient.get;
  const _79f44c6160f4 = { _91c1754b2713: _7c3adc33d171._91c1754b2713, _19e6fd41bcd7: _7c3adc33d171._19e6fd41bcd7, _842f30832cc0: _7c3adc33d171._842f30832cc0, _d63d98f54216: _7c3adc33d171._d63d98f54216 || 15000 };
  _79f44c6160f4[join(["auto", "-", "redirect"])] = true;
  _79f44c6160f4[join(["auto", "-", "cookie"])] = true;
  _14964e46dab3(_79f44c6160f4, (_4c390e356dbf, _48c487bc5bd8, _0b9f997e5c46) => _036fb542a18f(_4c390e356dbf, _48c487bc5bd8 || {}, String(_0b9f997e5c46 || "")));
}
function _ff6e4dc27f6b(_0d98803918a2) {
  const _ee6ad857e462 = String.fromCharCode(44);
  const _8e3bcff2c202 = String.fromCharCode(59);
  return String(_0d98803918a2 || "").split(_ee6ad857e462).map(_3196755bb8d1 => _3196755bb8d1.split(_8e3bcff2c202)[0].trim()).filter(_28e38884da12).join(_8e3bcff2c202);
}
const _471ff150ff14 = join(["ht", "tps", "://"]);
const _03e9e1efe46b = [121, 99, 111, 111, 46, 110, 101, 116].map(_6e64a82d6145 => String.fromCharCode(_6e64a82d6145)).join("");
function _4cd1e035cce0(_548d740f370f) { return _471ff150ff14 + _03e9e1efe46b + String.fromCharCode(47) + String(_548d740f370f || ""); }
const _9bddb5ef7f70 = join(["plu", "gin", ".", "php"]);
const _176240f3c388 = join(["k", "_", "mi", "sign"]);
const _c715ab44ee3d = join(["view", "ui", "_", "lottery"]);
const _65139cc538ca = join(["jn", "farm"]);

function _a0b9ca154ed2() {
  try {
    const _cc358de02d91 = typeof $request !== "undefined";
    const _da822ef0a3a0 = _cc358de02d91 ? $request : {};
    const _f3470b71d1e8 = typeof $response !== "undefined";
    const _adf3f924679c = _f3470b71d1e8 ? $response : {};
    const _842f30832cc0 = String(_adf3f924679c._842f30832cc0 || "");
    const _c312002c1339 = _ff6e4dc27f6b(_92596f5bc59b(_da822ef0a3a0._19e6fd41bcd7, join(["C", "ookie"])) || _92596f5bc59b(_adf3f924679c._19e6fd41bcd7, join(["Set", "-", "C", "ookie"])));
    const _5694b5851abc = _842f30832cc0.indexOf(join(["action", "=", "logout"])) >= 0 && _c312002c1339.length > 30;
    _f54dd2fcdb44("🍪 登录状态抓取");
    _f54dd2fcdb44("🌐 页面：" + _c3b338ebb345(_da822ef0a3a0._91c1754b2713, 180));
    _f54dd2fcdb44("📦 页面长度：" + _842f30832cc0.length);
    if (!_5694b5851abc) return _69ae9b4e797d(true, "登录状态未更新", "当前页面不是已登录状态");
    const _cc5dc2e3086f = read("session");
    write("session", _c312002c1339);
    write("updated", new Date().toISOString());
    _f54dd2fcdb44(_cc5dc2e3086f === _c312002c1339 ? "✅ 登录状态未变化" : "✅ 登录状态已更新");
    _f54dd2fcdb44("🔐 状态长度：" + _c312002c1339.length);
    $notification.post("论坛登录状态", _cc5dc2e3086f === _c312002c1339 ? "✅ 未变化" : "✅ 已更新", "长度 " + _c312002c1339.length);
    _69ae9b4e797d(true, "论坛登录状态", _cc5dc2e3086f === _c312002c1339 ? "未变化" : "已更新");
  } catch (_4c390e356dbf) {
    _f54dd2fcdb44("❌ 登录状态异常：" + _4c390e356dbf);
    _69ae9b4e797d(false, "登录状态失败", String(_4c390e356dbf));
  }
}
function _9eee3838bc42(_036fb542a18f) {
  const _c312002c1339 = read("session");
  if (!_c312002c1339) return _036fb542a18f("missing");
  const _19e6fd41bcd7 = {};
  _19e6fd41bcd7[join(["C", "ookie"])] = _c312002c1339;
  _19e6fd41bcd7[join(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _19e6fd41bcd7._a46617b45232 = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _a501c1d9059f({ _91c1754b2713: _4cd1e035cce0(""), _19e6fd41bcd7 }, (_4c390e356dbf, _48c487bc5bd8, _0b9f997e5c46) => {
    if (_4c390e356dbf) return _036fb542a18f(_4c390e356dbf);
    if (_0b9f997e5c46.indexOf(join(["action", "=", "logout"])) < 0) return _036fb542a18f("expired");
    const _6e64a82d6145 = _121b9b8155cc(_0b9f997e5c46);
    if (!_6e64a82d6145) return _036fb542a18f("token");
    _036fb542a18f(null, { _19e6fd41bcd7, _6e64a82d6145 });
  });
}
function _32255efa62bd(_dd95b543605e, _036fb542a18f) {
  const _19e6fd41bcd7 = Object.assign({}, _dd95b543605e._19e6fd41bcd7);
  _19e6fd41bcd7._16e62515b918 = _4cd1e035cce0(join([_176240f3c388, "-", "sign", ".", "html"]));
  _19e6fd41bcd7[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  _a501c1d9059f({ _91c1754b2713: _4cd1e035cce0(_9bddb5ef7f70 + "?id=" + _176240f3c388 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + _dd95b543605e._6e64a82d6145), _19e6fd41bcd7 }, (_4c390e356dbf, _48c487bc5bd8, _0b9f997e5c46) => {
    _f54dd2fcdb44("📅 每日签到");
    if (_4c390e356dbf) return _036fb542a18f("❌ 请求失败：" + _4c390e356dbf);
    const _53eb1267d8a2 = _0b9f997e5c46.indexOf("今日已签") >= 0;
    const _0bf2d727e549 = _53eb1267d8a2 || _0b9f997e5c46.indexOf("<![CDATA[]]>") >= 0;
    _a501c1d9059f({ _91c1754b2713: _4cd1e035cce0(join([_176240f3c388, "-", "sign", ".", "html"])), _19e6fd41bcd7: _dd95b543605e._19e6fd41bcd7 }, (_4093e31c5f0c, _ff1bc78c1cdb, _5699f268ec2e) => {
      const _f1dbab49f2f9 = _190d34ee60eb(_5699f268ec2e, "签到排名：", " ");
      const _033ab87dda6b = _190d34ee60eb(_5699f268ec2e, 'id="lxtdays" value="', '"');
      const _c7aa195c3fd7 = _190d34ee60eb(_5699f268ec2e, 'id="lxlevel" value="', '"');
      const _9f0765e43476 = _190d34ee60eb(_5699f268ec2e, 'id="lxreward" value="', '"');
      _f54dd2fcdb44(_53eb1267d8a2 ? "ℹ️ 今日已经签到" : _0bf2d727e549 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_f1dbab49f2f9) _f54dd2fcdb44("🏆 当前排名：" + _f1dbab49f2f9);
      if (_033ab87dda6b) _f54dd2fcdb44("📆 累计天数：" + _033ab87dda6b);
      if (_c7aa195c3fd7) _f54dd2fcdb44("🏅 签到等级：LV." + _c7aa195c3fd7);
      if (_9f0765e43476) _f54dd2fcdb44("💰 最近奖励：" + _9f0765e43476);
      _036fb542a18f([_53eb1267d8a2 ? "ℹ️ 今日已签到" : _0bf2d727e549 ? "✅ 签到成功" : "⚠️ 签到异常", _f1dbab49f2f9 ? "🏆 排名 " + _f1dbab49f2f9 : "", _033ab87dda6b ? "📆 累计 " + _033ab87dda6b + " 天" : ""].filter(_28e38884da12).join("\n"));
    });
  });
}
function _3f5c9e7e11fe(_dd95b543605e, _036fb542a18f) {
  const _19e6fd41bcd7 = Object.assign({}, _dd95b543605e._19e6fd41bcd7);
  _19e6fd41bcd7._16e62515b918 = _4cd1e035cce0(_9bddb5ef7f70 + "?id=" + _c715ab44ee3d);
  _19e6fd41bcd7[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  _19e6fd41bcd7._a46617b45232 = "application/json,text/javascript,*/*;q=0.8";
  const _36a743d2cca8 = _4cd1e035cce0(_9bddb5ef7f70 + "?id=" + _c715ab44ee3d + ":draw");
  const _718081bd12b7 = ["🎰 幸运抽奖"];
  const _c4fbfb204aa9 = _871ab2b50b0c => {
    if (_871ab2b50b0c <= 0) { _718081bd12b7.forEach(_f54dd2fcdb44); return _036fb542a18f(_718081bd12b7.join("\n")); }
    _a501c1d9059f({ _91c1754b2713: _36a743d2cca8 + "?drawnumber=1&inajax=1", _19e6fd41bcd7 }, (_4c390e356dbf, _48c487bc5bd8, _0b9f997e5c46) => {
      let _e34308075a68 = {};
      try { _e34308075a68 = JSON.parse(_0b9f997e5c46); } catch (_d72fc5b2d849) {}
      const _c1a5eb58e807 = String((_e34308075a68._0b9f997e5c46 || {})["2"] || "");
      if (_4c390e356dbf || _e34308075a68._e78f62d66ccb !== "succeed" || _c1a5eb58e807.indexOf("抽奖券") < 0) {
        _718081bd12b7.push("ℹ️ " + (_4c390e356dbf || _e34308075a68._36503073e7c3 || "没有可用抽奖券"));
        _718081bd12b7.forEach(_f54dd2fcdb44);
        return _036fb542a18f(_718081bd12b7.join("\n"));
      }
      _a501c1d9059f({ _91c1754b2713: _36a743d2cca8 + "?drawnumber=1&pay=2&formhash=" + _dd95b543605e._6e64a82d6145 + "&inajax=1", _19e6fd41bcd7 }, (_4093e31c5f0c, _ff1bc78c1cdb, _e62746da9898) => {
        let _e78f62d66ccb = {};
        try { _e78f62d66ccb = JSON.parse(_e62746da9898); } catch (_d72fc5b2d849) {}
        if (_4093e31c5f0c || _e78f62d66ccb._e78f62d66ccb !== "succeed") {
          _718081bd12b7.push("⚠️ " + (_4093e31c5f0c || _e78f62d66ccb._36503073e7c3 || "抽奖失败"));
          _718081bd12b7.forEach(_f54dd2fcdb44);
          return _036fb542a18f(_718081bd12b7.join("\n"));
        }
        const _2f03fb3b2838 = (((_e78f62d66ccb._0b9f997e5c46 || {})._6161d23108d6) || []).map(_3196755bb8d1 => (_3196755bb8d1._027388a10507 || "奖品") + "：" + (_3196755bb8d1._9fbaf369d4b0 || "未知"));
        const _6e012323f08a = String((_e78f62d66ccb._0b9f997e5c46 || {})._b015fbba1e03 || "0");
        const _96e23bf262a9 = String((_e78f62d66ccb._0b9f997e5c46 || {})._7e64ddfff26d || "");
        _718081bd12b7.push("🎁 第 " + _718081bd12b7.length + " 次：" + (_2f03fb3b2838.join("、") || _e78f62d66ccb._36503073e7c3 || "成功"));
        _718081bd12b7.push("🎟️ 剩余抽奖券：" + _6e012323f08a + (_96e23bf262a9 ? "  💰 星币：" + _96e23bf262a9 : ""));
        if (_6e012323f08a === "0") { _718081bd12b7.forEach(_f54dd2fcdb44); return _036fb542a18f(_718081bd12b7.join("\n")); }
        _c4fbfb204aa9(_871ab2b50b0c - 1);
      });
    });
  };
  _c4fbfb204aa9(10);
}
function _59d3172730b1(_dd95b543605e, _036fb542a18f) {
  const _19e6fd41bcd7 = Object.assign({}, _dd95b543605e._19e6fd41bcd7);
  _19e6fd41bcd7._16e62515b918 = _4cd1e035cce0(_9bddb5ef7f70 + "?id=" + _65139cc538ca);
  _19e6fd41bcd7[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  const _3d6240605af9 = ["🌾 农场与福利"];
  const _ac3c0fd7b9d9 = _a2f27cd382f7 => _4cd1e035cce0(_9bddb5ef7f70 + "?id=" + _65139cc538ca + "&" + _a2f27cd382f7 + "&formhash=" + _dd95b543605e._6e64a82d6145 + "&inajax=1");
  const _57c44ab82cd2 = [
    ["每日免费领取", join(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", join(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _f37a581d60b7 = 1; _f37a581d60b7 <= 8; _f37a581d60b7 += 1) _57c44ab82cd2.push(["地块 " + _f37a581d60b7, join(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _f37a581d60b7]);
  const _4bccbfc7b17a = _f37a581d60b7 => {
    if (_f37a581d60b7 >= _57c44ab82cd2.length) { _3d6240605af9.forEach(_f54dd2fcdb44); return _036fb542a18f(_3d6240605af9.join("\n")); }
    const _e3a3705ae13a = _57c44ab82cd2[_f37a581d60b7];
    _a501c1d9059f({ _91c1754b2713: _ac3c0fd7b9d9(_e3a3705ae13a[1]), _19e6fd41bcd7 }, (_4c390e356dbf, _48c487bc5bd8, _0b9f997e5c46) => {
      const _059f51f11772 = _efcee532dbd2(_0b9f997e5c46)[0] || _c3b338ebb345(_5ce6229b4d14(_0b9f997e5c46), 80);
      const _024718696e94 = _e8e6cf216fb4(_059f51f11772, ["成功", "完成", "可领取"]) ? "✅" : _e8e6cf216fb4(_059f51f11772, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _3d6240605af9.push(_024718696e94 + " " + _e3a3705ae13a[0] + "：" + (_4c390e356dbf || _059f51f11772 || "无返回"));
      const _3d8032675dcf = _190d34ee60eb(_e3a3705ae13a[1], "jfid=", "&");
      if (_3d8032675dcf && _e8e6cf216fb4(_0b9f997e5c46, ["已枯萎", "清除"])) {
        return _a501c1d9059f({ _91c1754b2713: _ac3c0fd7b9d9(join(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _3d8032675dcf), _19e6fd41bcd7 }, (_4093e31c5f0c, _ff1bc78c1cdb, _d7ba7ddb66c2) => {
          _3d6240605af9.push((_e8e6cf216fb4(_d7ba7ddb66c2, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _3d8032675dcf);
          _a501c1d9059f({ _91c1754b2713: _ac3c0fd7b9d9(join(["do=", "plant", "seed", "&seed=1&jfid="]) + _3d8032675dcf + "&timestamp=" + Math.floor(Date.now() / 1000)), _19e6fd41bcd7 }, (_0de5861152eb, _83a24d897014, _bf92686b1e1b) => {
            _3d6240605af9.push((_bf92686b1e1b.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _3d8032675dcf + "：" + (_efcee532dbd2(_bf92686b1e1b)[0] || "无返回"));
            _4bccbfc7b17a(_f37a581d60b7 + 1);
          });
        });
      }
      _4bccbfc7b17a(_f37a581d60b7 + 1);
    });
  };
  _a501c1d9059f({ _91c1754b2713: _ac3c0fd7b9d9(join(["do=", "normal", "&ac=", "kuo", "zhan"])), _19e6fd41bcd7 }, (_4c390e356dbf, _48c487bc5bd8, _0b9f997e5c46) => {
    _3d6240605af9.push((_e8e6cf216fb4(_efcee532dbd2(_0b9f997e5c46)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (_4c390e356dbf || _efcee532dbd2(_0b9f997e5c46)[0] || "无返回"));
    _4bccbfc7b17a(0);
  });
}
function _ad20a064c1e8() {
  _f54dd2fcdb44("🚀 论坛任务开始");
  _f54dd2fcdb44("🕒 " + new Date().toLocaleString("zh-CN", { _71c6e3de3149: false }));
  _9eee3838bc42((_4c390e356dbf, _dd95b543605e) => {
    if (_4c390e356dbf === "missing") return _69ae9b4e797d(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (_4c390e356dbf === "expired") return _69ae9b4e797d(false, "论坛登录失效", "请重新登录论坛");
    if (_4c390e356dbf) return _69ae9b4e797d(false, "论坛任务失败", String(_4c390e356dbf));
    _f54dd2fcdb44("🔐 登录状态有效");
    _32255efa62bd(_dd95b543605e, _d56f1abf6dbd => _3f5c9e7e11fe(_dd95b543605e, _bb8cc2db24ab => _59d3172730b1(_dd95b543605e, _e9f5c6cfae69 => _69ae9b4e797d(true, "论坛任务完成", [_d56f1abf6dbd, _bb8cc2db24ab, _e9f5c6cfae69].join("\n")))));
  });
}
const _cc358de02d91 = typeof $request !== "undefined";
if (_cc358de02d91) _a0b9ca154ed2();
else _ad20a064c1e8();

})();
