/*ba5390fc8058*/
(function(){
const _c69a1d746275 = typeof $argument === "object" && $argument ? $argument : {};
const _669b1204f051 = $persistentStore;
const _fe09ae77f99f = "a91e7c4d";
const _eae7de136669 = { value: false };
const _f2c8eaa9f436 = [];
const _fb36ddfc8ab1 = values => values.join("");

function _70831370a7d3(name) { return _669b1204f051.read(_fe09ae77f99f + "." + name) || ""; }
function _8cbff4b9fcbe(name, value) { return _669b1204f051.write(value == null ? undefined : String(value), _fe09ae77f99f + "." + name); }
function _0e7a20f5284b(_d0da7b94be3d, name) {
  const _021b6708eee3 = Object.keys(_d0da7b94be3d || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _021b6708eee3 ? String(_d0da7b94be3d[_021b6708eee3] || "") : "";
}
function _96a9a057ca05(_d91d97847398) { _f2c8eaa9f436.push(String(_d91d97847398)); console.log(String(_d91d97847398)); }
function _68dd7fdb0351(value, size) {
  const _728b8185f0b6 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _728b8185f0b6.length > size ? _728b8185f0b6.slice(0, size) + "..." : _728b8185f0b6;
}
function _583c29c1df99(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _66a29bf62832(value, _3267f425f411, _3a1f045c141d) {
  const _728b8185f0b6 = String(value || "");
  const _8fd6a780da7d = _728b8185f0b6.indexOf(_3267f425f411);
  if (_8fd6a780da7d < 0) return "";
  const _88290a4c51c1 = _8fd6a780da7d + _3267f425f411.length;
  const _ba9c09183395 = _728b8185f0b6.indexOf(_3a1f045c141d, _88290a4c51c1);
  return _728b8185f0b6.slice(_88290a4c51c1, _ba9c09183395 < 0 ? _88290a4c51c1 + 16 : _ba9c09183395).trim();
}
function _d5d21c0fc931(value) { return _66a29bf62832(value, _fb36ddfc8ab1(["form", "hash", "="]), "&"); }
function _a355dbb38fd7(value) {
  const _8b4fc8a2be65 = _fb36ddfc8ab1(["layer", ".msg('"]);
  const _728b8185f0b6 = String(value || "");
  const _3267f425f411 = _728b8185f0b6.indexOf(_8b4fc8a2be65);
  if (_3267f425f411 < 0) return [];
  const _88290a4c51c1 = _3267f425f411 + _8b4fc8a2be65.length;
  const _3a1f045c141d = _728b8185f0b6.indexOf("')", _88290a4c51c1);
  return _3a1f045c141d < 0 ? [] : [_728b8185f0b6.slice(_88290a4c51c1, _3a1f045c141d)];
}
function _a120de880f0f(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _6cac32ffbc71(ok, title, body) {
  if (_eae7de136669.value) return;
  _eae7de136669.value = true;
  _96a9a057ca05("━━━━━━━━ 执行结束 ━━━━━━━━");
  _96a9a057ca05(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _2fa36020f277 = typeof $notification !== "undefined";
  if (_c69a1d746275.notify_enabled !== false && _2fa36020f277) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _68dd7fdb0351(body || _f2c8eaa9f436.join("\n"), 700));
  const _fb0f6c9f5f35 = typeof $done === "function";
  if (_fb0f6c9f5f35) $done({});
}
function _daa1fab6a1d9(options, callback) {
  const _f18c4669b7dd = String(options.method || "GET").toLowerCase();
  const _6cc5c616dc27 = $httpClient[_f18c4669b7dd] || $httpClient.get;
  const _d4f5d3ec4f45 = { _1a1c24fe378f: options.url, _d0da7b94be3d: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _d4f5d3ec4f45[_fb36ddfc8ab1(["auto", "-", "redirect"])] = true;
  _d4f5d3ec4f45[_fb36ddfc8ab1(["auto", "-", "cookie"])] = true;
  _6cc5c616dc27(_d4f5d3ec4f45, (error, response, data) => callback(error, response || {}, String(data || "")));
}
function _0a60bf48a56f(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _774eb9f39162 = _fb36ddfc8ab1(["ht", "tps", "://"]);
const _499c1cac616b = [121, 99, 111, 111, 46, 110, 101, 116].map(_b3eb2c319eff => String.fromCharCode(_b3eb2c319eff)).join("");
function _9087b94a32db(path) { return _774eb9f39162 + _499c1cac616b + String.fromCharCode(47) + String(path || ""); }
const _1b1f908fab08 = _fb36ddfc8ab1(["plu", "gin", ".", "php"]);
const _c04bcda31cc5 = _fb36ddfc8ab1(["k", "_", "mi", "sign"]);
const _487185e298e5 = _fb36ddfc8ab1(["view", "ui", "_", "lottery"]);
const _a3004a91bd23 = _fb36ddfc8ab1(["jn", "farm"]);

function _678a8ff8605f() {
  try {
    const _710738f34794 = typeof $request !== "undefined" ? $request : {};
    const _d0da7b94be3d = _710738f34794.headers || {};
    const _1a1c24fe378f = String(_710738f34794.url || "");
    const _ac9a0aff1eff = _0a60bf48a56f(_0e7a20f5284b(_d0da7b94be3d, "Cookie") || _0e7a20f5284b(_d0da7b94be3d, "cookie"));
    const _c1b401a9e101 = [".css", ".js", ".png", ".jpg", ".gif", ".webp", ".svg", ".ico", ".woff", "/static/"].every(item => _1a1c24fe378f.indexOf(item) < 0);
    const _157d47b16dd9 = _ac9a0aff1eff.split("; ").filter(Boolean);
    const _c5eab2f50b4d = _157d47b16dd9.some(item => item.indexOf("auth=") >= 0) && _157d47b16dd9.length >= 3;
    console.log("🍪 登录状态抓取");
    console.log("🌐 页面：" + _68dd7fdb0351(_1a1c24fe378f, 180));
    console.log("🔑 状态字段：" + _157d47b16dd9.length + "，长度：" + _ac9a0aff1eff.length);
    if (!_c1b401a9e101 || !_c5eab2f50b4d) {
      console.log("ℹ️ 当前请求无需保存登录状态");
      return _6cac32ffbc71(true, "", "");
    }
    const _b26406539b46 = _70831370a7d3("session");
    const _329fee924a40 = Number(_70831370a7d3("notified") || 0);
    _8cbff4b9fcbe("session", _ac9a0aff1eff);
    _8cbff4b9fcbe("updated", new Date().toISOString());
    console.log(_b26406539b46 === _ac9a0aff1eff ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    if (_b26406539b46 !== _ac9a0aff1eff && Date.now() - _329fee924a40 > 60000) {
      _8cbff4b9fcbe("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _157d47b16dd9.length + " 项 / " + _ac9a0aff1eff.length);
    }
    _6cac32ffbc71(true, "", "");
  } catch (error) {
    console.log("❌ 登录状态异常：" + error);
    $notification.post("论坛登录状态", "❌ 抓取失败", String(error));
    _6cac32ffbc71(false, "登录状态失败", String(error));
  }
}
function _2f58e4ea93b4(callback) {
  const _ac9a0aff1eff = _70831370a7d3("session");
  if (!_ac9a0aff1eff) return callback("missing");
  const _d0da7b94be3d = {};
  _d0da7b94be3d[_fb36ddfc8ab1(["C", "ookie"])] = _ac9a0aff1eff;
  _d0da7b94be3d[_fb36ddfc8ab1(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _d0da7b94be3d.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _daa1fab6a1d9({ _1a1c24fe378f: _9087b94a32db(""), _d0da7b94be3d }, (error, response, data) => {
    if (error) return callback(error);
    if (data.indexOf(_fb36ddfc8ab1(["action", "=", "logout"])) < 0) return callback("expired");
    const _b3eb2c319eff = _d5d21c0fc931(data);
    if (!_b3eb2c319eff) return callback("token");
    callback(null, { _d0da7b94be3d, _b3eb2c319eff });
  });
}
function _7291d39cc0fb(ctx, callback) {
  const _d0da7b94be3d = Object.assign({}, ctx.headers);
  _d0da7b94be3d.Referer = _9087b94a32db(_fb36ddfc8ab1([_c04bcda31cc5, "-", "sign", ".", "html"]));
  _d0da7b94be3d[_fb36ddfc8ab1(["X", "-", "Requested", "-", "With"])] = _fb36ddfc8ab1(["XML", "Http", "Request"]);
  _daa1fab6a1d9({ _1a1c24fe378f: _9087b94a32db(_1b1f908fab08 + "?id=" + _c04bcda31cc5 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _d0da7b94be3d }, (error, response, data) => {
    _96a9a057ca05("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _3c6b0f96d597 = data.indexOf("今日已签") >= 0;
    const _051639e2de37 = _3c6b0f96d597 || data.indexOf("<![CDATA[]]>") >= 0;
    _daa1fab6a1d9({ _1a1c24fe378f: _9087b94a32db(_fb36ddfc8ab1([_c04bcda31cc5, "-", "sign", ".", "html"])), _d0da7b94be3d: ctx.headers }, (error2, response2, _c1b401a9e101) => {
      const _0c79e61f2b77 = _66a29bf62832(_c1b401a9e101, "签到排名：", " ");
      const _ea44757da0ba = _66a29bf62832(_c1b401a9e101, 'id="lxtdays" value="', '"');
      const _ed0df8072f52 = _66a29bf62832(_c1b401a9e101, 'id="lxlevel" value="', '"');
      const _197d3c727e6e = _66a29bf62832(_c1b401a9e101, 'id="lxreward" value="', '"');
      _96a9a057ca05(_3c6b0f96d597 ? "ℹ️ 今日已经签到" : _051639e2de37 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_0c79e61f2b77) _96a9a057ca05("🏆 当前排名：" + _0c79e61f2b77);
      if (_ea44757da0ba) _96a9a057ca05("📆 累计天数：" + _ea44757da0ba);
      if (_ed0df8072f52) _96a9a057ca05("🏅 签到等级：LV." + _ed0df8072f52);
      if (_197d3c727e6e) _96a9a057ca05("💰 最近奖励：" + _197d3c727e6e);
      callback([_3c6b0f96d597 ? "ℹ️ 今日已签到" : _051639e2de37 ? "✅ 签到成功" : "⚠️ 签到异常", _0c79e61f2b77 ? "🏆 排名 " + _0c79e61f2b77 : "", _ea44757da0ba ? "📆 累计 " + _ea44757da0ba + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _7a92bbe86f42(ctx, callback) {
  const _d0da7b94be3d = Object.assign({}, ctx.headers);
  _d0da7b94be3d.Referer = _9087b94a32db(_1b1f908fab08 + "?id=" + _487185e298e5);
  _d0da7b94be3d[_fb36ddfc8ab1(["X", "-", "Requested", "-", "With"])] = _fb36ddfc8ab1(["XML", "Http", "Request"]);
  _d0da7b94be3d.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _912b5748e9a2 = _9087b94a32db(_1b1f908fab08 + "?id=" + _487185e298e5 + ":draw");
  const _b6b7dff6a5b7 = ["🎰 幸运抽奖"];
  const _f58d9e06573d = guard => {
    if (guard <= 0) { _b6b7dff6a5b7.forEach(_96a9a057ca05); return callback(_b6b7dff6a5b7.join("\n")); }
    _daa1fab6a1d9({ _1a1c24fe378f: _912b5748e9a2 + "?drawnumber=1&inajax=1", _d0da7b94be3d }, (error, response, data) => {
      let _e915f9ee35bd = {};
      try { _e915f9ee35bd = JSON.parse(data); } catch (ignored) {}
      const _060217597fd6 = String((_e915f9ee35bd.data || {})["2"] || "");
      if (error || _e915f9ee35bd.result !== "succeed" || _060217597fd6.indexOf("抽奖券") < 0) {
        _b6b7dff6a5b7.push("ℹ️ " + (error || _e915f9ee35bd.msg || "没有可用抽奖券"));
        _b6b7dff6a5b7.forEach(_96a9a057ca05);
        return callback(_b6b7dff6a5b7.join("\n"));
      }
      _daa1fab6a1d9({ _1a1c24fe378f: _912b5748e9a2 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _d0da7b94be3d }, (error2, response2, raw) => {
        let _76a1e4a6097e = {};
        try { _76a1e4a6097e = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _76a1e4a6097e.result !== "succeed") {
          _b6b7dff6a5b7.push("⚠️ " + (error2 || _76a1e4a6097e.msg || "抽奖失败"));
          _b6b7dff6a5b7.forEach(_96a9a057ca05);
          return callback(_b6b7dff6a5b7.join("\n"));
        }
        const _2a9a746794f9 = (((_76a1e4a6097e.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _8fd6a780da7d = String((_76a1e4a6097e.data || {}).ticketnumber || "0");
        const _d3853a281b81 = String((_76a1e4a6097e.data || {}).creditnumber || "");
        _b6b7dff6a5b7.push("🎁 第 " + _b6b7dff6a5b7.length + " 次：" + (_2a9a746794f9.join("、") || _76a1e4a6097e.msg || "成功"));
        _b6b7dff6a5b7.push("🎟️ 剩余抽奖券：" + _8fd6a780da7d + (_d3853a281b81 ? "  💰 星币：" + _d3853a281b81 : ""));
        if (_8fd6a780da7d === "0") { _b6b7dff6a5b7.forEach(_96a9a057ca05); return callback(_b6b7dff6a5b7.join("\n")); }
        _f58d9e06573d(guard - 1);
      });
    });
  };
  _f58d9e06573d(10);
}
function _eb60174b6df3(ctx, callback) {
  const _d0da7b94be3d = Object.assign({}, ctx.headers);
  _d0da7b94be3d.Referer = _9087b94a32db(_1b1f908fab08 + "?id=" + _a3004a91bd23);
  _d0da7b94be3d[_fb36ddfc8ab1(["X", "-", "Requested", "-", "With"])] = _fb36ddfc8ab1(["XML", "Http", "Request"]);
  const _bedaa131cb24 = ["🌾 农场与福利"];
  const _e2c450747667 = query => _9087b94a32db(_1b1f908fab08 + "?id=" + _a3004a91bd23 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _7a9186067fed = [
    ["每日免费领取", _fb36ddfc8ab1(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _fb36ddfc8ab1(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _65ff467de3d0 = 1; _65ff467de3d0 <= 8; _65ff467de3d0 += 1) _7a9186067fed.push(["地块 " + _65ff467de3d0, _fb36ddfc8ab1(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _65ff467de3d0]);
  const _35769fdb60e7 = _65ff467de3d0 => {
    if (_65ff467de3d0 >= _7a9186067fed.length) { _bedaa131cb24.forEach(_96a9a057ca05); return callback(_bedaa131cb24.join("\n")); }
    const _70276339dcd0 = _7a9186067fed[_65ff467de3d0];
    _daa1fab6a1d9({ _1a1c24fe378f: _e2c450747667(_70276339dcd0[1]), _d0da7b94be3d }, (error, response, data) => {
      const _d91d97847398 = _a355dbb38fd7(data)[0] || _68dd7fdb0351(_583c29c1df99(data), 80);
      const _f8e6240964d2 = _a120de880f0f(_d91d97847398, ["成功", "完成", "可领取"]) ? "✅" : _a120de880f0f(_d91d97847398, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _bedaa131cb24.push(_f8e6240964d2 + " " + _70276339dcd0[0] + "：" + (error || _d91d97847398 || "无返回"));
      const _4dc65cc10158 = _66a29bf62832(_70276339dcd0[1], "jfid=", "&");
      if (_4dc65cc10158 && _a120de880f0f(data, ["已枯萎", "清除"])) {
        return _daa1fab6a1d9({ _1a1c24fe378f: _e2c450747667(_fb36ddfc8ab1(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _4dc65cc10158), _d0da7b94be3d }, (error2, response2, cleared) => {
          _bedaa131cb24.push((_a120de880f0f(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _4dc65cc10158);
          _daa1fab6a1d9({ _1a1c24fe378f: _e2c450747667(_fb36ddfc8ab1(["do=", "plant", "seed", "&seed=1&jfid="]) + _4dc65cc10158 + "&timestamp=" + Math.floor(Date.now() / 1000)), _d0da7b94be3d }, (error3, response3, planted) => {
            _bedaa131cb24.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _4dc65cc10158 + "：" + (_a355dbb38fd7(planted)[0] || "无返回"));
            _35769fdb60e7(_65ff467de3d0 + 1);
          });
        });
      }
      _35769fdb60e7(_65ff467de3d0 + 1);
    });
  };
  _daa1fab6a1d9({ _1a1c24fe378f: _e2c450747667(_fb36ddfc8ab1(["do=", "normal", "&ac=", "kuo", "zhan"])), _d0da7b94be3d }, (error, response, data) => {
    _bedaa131cb24.push((_a120de880f0f(_a355dbb38fd7(data)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _a355dbb38fd7(data)[0] || "无返回"));
    _35769fdb60e7(0);
  });
}
function _047465f3779b() {
  _96a9a057ca05("🚀 论坛任务开始");
  _96a9a057ca05("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _2f58e4ea93b4((error, ctx) => {
    if (error === "missing") return _6cac32ffbc71(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _6cac32ffbc71(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _6cac32ffbc71(false, "论坛任务失败", String(error));
    _96a9a057ca05("🔐 登录状态有效");
    _7291d39cc0fb(ctx, one => _7a92bbe86f42(ctx, two => _eb60174b6df3(ctx, three => _6cac32ffbc71(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _8b142f9436a9 = typeof $request !== "undefined";
if (_8b142f9436a9) _678a8ff8605f();
else _047465f3779b();

})();
