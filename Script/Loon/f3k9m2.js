/*f33526614f0f*/
(function(){
const _aa02465aed12 = typeof $argument === "object" && $argument ? $argument : {};
const _500326a57188 = $persistentStore;
const _9e5de9ac84a0 = "a91e7c4d";
const _6f2ac1929bf8 = { value: false };
const _eab318792687 = [];
const _7bef14d5d6dd = values => values.join("");

function _547fb2e78982(name) { return _500326a57188.read(_9e5de9ac84a0 + "." + name) || ""; }
function _dc6a711f2547(name, value) { return _500326a57188.write(value == null ? undefined : String(value), _9e5de9ac84a0 + "." + name); }
function _c1541049b085(_4f334d5a305b, name) {
  const _2dffd42471f7 = Object.keys(_4f334d5a305b || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _2dffd42471f7 ? String(_4f334d5a305b[_2dffd42471f7] || "") : "";
}
function _7c3960b1b798(_516dfa1dcfa4) { _eab318792687.push(String(_516dfa1dcfa4)); console.log(String(_516dfa1dcfa4)); }
function _dd579ceb2978(value, size) {
  const _120eb2108408 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _120eb2108408.length > size ? _120eb2108408.slice(0, size) + "..." : _120eb2108408;
}
function _ac925f379ab9(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _3b100678bcae(value, _815b1e3b88cd, _1f45ab079b22) {
  const _120eb2108408 = String(value || "");
  const _90d6c713a320 = _120eb2108408.indexOf(_815b1e3b88cd);
  if (_90d6c713a320 < 0) return "";
  const _5bc8b823e2d5 = _90d6c713a320 + _815b1e3b88cd.length;
  const _135fa608079d = _120eb2108408.indexOf(_1f45ab079b22, _5bc8b823e2d5);
  return _120eb2108408.slice(_5bc8b823e2d5, _135fa608079d < 0 ? _5bc8b823e2d5 + 16 : _135fa608079d).trim();
}
function _25bfa56448d4(value) { return _3b100678bcae(value, _7bef14d5d6dd(["form", "hash", "="]), "&"); }
function _f6b190d29e00(value) {
  const _f5e8813398af = _7bef14d5d6dd(["layer", ".msg('"]);
  const _120eb2108408 = String(value || "");
  const _815b1e3b88cd = _120eb2108408.indexOf(_f5e8813398af);
  if (_815b1e3b88cd < 0) return [];
  const _5bc8b823e2d5 = _815b1e3b88cd + _f5e8813398af.length;
  const _1f45ab079b22 = _120eb2108408.indexOf("')", _5bc8b823e2d5);
  return _1f45ab079b22 < 0 ? [] : [_120eb2108408.slice(_5bc8b823e2d5, _1f45ab079b22)];
}
function _5415daf69cc3(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _25c0fffc6373(ok, title, body) {
  if (_6f2ac1929bf8.value) return;
  _6f2ac1929bf8.value = true;
  _7c3960b1b798("━━━━━━━━ 执行结束 ━━━━━━━━");
  _7c3960b1b798(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _05bfb5d915fe = typeof $notification !== "undefined";
  if (_aa02465aed12.notify_enabled !== false && _05bfb5d915fe) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _dd579ceb2978(body || _eab318792687.join("\n"), 700));
  const _c9b975b83a49 = typeof $done === "function";
  if (_c9b975b83a49) $done({});
}
function _8be68ddfbcd0(options, callback) {
  const _a7e5b3d1c4e3 = String(options.method || "GET").toLowerCase();
  const _e85c3df081f6 = $httpClient[_a7e5b3d1c4e3] || $httpClient.get;
  const _17f55f1419b4 = { _69d94457dc80: options.url, _4f334d5a305b: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _17f55f1419b4[_7bef14d5d6dd(["auto", "-", "redirect"])] = true;
  _17f55f1419b4[_7bef14d5d6dd(["auto", "-", "cookie"])] = true;
  _e85c3df081f6(_17f55f1419b4, (error, response, data) => callback(error, response || {}, String(data || "")));
}
function _fd1272f8b7f2(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _d15bda33eb67 = _7bef14d5d6dd(["ht", "tps", "://"]);
const _9a0778b143fe = [121, 99, 111, 111, 46, 110, 101, 116].map(_ab50d871a013 => String.fromCharCode(_ab50d871a013)).join("");
function _95fa12fbb24d(path) { return _d15bda33eb67 + _9a0778b143fe + String.fromCharCode(47) + String(path || ""); }
const _5e3c5b6cef1a = _7bef14d5d6dd(["plu", "gin", ".", "php"]);
const _c4e62c83beca = _7bef14d5d6dd(["k", "_", "mi", "sign"]);
const _da39b8653c2c = _7bef14d5d6dd(["view", "ui", "_", "lottery"]);
const _dcda296aec6c = _7bef14d5d6dd(["jn", "farm"]);

function _ae71ec99c003() {
  try {
    const _251f7bd4c95f = typeof $request !== "undefined" ? $request : {};
    const _4f334d5a305b = _251f7bd4c95f.headers || {};
    const _69d94457dc80 = String(_251f7bd4c95f.url || "");
    const _b7a86a8a282c = _fd1272f8b7f2(_c1541049b085(_4f334d5a305b, "Cookie") || _c1541049b085(_4f334d5a305b, "cookie"));
    const _9134131396a0 = [".css", ".js", ".png", ".jpg", ".gif", ".webp", ".svg", ".ico", ".woff", "/static/"].every(item => _69d94457dc80.indexOf(item) < 0);
    const _2a5d33954e03 = _b7a86a8a282c.indexOf("auth=") >= 0;
    console.log("🍪 登录状态抓取");
    console.log("🌐 页面：" + _dd579ceb2978(_69d94457dc80, 180));
    console.log("🔑 状态长度：" + _b7a86a8a282c.length);
    if (!_9134131396a0) return _25c0fffc6373(true, "", "");
    if (!_2a5d33954e03 || _b7a86a8a282c.length < 30) {
      console.log("ℹ️ 当前请求没有完整登录状态");
      $notification.post("论坛登录状态", "❌ 未获取", "请通过 Loon 打开已登录页面");
      return _25c0fffc6373(true, "登录状态未更新", "请通过 Loon 打开已登录页面");
    }
    const _55fde5f6dfe9 = _547fb2e78982("session");
    _dc6a711f2547("session", _b7a86a8a282c);
    _dc6a711f2547("updated", new Date().toISOString());
    console.log(_55fde5f6dfe9 === _b7a86a8a282c ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    if (_55fde5f6dfe9 !== _b7a86a8a282c) $notification.post("论坛登录状态", "✅ 已获取", "长度 " + _b7a86a8a282c.length);
    _25c0fffc6373(true, "论坛登录状态", _55fde5f6dfe9 === _b7a86a8a282c ? "未变化" : "已获取");
  } catch (error) {
    console.log("❌ 登录状态异常：" + error);
    $notification.post("论坛登录状态", "❌ 抓取失败", String(error));
    _25c0fffc6373(false, "登录状态失败", String(error));
  }
}
function _d3d8de4aa4b8(callback) {
  const _b7a86a8a282c = _547fb2e78982("session");
  if (!_b7a86a8a282c) return callback("missing");
  const _4f334d5a305b = {};
  _4f334d5a305b[_7bef14d5d6dd(["C", "ookie"])] = _b7a86a8a282c;
  _4f334d5a305b[_7bef14d5d6dd(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _4f334d5a305b.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _8be68ddfbcd0({ _69d94457dc80: _95fa12fbb24d(""), _4f334d5a305b }, (error, response, data) => {
    if (error) return callback(error);
    if (data.indexOf(_7bef14d5d6dd(["action", "=", "logout"])) < 0) return callback("expired");
    const _ab50d871a013 = _25bfa56448d4(data);
    if (!_ab50d871a013) return callback("token");
    callback(null, { _4f334d5a305b, _ab50d871a013 });
  });
}
function _b01d0bed17e6(ctx, callback) {
  const _4f334d5a305b = Object.assign({}, ctx.headers);
  _4f334d5a305b.Referer = _95fa12fbb24d(_7bef14d5d6dd([_c4e62c83beca, "-", "sign", ".", "html"]));
  _4f334d5a305b[_7bef14d5d6dd(["X", "-", "Requested", "-", "With"])] = _7bef14d5d6dd(["XML", "Http", "Request"]);
  _8be68ddfbcd0({ _69d94457dc80: _95fa12fbb24d(_5e3c5b6cef1a + "?id=" + _c4e62c83beca + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _4f334d5a305b }, (error, response, data) => {
    _7c3960b1b798("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _48d358e74ecb = data.indexOf("今日已签") >= 0;
    const _d159d17b5219 = _48d358e74ecb || data.indexOf("<![CDATA[]]>") >= 0;
    _8be68ddfbcd0({ _69d94457dc80: _95fa12fbb24d(_7bef14d5d6dd([_c4e62c83beca, "-", "sign", ".", "html"])), _4f334d5a305b: ctx.headers }, (error2, response2, _9134131396a0) => {
      const _5a4bd0a38dd0 = _3b100678bcae(_9134131396a0, "签到排名：", " ");
      const _af3faaeb2ecf = _3b100678bcae(_9134131396a0, 'id="lxtdays" value="', '"');
      const _ed59dd418e3b = _3b100678bcae(_9134131396a0, 'id="lxlevel" value="', '"');
      const _a10449540cf4 = _3b100678bcae(_9134131396a0, 'id="lxreward" value="', '"');
      _7c3960b1b798(_48d358e74ecb ? "ℹ️ 今日已经签到" : _d159d17b5219 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_5a4bd0a38dd0) _7c3960b1b798("🏆 当前排名：" + _5a4bd0a38dd0);
      if (_af3faaeb2ecf) _7c3960b1b798("📆 累计天数：" + _af3faaeb2ecf);
      if (_ed59dd418e3b) _7c3960b1b798("🏅 签到等级：LV." + _ed59dd418e3b);
      if (_a10449540cf4) _7c3960b1b798("💰 最近奖励：" + _a10449540cf4);
      callback([_48d358e74ecb ? "ℹ️ 今日已签到" : _d159d17b5219 ? "✅ 签到成功" : "⚠️ 签到异常", _5a4bd0a38dd0 ? "🏆 排名 " + _5a4bd0a38dd0 : "", _af3faaeb2ecf ? "📆 累计 " + _af3faaeb2ecf + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _3c3142a1fc11(ctx, callback) {
  const _4f334d5a305b = Object.assign({}, ctx.headers);
  _4f334d5a305b.Referer = _95fa12fbb24d(_5e3c5b6cef1a + "?id=" + _da39b8653c2c);
  _4f334d5a305b[_7bef14d5d6dd(["X", "-", "Requested", "-", "With"])] = _7bef14d5d6dd(["XML", "Http", "Request"]);
  _4f334d5a305b.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _9142dbe85a36 = _95fa12fbb24d(_5e3c5b6cef1a + "?id=" + _da39b8653c2c + ":draw");
  const _26a07c840ead = ["🎰 幸运抽奖"];
  const _31a27e28d46d = guard => {
    if (guard <= 0) { _26a07c840ead.forEach(_7c3960b1b798); return callback(_26a07c840ead.join("\n")); }
    _8be68ddfbcd0({ _69d94457dc80: _9142dbe85a36 + "?drawnumber=1&inajax=1", _4f334d5a305b }, (error, response, data) => {
      let _fc8792c3757b = {};
      try { _fc8792c3757b = JSON.parse(data); } catch (ignored) {}
      const _79dc599395d0 = String((_fc8792c3757b.data || {})["2"] || "");
      if (error || _fc8792c3757b.result !== "succeed" || _79dc599395d0.indexOf("抽奖券") < 0) {
        _26a07c840ead.push("ℹ️ " + (error || _fc8792c3757b.msg || "没有可用抽奖券"));
        _26a07c840ead.forEach(_7c3960b1b798);
        return callback(_26a07c840ead.join("\n"));
      }
      _8be68ddfbcd0({ _69d94457dc80: _9142dbe85a36 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _4f334d5a305b }, (error2, response2, raw) => {
        let _f79ae4c23353 = {};
        try { _f79ae4c23353 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _f79ae4c23353.result !== "succeed") {
          _26a07c840ead.push("⚠️ " + (error2 || _f79ae4c23353.msg || "抽奖失败"));
          _26a07c840ead.forEach(_7c3960b1b798);
          return callback(_26a07c840ead.join("\n"));
        }
        const _b658d7dcb1a1 = (((_f79ae4c23353.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _90d6c713a320 = String((_f79ae4c23353.data || {}).ticketnumber || "0");
        const _4e6677f3be11 = String((_f79ae4c23353.data || {}).creditnumber || "");
        _26a07c840ead.push("🎁 第 " + _26a07c840ead.length + " 次：" + (_b658d7dcb1a1.join("、") || _f79ae4c23353.msg || "成功"));
        _26a07c840ead.push("🎟️ 剩余抽奖券：" + _90d6c713a320 + (_4e6677f3be11 ? "  💰 星币：" + _4e6677f3be11 : ""));
        if (_90d6c713a320 === "0") { _26a07c840ead.forEach(_7c3960b1b798); return callback(_26a07c840ead.join("\n")); }
        _31a27e28d46d(guard - 1);
      });
    });
  };
  _31a27e28d46d(10);
}
function _b936197b1df6(ctx, callback) {
  const _4f334d5a305b = Object.assign({}, ctx.headers);
  _4f334d5a305b.Referer = _95fa12fbb24d(_5e3c5b6cef1a + "?id=" + _dcda296aec6c);
  _4f334d5a305b[_7bef14d5d6dd(["X", "-", "Requested", "-", "With"])] = _7bef14d5d6dd(["XML", "Http", "Request"]);
  const _ee4f94590424 = ["🌾 农场与福利"];
  const _793a3615f328 = query => _95fa12fbb24d(_5e3c5b6cef1a + "?id=" + _dcda296aec6c + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _58ecb9f4af3e = [
    ["每日免费领取", _7bef14d5d6dd(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _7bef14d5d6dd(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _e63c148f31be = 1; _e63c148f31be <= 8; _e63c148f31be += 1) _58ecb9f4af3e.push(["地块 " + _e63c148f31be, _7bef14d5d6dd(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _e63c148f31be]);
  const _c89d48753de5 = _e63c148f31be => {
    if (_e63c148f31be >= _58ecb9f4af3e.length) { _ee4f94590424.forEach(_7c3960b1b798); return callback(_ee4f94590424.join("\n")); }
    const _9c10c6944b06 = _58ecb9f4af3e[_e63c148f31be];
    _8be68ddfbcd0({ _69d94457dc80: _793a3615f328(_9c10c6944b06[1]), _4f334d5a305b }, (error, response, data) => {
      const _516dfa1dcfa4 = _f6b190d29e00(data)[0] || _dd579ceb2978(_ac925f379ab9(data), 80);
      const _14168c55f211 = _5415daf69cc3(_516dfa1dcfa4, ["成功", "完成", "可领取"]) ? "✅" : _5415daf69cc3(_516dfa1dcfa4, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _ee4f94590424.push(_14168c55f211 + " " + _9c10c6944b06[0] + "：" + (error || _516dfa1dcfa4 || "无返回"));
      const _0effc6d5dbef = _3b100678bcae(_9c10c6944b06[1], "jfid=", "&");
      if (_0effc6d5dbef && _5415daf69cc3(data, ["已枯萎", "清除"])) {
        return _8be68ddfbcd0({ _69d94457dc80: _793a3615f328(_7bef14d5d6dd(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _0effc6d5dbef), _4f334d5a305b }, (error2, response2, cleared) => {
          _ee4f94590424.push((_5415daf69cc3(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _0effc6d5dbef);
          _8be68ddfbcd0({ _69d94457dc80: _793a3615f328(_7bef14d5d6dd(["do=", "plant", "seed", "&seed=1&jfid="]) + _0effc6d5dbef + "&timestamp=" + Math.floor(Date.now() / 1000)), _4f334d5a305b }, (error3, response3, planted) => {
            _ee4f94590424.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _0effc6d5dbef + "：" + (_f6b190d29e00(planted)[0] || "无返回"));
            _c89d48753de5(_e63c148f31be + 1);
          });
        });
      }
      _c89d48753de5(_e63c148f31be + 1);
    });
  };
  _8be68ddfbcd0({ _69d94457dc80: _793a3615f328(_7bef14d5d6dd(["do=", "normal", "&ac=", "kuo", "zhan"])), _4f334d5a305b }, (error, response, data) => {
    _ee4f94590424.push((_5415daf69cc3(_f6b190d29e00(data)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _f6b190d29e00(data)[0] || "无返回"));
    _c89d48753de5(0);
  });
}
function _13ac053c0212() {
  _7c3960b1b798("🚀 论坛任务开始");
  _7c3960b1b798("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _d3d8de4aa4b8((error, ctx) => {
    if (error === "missing") return _25c0fffc6373(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _25c0fffc6373(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _25c0fffc6373(false, "论坛任务失败", String(error));
    _7c3960b1b798("🔐 登录状态有效");
    _b01d0bed17e6(ctx, one => _3c3142a1fc11(ctx, two => _b936197b1df6(ctx, three => _25c0fffc6373(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _ae3aaed6fbcb = typeof $request !== "undefined";
if (_ae3aaed6fbcb) _ae71ec99c003();
else _13ac053c0212();

})();
