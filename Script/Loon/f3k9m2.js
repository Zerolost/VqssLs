/*8248c4b190cf*/
(function(){
const _f5f4d4d592d5 = typeof $argument === "object" && $argument ? $argument : {};
const _e24928a9e04e = $persistentStore;
const _43395a694ed6 = "f3k9m2_store";
const _0438a39a0f45 = true;
const _09f9b299580e = { value: false };
const _f624305b2fc8 = [];
const _59bced0a6790 = values => values.join("");

function _e6dfbaf06b2d() {
  try { return JSON.parse(_e24928a9e04e.read(_43395a694ed6) || "{}") || {}; }
  catch (error) { return {}; }
}
function _bd4028f9875f(_b04d86a758be) { return _e24928a9e04e.write(JSON.stringify(_b04d86a758be), _43395a694ed6); }
function _da203f7f8369(name) { return String(_e6dfbaf06b2d()[name] || ""); }
function _031e9765a163(name, value) {
  const _b04d86a758be = _e6dfbaf06b2d();
  if (value == null) delete _b04d86a758be[name];
  else _b04d86a758be[name] = String(value);
  return _bd4028f9875f(_b04d86a758be);
}
function _b1bc76b44291(_2ac50c4df9c8, name) {
  const _13e717211577 = Object.keys(_2ac50c4df9c8 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _13e717211577 ? String(_2ac50c4df9c8[_13e717211577] || "") : "";
}
function _1c0c0e59960f(_4412e7f6d833) {
  const _dea09fe52814 = String(_4412e7f6d833);
  _f624305b2fc8.push(_dea09fe52814);
  if (_0438a39a0f45) console.log(_dea09fe52814);
}
function _8e278e95d7b1(value, size) {
  const _dea09fe52814 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _dea09fe52814.length > size ? _dea09fe52814.slice(0, size) + "..." : _dea09fe52814;
}
function _864e17a68a72(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _b4b3ed64eae2(value, _7409a6dd1023, _dd3f759eb16f) {
  const _dea09fe52814 = String(value || "");
  const _461b08f89446 = _dea09fe52814.indexOf(_7409a6dd1023);
  if (_461b08f89446 < 0) return "";
  const _859e48980849 = _461b08f89446 + _7409a6dd1023.length;
  const _f3d7607bfcd4 = _dea09fe52814.indexOf(_dd3f759eb16f, _859e48980849);
  return _dea09fe52814.slice(_859e48980849, _f3d7607bfcd4 < 0 ? _859e48980849 + 16 : _f3d7607bfcd4).trim();
}
function _57504c1b0c8a(value) { return _b4b3ed64eae2(value, _59bced0a6790(["form", "hash", "="]), "&"); }
function _9d73e38ec3da(value) {
  const _ebbbc76e005d = _59bced0a6790(["layer", ".msg('"]);
  const _dea09fe52814 = String(value || "");
  const _7409a6dd1023 = _dea09fe52814.indexOf(_ebbbc76e005d);
  if (_7409a6dd1023 < 0) return [];
  const _859e48980849 = _7409a6dd1023 + _ebbbc76e005d.length;
  const _dd3f759eb16f = _dea09fe52814.indexOf("')", _859e48980849);
  return _dd3f759eb16f < 0 ? [] : [_dea09fe52814.slice(_859e48980849, _dd3f759eb16f)];
}
function _78a479ab98c6(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _8a58b85b5997(ok, title, body) {
  if (_09f9b299580e.value) return;
  _09f9b299580e.value = true;
  _1c0c0e59960f("━━━━━━━━ 执行结束 ━━━━━━━━");
  _1c0c0e59960f(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _c7aeaca1a3fc = typeof $notification !== "undefined";
  if (_f5f4d4d592d5.notify_enabled !== false && _c7aeaca1a3fc) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _8e278e95d7b1(body || _f624305b2fc8.join("\n"), 700));
  const _767d35b4f252 = typeof $done === "function";
  if (_767d35b4f252) $done({});
}
function _8f2c38cd987c(options, callback) {
  const _d85b04d93150 = String(options.method || "GET").toLowerCase();
  const _c4447a5a8550 = $httpClient[_d85b04d93150] || $httpClient.get;
  const _8911f9330f28 = { _d58575278fc7: options.url, _2ac50c4df9c8: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _8911f9330f28[_59bced0a6790(["auto", "-", "redirect"])] = true;
  _8911f9330f28[_59bced0a6790(["auto", "-", "cookie"])] = true;
  _c4447a5a8550(_8911f9330f28, (error, response, _b04d86a758be) => callback(error, response || {}, String(_b04d86a758be || "")));
}
function _0c8f44f496a2(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _89fc57fd1286 = _59bced0a6790(["ht", "tps", "://"]);
const _96bb20b78d87 = [121, 99, 111, 111, 46, 110, 101, 116].map(_f62d5db0c80c => String.fromCharCode(_f62d5db0c80c)).join("");
function _a935abdd1b8e(path) { return _89fc57fd1286 + _96bb20b78d87 + String.fromCharCode(47) + String(path || ""); }
const _e3ab0d51e57e = _59bced0a6790(["plu", "gin", ".", "php"]);
const _62f1deeb8818 = _59bced0a6790(["k", "_", "mi", "sign"]);
const _4f7c742a0d11 = _59bced0a6790(["view", "ui", "_", "lottery"]);
const _9435ee902738 = _59bced0a6790(["jn", "farm"]);

function _f02011f72e57() {
  try {
    const _36279d6919d5 = typeof $request !== "undefined" ? $request : {};
    const _2ac50c4df9c8 = _36279d6919d5.headers || {};
    const _d58575278fc7 = String(_36279d6919d5.url || "");
    const _8059d3e60363 = _0c8f44f496a2(_b1bc76b44291(_2ac50c4df9c8, "Cookie") || _b1bc76b44291(_2ac50c4df9c8, "cookie"));
    const _d26113d2e83a = _d58575278fc7 === "https://ycoo.net/" || _d58575278fc7.indexOf("https://ycoo.net/?") === 0;
    const _32472ef5c359 = _8059d3e60363.split("; ").filter(Boolean);
    const _837c624ffc48 = _32472ef5c359.some(item => item.indexOf("auth=") >= 0) && _32472ef5c359.length >= 3;
    _1c0c0e59960f("🧪 调试模式：开启");
    _1c0c0e59960f("🍪 登录状态抓取");
    _1c0c0e59960f("🌐 页面：" + _8e278e95d7b1(_d58575278fc7, 180));
    _1c0c0e59960f("🔑 状态字段：" + _32472ef5c359.length + "，长度：" + _8059d3e60363.length);
    if (!_d26113d2e83a || !_837c624ffc48) {
      _1c0c0e59960f("ℹ️ 当前请求无需保存登录状态");
      return _8a58b85b5997(true, "", "");
    }
    const _81a1ee534466 = _da203f7f8369("session");
    const _cb979405c25c = Number(_da203f7f8369("notified") || 0);
    const _e24e99bdf655 = _031e9765a163("session", _8059d3e60363);
    _031e9765a163("updated", new Date().toISOString());
    _1c0c0e59960f(_81a1ee534466 === _8059d3e60363 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _1c0c0e59960f("💾 存储键：" + _43395a694ed6 + "，写入：" + _e24e99bdf655 + "，回读长度：" + _da203f7f8369("session").length);
    if (_81a1ee534466 !== _8059d3e60363 && Date.now() - _cb979405c25c > 60000) {
      _031e9765a163("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _32472ef5c359.length + " 项 / " + _8059d3e60363.length);
    }
    _8a58b85b5997(true, "", "");
  } catch (error) {
    console.log("❌ 登录状态异常：" + error);
    $notification.post("论坛登录状态", "❌ 抓取失败", String(error));
    _8a58b85b5997(false, "登录状态失败", String(error));
  }
}
function _7ae654100406(callback) {
  const _8059d3e60363 = _da203f7f8369("session");
  if (!_8059d3e60363) return callback("missing");
  const _2ac50c4df9c8 = {};
  _2ac50c4df9c8[_59bced0a6790(["C", "ookie"])] = _8059d3e60363;
  _2ac50c4df9c8[_59bced0a6790(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _2ac50c4df9c8.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _8f2c38cd987c({ _d58575278fc7: _a935abdd1b8e(""), _2ac50c4df9c8 }, (error, response, _b04d86a758be) => {
    if (error) return callback(error);
    if (_b04d86a758be.indexOf(_59bced0a6790(["action", "=", "logout"])) < 0) return callback("expired");
    const _f62d5db0c80c = _57504c1b0c8a(_b04d86a758be);
    if (!_f62d5db0c80c) return callback("token");
    callback(null, { _2ac50c4df9c8, _f62d5db0c80c });
  });
}
function _7d51943489d0(ctx, callback) {
  const _2ac50c4df9c8 = Object.assign({}, ctx.headers);
  _2ac50c4df9c8.Referer = _a935abdd1b8e(_59bced0a6790([_62f1deeb8818, "-", "sign", ".", "html"]));
  _2ac50c4df9c8[_59bced0a6790(["X", "-", "Requested", "-", "With"])] = _59bced0a6790(["XML", "Http", "Request"]);
  _8f2c38cd987c({ _d58575278fc7: _a935abdd1b8e(_e3ab0d51e57e + "?id=" + _62f1deeb8818 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _2ac50c4df9c8 }, (error, response, _b04d86a758be) => {
    _1c0c0e59960f("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _c56fae236d37 = _b04d86a758be.indexOf("今日已签") >= 0;
    const _d16482c16cbc = _c56fae236d37 || _b04d86a758be.indexOf("<![CDATA[]]>") >= 0;
    _8f2c38cd987c({ _d58575278fc7: _a935abdd1b8e(_59bced0a6790([_62f1deeb8818, "-", "sign", ".", "html"])), _2ac50c4df9c8: ctx.headers }, (error2, response2, _d26113d2e83a) => {
      const _2c0dcf8493d1 = _b4b3ed64eae2(_d26113d2e83a, "签到排名：", " ");
      const _4245ddfb03a7 = _b4b3ed64eae2(_d26113d2e83a, 'id="lxtdays" value="', '"');
      const _1619b7b0d63c = _b4b3ed64eae2(_d26113d2e83a, 'id="lxlevel" value="', '"');
      const _b9db2e3e535e = _b4b3ed64eae2(_d26113d2e83a, 'id="lxreward" value="', '"');
      _1c0c0e59960f(_c56fae236d37 ? "ℹ️ 今日已经签到" : _d16482c16cbc ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_2c0dcf8493d1) _1c0c0e59960f("🏆 当前排名：" + _2c0dcf8493d1);
      if (_4245ddfb03a7) _1c0c0e59960f("📆 累计天数：" + _4245ddfb03a7);
      if (_1619b7b0d63c) _1c0c0e59960f("🏅 签到等级：LV." + _1619b7b0d63c);
      if (_b9db2e3e535e) _1c0c0e59960f("💰 最近奖励：" + _b9db2e3e535e);
      callback([_c56fae236d37 ? "ℹ️ 今日已签到" : _d16482c16cbc ? "✅ 签到成功" : "⚠️ 签到异常", _2c0dcf8493d1 ? "🏆 排名 " + _2c0dcf8493d1 : "", _4245ddfb03a7 ? "📆 累计 " + _4245ddfb03a7 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _11a104efc42b(ctx, callback) {
  const _2ac50c4df9c8 = Object.assign({}, ctx.headers);
  _2ac50c4df9c8.Referer = _a935abdd1b8e(_e3ab0d51e57e + "?id=" + _4f7c742a0d11);
  _2ac50c4df9c8[_59bced0a6790(["X", "-", "Requested", "-", "With"])] = _59bced0a6790(["XML", "Http", "Request"]);
  _2ac50c4df9c8.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _5e471ef25752 = _a935abdd1b8e(_e3ab0d51e57e + "?id=" + _4f7c742a0d11 + ":draw");
  const _05ad538cb71c = ["🎰 幸运抽奖"];
  const _da7e0307c239 = guard => {
    if (guard <= 0) { _05ad538cb71c.forEach(_1c0c0e59960f); return callback(_05ad538cb71c.join("\n")); }
    _8f2c38cd987c({ _d58575278fc7: _5e471ef25752 + "?drawnumber=1&inajax=1", _2ac50c4df9c8 }, (error, response, _b04d86a758be) => {
      let _a7e8ae13924b = {};
      try { _a7e8ae13924b = JSON.parse(_b04d86a758be); } catch (ignored) {}
      const _4ed63a062b84 = String((_a7e8ae13924b.data || {})["2"] || "");
      if (error || _a7e8ae13924b.result !== "succeed" || _4ed63a062b84.indexOf("抽奖券") < 0) {
        _05ad538cb71c.push("ℹ️ " + (error || _a7e8ae13924b.msg || "没有可用抽奖券"));
        _05ad538cb71c.forEach(_1c0c0e59960f);
        return callback(_05ad538cb71c.join("\n"));
      }
      _8f2c38cd987c({ _d58575278fc7: _5e471ef25752 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _2ac50c4df9c8 }, (error2, response2, raw) => {
        let _fd3dd4147a45 = {};
        try { _fd3dd4147a45 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _fd3dd4147a45.result !== "succeed") {
          _05ad538cb71c.push("⚠️ " + (error2 || _fd3dd4147a45.msg || "抽奖失败"));
          _05ad538cb71c.forEach(_1c0c0e59960f);
          return callback(_05ad538cb71c.join("\n"));
        }
        const _6adcbdce7502 = (((_fd3dd4147a45.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _461b08f89446 = String((_fd3dd4147a45.data || {}).ticketnumber || "0");
        const _d0089a5f3a2d = String((_fd3dd4147a45.data || {}).creditnumber || "");
        _05ad538cb71c.push("🎁 第 " + _05ad538cb71c.length + " 次：" + (_6adcbdce7502.join("、") || _fd3dd4147a45.msg || "成功"));
        _05ad538cb71c.push("🎟️ 剩余抽奖券：" + _461b08f89446 + (_d0089a5f3a2d ? "  💰 星币：" + _d0089a5f3a2d : ""));
        if (_461b08f89446 === "0") { _05ad538cb71c.forEach(_1c0c0e59960f); return callback(_05ad538cb71c.join("\n")); }
        _da7e0307c239(guard - 1);
      });
    });
  };
  _da7e0307c239(10);
}
function _f58426d3ce9a(ctx, callback) {
  const _2ac50c4df9c8 = Object.assign({}, ctx.headers);
  _2ac50c4df9c8.Referer = _a935abdd1b8e(_e3ab0d51e57e + "?id=" + _9435ee902738);
  _2ac50c4df9c8[_59bced0a6790(["X", "-", "Requested", "-", "With"])] = _59bced0a6790(["XML", "Http", "Request"]);
  const _7d040daa5f4a = ["🌾 农场与福利"];
  const _2877cb76a798 = query => _a935abdd1b8e(_e3ab0d51e57e + "?id=" + _9435ee902738 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _189c9b267d92 = [
    ["每日免费领取", _59bced0a6790(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _59bced0a6790(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _107e62e841f1 = 1; _107e62e841f1 <= 8; _107e62e841f1 += 1) _189c9b267d92.push(["地块 " + _107e62e841f1, _59bced0a6790(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _107e62e841f1]);
  const _cfd2046c69d5 = _107e62e841f1 => {
    if (_107e62e841f1 >= _189c9b267d92.length) { _7d040daa5f4a.forEach(_1c0c0e59960f); return callback(_7d040daa5f4a.join("\n")); }
    const _b1b092e4993a = _189c9b267d92[_107e62e841f1];
    _8f2c38cd987c({ _d58575278fc7: _2877cb76a798(_b1b092e4993a[1]), _2ac50c4df9c8 }, (error, response, _b04d86a758be) => {
      const _4412e7f6d833 = _9d73e38ec3da(_b04d86a758be)[0] || _8e278e95d7b1(_864e17a68a72(_b04d86a758be), 80);
      const _8da86578d5bf = _78a479ab98c6(_4412e7f6d833, ["成功", "完成", "可领取"]) ? "✅" : _78a479ab98c6(_4412e7f6d833, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _7d040daa5f4a.push(_8da86578d5bf + " " + _b1b092e4993a[0] + "：" + (error || _4412e7f6d833 || "无返回"));
      const _c5c5394051c6 = _b4b3ed64eae2(_b1b092e4993a[1], "jfid=", "&");
      if (_c5c5394051c6 && _78a479ab98c6(_b04d86a758be, ["已枯萎", "清除"])) {
        return _8f2c38cd987c({ _d58575278fc7: _2877cb76a798(_59bced0a6790(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _c5c5394051c6), _2ac50c4df9c8 }, (error2, response2, cleared) => {
          _7d040daa5f4a.push((_78a479ab98c6(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _c5c5394051c6);
          _8f2c38cd987c({ _d58575278fc7: _2877cb76a798(_59bced0a6790(["do=", "plant", "seed", "&seed=1&jfid="]) + _c5c5394051c6 + "&timestamp=" + Math.floor(Date.now() / 1000)), _2ac50c4df9c8 }, (error3, response3, planted) => {
            _7d040daa5f4a.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _c5c5394051c6 + "：" + (_9d73e38ec3da(planted)[0] || "无返回"));
            _cfd2046c69d5(_107e62e841f1 + 1);
          });
        });
      }
      _cfd2046c69d5(_107e62e841f1 + 1);
    });
  };
  _8f2c38cd987c({ _d58575278fc7: _2877cb76a798(_59bced0a6790(["do=", "normal", "&ac=", "kuo", "zhan"])), _2ac50c4df9c8 }, (error, response, _b04d86a758be) => {
    _7d040daa5f4a.push((_78a479ab98c6(_9d73e38ec3da(_b04d86a758be)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _9d73e38ec3da(_b04d86a758be)[0] || "无返回"));
    _cfd2046c69d5(0);
  });
}
function _c3cdfb0da7d2() {
  _1c0c0e59960f("🧪 调试模式：开启");
  _1c0c0e59960f("🚀 论坛任务开始");
  _1c0c0e59960f("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _1c0c0e59960f("💾 存储键：" + _43395a694ed6 + "，登录状态长度：" + _da203f7f8369("session").length);
  _7ae654100406((error, ctx) => {
    if (error === "missing") return _8a58b85b5997(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _8a58b85b5997(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _8a58b85b5997(false, "论坛任务失败", String(error));
    _1c0c0e59960f("🔐 登录状态有效");
    _7d51943489d0(ctx, one => _11a104efc42b(ctx, two => _f58426d3ce9a(ctx, three => _8a58b85b5997(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _b4547ea4afee = typeof $request !== "undefined";
if (_b4547ea4afee) _f02011f72e57();
else _c3cdfb0da7d2();

})();
