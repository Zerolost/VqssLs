/*174f046b2f10*/
(function(){
const _36cc9d5ddaaa = typeof $argument === "object" && $argument ? $argument : {};
const _72f68ca6f158 = $persistentStore;
const _af7d2f248864 = "f3k9m2_store";
const _b5cf5168a66f = true;
const _5a1b27fea5fd = { value: false };
const _462d6dc035e0 = [];
const _9bd5ccad85e9 = values => values.join("");

function _0b7a631d2b15() {
  try { return JSON.parse(_72f68ca6f158.read(_af7d2f248864) || "{}") || {}; }
  catch (error) { return {}; }
}
function _8bbdb579ef9b(_867f71331c44) { return _72f68ca6f158.write(JSON.stringify(_867f71331c44), _af7d2f248864); }
function _efb0e36d31fd(name) { return String(_0b7a631d2b15()[name] || ""); }
function _61fbd5891125(name, value) {
  const _867f71331c44 = _0b7a631d2b15();
  if (value == null) delete _867f71331c44[name];
  else _867f71331c44[name] = String(value);
  return _8bbdb579ef9b(_867f71331c44);
}
function _5f449dab45c7(_e2849bac3aa8, name) {
  const _fc62a89555a8 = Object.keys(_e2849bac3aa8 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _fc62a89555a8 ? String(_e2849bac3aa8[_fc62a89555a8] || "") : "";
}
function _71093de5f893(_d70595ea30f6) {
  const _812bd1f4b05e = String(_d70595ea30f6);
  _462d6dc035e0.push(_812bd1f4b05e);
  if (_b5cf5168a66f) console.log(_812bd1f4b05e);
}
function _58b4d3c0d611(value, size) {
  const _812bd1f4b05e = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _812bd1f4b05e.length > size ? _812bd1f4b05e.slice(0, size) + "..." : _812bd1f4b05e;
}
function _06b7b6c2ab20(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _4fb0690437ba(value, _818895d40965, _9b88b30f539f) {
  const _812bd1f4b05e = String(value || "");
  const _a390ed5c3ee9 = _812bd1f4b05e.indexOf(_818895d40965);
  if (_a390ed5c3ee9 < 0) return "";
  const _2dcdcf3793d0 = _a390ed5c3ee9 + _818895d40965.length;
  const _dabf6aa4f250 = _812bd1f4b05e.indexOf(_9b88b30f539f, _2dcdcf3793d0);
  return _812bd1f4b05e.slice(_2dcdcf3793d0, _dabf6aa4f250 < 0 ? _2dcdcf3793d0 + 16 : _dabf6aa4f250).trim();
}
function _b44f03e043c6(value) { return _4fb0690437ba(value, _9bd5ccad85e9(["form", "hash", "="]), "&"); }
function _c40551f8924b(value) {
  const _0490792963c0 = _9bd5ccad85e9(["layer", ".msg('"]);
  const _812bd1f4b05e = String(value || "");
  const _818895d40965 = _812bd1f4b05e.indexOf(_0490792963c0);
  if (_818895d40965 < 0) return [];
  const _2dcdcf3793d0 = _818895d40965 + _0490792963c0.length;
  const _9b88b30f539f = _812bd1f4b05e.indexOf("')", _2dcdcf3793d0);
  return _9b88b30f539f < 0 ? [] : [_812bd1f4b05e.slice(_2dcdcf3793d0, _9b88b30f539f)];
}
function _6c8322a3b5ab(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _1024632f1c6a(ok, title, body) {
  if (_5a1b27fea5fd.value) return;
  _5a1b27fea5fd.value = true;
  _71093de5f893("━━━━━━━━ 执行结束 ━━━━━━━━");
  _71093de5f893(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _12e102099b1b = typeof $notification !== "undefined";
  if (_36cc9d5ddaaa.notify_enabled !== false && _12e102099b1b) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _58b4d3c0d611(body || _462d6dc035e0.join("\n"), 700));
  const _907566137cd8 = typeof $done === "function";
  if (_907566137cd8) $done({});
}
function _534ed3621cb3(options, callback) {
  const _0f58a62c24be = String(options.method || "GET").toLowerCase();
  const _c3b3a67cd39c = $httpClient[_0f58a62c24be] || $httpClient.get;
  const _2e4aae65c106 = { _5a1f3a2e548b: options.url, _e2849bac3aa8: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _2e4aae65c106[_9bd5ccad85e9(["auto", "-", "redirect"])] = true;
  _2e4aae65c106[_9bd5ccad85e9(["auto", "-", "cookie"])] = true;
  _c3b3a67cd39c(_2e4aae65c106, (error, response, _867f71331c44) => callback(error, response || {}, String(_867f71331c44 || "")));
}
function _bb5695c8a84d(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _e3e637782a6b = _9bd5ccad85e9(["ht", "tps", "://"]);
const _e4dc5a131ede = [121, 99, 111, 111, 46, 110, 101, 116].map(_afaafa35c8eb => String.fromCharCode(_afaafa35c8eb)).join("");
function _fbcc012aa794(path) { return _e3e637782a6b + _e4dc5a131ede + String.fromCharCode(47) + String(path || ""); }
const _316b86e49e19 = _9bd5ccad85e9(["plu", "gin", ".", "php"]);
const _3d5358297cd9 = _9bd5ccad85e9(["k", "_", "mi", "sign"]);
const _d480c691dbaa = _9bd5ccad85e9(["view", "ui", "_", "lottery"]);
const _70da690b2432 = _9bd5ccad85e9(["jn", "farm"]);

function _e3ae9cdeffb1(_e2849bac3aa8, name) {
  const _085a61e62966 = _5f449dab45c7(_e2849bac3aa8, name);
  return Array.isArray(_085a61e62966) ? _085a61e62966.join(",") : String(_085a61e62966 || "");
}
function _194ec9633983(_27911d21ae95, extra) {
  const _6b6314bc89d6 = {};
  [_27911d21ae95, extra].join("; ").split(";").forEach(item => {
    const _812bd1f4b05e = item.trim();
    const _6b28448919ab = _812bd1f4b05e.indexOf("=");
    if (_6b28448919ab > 0) _6b6314bc89d6[_812bd1f4b05e.slice(0, _6b28448919ab)] = _812bd1f4b05e.slice(_6b28448919ab + 1);
  });
  return Object.keys(_6b6314bc89d6).map(_fc62a89555a8 => _fc62a89555a8 + "=" + _6b6314bc89d6[_fc62a89555a8]).join("; ");
}
function _821b59a3c941() {
  try {
    const _1f1d98e34936 = typeof $request !== "undefined" ? $request : {};
    const _779a55fb1b62 = typeof $response !== "undefined" ? $response : {};
    const _5a1f3a2e548b = String(_1f1d98e34936.url || "");
    const _eb1a6661c8dc = _e3ae9cdeffb1(_1f1d98e34936.headers, "Cookie");
    const _65ba8bad02db = _e3ae9cdeffb1(_779a55fb1b62.headers, "Set-Cookie");
    const _0df70d9950d4 = _194ec9633983(_bb5695c8a84d(_eb1a6661c8dc), _bb5695c8a84d(_65ba8bad02db));
    const _753c019ff25b = _0df70d9950d4.split("; ").filter(Boolean);
    const _7ae6d2988f30 = Object.keys(_1f1d98e34936.headers || {}).concat(Object.keys(_779a55fb1b62.headers || {}));
    const _9e25cd2e24e2 = _753c019ff25b.some(item => item.indexOf("auth=") >= 0);
    _71093de5f893("🧪 调试模式：开启");
    _71093de5f893("🍪 登录状态抓取");
    _71093de5f893("🌐 页面：" + _58b4d3c0d611(_5a1f3a2e548b, 180));
    _71093de5f893("📋 头名称：" + _7ae6d2988f30.map(item => item.toLowerCase()).join(","));
    _71093de5f893("🔑 请求长度：" + _eb1a6661c8dc.length + "，响应长度：" + _65ba8bad02db.length + "，合并字段：" + _753c019ff25b.length);
    if (!_9e25cd2e24e2) {
      _71093de5f893("ℹ️ 当前响应没有完整登录状态");
      return _1024632f1c6a(true, "", "");
    }
    const _11954326a0f0 = _efb0e36d31fd("session");
    const _c9ff59e5cdcc = Number(_efb0e36d31fd("notified") || 0);
    const _94f10089afcd = _61fbd5891125("session", _0df70d9950d4);
    _61fbd5891125("updated", new Date().toISOString());
    _71093de5f893(_11954326a0f0 === _0df70d9950d4 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _71093de5f893("💾 存储键：" + _af7d2f248864 + "，写入：" + _94f10089afcd + "，回读长度：" + _efb0e36d31fd("session").length);
    if (_11954326a0f0 !== _0df70d9950d4 && Date.now() - _c9ff59e5cdcc > 60000) {
      _61fbd5891125("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _753c019ff25b.length + " 项 / " + _0df70d9950d4.length);
    }
    _1024632f1c6a(true, "", "");
  } catch (error) {
    _71093de5f893("❌ 登录状态异常：" + error);
    _1024632f1c6a(false, "登录状态失败", String(error));
  }
}
function _a31b8730aea0(callback) {
  const _0df70d9950d4 = _efb0e36d31fd("session");
  if (!_0df70d9950d4) return callback("missing");
  const _e2849bac3aa8 = {};
  _e2849bac3aa8[_9bd5ccad85e9(["C", "ookie"])] = _0df70d9950d4;
  _e2849bac3aa8[_9bd5ccad85e9(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _e2849bac3aa8.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _534ed3621cb3({ _5a1f3a2e548b: _fbcc012aa794(""), _e2849bac3aa8 }, (error, response, _867f71331c44) => {
    if (error) return callback(error);
    if (_867f71331c44.indexOf(_9bd5ccad85e9(["action", "=", "logout"])) < 0) return callback("expired");
    const _afaafa35c8eb = _b44f03e043c6(_867f71331c44);
    if (!_afaafa35c8eb) return callback("token");
    callback(null, { _e2849bac3aa8, _afaafa35c8eb });
  });
}
function _47cef5706025(ctx, callback) {
  const _e2849bac3aa8 = Object.assign({}, ctx.headers);
  _e2849bac3aa8.Referer = _fbcc012aa794(_9bd5ccad85e9([_3d5358297cd9, "-", "sign", ".", "html"]));
  _e2849bac3aa8[_9bd5ccad85e9(["X", "-", "Requested", "-", "With"])] = _9bd5ccad85e9(["XML", "Http", "Request"]);
  _534ed3621cb3({ _5a1f3a2e548b: _fbcc012aa794(_316b86e49e19 + "?id=" + _3d5358297cd9 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _e2849bac3aa8 }, (error, response, _867f71331c44) => {
    _71093de5f893("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _46c9250d32b7 = _867f71331c44.indexOf("今日已签") >= 0;
    const _e182665c4987 = _46c9250d32b7 || _867f71331c44.indexOf("<![CDATA[]]>") >= 0;
    _534ed3621cb3({ _5a1f3a2e548b: _fbcc012aa794(_9bd5ccad85e9([_3d5358297cd9, "-", "sign", ".", "html"])), _e2849bac3aa8: ctx.headers }, (error2, response2, page) => {
      const _d3b074633773 = _4fb0690437ba(page, "签到排名：", " ");
      const _3571821cad06 = _4fb0690437ba(page, 'id="lxtdays" value="', '"');
      const _f47d28fac6d3 = _4fb0690437ba(page, 'id="lxlevel" value="', '"');
      const _eddeb52381f4 = _4fb0690437ba(page, 'id="lxreward" value="', '"');
      _71093de5f893(_46c9250d32b7 ? "ℹ️ 今日已经签到" : _e182665c4987 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_d3b074633773) _71093de5f893("🏆 当前排名：" + _d3b074633773);
      if (_3571821cad06) _71093de5f893("📆 累计天数：" + _3571821cad06);
      if (_f47d28fac6d3) _71093de5f893("🏅 签到等级：LV." + _f47d28fac6d3);
      if (_eddeb52381f4) _71093de5f893("💰 最近奖励：" + _eddeb52381f4);
      callback([_46c9250d32b7 ? "ℹ️ 今日已签到" : _e182665c4987 ? "✅ 签到成功" : "⚠️ 签到异常", _d3b074633773 ? "🏆 排名 " + _d3b074633773 : "", _3571821cad06 ? "📆 累计 " + _3571821cad06 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _b52767f97320(ctx, callback) {
  const _e2849bac3aa8 = Object.assign({}, ctx.headers);
  _e2849bac3aa8.Referer = _fbcc012aa794(_316b86e49e19 + "?id=" + _d480c691dbaa);
  _e2849bac3aa8[_9bd5ccad85e9(["X", "-", "Requested", "-", "With"])] = _9bd5ccad85e9(["XML", "Http", "Request"]);
  _e2849bac3aa8.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _27911d21ae95 = _fbcc012aa794(_316b86e49e19 + "?id=" + _d480c691dbaa + ":draw");
  const _9de39c754a52 = ["🎰 幸运抽奖"];
  const _47d65eb736ad = guard => {
    if (guard <= 0) { _9de39c754a52.forEach(_71093de5f893); return callback(_9de39c754a52.join("\n")); }
    _534ed3621cb3({ _5a1f3a2e548b: _27911d21ae95 + "?drawnumber=1&inajax=1", _e2849bac3aa8 }, (error, response, _867f71331c44) => {
      let _5e58637f90c5 = {};
      try { _5e58637f90c5 = JSON.parse(_867f71331c44); } catch (ignored) {}
      const _82fc4857d748 = String((_5e58637f90c5.data || {})["2"] || "");
      if (error || _5e58637f90c5.result !== "succeed" || _82fc4857d748.indexOf("抽奖券") < 0) {
        _9de39c754a52.push("ℹ️ " + (error || _5e58637f90c5.msg || "没有可用抽奖券"));
        _9de39c754a52.forEach(_71093de5f893);
        return callback(_9de39c754a52.join("\n"));
      }
      _534ed3621cb3({ _5a1f3a2e548b: _27911d21ae95 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _e2849bac3aa8 }, (error2, response2, raw) => {
        let _10a5cc030e83 = {};
        try { _10a5cc030e83 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _10a5cc030e83.result !== "succeed") {
          _9de39c754a52.push("⚠️ " + (error2 || _10a5cc030e83.msg || "抽奖失败"));
          _9de39c754a52.forEach(_71093de5f893);
          return callback(_9de39c754a52.join("\n"));
        }
        const _760194f28a4b = (((_10a5cc030e83.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _a390ed5c3ee9 = String((_10a5cc030e83.data || {}).ticketnumber || "0");
        const _358854590b72 = String((_10a5cc030e83.data || {}).creditnumber || "");
        _9de39c754a52.push("🎁 第 " + _9de39c754a52.length + " 次：" + (_760194f28a4b.join("、") || _10a5cc030e83.msg || "成功"));
        _9de39c754a52.push("🎟️ 剩余抽奖券：" + _a390ed5c3ee9 + (_358854590b72 ? "  💰 星币：" + _358854590b72 : ""));
        if (_a390ed5c3ee9 === "0") { _9de39c754a52.forEach(_71093de5f893); return callback(_9de39c754a52.join("\n")); }
        _47d65eb736ad(guard - 1);
      });
    });
  };
  _47d65eb736ad(10);
}
function _3ea375872bb7(ctx, callback) {
  const _e2849bac3aa8 = Object.assign({}, ctx.headers);
  _e2849bac3aa8.Referer = _fbcc012aa794(_316b86e49e19 + "?id=" + _70da690b2432);
  _e2849bac3aa8[_9bd5ccad85e9(["X", "-", "Requested", "-", "With"])] = _9bd5ccad85e9(["XML", "Http", "Request"]);
  const _b42b55ab5e9a = ["🌾 农场与福利"];
  const _ba2d5aef5244 = query => _fbcc012aa794(_316b86e49e19 + "?id=" + _70da690b2432 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _57a2e14cda29 = [
    ["每日免费领取", _9bd5ccad85e9(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _9bd5ccad85e9(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _36d040c96ee2 = 1; _36d040c96ee2 <= 8; _36d040c96ee2 += 1) _57a2e14cda29.push(["地块 " + _36d040c96ee2, _9bd5ccad85e9(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _36d040c96ee2]);
  const _bac8a021af4c = _36d040c96ee2 => {
    if (_36d040c96ee2 >= _57a2e14cda29.length) { _b42b55ab5e9a.forEach(_71093de5f893); return callback(_b42b55ab5e9a.join("\n")); }
    const _7e8810386aa8 = _57a2e14cda29[_36d040c96ee2];
    _534ed3621cb3({ _5a1f3a2e548b: _ba2d5aef5244(_7e8810386aa8[1]), _e2849bac3aa8 }, (error, response, _867f71331c44) => {
      const _d70595ea30f6 = _c40551f8924b(_867f71331c44)[0] || _58b4d3c0d611(_06b7b6c2ab20(_867f71331c44), 80);
      const _d8e96b158363 = _6c8322a3b5ab(_d70595ea30f6, ["成功", "完成", "可领取"]) ? "✅" : _6c8322a3b5ab(_d70595ea30f6, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _b42b55ab5e9a.push(_d8e96b158363 + " " + _7e8810386aa8[0] + "：" + (error || _d70595ea30f6 || "无返回"));
      const _396947d4286d = _4fb0690437ba(_7e8810386aa8[1], "jfid=", "&");
      if (_396947d4286d && _6c8322a3b5ab(_867f71331c44, ["已枯萎", "清除"])) {
        return _534ed3621cb3({ _5a1f3a2e548b: _ba2d5aef5244(_9bd5ccad85e9(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _396947d4286d), _e2849bac3aa8 }, (error2, response2, cleared) => {
          _b42b55ab5e9a.push((_6c8322a3b5ab(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _396947d4286d);
          _534ed3621cb3({ _5a1f3a2e548b: _ba2d5aef5244(_9bd5ccad85e9(["do=", "plant", "seed", "&seed=1&jfid="]) + _396947d4286d + "&timestamp=" + Math.floor(Date.now() / 1000)), _e2849bac3aa8 }, (error3, response3, planted) => {
            _b42b55ab5e9a.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _396947d4286d + "：" + (_c40551f8924b(planted)[0] || "无返回"));
            _bac8a021af4c(_36d040c96ee2 + 1);
          });
        });
      }
      _bac8a021af4c(_36d040c96ee2 + 1);
    });
  };
  _534ed3621cb3({ _5a1f3a2e548b: _ba2d5aef5244(_9bd5ccad85e9(["do=", "normal", "&ac=", "kuo", "zhan"])), _e2849bac3aa8 }, (error, response, _867f71331c44) => {
    _b42b55ab5e9a.push((_6c8322a3b5ab(_c40551f8924b(_867f71331c44)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _c40551f8924b(_867f71331c44)[0] || "无返回"));
    _bac8a021af4c(0);
  });
}
function _bc2c78579df0() {
  _71093de5f893("🧪 调试模式：开启");
  _71093de5f893("🚀 论坛任务开始");
  _71093de5f893("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _71093de5f893("💾 存储键：" + _af7d2f248864 + "，登录状态长度：" + _efb0e36d31fd("session").length);
  _a31b8730aea0((error, ctx) => {
    if (error === "missing") return _1024632f1c6a(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _1024632f1c6a(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _1024632f1c6a(false, "论坛任务失败", String(error));
    _71093de5f893("🔐 登录状态有效");
    _47cef5706025(ctx, one => _b52767f97320(ctx, two => _3ea375872bb7(ctx, three => _1024632f1c6a(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_71093de5f893("🧪 调试模式：开启");
_71093de5f893("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _c8a83d57da34 = typeof $request !== "undefined";
if (_c8a83d57da34) _821b59a3c941();
else _bc2c78579df0();

})();
