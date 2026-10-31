/*f2b64531ae08*/
(function(){
const _e9a76ffe2940 = typeof $argument === "object" && $argument ? $argument : {};
const _80d9bcf7ad27 = $persistentStore;
const _29b0ba1c5d31 = "f3k9m2_store";
const _dbe577e1b6c2 = true;
const _0b8f301615d2 = { value: false };
const _6e73dadbd38e = [];
const _26759bcd3aa1 = values => values.join("");

function _5c9352bdeb21() {
  try { return JSON.parse(_80d9bcf7ad27.read(_29b0ba1c5d31) || "{}") || {}; }
  catch (error) { return {}; }
}
function _e35014484e4c(_9ecc969bbadf) { return _80d9bcf7ad27.write(JSON.stringify(_9ecc969bbadf), _29b0ba1c5d31); }
function _0f155879eee2(name) { return String(_5c9352bdeb21()[name] || ""); }
function _834742b3938a(name, value) {
  const _9ecc969bbadf = _5c9352bdeb21();
  if (value == null) delete _9ecc969bbadf[name];
  else _9ecc969bbadf[name] = String(value);
  return _e35014484e4c(_9ecc969bbadf);
}
function _9bf60f8288a7(_311d865f0ff0, name) {
  const _f4da438a1cbf = Object.keys(_311d865f0ff0 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _f4da438a1cbf ? String(_311d865f0ff0[_f4da438a1cbf] || "") : "";
}
function _afb7046a9caf(_cc4c78064593) {
  const _487fa33e5861 = String(_cc4c78064593);
  _6e73dadbd38e.push(_487fa33e5861);
  if (_dbe577e1b6c2) console.log(_487fa33e5861);
}
function _60eea652b7c0(value, size) {
  const _487fa33e5861 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _487fa33e5861.length > size ? _487fa33e5861.slice(0, size) + "..." : _487fa33e5861;
}
function _8478ea1e0405(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _2b017478da36(value, _b6d364cb721c, _037eaa0352a0) {
  const _487fa33e5861 = String(value || "");
  const _8ec5c57719e9 = _487fa33e5861.indexOf(_b6d364cb721c);
  if (_8ec5c57719e9 < 0) return "";
  const _b556a2cd3d8d = _8ec5c57719e9 + _b6d364cb721c.length;
  const _2d4d7c9e8126 = _487fa33e5861.indexOf(_037eaa0352a0, _b556a2cd3d8d);
  return _487fa33e5861.slice(_b556a2cd3d8d, _2d4d7c9e8126 < 0 ? _b556a2cd3d8d + 16 : _2d4d7c9e8126).trim();
}
function _c85843c48fb5(value) { return _2b017478da36(value, "formhash=", "&").replace(/[^0-9a-fA-F]/g, "").slice(0, 8); }
function _c92bfc62a3a1(value) {
  const _c73d506292db = _26759bcd3aa1(["layer", ".msg('"]);
  const _487fa33e5861 = String(value || "");
  const _b6d364cb721c = _487fa33e5861.indexOf(_c73d506292db);
  if (_b6d364cb721c < 0) return [];
  const _b556a2cd3d8d = _b6d364cb721c + _c73d506292db.length;
  const _037eaa0352a0 = _487fa33e5861.indexOf("')", _b556a2cd3d8d);
  return _037eaa0352a0 < 0 ? [] : [_487fa33e5861.slice(_b556a2cd3d8d, _037eaa0352a0)];
}
function _e5de8f17bdb0(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _2c05c18fd637(ok, title, body) {
  if (_0b8f301615d2.value) return;
  _0b8f301615d2.value = true;
  _afb7046a9caf("━━━━━━━━ 执行结束 ━━━━━━━━");
  _afb7046a9caf(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _9a6c946d8f81 = typeof $notification !== "undefined";
  if (_e9a76ffe2940.notify_enabled !== false && _9a6c946d8f81) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _60eea652b7c0(body || _6e73dadbd38e.join("\n"), 700));
  const _5cf827ed1b20 = typeof $done === "function";
  if (_5cf827ed1b20) $done({});
}
function _2431a4fdc2f3(options, callback, attempt) {
  const _6c401090c420 = String(options.method || "GET").toLowerCase();
  const _e8744e787370 = $httpClient[_6c401090c420] || $httpClient.get;
  const _aec06ed2e94a = {};
  _aec06ed2e94a["url"] = String(options.url || "");
  _aec06ed2e94a["headers"] = options.headers || {};
  _aec06ed2e94a["body"] = options.body || "";
  _aec06ed2e94a["timeout"] = options.timeout || 20000;
  _aec06ed2e94a["auto-redirect"] = true;
  _aec06ed2e94a["auto-cookie"] = true;
  _aec06ed2e94a["alpn"] = "h2";
  _afb7046a9caf("🌐 请求：" + _aec06ed2e94a["url"]);
  _e8744e787370(_aec06ed2e94a, (error, response, _9ecc969bbadf) => {
    const _487fa33e5861 = String(error || "");
    if (_487fa33e5861 && (attempt || 0) < 2 && (_487fa33e5861.indexOf("timeout") >= 0 || _487fa33e5861.indexOf("ETIMEDOUT") >= 0 || _487fa33e5861.indexOf("closed") >= 0 || _487fa33e5861.indexOf("timed out") >= 0)) {
      _afb7046a9caf("🔁 连接中断，正在重试");
      return _2431a4fdc2f3(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_9ecc969bbadf || ""));
  });
}
function _c9943ea8717a(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _2333a30cc21d = _26759bcd3aa1(["ht", "tps", "://"]);
const _335ea5bcb38b = [121, 99, 111, 111, 46, 110, 101, 116].map(_5913a569b003 => String.fromCharCode(_5913a569b003)).join("");
function _f39dda2ff32f(path) { return _2333a30cc21d + _335ea5bcb38b + String.fromCharCode(47) + String(path || ""); }
const _4d06b3e4aada = _26759bcd3aa1(["plu", "gin", ".", "php"]);
const _1db460699131 = _26759bcd3aa1(["k", "_", "mi", "sign"]);
const _994cbdc43b14 = _26759bcd3aa1(["view", "ui", "_", "lottery"]);
const _521d2ae2dc6a = _26759bcd3aa1(["jn", "farm"]);

function _d84755e46aba(_311d865f0ff0, name) {
  const _e64a0c1b3d32 = _9bf60f8288a7(_311d865f0ff0, name);
  return Array.isArray(_e64a0c1b3d32) ? _e64a0c1b3d32.join(",") : String(_e64a0c1b3d32 || "");
}
function _83e36c69f928(value) {
  const _487fa33e5861 = String(value || "");
  const _ed4019bad9e5 = (_487fa33e5861.match(/;/g) || []).length;
  const _6420a56cf1d6 = (_487fa33e5861.match(/,/g) || []).length;
  const _cd293517579f = _6420a56cf1d6 > _ed4019bad9e5 ? "," : ";";
  return _487fa33e5861.split(_cd293517579f).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _a92d84cc942f(_e1132ee44a90, extra) {
  const _bcb163ed7864 = {};
  _83e36c69f928(_e1132ee44a90).concat(_83e36c69f928(extra)).forEach(item => {
    const _25aa00cbc4c5 = item.indexOf("=");
    _bcb163ed7864[item.slice(0, _25aa00cbc4c5)] = item.slice(_25aa00cbc4c5 + 1);
  });
  return Object.keys(_bcb163ed7864).map(_f4da438a1cbf => _f4da438a1cbf + "=" + _bcb163ed7864[_f4da438a1cbf]).join("; ");
}
function _623825657f88() {
  try {
    const _78e1ef401663 = typeof $request !== "undefined" ? $request : {};
    const _090c2638b117 = typeof $response !== "undefined" ? $response : {};
    const _cccd5e3eea92 = String(_78e1ef401663.url || "");
    const _ae30bc1f6baa = _d84755e46aba(_78e1ef401663.headers, "Cookie");
    const _c64b3bf6c493 = _d84755e46aba(_090c2638b117.headers, "Set-Cookie");
    const _a85f79dbb289 = _a92d84cc942f(_ae30bc1f6baa, "");
    const _b95c65d2493d = _a85f79dbb289.split("; ").filter(Boolean);
    const _57be181492e3 = Object.keys(_78e1ef401663.headers || {}).concat(Object.keys(_090c2638b117.headers || {}));
    const _c6c1d46fae82 = _b95c65d2493d.some(item => item.indexOf("auth=") >= 0);
    _afb7046a9caf("🧪 调试模式：开启");
    _afb7046a9caf("🍪 登录状态抓取");
    _afb7046a9caf("🌐 页面：" + _60eea652b7c0(_cccd5e3eea92, 180));
    _afb7046a9caf("📋 头名称：" + _57be181492e3.map(item => item.toLowerCase()).join(","));
    _afb7046a9caf("🔑 请求长度：" + _ae30bc1f6baa.length + "，字段：" + _b95c65d2493d.length);
    _afb7046a9caf("🏷️ 字段名：" + _b95c65d2493d.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_c6c1d46fae82) {
      _afb7046a9caf("ℹ️ 当前响应没有完整登录状态");
      return _2c05c18fd637(true, "", "");
    }
    const _593549394e26 = _0f155879eee2("session");
    const _dbed4bef3c34 = Number(_0f155879eee2("notified") || 0);
    const _8651b331c884 = _834742b3938a("session", _a85f79dbb289);
    _834742b3938a("updated", new Date().toISOString());
    _afb7046a9caf(_593549394e26 === _a85f79dbb289 ? "✅ 登录状态未变化" : "✅ 登录 Cookie 已保存");
    _afb7046a9caf("💾 存储键：" + _29b0ba1c5d31 + "，写入：" + _8651b331c884 + "，回读长度：" + _0f155879eee2("session").length);
    if (_593549394e26 !== _a85f79dbb289 && Date.now() - _dbed4bef3c34 > 60000) {
      _834742b3938a("notified", Date.now());
      $notification.post("登录 Cookie", "✅ 已保存", _b95c65d2493d.length + " 项 / " + _a85f79dbb289.length);
    }
    _0b8f301615d2.value = true;
    if (typeof $done === "function") $done({});
  } catch (error) {
    _afb7046a9caf("❌ 登录状态异常：" + error);
    _2c05c18fd637(false, "登录状态失败", String(error));
  }
}
function _241affea0acf(callback) {
  const _a85f79dbb289 = _0f155879eee2("session");
  if (!_a85f79dbb289) return callback("missing");
  const _311d865f0ff0 = {};
  _311d865f0ff0[_26759bcd3aa1(["C", "ookie"])] = _a85f79dbb289;
  _311d865f0ff0[_26759bcd3aa1(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _311d865f0ff0.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _2431a4fdc2f3({ url: _f39dda2ff32f("forum.php"), _311d865f0ff0 }, (error, response, _9ecc969bbadf) => {
    if (error) return callback(error);
    if (_9ecc969bbadf.indexOf(_26759bcd3aa1(["action", "=", "logout"])) < 0) return callback("expired");
    const _5913a569b003 = _c85843c48fb5(_9ecc969bbadf);
    if (!_5913a569b003) return callback("token");
    callback(null, { _311d865f0ff0, _5913a569b003 });
  });
}
function _bfe47c6e3539(ctx, callback) {
  const _311d865f0ff0 = Object.assign({}, ctx.headers);
  _311d865f0ff0.Referer = _f39dda2ff32f(_26759bcd3aa1([_1db460699131, "-", "sign", ".", "html"]));
  _311d865f0ff0[_26759bcd3aa1(["X", "-", "Requested", "-", "With"])] = _26759bcd3aa1(["XML", "Http", "Request"]);
  _2431a4fdc2f3({ url: _f39dda2ff32f(_4d06b3e4aada + "?id=" + _1db460699131 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _311d865f0ff0 }, (error, response, _9ecc969bbadf) => {
    _afb7046a9caf("📅 每日签到请求");
    if (error) return callback("❌ 请求失败：" + error);
    const _ad62727f8c80 = _9ecc969bbadf.indexOf("今日已签") >= 0;
    const _f4e0fd229dcf = _ad62727f8c80 || _9ecc969bbadf.indexOf("<![CDATA[]]>") >= 0;
    _2431a4fdc2f3({ url: _f39dda2ff32f(_26759bcd3aa1([_1db460699131, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _05c27a5fd880 = _2b017478da36(page, "签到排名：", " ");
      const _12ed47dfec49 = _2b017478da36(page, 'id="lxtdays" value="', '"');
      const _593619f54a1d = _2b017478da36(page, 'id="lxlevel" value="', '"');
      const _ee57c364046a = _2b017478da36(page, 'id="lxreward" value="', '"');
      _afb7046a9caf(_ad62727f8c80 ? "ℹ️ 今日已经签到" : _f4e0fd229dcf ? "✅ 签到接口返回成功" : "⚠️ 签到接口返回异常");
      if (_05c27a5fd880) _afb7046a9caf("🏆 当前排名：" + _05c27a5fd880);
      if (_12ed47dfec49) _afb7046a9caf("📆 累计天数：" + _12ed47dfec49);
      if (_593619f54a1d) _afb7046a9caf("🏅 签到等级：LV." + _593619f54a1d);
      if (_ee57c364046a) _afb7046a9caf("💰 最近奖励：" + _ee57c364046a);
      callback([_ad62727f8c80 ? "ℹ️ 今日已签到" : _f4e0fd229dcf ? "✅ 签到接口成功" : "⚠️ 签到接口异常", _05c27a5fd880 ? "🏆 排名 " + rank : "", _12ed47dfec49 ? "📆 累计 " + _12ed47dfec49 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _df4392dad141(ctx, callback) {
  const _311d865f0ff0 = Object.assign({}, ctx.headers);
  _311d865f0ff0.Referer = _f39dda2ff32f(_4d06b3e4aada + "?id=" + _994cbdc43b14);
  _311d865f0ff0[_26759bcd3aa1(["X", "-", "Requested", "-", "With"])] = _26759bcd3aa1(["XML", "Http", "Request"]);
  _311d865f0ff0.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _e1132ee44a90 = _f39dda2ff32f(_4d06b3e4aada + "?id=" + _994cbdc43b14 + ":draw");
  const _c1ff69d9bd98 = ["🎰 幸运抽奖"];
  const _81cd1516de8a = guard => {
    if (guard <= 0) { _c1ff69d9bd98.forEach(_afb7046a9caf); return callback(_c1ff69d9bd98.join("\n")); }
    _2431a4fdc2f3({ url: _e1132ee44a90 + "?drawnumber=1&inajax=1", _311d865f0ff0 }, (error, response, _9ecc969bbadf) => {
      let _899354d9db1e = {};
      try { _899354d9db1e = JSON.parse(_9ecc969bbadf); } catch (ignored) {}
      const _70f291ea18c9 = String((_899354d9db1e.data || {})["2"] || "");
      if (error || _899354d9db1e.result !== "succeed" || _70f291ea18c9.indexOf("抽奖券") < 0) {
        _c1ff69d9bd98.push("ℹ️ " + (error || _899354d9db1e.msg || "没有可用抽奖券"));
        _c1ff69d9bd98.forEach(_afb7046a9caf);
        return callback(_c1ff69d9bd98.join("\n"));
      }
      _2431a4fdc2f3({ url: _e1132ee44a90 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _311d865f0ff0 }, (error2, response2, raw) => {
        let _196bea279f33 = {};
        try { _196bea279f33 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _196bea279f33.result !== "succeed") {
          _c1ff69d9bd98.push("⚠️ " + (error2 || _196bea279f33.msg || "抽奖失败"));
          _c1ff69d9bd98.forEach(_afb7046a9caf);
          return callback(_c1ff69d9bd98.join("\n"));
        }
        const _eb0a26fa52ff = (((_196bea279f33.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _8ec5c57719e9 = String((_196bea279f33.data || {}).ticketnumber || "0");
        const _bc6a26be44ed = String((_196bea279f33.data || {}).creditnumber || "");
        _c1ff69d9bd98.push("🎁 第 " + _c1ff69d9bd98.length + " 次：" + (_eb0a26fa52ff.join("、") || _196bea279f33.msg || "成功"));
        _c1ff69d9bd98.push("🎟️ 剩余抽奖券：" + _8ec5c57719e9 + (_bc6a26be44ed ? "  💰 星币：" + credit : ""));
        if (_8ec5c57719e9 === "0") { _c1ff69d9bd98.forEach(_afb7046a9caf); return callback(_c1ff69d9bd98.join("\n")); }
        _81cd1516de8a(guard - 1);
      });
    });
  };
  _81cd1516de8a(10);
}
function _4a56fd5b9f78(ctx, callback) {
  const _311d865f0ff0 = Object.assign({}, ctx.headers);
  _311d865f0ff0.Referer = _f39dda2ff32f(_4d06b3e4aada + "?id=" + _521d2ae2dc6a);
  _311d865f0ff0[_26759bcd3aa1(["X", "-", "Requested", "-", "With"])] = _26759bcd3aa1(["XML", "Http", "Request"]);
  const _750ea1ffaa1a = ["🌾 农场与福利"];
  const _9b949e974927 = query => _f39dda2ff32f(_4d06b3e4aada + "?id=" + _521d2ae2dc6a + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _54672d5789bf = [
    ["每日免费领取", _26759bcd3aa1(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _26759bcd3aa1(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _4cd7f45beeaf = 1; _4cd7f45beeaf <= 8; _4cd7f45beeaf += 1) _54672d5789bf.push(["地块 " + _4cd7f45beeaf, _26759bcd3aa1(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _4cd7f45beeaf]);
  const _307e5c7314e1 = _4cd7f45beeaf => {
    if (_4cd7f45beeaf >= _54672d5789bf.length) { _750ea1ffaa1a.forEach(_afb7046a9caf); return callback(_750ea1ffaa1a.join("\n")); }
    const _f683d9e89c94 = _54672d5789bf[_4cd7f45beeaf];
    _2431a4fdc2f3({ url: _9b949e974927(_f683d9e89c94[1]), _311d865f0ff0 }, (error, response, _9ecc969bbadf) => {
      const _cc4c78064593 = _c92bfc62a3a1(_9ecc969bbadf)[0] || _60eea652b7c0(_8478ea1e0405(_9ecc969bbadf), 80);
      const _3f659d367e1f = _e5de8f17bdb0(_cc4c78064593, ["成功", "完成", "可领取"]) ? "✅" : _e5de8f17bdb0(_cc4c78064593, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _750ea1ffaa1a.push(_3f659d367e1f + " " + _f683d9e89c94[0] + "：" + (error || _cc4c78064593 || "无返回"));
      const _2dfc5d425f57 = _2b017478da36(_f683d9e89c94[1], "jfid=", "&");
      if (_2dfc5d425f57 && _e5de8f17bdb0(_9ecc969bbadf, ["已枯萎", "清除"])) {
        return _2431a4fdc2f3({ url: _9b949e974927(_26759bcd3aa1(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _2dfc5d425f57), _311d865f0ff0 }, (error2, response2, cleared) => {
          _750ea1ffaa1a.push((_e5de8f17bdb0(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _2dfc5d425f57);
          _2431a4fdc2f3({ url: _9b949e974927(_26759bcd3aa1(["do=", "plant", "seed", "&seed=1&jfid="]) + _2dfc5d425f57 + "&timestamp=" + Math.floor(Date.now() / 1000)), _311d865f0ff0 }, (error3, response3, planted) => {
            _750ea1ffaa1a.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _2dfc5d425f57 + "：" + (_c92bfc62a3a1(planted)[0] || "无返回"));
            _307e5c7314e1(_4cd7f45beeaf + 1);
          });
        });
      }
      _307e5c7314e1(_4cd7f45beeaf + 1);
    });
  };
  _2431a4fdc2f3({ url: _9b949e974927(_26759bcd3aa1(["do=", "normal", "&ac=", "kuo", "zhan"])), _311d865f0ff0 }, (error, response, _9ecc969bbadf) => {
    _750ea1ffaa1a.push((_e5de8f17bdb0(_c92bfc62a3a1(_9ecc969bbadf)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _c92bfc62a3a1(_9ecc969bbadf)[0] || "无返回"));
    _307e5c7314e1(0);
  });
}
function _693234eecc91() {
  _afb7046a9caf("🧪 调试模式：开启");
  _afb7046a9caf("🚀 论坛任务开始");
  _afb7046a9caf("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _afb7046a9caf("💾 存储键：" + _29b0ba1c5d31 + "，登录状态长度：" + _0f155879eee2("session").length);
  _241affea0acf((error, ctx) => {
    if (error === "missing") return _2c05c18fd637(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _2c05c18fd637(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _2c05c18fd637(false, "论坛任务失败", String(error));
    _afb7046a9caf("🔐 登录状态有效");
    _bfe47c6e3539(ctx, one => _df4392dad141(ctx, two => _4a56fd5b9f78(ctx, three => _2c05c18fd637(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_afb7046a9caf("🧪 调试模式：开启");
_afb7046a9caf("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录 Cookie 抓取" : "论坛任务"));
const _3764a1cce326 = typeof $request !== "undefined";
if (_3764a1cce326) _623825657f88();
else _693234eecc91();

})();
