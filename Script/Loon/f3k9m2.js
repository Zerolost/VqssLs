/*5dce75527840*/
(function(){
const _d860ef32011a = typeof $argument === "object" && $argument ? $argument : {};
const _b0cfd0b78b8f = $persistentStore;
const _f3bef03c8f82 = "a91e7c4d";
const _3add29792db0 = { value: false };
const _e966f52f40bb = [];
const _301f508e15f3 = values => values.join("");

function _ffe89aadfdc2() {
  try { return JSON.parse(_b0cfd0b78b8f.read(store) || "{}") || {}; }
  catch (error) { return {}; }
}
function _474dd4abf58b(_b09f57d691f3) { return _b0cfd0b78b8f.write(JSON.stringify(_b09f57d691f3), store); }
function _d13a67a210d6(name) { return String(_ffe89aadfdc2()[name] || ""); }
function _bb4622907fa3(name, value) {
  const _b09f57d691f3 = _ffe89aadfdc2();
  if (value == null) delete _b09f57d691f3[name];
  else _b09f57d691f3[name] = String(value);
  return _474dd4abf58b(_b09f57d691f3);
}
function _8f922c33cffb(_5c2eabd1fbfd, name) {
  const _69e143259508 = Object.keys(_5c2eabd1fbfd || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _69e143259508 ? String(_5c2eabd1fbfd[_69e143259508] || "") : "";
}
function _9bbbdb521418(_7ea0f63bca03) {
  const _a7e7b7d6ea45 = String(_7ea0f63bca03);
  _e966f52f40bb.push(_a7e7b7d6ea45);
  if (debugOn) console.log(_a7e7b7d6ea45);
}
function _7dc8505cbcfb(value, size) {
  const _a7e7b7d6ea45 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _a7e7b7d6ea45.length > size ? _a7e7b7d6ea45.slice(0, size) + "..." : _a7e7b7d6ea45;
}
function _30b18eb2a5ba(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _529e6cc15906(value, _c4edf2454109, _3e1fc1be78d7) {
  const _a7e7b7d6ea45 = String(value || "");
  const _72b5be213bc4 = _a7e7b7d6ea45.indexOf(_c4edf2454109);
  if (_72b5be213bc4 < 0) return "";
  const _141ab43e5917 = _72b5be213bc4 + _c4edf2454109.length;
  const _9fda3cb65b08 = _a7e7b7d6ea45.indexOf(_3e1fc1be78d7, _141ab43e5917);
  return _a7e7b7d6ea45.slice(_141ab43e5917, _9fda3cb65b08 < 0 ? _141ab43e5917 + 16 : _9fda3cb65b08).trim();
}
function _fe818c0f0ebb(value) { return _529e6cc15906(value, _301f508e15f3(["form", "hash", "="]), "&"); }
function _bdf128b12b3c(value) {
  const _9eb8abd3bb9f = _301f508e15f3(["layer", ".msg('"]);
  const _a7e7b7d6ea45 = String(value || "");
  const _c4edf2454109 = _a7e7b7d6ea45.indexOf(_9eb8abd3bb9f);
  if (_c4edf2454109 < 0) return [];
  const _141ab43e5917 = _c4edf2454109 + _9eb8abd3bb9f.length;
  const _3e1fc1be78d7 = _a7e7b7d6ea45.indexOf("')", _141ab43e5917);
  return _3e1fc1be78d7 < 0 ? [] : [_a7e7b7d6ea45.slice(_141ab43e5917, _3e1fc1be78d7)];
}
function _e56f160bcc69(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _c99c3417bcee(ok, title, body) {
  if (_3add29792db0.value) return;
  _3add29792db0.value = true;
  _9bbbdb521418("━━━━━━━━ 执行结束 ━━━━━━━━");
  _9bbbdb521418(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _ffb14492ccb1 = typeof $notification !== "undefined";
  if (_d860ef32011a.notify_enabled !== false && _ffb14492ccb1) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _7dc8505cbcfb(body || _e966f52f40bb.join("\n"), 700));
  const _883a3ae13939 = typeof $done === "function";
  if (_883a3ae13939) $done({});
}
function _166c6037661d(options, callback) {
  const _8d1b84c67cab = String(options.method || "GET").toLowerCase();
  const _9c2806ff6826 = $httpClient[_8d1b84c67cab] || $httpClient.get;
  const _b83aea399b97 = { _818806483e71: options.url, _5c2eabd1fbfd: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _b83aea399b97[_301f508e15f3(["auto", "-", "redirect"])] = true;
  _b83aea399b97[_301f508e15f3(["auto", "-", "cookie"])] = true;
  _9c2806ff6826(_b83aea399b97, (error, response, _b09f57d691f3) => callback(error, response || {}, String(_b09f57d691f3 || "")));
}
function _e4af6352623a(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _fd84d5d28456 = _301f508e15f3(["ht", "tps", "://"]);
const _0f58c2a39fa4 = [121, 99, 111, 111, 46, 110, 101, 116].map(_32b159cb169d => String.fromCharCode(_32b159cb169d)).join("");
function _4b11edf45231(path) { return _fd84d5d28456 + _0f58c2a39fa4 + String.fromCharCode(47) + String(path || ""); }
const _109b336aba9f = _301f508e15f3(["plu", "gin", ".", "php"]);
const _a24e771de0ed = _301f508e15f3(["k", "_", "mi", "sign"]);
const _eb29a299060f = _301f508e15f3(["view", "ui", "_", "lottery"]);
const _48b80eead576 = _301f508e15f3(["jn", "farm"]);

function _bbf1010a1f72() {
  try {
    const _8e04ba1d91fb = typeof $request !== "undefined" ? $request : {};
    const _5c2eabd1fbfd = _8e04ba1d91fb.headers || {};
    const _818806483e71 = String(_8e04ba1d91fb.url || "");
    const _1c05ebe2d73b = _e4af6352623a(_8f922c33cffb(_5c2eabd1fbfd, "Cookie") || _8f922c33cffb(_5c2eabd1fbfd, "cookie"));
    const _611d2fc5cc7f = _818806483e71 === "https://ycoo.net/" || _818806483e71.indexOf("https://ycoo.net/?") === 0;
    const _1418d523cc93 = _1c05ebe2d73b.split("; ").filter(Boolean);
    const _cb7172d0929c = _1418d523cc93.some(item => item.indexOf("auth=") >= 0) && _1418d523cc93.length >= 3;
    _9bbbdb521418("🧪 调试模式：开启");
    _9bbbdb521418("🍪 登录状态抓取");
    _9bbbdb521418("🌐 页面：" + _7dc8505cbcfb(_818806483e71, 180));
    _9bbbdb521418("🔑 状态字段：" + _1418d523cc93.length + "，长度：" + _1c05ebe2d73b.length);
    if (!_611d2fc5cc7f || !_cb7172d0929c) {
      _9bbbdb521418("ℹ️ 当前请求无需保存登录状态");
      return _c99c3417bcee(true, "", "");
    }
    const _08172ee91317 = _d13a67a210d6("session");
    const _64f68a9fcb16 = Number(_d13a67a210d6("notified") || 0);
    const _1185e060e240 = _bb4622907fa3("session", _1c05ebe2d73b);
    _bb4622907fa3("updated", new Date().toISOString());
    _9bbbdb521418(_08172ee91317 === _1c05ebe2d73b ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _9bbbdb521418("💾 存储键：" + store + "，写入：" + _1185e060e240 + "，回读长度：" + _d13a67a210d6("session").length);
    if (_08172ee91317 !== _1c05ebe2d73b && Date.now() - _64f68a9fcb16 > 60000) {
      _bb4622907fa3("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _1418d523cc93.length + " 项 / " + _1c05ebe2d73b.length);
    }
    _c99c3417bcee(true, "", "");
  } catch (error) {
    console.log("❌ 登录状态异常：" + error);
    $notification.post("论坛登录状态", "❌ 抓取失败", String(error));
    _c99c3417bcee(false, "登录状态失败", String(error));
  }
}
function _f29cbefc143f(callback) {
  const _1c05ebe2d73b = _d13a67a210d6("session");
  if (!_1c05ebe2d73b) return callback("missing");
  const _5c2eabd1fbfd = {};
  _5c2eabd1fbfd[_301f508e15f3(["C", "ookie"])] = _1c05ebe2d73b;
  _5c2eabd1fbfd[_301f508e15f3(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _5c2eabd1fbfd.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _166c6037661d({ _818806483e71: _4b11edf45231(""), _5c2eabd1fbfd }, (error, response, _b09f57d691f3) => {
    if (error) return callback(error);
    if (_b09f57d691f3.indexOf(_301f508e15f3(["action", "=", "logout"])) < 0) return callback("expired");
    const _32b159cb169d = _fe818c0f0ebb(_b09f57d691f3);
    if (!_32b159cb169d) return callback("token");
    callback(null, { _5c2eabd1fbfd, _32b159cb169d });
  });
}
function _0506b51c4e2f(ctx, callback) {
  const _5c2eabd1fbfd = Object.assign({}, ctx.headers);
  _5c2eabd1fbfd.Referer = _4b11edf45231(_301f508e15f3([_a24e771de0ed, "-", "sign", ".", "html"]));
  _5c2eabd1fbfd[_301f508e15f3(["X", "-", "Requested", "-", "With"])] = _301f508e15f3(["XML", "Http", "Request"]);
  _166c6037661d({ _818806483e71: _4b11edf45231(_109b336aba9f + "?id=" + _a24e771de0ed + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _5c2eabd1fbfd }, (error, response, _b09f57d691f3) => {
    _9bbbdb521418("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _1ecc77b8e8bb = _b09f57d691f3.indexOf("今日已签") >= 0;
    const _766ab21a5529 = _1ecc77b8e8bb || _b09f57d691f3.indexOf("<![CDATA[]]>") >= 0;
    _166c6037661d({ _818806483e71: _4b11edf45231(_301f508e15f3([_a24e771de0ed, "-", "sign", ".", "html"])), _5c2eabd1fbfd: ctx.headers }, (error2, response2, _611d2fc5cc7f) => {
      const _757299156ae6 = _529e6cc15906(_611d2fc5cc7f, "签到排名：", " ");
      const _c34f80f67921 = _529e6cc15906(_611d2fc5cc7f, 'id="lxtdays" value="', '"');
      const _e296867476ce = _529e6cc15906(_611d2fc5cc7f, 'id="lxlevel" value="', '"');
      const _360da5a83963 = _529e6cc15906(_611d2fc5cc7f, 'id="lxreward" value="', '"');
      _9bbbdb521418(_1ecc77b8e8bb ? "ℹ️ 今日已经签到" : _766ab21a5529 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_757299156ae6) _9bbbdb521418("🏆 当前排名：" + _757299156ae6);
      if (_c34f80f67921) _9bbbdb521418("📆 累计天数：" + _c34f80f67921);
      if (_e296867476ce) _9bbbdb521418("🏅 签到等级：LV." + _e296867476ce);
      if (_360da5a83963) _9bbbdb521418("💰 最近奖励：" + _360da5a83963);
      callback([_1ecc77b8e8bb ? "ℹ️ 今日已签到" : _766ab21a5529 ? "✅ 签到成功" : "⚠️ 签到异常", _757299156ae6 ? "🏆 排名 " + _757299156ae6 : "", _c34f80f67921 ? "📆 累计 " + _c34f80f67921 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _f5c8da494be8(ctx, callback) {
  const _5c2eabd1fbfd = Object.assign({}, ctx.headers);
  _5c2eabd1fbfd.Referer = _4b11edf45231(_109b336aba9f + "?id=" + _eb29a299060f);
  _5c2eabd1fbfd[_301f508e15f3(["X", "-", "Requested", "-", "With"])] = _301f508e15f3(["XML", "Http", "Request"]);
  _5c2eabd1fbfd.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _ab5e73bf98a7 = _4b11edf45231(_109b336aba9f + "?id=" + _eb29a299060f + ":draw");
  const _e94a345edf64 = ["🎰 幸运抽奖"];
  const _fb3d671c5d2a = guard => {
    if (guard <= 0) { _e94a345edf64.forEach(_9bbbdb521418); return callback(_e94a345edf64.join("\n")); }
    _166c6037661d({ _818806483e71: _ab5e73bf98a7 + "?drawnumber=1&inajax=1", _5c2eabd1fbfd }, (error, response, _b09f57d691f3) => {
      let _b96212b81c9b = {};
      try { _b96212b81c9b = JSON.parse(_b09f57d691f3); } catch (ignored) {}
      const _194c036795d1 = String((_b96212b81c9b.data || {})["2"] || "");
      if (error || _b96212b81c9b.result !== "succeed" || _194c036795d1.indexOf("抽奖券") < 0) {
        _e94a345edf64.push("ℹ️ " + (error || _b96212b81c9b.msg || "没有可用抽奖券"));
        _e94a345edf64.forEach(_9bbbdb521418);
        return callback(_e94a345edf64.join("\n"));
      }
      _166c6037661d({ _818806483e71: _ab5e73bf98a7 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _5c2eabd1fbfd }, (error2, response2, raw) => {
        let _1d7e0329c2e0 = {};
        try { _1d7e0329c2e0 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _1d7e0329c2e0.result !== "succeed") {
          _e94a345edf64.push("⚠️ " + (error2 || _1d7e0329c2e0.msg || "抽奖失败"));
          _e94a345edf64.forEach(_9bbbdb521418);
          return callback(_e94a345edf64.join("\n"));
        }
        const _82ecb0b2d4dd = (((_1d7e0329c2e0.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _72b5be213bc4 = String((_1d7e0329c2e0.data || {}).ticketnumber || "0");
        const _af34b60179fd = String((_1d7e0329c2e0.data || {}).creditnumber || "");
        _e94a345edf64.push("🎁 第 " + _e94a345edf64.length + " 次：" + (_82ecb0b2d4dd.join("、") || _1d7e0329c2e0.msg || "成功"));
        _e94a345edf64.push("🎟️ 剩余抽奖券：" + _72b5be213bc4 + (_af34b60179fd ? "  💰 星币：" + _af34b60179fd : ""));
        if (_72b5be213bc4 === "0") { _e94a345edf64.forEach(_9bbbdb521418); return callback(_e94a345edf64.join("\n")); }
        _fb3d671c5d2a(guard - 1);
      });
    });
  };
  _fb3d671c5d2a(10);
}
function _f2832b7cec9f(ctx, callback) {
  const _5c2eabd1fbfd = Object.assign({}, ctx.headers);
  _5c2eabd1fbfd.Referer = _4b11edf45231(_109b336aba9f + "?id=" + _48b80eead576);
  _5c2eabd1fbfd[_301f508e15f3(["X", "-", "Requested", "-", "With"])] = _301f508e15f3(["XML", "Http", "Request"]);
  const _9bb7721fcc98 = ["🌾 农场与福利"];
  const _50feede454eb = query => _4b11edf45231(_109b336aba9f + "?id=" + _48b80eead576 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _37c6d48867dc = [
    ["每日免费领取", _301f508e15f3(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _301f508e15f3(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _e6cab4aaaee3 = 1; _e6cab4aaaee3 <= 8; _e6cab4aaaee3 += 1) _37c6d48867dc.push(["地块 " + _e6cab4aaaee3, _301f508e15f3(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _e6cab4aaaee3]);
  const _45b69e4659c6 = _e6cab4aaaee3 => {
    if (_e6cab4aaaee3 >= _37c6d48867dc.length) { _9bb7721fcc98.forEach(_9bbbdb521418); return callback(_9bb7721fcc98.join("\n")); }
    const _11b4c7a77878 = _37c6d48867dc[_e6cab4aaaee3];
    _166c6037661d({ _818806483e71: _50feede454eb(_11b4c7a77878[1]), _5c2eabd1fbfd }, (error, response, _b09f57d691f3) => {
      const _7ea0f63bca03 = _bdf128b12b3c(_b09f57d691f3)[0] || _7dc8505cbcfb(_30b18eb2a5ba(_b09f57d691f3), 80);
      const _057183689905 = _e56f160bcc69(_7ea0f63bca03, ["成功", "完成", "可领取"]) ? "✅" : _e56f160bcc69(_7ea0f63bca03, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _9bb7721fcc98.push(_057183689905 + " " + _11b4c7a77878[0] + "：" + (error || _7ea0f63bca03 || "无返回"));
      const _0eab5d259815 = _529e6cc15906(_11b4c7a77878[1], "jfid=", "&");
      if (_0eab5d259815 && _e56f160bcc69(_b09f57d691f3, ["已枯萎", "清除"])) {
        return _166c6037661d({ _818806483e71: _50feede454eb(_301f508e15f3(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _0eab5d259815), _5c2eabd1fbfd }, (error2, response2, cleared) => {
          _9bb7721fcc98.push((_e56f160bcc69(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _0eab5d259815);
          _166c6037661d({ _818806483e71: _50feede454eb(_301f508e15f3(["do=", "plant", "seed", "&seed=1&jfid="]) + _0eab5d259815 + "&timestamp=" + Math.floor(Date.now() / 1000)), _5c2eabd1fbfd }, (error3, response3, planted) => {
            _9bb7721fcc98.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _0eab5d259815 + "：" + (_bdf128b12b3c(planted)[0] || "无返回"));
            _45b69e4659c6(_e6cab4aaaee3 + 1);
          });
        });
      }
      _45b69e4659c6(_e6cab4aaaee3 + 1);
    });
  };
  _166c6037661d({ _818806483e71: _50feede454eb(_301f508e15f3(["do=", "normal", "&ac=", "kuo", "zhan"])), _5c2eabd1fbfd }, (error, response, _b09f57d691f3) => {
    _9bb7721fcc98.push((_e56f160bcc69(_bdf128b12b3c(_b09f57d691f3)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _bdf128b12b3c(_b09f57d691f3)[0] || "无返回"));
    _45b69e4659c6(0);
  });
}
function _901f0b633e0e() {
  _9bbbdb521418("🚀 论坛任务开始");
  _9bbbdb521418("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _f29cbefc143f((error, ctx) => {
    if (error === "missing") return _c99c3417bcee(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _c99c3417bcee(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _c99c3417bcee(false, "论坛任务失败", String(error));
    _9bbbdb521418("🔐 登录状态有效");
    _0506b51c4e2f(ctx, one => _f5c8da494be8(ctx, two => _f2832b7cec9f(ctx, three => _c99c3417bcee(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _d54252ce3bb4 = typeof $request !== "undefined";
if (_d54252ce3bb4) _bbf1010a1f72();
else _901f0b633e0e();

})();
