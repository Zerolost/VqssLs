/*10e3eb160b46*/
(function(){
const _120697faec28 = typeof $argument === "object" && $argument ? $argument : {};
const _eb14eeedd3a7 = $persistentStore;
const _10634a3bd0a5 = "a91e7c4d";
const _f670afaa21fe = { _d497e206e630: false };
const _49729fc687a8 = [];
const join = _52e0f3e238f8 => _52e0f3e238f8.join("");

function read(_49c505871226) { return _eb14eeedd3a7.read(_10634a3bd0a5 + "." + _49c505871226) || ""; }
function write(_49c505871226, _d497e206e630) { return _eb14eeedd3a7.write(_d497e206e630 == null ? undefined : String(_d497e206e630), _10634a3bd0a5 + "." + _49c505871226); }
function _903f1e0d7ae9(_4e7d36c8426d, _49c505871226) {
  const _681c22a98677 = Object.keys(_4e7d36c8426d || {}).find(_f03c2157d9c9 => _f03c2157d9c9.toLowerCase() === _49c505871226.toLowerCase());
  return _681c22a98677 ? String(_4e7d36c8426d[_681c22a98677] || "") : "";
}
function _0ae9fd2bfab9(_c5ab33cb5126) { _49729fc687a8.push(String(_c5ab33cb5126)); console.log(String(_c5ab33cb5126)); }
function _6c2eaa4a3460(_d497e206e630, _946ea66093ec) {
  const _9d054edb1f4e = String(_d497e206e630 || "").split(String.fromCharCode(32)).join(" ").trim();
  return _9d054edb1f4e.length > _946ea66093ec ? _9d054edb1f4e.slice(0, _946ea66093ec) + "..." : _9d054edb1f4e;
}
function _555d39026dcd(_d497e206e630) { return String(_d497e206e630 || "").split("<").join(" ").split(">").join(" ").trim(); }
function _bdfbe3848648(_d497e206e630, _53d4c235f109, _0d30a4bf22fd) {
  const _9d054edb1f4e = String(_d497e206e630 || "");
  const _5675fe6402de = _9d054edb1f4e.indexOf(_53d4c235f109);
  if (_5675fe6402de < 0) return "";
  const _ee716eaceafd = _5675fe6402de + _53d4c235f109.length;
  const _9ab075a9a03a = _9d054edb1f4e.indexOf(_0d30a4bf22fd, _ee716eaceafd);
  return _9d054edb1f4e.slice(_ee716eaceafd, _9ab075a9a03a < 0 ? _ee716eaceafd + 16 : _9ab075a9a03a).trim();
}
function _12da350b9290(_d497e206e630) { return _bdfbe3848648(_d497e206e630, join(["form", "hash", "="]), "&"); }
function _66be586d4cdb(_d497e206e630) {
  const _718bba0067ba = join(["layer", ".msg('"]);
  const _9d054edb1f4e = String(_d497e206e630 || "");
  const _53d4c235f109 = _9d054edb1f4e.indexOf(_718bba0067ba);
  if (_53d4c235f109 < 0) return [];
  const _ee716eaceafd = _53d4c235f109 + _718bba0067ba.length;
  const _0d30a4bf22fd = _9d054edb1f4e.indexOf("')", _ee716eaceafd);
  return _0d30a4bf22fd < 0 ? [] : [_9d054edb1f4e.slice(_ee716eaceafd, _0d30a4bf22fd)];
}
function _86b0361b4cfd(_d497e206e630, _a57c28b6c5c6) { return _a57c28b6c5c6.some(_b513a8508e29 => String(_d497e206e630 || "").indexOf(_b513a8508e29) >= 0); }
function _68ceaf42fcf2(_97cc1b9e9058, _70e3e808779e, _2ed9508f8009) {
  if (_f670afaa21fe._d497e206e630) return;
  _f670afaa21fe._d497e206e630 = true;
  _0ae9fd2bfab9("━━━━━━━━ 执行结束 ━━━━━━━━");
  _0ae9fd2bfab9(_97cc1b9e9058 ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _04eb09e4c735 = typeof $notification !== "undefined";
  if (_120697faec28._76673d4670b5 !== false && _04eb09e4c735) $notification.post(_70e3e808779e || "论坛任务", _97cc1b9e9058 ? "✅ 已完成" : "❌ 未完成", _6c2eaa4a3460(_2ed9508f8009 || _49729fc687a8.join("\n"), 700));
  const _b51020d66287 = typeof $done === "function";
  if (_b51020d66287) $done({});
}
function _6466db72da0d(_703986a3f575, _b060127f9216) {
  const _4802a5bdc334 = String(_703986a3f575._4802a5bdc334 || "GET").toLowerCase();
  const _ed6434d16d94 = $httpClient[_4802a5bdc334] || $httpClient.get;
  const _51649f81dc7f = { _12a7e1d88311: _703986a3f575._12a7e1d88311, _4e7d36c8426d: _703986a3f575._4e7d36c8426d, _2ed9508f8009: _703986a3f575._2ed9508f8009, _80c8765925e9: _703986a3f575._80c8765925e9 || 15000 };
  _51649f81dc7f[join(["auto", "-", "redirect"])] = true;
  _51649f81dc7f[join(["auto", "-", "cookie"])] = true;
  _ed6434d16d94(_51649f81dc7f, (_3bf3be0c18d0, _7903fd79e140, _4c644962fe5e) => _b060127f9216(_3bf3be0c18d0, _7903fd79e140 || {}, String(_4c644962fe5e || "")));
}
function _3b230080cc1f(_d497e206e630) {
  const _d25a8f8ea0b1 = String.fromCharCode(44);
  const _d819c7596dac = String.fromCharCode(59);
  return String(_d497e206e630 || "").split(_d25a8f8ea0b1).map(_f03c2157d9c9 => _f03c2157d9c9.split(_d819c7596dac)[0].trim()).filter(_a5f3da1c562f).join(_d819c7596dac);
}
const _8d3dd4720839 = join(["ht", "tps", "://"]);
const _6cd2bdd6c39f = [121, 99, 111, 111, 46, 110, 101, 116].map(_06a34f0dc041 => String.fromCharCode(_06a34f0dc041)).join("");
function _19f70a1a590c(_90c1da7ec770) { return _8d3dd4720839 + _6cd2bdd6c39f + String.fromCharCode(47) + String(_90c1da7ec770 || ""); }
const _95520934f2d0 = join(["plu", "gin", ".", "php"]);
const _aeaf88df0236 = join(["k", "_", "mi", "sign"]);
const _c5cd043c8a12 = join(["view", "ui", "_", "lottery"]);
const _1c365ef512d2 = join(["jn", "farm"]);

function _f0f4ea2f1dd5() {
  try {
    const _34a0774ed9b7 = typeof $request !== "undefined";
    const _0c7615ef9408 = _34a0774ed9b7 ? $request : {};
    const _50dfb11eeda7 = typeof $response !== "undefined";
    const _4eca35e36d63 = _50dfb11eeda7 ? $response : {};
    const _2ed9508f8009 = String((_4eca35e36d63 && _4eca35e36d63._2ed9508f8009) || "");
    const _cce17374f809 = _3b230080cc1f(_903f1e0d7ae9(_0c7615ef9408._4e7d36c8426d, join(["C", "ookie"])));
    const _461574540571 = _3b230080cc1f(_903f1e0d7ae9(_4eca35e36d63._4e7d36c8426d, join(["Set", "-", "C", "ookie"])));
    const _56821f0f7eb2 = _cce17374f809.length >= _461574540571.length ? _cce17374f809 : _461574540571;
    const _65c3e61186e7 = _56821f0f7eb2.indexOf(join(["auth", "="])) >= 0 || _2ed9508f8009.indexOf(join(["action", "=", "logout"])) >= 0;
    _0ae9fd2bfab9("🍪 登录状态抓取");
    _0ae9fd2bfab9("🌐 页面：" + _6c2eaa4a3460(_0c7615ef9408._12a7e1d88311, 180));
    _0ae9fd2bfab9("🔑 状态长度：" + _56821f0f7eb2.length);
    if (!_65c3e61186e7 || _56821f0f7eb2.length < 30) {
      _0ae9fd2bfab9("ℹ️ 当前请求没有完整登录状态");
      return _68ceaf42fcf2(true, "登录状态未更新", "请打开已登录的论坛页面");
    }
    const _fc2734eef1f8 = read("session");
    write("session", _56821f0f7eb2);
    write("updated", new Date().toISOString());
    _0ae9fd2bfab9(_fc2734eef1f8 === _56821f0f7eb2 ? "✅ 登录状态未变化" : "✅ 登录状态已更新");
    $notification.post("论坛登录状态", _fc2734eef1f8 === _56821f0f7eb2 ? "✅ 未变化" : "✅ 已获取", "长度 " + _56821f0f7eb2.length);
    _68ceaf42fcf2(true, "论坛登录状态", _fc2734eef1f8 === _56821f0f7eb2 ? "未变化" : "已获取");
  } catch (_3bf3be0c18d0) {
    _0ae9fd2bfab9("❌ 登录状态异常：" + _3bf3be0c18d0);
    _68ceaf42fcf2(false, "登录状态失败", String(_3bf3be0c18d0));
  }
}
function _3c36d6fe0e7b(_b060127f9216) {
  const _56821f0f7eb2 = read("session");
  if (!_56821f0f7eb2) return _b060127f9216("missing");
  const _4e7d36c8426d = {};
  _4e7d36c8426d[join(["C", "ookie"])] = _56821f0f7eb2;
  _4e7d36c8426d[join(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _4e7d36c8426d._9f96ce1b4f56 = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _6466db72da0d({ _12a7e1d88311: _19f70a1a590c(""), _4e7d36c8426d }, (_3bf3be0c18d0, _7903fd79e140, _4c644962fe5e) => {
    if (_3bf3be0c18d0) return _b060127f9216(_3bf3be0c18d0);
    if (_4c644962fe5e.indexOf(join(["action", "=", "logout"])) < 0) return _b060127f9216("expired");
    const _06a34f0dc041 = _12da350b9290(_4c644962fe5e);
    if (!_06a34f0dc041) return _b060127f9216("token");
    _b060127f9216(null, { _4e7d36c8426d, _06a34f0dc041 });
  });
}
function _fadb622ed9d6(_6d8ac1921ed2, _b060127f9216) {
  const _4e7d36c8426d = Object.assign({}, _6d8ac1921ed2._4e7d36c8426d);
  _4e7d36c8426d._6c64d8165643 = _19f70a1a590c(join([_aeaf88df0236, "-", "sign", ".", "html"]));
  _4e7d36c8426d[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  _6466db72da0d({ _12a7e1d88311: _19f70a1a590c(_95520934f2d0 + "?id=" + _aeaf88df0236 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + _6d8ac1921ed2._06a34f0dc041), _4e7d36c8426d }, (_3bf3be0c18d0, _7903fd79e140, _4c644962fe5e) => {
    _0ae9fd2bfab9("📅 每日签到");
    if (_3bf3be0c18d0) return _b060127f9216("❌ 请求失败：" + _3bf3be0c18d0);
    const _132873b529fd = _4c644962fe5e.indexOf("今日已签") >= 0;
    const _9a4f6a7c0a58 = _132873b529fd || _4c644962fe5e.indexOf("<![CDATA[]]>") >= 0;
    _6466db72da0d({ _12a7e1d88311: _19f70a1a590c(join([_aeaf88df0236, "-", "sign", ".", "html"])), _4e7d36c8426d: _6d8ac1921ed2._4e7d36c8426d }, (_77f6a8764ce5, _b0498799b197, _72bfda034309) => {
      const _10a7424d8e87 = _bdfbe3848648(_72bfda034309, "签到排名：", " ");
      const _d1593eb58b44 = _bdfbe3848648(_72bfda034309, 'id="lxtdays" value="', '"');
      const _408c3e4e020b = _bdfbe3848648(_72bfda034309, 'id="lxlevel" value="', '"');
      const _a5723f8d3754 = _bdfbe3848648(_72bfda034309, 'id="lxreward" value="', '"');
      _0ae9fd2bfab9(_132873b529fd ? "ℹ️ 今日已经签到" : _9a4f6a7c0a58 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_10a7424d8e87) _0ae9fd2bfab9("🏆 当前排名：" + _10a7424d8e87);
      if (_d1593eb58b44) _0ae9fd2bfab9("📆 累计天数：" + _d1593eb58b44);
      if (_408c3e4e020b) _0ae9fd2bfab9("🏅 签到等级：LV." + _408c3e4e020b);
      if (_a5723f8d3754) _0ae9fd2bfab9("💰 最近奖励：" + _a5723f8d3754);
      _b060127f9216([_132873b529fd ? "ℹ️ 今日已签到" : _9a4f6a7c0a58 ? "✅ 签到成功" : "⚠️ 签到异常", _10a7424d8e87 ? "🏆 排名 " + _10a7424d8e87 : "", _d1593eb58b44 ? "📆 累计 " + _d1593eb58b44 + " 天" : ""].filter(_a5f3da1c562f).join("\n"));
    });
  });
}
function _c3b8b1798c59(_6d8ac1921ed2, _b060127f9216) {
  const _4e7d36c8426d = Object.assign({}, _6d8ac1921ed2._4e7d36c8426d);
  _4e7d36c8426d._6c64d8165643 = _19f70a1a590c(_95520934f2d0 + "?id=" + _c5cd043c8a12);
  _4e7d36c8426d[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  _4e7d36c8426d._9f96ce1b4f56 = "application/json,text/javascript,*/*;q=0.8";
  const _55b67e240845 = _19f70a1a590c(_95520934f2d0 + "?id=" + _c5cd043c8a12 + ":draw");
  const _8154a633886c = ["🎰 幸运抽奖"];
  const _44b2783a6c3a = _79c8d190035e => {
    if (_79c8d190035e <= 0) { _8154a633886c.forEach(_0ae9fd2bfab9); return _b060127f9216(_8154a633886c.join("\n")); }
    _6466db72da0d({ _12a7e1d88311: _55b67e240845 + "?drawnumber=1&inajax=1", _4e7d36c8426d }, (_3bf3be0c18d0, _7903fd79e140, _4c644962fe5e) => {
      let _f355ee0a5d29 = {};
      try { _f355ee0a5d29 = JSON.parse(_4c644962fe5e); } catch (_ecb496ad52f1) {}
      const _f8f03da43e00 = String((_f355ee0a5d29._4c644962fe5e || {})["2"] || "");
      if (_3bf3be0c18d0 || _f355ee0a5d29._ee950a0974b3 !== "succeed" || _f8f03da43e00.indexOf("抽奖券") < 0) {
        _8154a633886c.push("ℹ️ " + (_3bf3be0c18d0 || _f355ee0a5d29._a415338c1201 || "没有可用抽奖券"));
        _8154a633886c.forEach(_0ae9fd2bfab9);
        return _b060127f9216(_8154a633886c.join("\n"));
      }
      _6466db72da0d({ _12a7e1d88311: _55b67e240845 + "?drawnumber=1&pay=2&formhash=" + _6d8ac1921ed2._06a34f0dc041 + "&inajax=1", _4e7d36c8426d }, (_77f6a8764ce5, _b0498799b197, _2c281ba044ef) => {
        let _ee950a0974b3 = {};
        try { _ee950a0974b3 = JSON.parse(_2c281ba044ef); } catch (_ecb496ad52f1) {}
        if (_77f6a8764ce5 || _ee950a0974b3._ee950a0974b3 !== "succeed") {
          _8154a633886c.push("⚠️ " + (_77f6a8764ce5 || _ee950a0974b3._a415338c1201 || "抽奖失败"));
          _8154a633886c.forEach(_0ae9fd2bfab9);
          return _b060127f9216(_8154a633886c.join("\n"));
        }
        const _d41748b4ed37 = (((_ee950a0974b3._4c644962fe5e || {})._2519233f1023) || []).map(_f03c2157d9c9 => (_f03c2157d9c9._df1f65ffc3a7 || "奖品") + "：" + (_f03c2157d9c9._49c505871226 || "未知"));
        const _5675fe6402de = String((_ee950a0974b3._4c644962fe5e || {})._f0010b5f17ac || "0");
        const _441b30ce8244 = String((_ee950a0974b3._4c644962fe5e || {})._127a5e89f8eb || "");
        _8154a633886c.push("🎁 第 " + _8154a633886c.length + " 次：" + (_d41748b4ed37.join("、") || _ee950a0974b3._a415338c1201 || "成功"));
        _8154a633886c.push("🎟️ 剩余抽奖券：" + _5675fe6402de + (_441b30ce8244 ? "  💰 星币：" + _441b30ce8244 : ""));
        if (_5675fe6402de === "0") { _8154a633886c.forEach(_0ae9fd2bfab9); return _b060127f9216(_8154a633886c.join("\n")); }
        _44b2783a6c3a(_79c8d190035e - 1);
      });
    });
  };
  _44b2783a6c3a(10);
}
function _de2c81a51d96(_6d8ac1921ed2, _b060127f9216) {
  const _4e7d36c8426d = Object.assign({}, _6d8ac1921ed2._4e7d36c8426d);
  _4e7d36c8426d._6c64d8165643 = _19f70a1a590c(_95520934f2d0 + "?id=" + _1c365ef512d2);
  _4e7d36c8426d[join(["X", "-", "Requested", "-", "With"])] = join(["XML", "Http", "Request"]);
  const _91a9fe052acc = ["🌾 农场与福利"];
  const _6fde6ba36ca0 = _ba22addd4d1a => _19f70a1a590c(_95520934f2d0 + "?id=" + _1c365ef512d2 + "&" + _ba22addd4d1a + "&formhash=" + _6d8ac1921ed2._06a34f0dc041 + "&inajax=1");
  const _9c85e9c639b7 = [
    ["每日免费领取", join(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", join(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _97e8b2b1e185 = 1; _97e8b2b1e185 <= 8; _97e8b2b1e185 += 1) _9c85e9c639b7.push(["地块 " + _97e8b2b1e185, join(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _97e8b2b1e185]);
  const _0949c8a30bed = _97e8b2b1e185 => {
    if (_97e8b2b1e185 >= _9c85e9c639b7.length) { _91a9fe052acc.forEach(_0ae9fd2bfab9); return _b060127f9216(_91a9fe052acc.join("\n")); }
    const _2b299f18aea0 = _9c85e9c639b7[_97e8b2b1e185];
    _6466db72da0d({ _12a7e1d88311: _6fde6ba36ca0(_2b299f18aea0[1]), _4e7d36c8426d }, (_3bf3be0c18d0, _7903fd79e140, _4c644962fe5e) => {
      const _c5ab33cb5126 = _66be586d4cdb(_4c644962fe5e)[0] || _6c2eaa4a3460(_555d39026dcd(_4c644962fe5e), 80);
      const _5a6484622c74 = _86b0361b4cfd(_c5ab33cb5126, ["成功", "完成", "可领取"]) ? "✅" : _86b0361b4cfd(_c5ab33cb5126, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _91a9fe052acc.push(_5a6484622c74 + " " + _2b299f18aea0[0] + "：" + (_3bf3be0c18d0 || _c5ab33cb5126 || "无返回"));
      const _9a23e982acde = _bdfbe3848648(_2b299f18aea0[1], "jfid=", "&");
      if (_9a23e982acde && _86b0361b4cfd(_4c644962fe5e, ["已枯萎", "清除"])) {
        return _6466db72da0d({ _12a7e1d88311: _6fde6ba36ca0(join(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _9a23e982acde), _4e7d36c8426d }, (_77f6a8764ce5, _b0498799b197, _76ab65fcfc02) => {
          _91a9fe052acc.push((_86b0361b4cfd(_76ab65fcfc02, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _9a23e982acde);
          _6466db72da0d({ _12a7e1d88311: _6fde6ba36ca0(join(["do=", "plant", "seed", "&seed=1&jfid="]) + _9a23e982acde + "&timestamp=" + Math.floor(Date.now() / 1000)), _4e7d36c8426d }, (_6df59a4130f6, _76a8e6b5675f, _c22a8c632a0b) => {
            _91a9fe052acc.push((_c22a8c632a0b.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _9a23e982acde + "：" + (_66be586d4cdb(_c22a8c632a0b)[0] || "无返回"));
            _0949c8a30bed(_97e8b2b1e185 + 1);
          });
        });
      }
      _0949c8a30bed(_97e8b2b1e185 + 1);
    });
  };
  _6466db72da0d({ _12a7e1d88311: _6fde6ba36ca0(join(["do=", "normal", "&ac=", "kuo", "zhan"])), _4e7d36c8426d }, (_3bf3be0c18d0, _7903fd79e140, _4c644962fe5e) => {
    _91a9fe052acc.push((_86b0361b4cfd(_66be586d4cdb(_4c644962fe5e)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (_3bf3be0c18d0 || _66be586d4cdb(_4c644962fe5e)[0] || "无返回"));
    _0949c8a30bed(0);
  });
}
function _1760449d605c() {
  _0ae9fd2bfab9("🚀 论坛任务开始");
  _0ae9fd2bfab9("🕒 " + new Date().toLocaleString("zh-CN", { _cb7591251d15: false }));
  _3c36d6fe0e7b((_3bf3be0c18d0, _6d8ac1921ed2) => {
    if (_3bf3be0c18d0 === "missing") return _68ceaf42fcf2(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (_3bf3be0c18d0 === "expired") return _68ceaf42fcf2(false, "论坛登录失效", "请重新登录论坛");
    if (_3bf3be0c18d0) return _68ceaf42fcf2(false, "论坛任务失败", String(_3bf3be0c18d0));
    _0ae9fd2bfab9("🔐 登录状态有效");
    _fadb622ed9d6(_6d8ac1921ed2, _e376151517f8 => _c3b8b1798c59(_6d8ac1921ed2, _e0324bc47599 => _de2c81a51d96(_6d8ac1921ed2, _ac5faa102706 => _68ceaf42fcf2(true, "论坛任务完成", [_e376151517f8, _e0324bc47599, _ac5faa102706].join("\n")))));
  });
}
const _34a0774ed9b7 = typeof $request !== "undefined";
if (_34a0774ed9b7) _f0f4ea2f1dd5();
else _1760449d605c();

})();
