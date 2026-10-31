/*c9211aed8bc9*/
(function(){
const _79523438be20 = typeof $argument === "object" && $argument ? $argument : {};
const _1b8b07e36b8e = $persistentStore;
const _c18845b32f20 = String(_79523438be20.store || "f3k9m2_store");
const _d7be67fbd813 = true;
const _f5cc62e048cb = { value: false };
const _5c783018f0ca = [];
const _6ada9e0f1a0e = values => values.join("");

function _2370a44e1e47() {
  try { return JSON.parse(_1b8b07e36b8e.read(_c18845b32f20) || "{}") || {}; }
  catch (error) { return {}; }
}
function _c192b1420893(_252ddd47a02f) { return _1b8b07e36b8e.write(JSON.stringify(_252ddd47a02f), _c18845b32f20); }
function _e196f99e8552(name) { return String(_2370a44e1e47()[name] || ""); }
function _0afa4d37c811(name, value) {
  const _252ddd47a02f = _2370a44e1e47();
  if (value == null) delete _252ddd47a02f[name];
  else _252ddd47a02f[name] = String(value);
  return _c192b1420893(_252ddd47a02f);
}
function _8ed0ba637776(_824566874609, name) {
  const _72be38fc6005 = Object.keys(_824566874609 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _72be38fc6005 ? String(_824566874609[_72be38fc6005] || "") : "";
}
function _f46fb44f23d7(_27843c7be49f) {
  const _ca833882722f = String(_27843c7be49f);
  _5c783018f0ca.push(_ca833882722f);
  if (_d7be67fbd813) console.log(_ca833882722f);
}
function _e58f0ae72c1e(value, size) {
  const _ca833882722f = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _ca833882722f.length > size ? _ca833882722f.slice(0, size) + "..." : _ca833882722f;
}
function _19f46a947d97(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _69dcdc138aaf(value, _82415946574d, _507508a3e378) {
  const _ca833882722f = String(value || "");
  const _45d6be88f00a = _ca833882722f.indexOf(_82415946574d);
  if (_45d6be88f00a < 0) return "";
  const _0e86b3fd8501 = _45d6be88f00a + _82415946574d.length;
  const _695e28e9bb55 = _ca833882722f.indexOf(_507508a3e378, _0e86b3fd8501);
  return _ca833882722f.slice(_0e86b3fd8501, _695e28e9bb55 < 0 ? _0e86b3fd8501 + 16 : _695e28e9bb55).trim();
}
function _f613f51482d0(value) { return _69dcdc138aaf(value, "formhash=", "&").replace(/[^0-9a-fA-F]/g, "").slice(0, 8); }
function _c68471740b8e(value) {
  const _595ee358e0f3 = _6ada9e0f1a0e(["layer", ".msg('"]);
  const _ca833882722f = String(value || "");
  const _82415946574d = _ca833882722f.indexOf(_595ee358e0f3);
  if (_82415946574d < 0) return [];
  const _0e86b3fd8501 = _82415946574d + _595ee358e0f3.length;
  const _507508a3e378 = _ca833882722f.indexOf("')", _0e86b3fd8501);
  return _507508a3e378 < 0 ? [] : [_ca833882722f.slice(_0e86b3fd8501, _507508a3e378)];
}
function _8ca6fa5c2088(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _5ab0cb0087ae(ok, title, body) {
  if (_f5cc62e048cb.value) return;
  _f5cc62e048cb.value = true;
  _f46fb44f23d7("━━━━━━━━ 执行结束 ━━━━━━━━");
  _f46fb44f23d7(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _58254809f6c6 = typeof $notification !== "undefined";
  if (_79523438be20.notify_enabled !== false && _58254809f6c6) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _e58f0ae72c1e(body || _5c783018f0ca.join("\n"), 700));
  const _6dc185dd54a5 = typeof $done === "function";
  if (_6dc185dd54a5) $done({});
}
function _e10bac20fd7a(options, callback, attempt) {
  const _1b5bdeef3825 = String(options.method || "GET").toLowerCase();
  const _458866787fa9 = $httpClient[_1b5bdeef3825] || $httpClient.get;
  const _b79fe36fe765 = {};
  _b79fe36fe765["url"] = String(options.url || "");
  _b79fe36fe765["headers"] = options.headers || {};
  _b79fe36fe765["body"] = options.body || "";
  _b79fe36fe765["timeout"] = options.timeout || 20000;
  _b79fe36fe765["auto-redirect"] = true;
  _b79fe36fe765["auto-cookie"] = true;
  _b79fe36fe765["alpn"] = "h2";
  _f46fb44f23d7("🌐 请求：" + _b79fe36fe765["url"]);
  _458866787fa9(_b79fe36fe765, (error, response, _252ddd47a02f) => {
    const _ca833882722f = String(error || "");
    if (_ca833882722f && (attempt || 0) < 2 && (_ca833882722f.indexOf("timeout") >= 0 || _ca833882722f.indexOf("ETIMEDOUT") >= 0 || _ca833882722f.indexOf("closed") >= 0 || _ca833882722f.indexOf("timed out") >= 0)) {
      _f46fb44f23d7("🔁 连接中断，正在重试");
      return _e10bac20fd7a(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_252ddd47a02f || ""));
  });
}
function _1c0fe3876c9b(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _f69459123aaf = _6ada9e0f1a0e(["ht", "tps", "://"]);
const _36ed386826dc = [121, 99, 111, 111, 46, 110, 101, 116].map(_cceb26fae801 => String.fromCharCode(_cceb26fae801)).join("");
function _22c273b0d4f7(path) { return _f69459123aaf + _36ed386826dc + String.fromCharCode(47) + String(path || ""); }
const _71b8b5a6b743 = _6ada9e0f1a0e(["plu", "gin", ".", "php"]);
const _d979f0dfa460 = _6ada9e0f1a0e(["k", "_", "mi", "sign"]);
const _42319870fd18 = _6ada9e0f1a0e(["view", "ui", "_", "lottery"]);
const _335ece320257 = _6ada9e0f1a0e(["jn", "farm"]);

function _4cbccd8f8aa3(_824566874609, name) {
  const _7edce0080db8 = _8ed0ba637776(_824566874609, name);
  return Array.isArray(_7edce0080db8) ? _7edce0080db8.join(",") : String(_7edce0080db8 || "");
}
function _1c9b7f1c2ca8(value) {
  const _ca833882722f = String(value || "");
  const _136b4be44b2c = (_ca833882722f.match(/;/g) || []).length;
  const _5e326e3d0b7b = (_ca833882722f.match(/,/g) || []).length;
  const _f68debe52cbe = _5e326e3d0b7b > _136b4be44b2c ? "," : ";";
  return _ca833882722f.split(_f68debe52cbe).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _835ee894a578(_0e3d293f0c52, extra) {
  const _d57dcad34b4b = {};
  _1c9b7f1c2ca8(_0e3d293f0c52).concat(_1c9b7f1c2ca8(extra)).forEach(item => {
    const _a1a569e9e967 = item.indexOf("=");
    _d57dcad34b4b[item.slice(0, _a1a569e9e967)] = item.slice(_a1a569e9e967 + 1);
  });
  return Object.keys(_d57dcad34b4b).map(_72be38fc6005 => _72be38fc6005 + "=" + _d57dcad34b4b[_72be38fc6005]).join("; ");
}
function _1291fab8bb8d() {
  try {
    const _6795830c3c33 = typeof $request !== "undefined" ? $request : {};
    const _ed5129e52f4c = typeof $response !== "undefined" ? $response : {};
    const _82e8effceab4 = String(_6795830c3c33.url || "");
    const _416592447941 = _4cbccd8f8aa3(_6795830c3c33.headers, "Cookie");
    const _138a614ae906 = _4cbccd8f8aa3(_ed5129e52f4c.headers, "Set-Cookie");
    const _4ec10b84466a = _835ee894a578(_416592447941, "");
    const _29724eb906df = _4ec10b84466a.split("; ").filter(Boolean);
    const _51684a29916e = Object.keys(_6795830c3c33.headers || {}).concat(Object.keys(_ed5129e52f4c.headers || {}));
    const _47b62788b0a0 = _29724eb906df.some(item => item.indexOf("auth=") >= 0);
    _f46fb44f23d7("🧪 调试模式：开启");
    _f46fb44f23d7("🍪 登录状态抓取");
    _f46fb44f23d7("🌐 页面：" + _e58f0ae72c1e(_82e8effceab4, 180));
    _f46fb44f23d7("📋 头名称：" + _51684a29916e.map(item => item.toLowerCase()).join(","));
    _f46fb44f23d7("🔑 请求长度：" + _416592447941.length + "，字段：" + _29724eb906df.length);
    _f46fb44f23d7("🏷️ 字段名：" + _29724eb906df.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_47b62788b0a0) {
      _f46fb44f23d7("ℹ️ 当前响应没有完整登录状态");
      return _5ab0cb0087ae(true, "", "");
    }
    const _3160b93d6294 = _e196f99e8552("session");
    const _4597e1631827 = Number(_e196f99e8552("notified") || 0);
    const _a5999916ec6c = _0afa4d37c811("session", _4ec10b84466a);
    _0afa4d37c811("updated", new Date().toISOString());
    _f46fb44f23d7(_3160b93d6294 === _4ec10b84466a ? "✅ 登录状态未变化" : "✅ 登录 Cookie 已保存");
    _f46fb44f23d7("💾 存储键：" + _c18845b32f20 + "，写入：" + _a5999916ec6c + "，回读长度：" + _e196f99e8552("session").length);
    if (_3160b93d6294 !== _4ec10b84466a && Date.now() - _4597e1631827 > 60000) {
      _0afa4d37c811("notified", Date.now());
      $notification.post("登录 Cookie", "✅ 已保存", _29724eb906df.length + " 项 / " + _4ec10b84466a.length);
    }
    _f5cc62e048cb.value = true;
    if (typeof $done === "function") $done({});
  } catch (error) {
    _f46fb44f23d7("❌ 登录状态异常：" + error);
    _5ab0cb0087ae(false, "登录状态失败", String(error));
  }
}
function _11954cd36f9d(callback) {
  const _4ec10b84466a = _e196f99e8552("session");
  if (!_4ec10b84466a) return callback("missing");
  const _824566874609 = {};
  _824566874609[_6ada9e0f1a0e(["C", "ookie"])] = _4ec10b84466a;
  _824566874609[_6ada9e0f1a0e(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _824566874609.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _e10bac20fd7a({ url: _22c273b0d4f7("forum.php"), _824566874609 }, (error, response, _252ddd47a02f) => {
    if (error) return callback(error);
    if (_252ddd47a02f.indexOf(_6ada9e0f1a0e(["action", "=", "logout"])) < 0) return callback("expired");
    const _cceb26fae801 = _f613f51482d0(_252ddd47a02f);
    if (!_cceb26fae801) return callback("token");
    callback(null, { _824566874609, _cceb26fae801 });
  });
}
function _a370114e1abb(ctx, callback) {
  const _824566874609 = Object.assign({}, ctx.headers);
  _824566874609.Referer = _22c273b0d4f7(_6ada9e0f1a0e([_d979f0dfa460, "-", "sign", ".", "html"]));
  _824566874609[_6ada9e0f1a0e(["X", "-", "Requested", "-", "With"])] = _6ada9e0f1a0e(["XML", "Http", "Request"]);
  _e10bac20fd7a({ url: _22c273b0d4f7(_71b8b5a6b743 + "?id=" + _d979f0dfa460 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _824566874609 }, (error, response, _252ddd47a02f) => {
    _f46fb44f23d7("📅 每日签到请求");
    if (error) return callback("❌ 请求失败：" + error);
    const _0065e399d592 = _252ddd47a02f.indexOf("今日已签") >= 0;
    const _28b6affaa1fc = _0065e399d592 || _252ddd47a02f.indexOf("<![CDATA[]]>") >= 0;
    _e10bac20fd7a({ url: _22c273b0d4f7(_6ada9e0f1a0e([_d979f0dfa460, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _76f3c583c748 = _69dcdc138aaf(page, "签到排名：", " ");
      const _d2e129a583f2 = _69dcdc138aaf(page, 'id="lxtdays" value="', '"');
      const _01581d2fa86d = _69dcdc138aaf(page, 'id="lxlevel" value="', '"');
      const _8c464a7fdd0a = _69dcdc138aaf(page, 'id="lxreward" value="', '"');
      _f46fb44f23d7(_0065e399d592 ? "ℹ️ 今日已经签到" : _28b6affaa1fc ? "✅ 签到接口返回成功" : "⚠️ 签到接口返回异常");
      if (_76f3c583c748) _f46fb44f23d7("🏆 当前排名：" + _76f3c583c748);
      if (_d2e129a583f2) _f46fb44f23d7("📆 累计天数：" + _d2e129a583f2);
      if (_01581d2fa86d) _f46fb44f23d7("🏅 签到等级：LV." + _01581d2fa86d);
      if (_8c464a7fdd0a) _f46fb44f23d7("💰 最近奖励：" + _8c464a7fdd0a);
      callback([_0065e399d592 ? "ℹ️ 今日已签到" : _28b6affaa1fc ? "✅ 签到接口成功" : "⚠️ 签到接口异常", _76f3c583c748 ? "🏆 排名 " + rank : "", _d2e129a583f2 ? "📆 累计 " + _d2e129a583f2 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _bb24a6a4b553(ctx, callback) {
  const _824566874609 = Object.assign({}, ctx.headers);
  _824566874609.Referer = _22c273b0d4f7(_71b8b5a6b743 + "?id=" + _42319870fd18);
  _824566874609[_6ada9e0f1a0e(["X", "-", "Requested", "-", "With"])] = _6ada9e0f1a0e(["XML", "Http", "Request"]);
  _824566874609.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _0e3d293f0c52 = _22c273b0d4f7(_71b8b5a6b743 + "?id=" + _42319870fd18 + ":draw");
  const _5746b40a2615 = ["🎰 幸运抽奖"];
  const _48983ffd2b26 = guard => {
    if (guard <= 0) { _5746b40a2615.forEach(_f46fb44f23d7); return callback(_5746b40a2615.join("\n")); }
    _e10bac20fd7a({ url: _0e3d293f0c52 + "?drawnumber=1&inajax=1", _824566874609 }, (error, response, _252ddd47a02f) => {
      let _848350db38cc = {};
      try { _848350db38cc = JSON.parse(_252ddd47a02f); } catch (ignored) {}
      const _572f87829c19 = String((_848350db38cc.data || {})["2"] || "");
      if (error || _848350db38cc.result !== "succeed" || _572f87829c19.indexOf("抽奖券") < 0) {
        _5746b40a2615.push("ℹ️ " + (error || _848350db38cc.msg || "没有可用抽奖券"));
        _5746b40a2615.forEach(_f46fb44f23d7);
        return callback(_5746b40a2615.join("\n"));
      }
      _e10bac20fd7a({ url: _0e3d293f0c52 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _824566874609 }, (error2, response2, raw) => {
        let _cbcff69d70fb = {};
        try { _cbcff69d70fb = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _cbcff69d70fb.result !== "succeed") {
          _5746b40a2615.push("⚠️ " + (error2 || _cbcff69d70fb.msg || "抽奖失败"));
          _5746b40a2615.forEach(_f46fb44f23d7);
          return callback(_5746b40a2615.join("\n"));
        }
        const _3e848ba01f11 = (((_cbcff69d70fb.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _45d6be88f00a = String((_cbcff69d70fb.data || {}).ticketnumber || "0");
        const _5472c0c13ca3 = String((_cbcff69d70fb.data || {}).creditnumber || "");
        _5746b40a2615.push("🎁 第 " + _5746b40a2615.length + " 次：" + (_3e848ba01f11.join("、") || _cbcff69d70fb.msg || "成功"));
        _5746b40a2615.push("🎟️ 剩余抽奖券：" + _45d6be88f00a + (_5472c0c13ca3 ? "  💰 星币：" + credit : ""));
        if (_45d6be88f00a === "0") { _5746b40a2615.forEach(_f46fb44f23d7); return callback(_5746b40a2615.join("\n")); }
        _48983ffd2b26(guard - 1);
      });
    });
  };
  _48983ffd2b26(10);
}
function _6f3fbe10c1bd(ctx, callback) {
  const _824566874609 = Object.assign({}, ctx.headers);
  _824566874609.Referer = _22c273b0d4f7(_71b8b5a6b743 + "?id=" + _335ece320257);
  _824566874609[_6ada9e0f1a0e(["X", "-", "Requested", "-", "With"])] = _6ada9e0f1a0e(["XML", "Http", "Request"]);
  const _1978a8f81e50 = ["🌾 农场与福利"];
  const _52c30624b208 = query => _22c273b0d4f7(_71b8b5a6b743 + "?id=" + _335ece320257 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _56f76ddae178 = [
    ["每日免费领取", _6ada9e0f1a0e(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _6ada9e0f1a0e(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _d14604fa19dd = 1; _d14604fa19dd <= 8; _d14604fa19dd += 1) _56f76ddae178.push(["地块 " + _d14604fa19dd, _6ada9e0f1a0e(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _d14604fa19dd]);
  const _02a52b5a9ca3 = _d14604fa19dd => {
    if (_d14604fa19dd >= _56f76ddae178.length) { _1978a8f81e50.forEach(_f46fb44f23d7); return callback(_1978a8f81e50.join("\n")); }
    const _1d72082fd3d7 = _56f76ddae178[_d14604fa19dd];
    _e10bac20fd7a({ url: _52c30624b208(_1d72082fd3d7[1]), _824566874609 }, (error, response, _252ddd47a02f) => {
      const _27843c7be49f = _c68471740b8e(_252ddd47a02f)[0] || _e58f0ae72c1e(_19f46a947d97(_252ddd47a02f), 80);
      const _d8c7321b2f01 = _8ca6fa5c2088(_27843c7be49f, ["成功", "完成", "可领取"]) ? "✅" : _8ca6fa5c2088(_27843c7be49f, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _1978a8f81e50.push(_d8c7321b2f01 + " " + _1d72082fd3d7[0] + "：" + (error || _27843c7be49f || "无返回"));
      const _72d3d89b7916 = _69dcdc138aaf(_1d72082fd3d7[1], "jfid=", "&");
      if (_72d3d89b7916 && _8ca6fa5c2088(_252ddd47a02f, ["已枯萎", "清除"])) {
        return _e10bac20fd7a({ url: _52c30624b208(_6ada9e0f1a0e(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _72d3d89b7916), _824566874609 }, (error2, response2, cleared) => {
          _1978a8f81e50.push((_8ca6fa5c2088(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _72d3d89b7916);
          _e10bac20fd7a({ url: _52c30624b208(_6ada9e0f1a0e(["do=", "plant", "seed", "&seed=1&jfid="]) + _72d3d89b7916 + "&timestamp=" + Math.floor(Date.now() / 1000)), _824566874609 }, (error3, response3, planted) => {
            _1978a8f81e50.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _72d3d89b7916 + "：" + (_c68471740b8e(planted)[0] || "无返回"));
            _02a52b5a9ca3(_d14604fa19dd + 1);
          });
        });
      }
      _02a52b5a9ca3(_d14604fa19dd + 1);
    });
  };
  _e10bac20fd7a({ url: _52c30624b208(_6ada9e0f1a0e(["do=", "normal", "&ac=", "kuo", "zhan"])), _824566874609 }, (error, response, _252ddd47a02f) => {
    _1978a8f81e50.push((_8ca6fa5c2088(_c68471740b8e(_252ddd47a02f)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _c68471740b8e(_252ddd47a02f)[0] || "无返回"));
    _02a52b5a9ca3(0);
  });
}
function _1f7d77f520f1() {
  _f46fb44f23d7("🧪 调试模式：开启");
  _f46fb44f23d7("🚀 论坛任务开始");
  _f46fb44f23d7("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _f46fb44f23d7("💾 存储键：" + _c18845b32f20 + "，登录状态长度：" + _e196f99e8552("session").length);
  _11954cd36f9d((error, ctx) => {
    if (error === "missing") return _5ab0cb0087ae(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _5ab0cb0087ae(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _5ab0cb0087ae(false, "论坛任务失败", String(error));
    _f46fb44f23d7("🔐 登录状态有效");
    _a370114e1abb(ctx, one => _bb24a6a4b553(ctx, two => _6f3fbe10c1bd(ctx, three => _5ab0cb0087ae(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_f46fb44f23d7("🧪 调试模式：开启");
_f46fb44f23d7("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录 Cookie 抓取" : "论坛任务"));
const _0bf3bc2c41c4 = typeof $request !== "undefined";
if (_0bf3bc2c41c4) _1291fab8bb8d();
else _1f7d77f520f1();

})();
