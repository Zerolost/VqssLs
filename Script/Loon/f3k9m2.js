/*f5d35bfc3522*/
(function(){
const _9c9148de5a97 = typeof $argument === "object" && $argument ? $argument : {};
const _df9250935717 = $persistentStore;
const _c4a5e25ddecf = "f3k9m2_store";
const _39446a059099 = true;
const _e7ff9388bd4e = { value: false };
const _cabf22a9259e = [];
const _c45addc64158 = values => values.join("");

function _2961482517ff() {
  try { return JSON.parse(_df9250935717.read(_c4a5e25ddecf) || "{}") || {}; }
  catch (error) { return {}; }
}
function _1552920e1acb(_83ab3a5e6c47) { return _df9250935717.write(JSON.stringify(_83ab3a5e6c47), _c4a5e25ddecf); }
function _08be19feb2b3(name) { return String(_2961482517ff()[name] || ""); }
function _40bd046141ac(name, value) {
  const _83ab3a5e6c47 = _2961482517ff();
  if (value == null) delete _83ab3a5e6c47[name];
  else _83ab3a5e6c47[name] = String(value);
  return _1552920e1acb(_83ab3a5e6c47);
}
function _5b4ff33db9a4(_dd3e70f18fea, name) {
  const _c92228cf50b5 = Object.keys(_dd3e70f18fea || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _c92228cf50b5 ? String(_dd3e70f18fea[_c92228cf50b5] || "") : "";
}
function _376d74509640(_b3ab6533231f) {
  const _31cc52aec1f4 = String(_b3ab6533231f);
  _cabf22a9259e.push(_31cc52aec1f4);
  if (_39446a059099) console.log(_31cc52aec1f4);
}
function _25e23acb54c0(value, size) {
  const _31cc52aec1f4 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _31cc52aec1f4.length > size ? _31cc52aec1f4.slice(0, size) + "..." : _31cc52aec1f4;
}
function _5cb07d22c52c(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _650fa2e02723(value, _699bff5365c3, _dcaeaf8ebe57) {
  const _31cc52aec1f4 = String(value || "");
  const _c4c0111b7875 = _31cc52aec1f4.indexOf(_699bff5365c3);
  if (_c4c0111b7875 < 0) return "";
  const _f5368a1f7a02 = _c4c0111b7875 + _699bff5365c3.length;
  const _d12e07161eb9 = _31cc52aec1f4.indexOf(_dcaeaf8ebe57, _f5368a1f7a02);
  return _31cc52aec1f4.slice(_f5368a1f7a02, _d12e07161eb9 < 0 ? _f5368a1f7a02 + 16 : _d12e07161eb9).trim();
}
function _c56bb462bd8c(value) { return _650fa2e02723(value, _c45addc64158(["form", "hash", "="]), "&"); }
function _9ff8dbd85ece(value) {
  const _48389d632c03 = _c45addc64158(["layer", ".msg('"]);
  const _31cc52aec1f4 = String(value || "");
  const _699bff5365c3 = _31cc52aec1f4.indexOf(_48389d632c03);
  if (_699bff5365c3 < 0) return [];
  const _f5368a1f7a02 = _699bff5365c3 + _48389d632c03.length;
  const _dcaeaf8ebe57 = _31cc52aec1f4.indexOf("')", _f5368a1f7a02);
  return _dcaeaf8ebe57 < 0 ? [] : [_31cc52aec1f4.slice(_f5368a1f7a02, _dcaeaf8ebe57)];
}
function _6b7a7f21d58c(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _82775194e039(ok, title, body) {
  if (_e7ff9388bd4e.value) return;
  _e7ff9388bd4e.value = true;
  _376d74509640("━━━━━━━━ 执行结束 ━━━━━━━━");
  _376d74509640(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _ac785b5df120 = typeof $notification !== "undefined";
  if (_9c9148de5a97.notify_enabled !== false && _ac785b5df120) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _25e23acb54c0(body || _cabf22a9259e.join("\n"), 700));
  const _22dd5eb6d71f = typeof $done === "function";
  if (_22dd5eb6d71f) $done({});
}
function _4ba6d472f404(options, callback, attempt) {
  const _ba9f6c101434 = String(options.method || "GET").toLowerCase();
  const _27c7080ac01b = $httpClient[_ba9f6c101434] || $httpClient.get;
  const _8aa159e60d43 = {};
  _8aa159e60d43["url"] = String(options.url || "");
  _8aa159e60d43["headers"] = options.headers || {};
  _8aa159e60d43["body"] = options.body || "";
  _8aa159e60d43["timeout"] = options.timeout || 20000;
  _8aa159e60d43["auto-redirect"] = true;
  _8aa159e60d43["auto-cookie"] = true;
  _8aa159e60d43["alpn"] = "h2";
  _376d74509640("🌐 请求：" + _8aa159e60d43["url"]);
  _27c7080ac01b(_8aa159e60d43, (error, response, _83ab3a5e6c47) => {
    const _31cc52aec1f4 = String(error || "");
    if (_31cc52aec1f4 && (attempt || 0) < 2 && (_31cc52aec1f4.indexOf("closed") >= 0 || _31cc52aec1f4.indexOf("timed out") >= 0)) {
      _376d74509640("🔁 连接中断，正在重试");
      return _4ba6d472f404(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_83ab3a5e6c47 || ""));
  });
}
function _e0529db310d3(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _3bdd253fe6c5 = _c45addc64158(["ht", "tps", "://"]);
const _0d2ba9f94145 = [121, 99, 111, 111, 46, 110, 101, 116].map(_9dd2c389696a => String.fromCharCode(_9dd2c389696a)).join("");
function _5454d21821b4(path) { return _3bdd253fe6c5 + _0d2ba9f94145 + String.fromCharCode(47) + String(path || ""); }
const _e05044bbee8a = _c45addc64158(["plu", "gin", ".", "php"]);
const _49f20e9596a2 = _c45addc64158(["k", "_", "mi", "sign"]);
const _5342b465f27a = _c45addc64158(["view", "ui", "_", "lottery"]);
const _15b08e16330d = _c45addc64158(["jn", "farm"]);

function _ad7542cf3f47(_dd3e70f18fea, name) {
  const _3fd2b6887aba = _5b4ff33db9a4(_dd3e70f18fea, name);
  return Array.isArray(_3fd2b6887aba) ? _3fd2b6887aba.join(",") : String(_3fd2b6887aba || "");
}
function _ed85dd996e81(_f4a131aeca01, extra) {
  const _392fe8c6930a = {};
  [_f4a131aeca01, extra].join("; ").split(";").forEach(item => {
    const _31cc52aec1f4 = item.trim();
    const _e948834658c6 = _31cc52aec1f4.indexOf("=");
    if (_e948834658c6 > 0) _392fe8c6930a[_31cc52aec1f4.slice(0, _e948834658c6)] = _31cc52aec1f4.slice(_e948834658c6 + 1);
  });
  return Object.keys(_392fe8c6930a).map(_c92228cf50b5 => _c92228cf50b5 + "=" + _392fe8c6930a[_c92228cf50b5]).join("; ");
}
function _9837e23c33a1() {
  try {
    const _5934affd7b9b = typeof $request !== "undefined" ? $request : {};
    const _00bb3ccc155d = typeof $response !== "undefined" ? $response : {};
    const _5826b9374625 = String(_5934affd7b9b.url || "");
    const _ba203356a06b = _ad7542cf3f47(_5934affd7b9b.headers, "Cookie");
    const _6655a73101a2 = _ad7542cf3f47(_00bb3ccc155d.headers, "Set-Cookie");
    const _0f70d0e57140 = _ed85dd996e81(_ba203356a06b, "");
    const _65398eeed29d = _0f70d0e57140.split("; ").filter(Boolean);
    const _81f0612f473a = Object.keys(_5934affd7b9b.headers || {}).concat(Object.keys(_00bb3ccc155d.headers || {}));
    const _51effb926cf8 = _65398eeed29d.some(item => item.indexOf("auth=") >= 0);
    _376d74509640("🧪 调试模式：开启");
    _376d74509640("🍪 登录状态抓取");
    _376d74509640("🌐 页面：" + _25e23acb54c0(_5826b9374625, 180));
    _376d74509640("📋 头名称：" + _81f0612f473a.map(item => item.toLowerCase()).join(","));
    _376d74509640("🔑 请求长度：" + _ba203356a06b.length + "，字段：" + _65398eeed29d.length);
    _376d74509640("🏷️ 字段名：" + _65398eeed29d.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_51effb926cf8) {
      _376d74509640("ℹ️ 当前响应没有完整登录状态");
      return _82775194e039(true, "", "");
    }
    const _68dcd7ade7dc = _08be19feb2b3("session");
    const _34a130ba7ac9 = Number(_08be19feb2b3("notified") || 0);
    const _b1186c00ca0f = _40bd046141ac("session", _0f70d0e57140);
    _40bd046141ac("updated", new Date().toISOString());
    _376d74509640(_68dcd7ade7dc === _0f70d0e57140 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _376d74509640("💾 存储键：" + _c4a5e25ddecf + "，写入：" + _b1186c00ca0f + "，回读长度：" + _08be19feb2b3("session").length);
    if (_68dcd7ade7dc !== _0f70d0e57140 && Date.now() - _34a130ba7ac9 > 60000) {
      _40bd046141ac("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _65398eeed29d.length + " 项 / " + _0f70d0e57140.length);
    }
    _82775194e039(true, "", "");
  } catch (error) {
    _376d74509640("❌ 登录状态异常：" + error);
    _82775194e039(false, "登录状态失败", String(error));
  }
}
function _19136f95ce5b(callback) {
  const _0f70d0e57140 = _08be19feb2b3("session");
  if (!_0f70d0e57140) return callback("missing");
  const _dd3e70f18fea = {};
  _dd3e70f18fea[_c45addc64158(["C", "ookie"])] = _0f70d0e57140;
  _dd3e70f18fea[_c45addc64158(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _dd3e70f18fea.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _4ba6d472f404({ url: _5454d21821b4("forum.php"), _dd3e70f18fea }, (error, response, _83ab3a5e6c47) => {
    if (error) return callback(error);
    if (_83ab3a5e6c47.indexOf(_c45addc64158(["action", "=", "logout"])) < 0) return callback("expired");
    const _9dd2c389696a = _c56bb462bd8c(_83ab3a5e6c47);
    if (!_9dd2c389696a) return callback("token");
    callback(null, { _dd3e70f18fea, _9dd2c389696a });
  });
}
function _e8e33e19cf1e(ctx, callback) {
  const _dd3e70f18fea = Object.assign({}, ctx.headers);
  _dd3e70f18fea.Referer = _5454d21821b4(_c45addc64158([_49f20e9596a2, "-", "sign", ".", "html"]));
  _dd3e70f18fea[_c45addc64158(["X", "-", "Requested", "-", "With"])] = _c45addc64158(["XML", "Http", "Request"]);
  _4ba6d472f404({ url: _5454d21821b4(_e05044bbee8a + "?id=" + _49f20e9596a2 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _dd3e70f18fea }, (error, response, _83ab3a5e6c47) => {
    _376d74509640("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _7198e4d3e88e = _83ab3a5e6c47.indexOf("今日已签") >= 0;
    const _5cecfa287c13 = _7198e4d3e88e || _83ab3a5e6c47.indexOf("<![CDATA[]]>") >= 0;
    _4ba6d472f404({ url: _5454d21821b4(_c45addc64158([_49f20e9596a2, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _dcc5b8d82d7f = _650fa2e02723(page, "签到排名：", " ");
      const _ba53d842df1b = _650fa2e02723(page, 'id="lxtdays" value="', '"');
      const _c818f0553f10 = _650fa2e02723(page, 'id="lxlevel" value="', '"');
      const _29c70fe8cada = _650fa2e02723(page, 'id="lxreward" value="', '"');
      _376d74509640(_7198e4d3e88e ? "ℹ️ 今日已经签到" : _5cecfa287c13 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_dcc5b8d82d7f) _376d74509640("🏆 当前排名：" + _dcc5b8d82d7f);
      if (_ba53d842df1b) _376d74509640("📆 累计天数：" + _ba53d842df1b);
      if (_c818f0553f10) _376d74509640("🏅 签到等级：LV." + _c818f0553f10);
      if (_29c70fe8cada) _376d74509640("💰 最近奖励：" + _29c70fe8cada);
      callback([_7198e4d3e88e ? "ℹ️ 今日已签到" : _5cecfa287c13 ? "✅ 签到成功" : "⚠️ 签到异常", _dcc5b8d82d7f ? "🏆 排名 " + rank : "", _ba53d842df1b ? "📆 累计 " + _ba53d842df1b + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _02bb2be8ff30(ctx, callback) {
  const _dd3e70f18fea = Object.assign({}, ctx.headers);
  _dd3e70f18fea.Referer = _5454d21821b4(_e05044bbee8a + "?id=" + _5342b465f27a);
  _dd3e70f18fea[_c45addc64158(["X", "-", "Requested", "-", "With"])] = _c45addc64158(["XML", "Http", "Request"]);
  _dd3e70f18fea.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _f4a131aeca01 = _5454d21821b4(_e05044bbee8a + "?id=" + _5342b465f27a + ":draw");
  const _04ac1d1263c3 = ["🎰 幸运抽奖"];
  const _2d274a173ba5 = guard => {
    if (guard <= 0) { _04ac1d1263c3.forEach(_376d74509640); return callback(_04ac1d1263c3.join("\n")); }
    _4ba6d472f404({ url: _f4a131aeca01 + "?drawnumber=1&inajax=1", _dd3e70f18fea }, (error, response, _83ab3a5e6c47) => {
      let _ebe6ecf04d0e = {};
      try { _ebe6ecf04d0e = JSON.parse(_83ab3a5e6c47); } catch (ignored) {}
      const _a2fa422624f3 = String((_ebe6ecf04d0e.data || {})["2"] || "");
      if (error || _ebe6ecf04d0e.result !== "succeed" || _a2fa422624f3.indexOf("抽奖券") < 0) {
        _04ac1d1263c3.push("ℹ️ " + (error || _ebe6ecf04d0e.msg || "没有可用抽奖券"));
        _04ac1d1263c3.forEach(_376d74509640);
        return callback(_04ac1d1263c3.join("\n"));
      }
      _4ba6d472f404({ url: _f4a131aeca01 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _dd3e70f18fea }, (error2, response2, raw) => {
        let _8cade94e815f = {};
        try { _8cade94e815f = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _8cade94e815f.result !== "succeed") {
          _04ac1d1263c3.push("⚠️ " + (error2 || _8cade94e815f.msg || "抽奖失败"));
          _04ac1d1263c3.forEach(_376d74509640);
          return callback(_04ac1d1263c3.join("\n"));
        }
        const _1c63de99022c = (((_8cade94e815f.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _c4c0111b7875 = String((_8cade94e815f.data || {}).ticketnumber || "0");
        const _94f24d15078b = String((_8cade94e815f.data || {}).creditnumber || "");
        _04ac1d1263c3.push("🎁 第 " + _04ac1d1263c3.length + " 次：" + (_1c63de99022c.join("、") || _8cade94e815f.msg || "成功"));
        _04ac1d1263c3.push("🎟️ 剩余抽奖券：" + _c4c0111b7875 + (_94f24d15078b ? "  💰 星币：" + credit : ""));
        if (_c4c0111b7875 === "0") { _04ac1d1263c3.forEach(_376d74509640); return callback(_04ac1d1263c3.join("\n")); }
        _2d274a173ba5(guard - 1);
      });
    });
  };
  _2d274a173ba5(10);
}
function _a181fd765594(ctx, callback) {
  const _dd3e70f18fea = Object.assign({}, ctx.headers);
  _dd3e70f18fea.Referer = _5454d21821b4(_e05044bbee8a + "?id=" + _15b08e16330d);
  _dd3e70f18fea[_c45addc64158(["X", "-", "Requested", "-", "With"])] = _c45addc64158(["XML", "Http", "Request"]);
  const _1d16bc2205aa = ["🌾 农场与福利"];
  const _16ff02aab360 = query => _5454d21821b4(_e05044bbee8a + "?id=" + _15b08e16330d + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _060c013eabb5 = [
    ["每日免费领取", _c45addc64158(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _c45addc64158(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _0657e3b48de1 = 1; _0657e3b48de1 <= 8; _0657e3b48de1 += 1) _060c013eabb5.push(["地块 " + _0657e3b48de1, _c45addc64158(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _0657e3b48de1]);
  const _8074875d47e4 = _0657e3b48de1 => {
    if (_0657e3b48de1 >= _060c013eabb5.length) { _1d16bc2205aa.forEach(_376d74509640); return callback(_1d16bc2205aa.join("\n")); }
    const _2ab41dbe69d6 = _060c013eabb5[_0657e3b48de1];
    _4ba6d472f404({ url: _16ff02aab360(_2ab41dbe69d6[1]), _dd3e70f18fea }, (error, response, _83ab3a5e6c47) => {
      const _b3ab6533231f = _9ff8dbd85ece(_83ab3a5e6c47)[0] || _25e23acb54c0(_5cb07d22c52c(_83ab3a5e6c47), 80);
      const _77d06e10629b = _6b7a7f21d58c(_b3ab6533231f, ["成功", "完成", "可领取"]) ? "✅" : _6b7a7f21d58c(_b3ab6533231f, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _1d16bc2205aa.push(_77d06e10629b + " " + _2ab41dbe69d6[0] + "：" + (error || _b3ab6533231f || "无返回"));
      const _550e311e6fc4 = _650fa2e02723(_2ab41dbe69d6[1], "jfid=", "&");
      if (_550e311e6fc4 && _6b7a7f21d58c(_83ab3a5e6c47, ["已枯萎", "清除"])) {
        return _4ba6d472f404({ url: _16ff02aab360(_c45addc64158(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _550e311e6fc4), _dd3e70f18fea }, (error2, response2, cleared) => {
          _1d16bc2205aa.push((_6b7a7f21d58c(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _550e311e6fc4);
          _4ba6d472f404({ url: _16ff02aab360(_c45addc64158(["do=", "plant", "seed", "&seed=1&jfid="]) + _550e311e6fc4 + "&timestamp=" + Math.floor(Date.now() / 1000)), _dd3e70f18fea }, (error3, response3, planted) => {
            _1d16bc2205aa.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _550e311e6fc4 + "：" + (_9ff8dbd85ece(planted)[0] || "无返回"));
            _8074875d47e4(_0657e3b48de1 + 1);
          });
        });
      }
      _8074875d47e4(_0657e3b48de1 + 1);
    });
  };
  _4ba6d472f404({ url: _16ff02aab360(_c45addc64158(["do=", "normal", "&ac=", "kuo", "zhan"])), _dd3e70f18fea }, (error, response, _83ab3a5e6c47) => {
    _1d16bc2205aa.push((_6b7a7f21d58c(_9ff8dbd85ece(_83ab3a5e6c47)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _9ff8dbd85ece(_83ab3a5e6c47)[0] || "无返回"));
    _8074875d47e4(0);
  });
}
function _e1a6c2d49c31() {
  _376d74509640("🧪 调试模式：开启");
  _376d74509640("🚀 论坛任务开始");
  _376d74509640("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _376d74509640("💾 存储键：" + _c4a5e25ddecf + "，登录状态长度：" + _08be19feb2b3("session").length);
  _19136f95ce5b((error, ctx) => {
    if (error === "missing") return _82775194e039(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _82775194e039(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _82775194e039(false, "论坛任务失败", String(error));
    _376d74509640("🔐 登录状态有效");
    _e8e33e19cf1e(ctx, one => _02bb2be8ff30(ctx, two => _a181fd765594(ctx, three => _82775194e039(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_376d74509640("🧪 调试模式：开启");
_376d74509640("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _bdce39c0b6c3 = typeof $request !== "undefined";
if (_bdce39c0b6c3) _9837e23c33a1();
else _e1a6c2d49c31();

})();
