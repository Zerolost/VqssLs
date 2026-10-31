/*4c98300fc8ee*/
(function(){
const _faa1e0fcf2ae = typeof $argument === "object" && $argument ? $argument : {};
const _1ff225c5deb9 = $persistentStore;
const _967ba011c0f4 = "a91e7c4d";
const _54c66711cd7e = { value: false };
const _f7eb60aa9085 = [];
const _86a57db15c8d = values => values.join("");

function _8eb0956393ef(name) { return _1ff225c5deb9.read(_967ba011c0f4 + "." + name) || ""; }
function _22e72b45bf31(name, value) { return _1ff225c5deb9.write(value == null ? undefined : String(value), _967ba011c0f4 + "." + name); }
function _2e4c08071b66(_df16467de4a9, name) {
  const _0ddfaee6b374 = Object.keys(_df16467de4a9 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _0ddfaee6b374 ? String(_df16467de4a9[_0ddfaee6b374] || "") : "";
}
function _d130a46ed3a8(_3ce224506a12) { _f7eb60aa9085.push(String(_3ce224506a12)); console.log(String(_3ce224506a12)); }
function _6f3bb1a8d754(value, size) {
  const _82249a7dade2 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _82249a7dade2.length > size ? _82249a7dade2.slice(0, size) + "..." : _82249a7dade2;
}
function _c18088a6232a(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _273ecbadff9c(value, _14f7ac4e0d7c, _02f522780435) {
  const _82249a7dade2 = String(value || "");
  const _e35506e650b8 = _82249a7dade2.indexOf(_14f7ac4e0d7c);
  if (_e35506e650b8 < 0) return "";
  const _13d311073cb1 = _e35506e650b8 + _14f7ac4e0d7c.length;
  const _9bee07bd3e14 = _82249a7dade2.indexOf(_02f522780435, _13d311073cb1);
  return _82249a7dade2.slice(_13d311073cb1, _9bee07bd3e14 < 0 ? _13d311073cb1 + 16 : _9bee07bd3e14).trim();
}
function _5712bedbe260(value) { return _273ecbadff9c(value, _86a57db15c8d(["form", "hash", "="]), "&"); }
function _6836ef1c76f0(value) {
  const _82b1aaa6e76f = _86a57db15c8d(["layer", ".msg('"]);
  const _82249a7dade2 = String(value || "");
  const _14f7ac4e0d7c = _82249a7dade2.indexOf(_82b1aaa6e76f);
  if (_14f7ac4e0d7c < 0) return [];
  const _13d311073cb1 = _14f7ac4e0d7c + _82b1aaa6e76f.length;
  const _02f522780435 = _82249a7dade2.indexOf("')", _13d311073cb1);
  return _02f522780435 < 0 ? [] : [_82249a7dade2.slice(_13d311073cb1, _02f522780435)];
}
function _8c51e093ec3c(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _b3231017e225(ok, title, body) {
  if (_54c66711cd7e.value) return;
  _54c66711cd7e.value = true;
  _d130a46ed3a8("━━━━━━━━ 执行结束 ━━━━━━━━");
  _d130a46ed3a8(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _2f094b1a8ba4 = typeof $notification !== "undefined";
  if (_faa1e0fcf2ae.notify_enabled !== false && _2f094b1a8ba4) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _6f3bb1a8d754(body || _f7eb60aa9085.join("\n"), 700));
  const _a667e486de18 = typeof $done === "function";
  if (_a667e486de18) $done({});
}
function _8ef27d65da79(options, callback) {
  const _d376e92e1bc5 = String(options.method || "GET").toLowerCase();
  const _73cf8e68eef2 = $httpClient[_d376e92e1bc5] || $httpClient.get;
  const _2b9cd7820477 = { _daef94178548: options.url, _df16467de4a9: options.headers, body: options.body, timeout: options.timeout || 15000 };
  _2b9cd7820477[_86a57db15c8d(["auto", "-", "redirect"])] = true;
  _2b9cd7820477[_86a57db15c8d(["auto", "-", "cookie"])] = true;
  _73cf8e68eef2(_2b9cd7820477, (error, response, data) => callback(error, response || {}, String(data || "")));
}
function _0573b64ea635(value) {
  const _0c2fdbb13e38 = String.fromCharCode(44);
  const _5105055a56b0 = String.fromCharCode(59);
  return String(value || "").split(_0c2fdbb13e38).map(item => item.split(_5105055a56b0)[0].trim()).filter(Boolean).join(_5105055a56b0);
}
const _be6c7189a1f9 = _86a57db15c8d(["ht", "tps", "://"]);
const _0aaa9858377e = [121, 99, 111, 111, 46, 110, 101, 116].map(_65d42e89e790 => String.fromCharCode(_65d42e89e790)).join("");
function _d44b9c375aa8(path) { return _be6c7189a1f9 + _0aaa9858377e + String.fromCharCode(47) + String(path || ""); }
const _b1c4ccd2f669 = _86a57db15c8d(["plu", "gin", ".", "php"]);
const _fa2c04eb5dff = _86a57db15c8d(["k", "_", "mi", "sign"]);
const _207eea69fa80 = _86a57db15c8d(["view", "ui", "_", "lottery"]);
const _844f5456a630 = _86a57db15c8d(["jn", "farm"]);

function _bedfcfb5dbc5() {
  try {
    const _e251f9b5afaf = typeof $request !== "undefined" ? $request : {};
    const _df16467de4a9 = _e251f9b5afaf.headers || {};
    const _daef94178548 = String(_e251f9b5afaf.url || "");
    const _f9fcec717b3e = _0573b64ea635(_2e4c08071b66(_df16467de4a9, "Cookie") || _2e4c08071b66(_df16467de4a9, "cookie"));
    const _ea3696d0aa25 = [".css", ".js", ".png", ".jpg", ".gif", ".webp", ".svg", ".ico", ".woff", "/static/"].every(item => _daef94178548.indexOf(item) < 0);
    const _5588c53fe164 = _f9fcec717b3e.indexOf("auth=") >= 0;
    console.log("🍪 登录状态抓取");
    console.log("🌐 页面：" + _6f3bb1a8d754(_daef94178548, 180));
    console.log("🔑 状态长度：" + _f9fcec717b3e.length);
    if (!_ea3696d0aa25) return _b3231017e225(true, "", "");
    if (!_5588c53fe164 || _f9fcec717b3e.length < 30) {
      console.log("ℹ️ 当前请求没有完整登录状态");
      $notification.post("论坛登录状态", "❌ 未获取", "请通过 Loon 打开已登录页面");
      return _b3231017e225(true, "登录状态未更新", "请通过 Loon 打开已登录页面");
    }
    const _49d70dc62562 = _8eb0956393ef("session");
    _22e72b45bf31("session", _f9fcec717b3e);
    _22e72b45bf31("updated", new Date().toISOString());
    console.log(_49d70dc62562 === _f9fcec717b3e ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    if (_49d70dc62562 !== _f9fcec717b3e) $notification.post("论坛登录状态", "✅ 已获取", "长度 " + _f9fcec717b3e.length);
    _b3231017e225(true, "论坛登录状态", _49d70dc62562 === _f9fcec717b3e ? "未变化" : "已获取");
  } catch (error) {
    console.log("❌ 登录状态异常：" + error);
    $notification.post("论坛登录状态", "❌ 抓取失败", String(error));
    _b3231017e225(false, "登录状态失败", String(error));
  }
}
function _591eee7eae13(callback) {
  const _f9fcec717b3e = _8eb0956393ef("session");
  if (!_f9fcec717b3e) return callback("missing");
  const _df16467de4a9 = {};
  _df16467de4a9[_86a57db15c8d(["C", "ookie"])] = _f9fcec717b3e;
  _df16467de4a9[_86a57db15c8d(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _df16467de4a9.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _8ef27d65da79({ _daef94178548: _d44b9c375aa8(""), _df16467de4a9 }, (error, response, data) => {
    if (error) return callback(error);
    if (data.indexOf(_86a57db15c8d(["action", "=", "logout"])) < 0) return callback("expired");
    const _65d42e89e790 = _5712bedbe260(data);
    if (!_65d42e89e790) return callback("token");
    callback(null, { _df16467de4a9, _65d42e89e790 });
  });
}
function _ee9bd3a20d0c(ctx, callback) {
  const _df16467de4a9 = Object.assign({}, ctx.headers);
  _df16467de4a9.Referer = _d44b9c375aa8(_86a57db15c8d([_fa2c04eb5dff, "-", "sign", ".", "html"]));
  _df16467de4a9[_86a57db15c8d(["X", "-", "Requested", "-", "With"])] = _86a57db15c8d(["XML", "Http", "Request"]);
  _8ef27d65da79({ _daef94178548: _d44b9c375aa8(_b1c4ccd2f669 + "?id=" + _fa2c04eb5dff + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _df16467de4a9 }, (error, response, data) => {
    _d130a46ed3a8("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _9259c924d9c9 = data.indexOf("今日已签") >= 0;
    const _c83b5d6fac97 = _9259c924d9c9 || data.indexOf("<![CDATA[]]>") >= 0;
    _8ef27d65da79({ _daef94178548: _d44b9c375aa8(_86a57db15c8d([_fa2c04eb5dff, "-", "sign", ".", "html"])), _df16467de4a9: ctx.headers }, (error2, response2, _ea3696d0aa25) => {
      const _c4410ea51310 = _273ecbadff9c(_ea3696d0aa25, "签到排名：", " ");
      const _09988c01e823 = _273ecbadff9c(_ea3696d0aa25, 'id="lxtdays" value="', '"');
      const _d7e0e156573c = _273ecbadff9c(_ea3696d0aa25, 'id="lxlevel" value="', '"');
      const _268fa8246a01 = _273ecbadff9c(_ea3696d0aa25, 'id="lxreward" value="', '"');
      _d130a46ed3a8(_9259c924d9c9 ? "ℹ️ 今日已经签到" : _c83b5d6fac97 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_c4410ea51310) _d130a46ed3a8("🏆 当前排名：" + _c4410ea51310);
      if (_09988c01e823) _d130a46ed3a8("📆 累计天数：" + _09988c01e823);
      if (_d7e0e156573c) _d130a46ed3a8("🏅 签到等级：LV." + _d7e0e156573c);
      if (_268fa8246a01) _d130a46ed3a8("💰 最近奖励：" + _268fa8246a01);
      callback([_9259c924d9c9 ? "ℹ️ 今日已签到" : _c83b5d6fac97 ? "✅ 签到成功" : "⚠️ 签到异常", _c4410ea51310 ? "🏆 排名 " + _c4410ea51310 : "", _09988c01e823 ? "📆 累计 " + _09988c01e823 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _cd7498caf65e(ctx, callback) {
  const _df16467de4a9 = Object.assign({}, ctx.headers);
  _df16467de4a9.Referer = _d44b9c375aa8(_b1c4ccd2f669 + "?id=" + _207eea69fa80);
  _df16467de4a9[_86a57db15c8d(["X", "-", "Requested", "-", "With"])] = _86a57db15c8d(["XML", "Http", "Request"]);
  _df16467de4a9.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _5d25ca0300db = _d44b9c375aa8(_b1c4ccd2f669 + "?id=" + _207eea69fa80 + ":draw");
  const _8aea90984b5b = ["🎰 幸运抽奖"];
  const _db68ca2a506d = guard => {
    if (guard <= 0) { _8aea90984b5b.forEach(_d130a46ed3a8); return callback(_8aea90984b5b.join("\n")); }
    _8ef27d65da79({ _daef94178548: _5d25ca0300db + "?drawnumber=1&inajax=1", _df16467de4a9 }, (error, response, data) => {
      let _bc86e5508ff4 = {};
      try { _bc86e5508ff4 = JSON.parse(data); } catch (ignored) {}
      const _c63b83d454b5 = String((_bc86e5508ff4.data || {})["2"] || "");
      if (error || _bc86e5508ff4.result !== "succeed" || _c63b83d454b5.indexOf("抽奖券") < 0) {
        _8aea90984b5b.push("ℹ️ " + (error || _bc86e5508ff4.msg || "没有可用抽奖券"));
        _8aea90984b5b.forEach(_d130a46ed3a8);
        return callback(_8aea90984b5b.join("\n"));
      }
      _8ef27d65da79({ _daef94178548: _5d25ca0300db + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _df16467de4a9 }, (error2, response2, raw) => {
        let _9d0f1cbf2d55 = {};
        try { _9d0f1cbf2d55 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _9d0f1cbf2d55.result !== "succeed") {
          _8aea90984b5b.push("⚠️ " + (error2 || _9d0f1cbf2d55.msg || "抽奖失败"));
          _8aea90984b5b.forEach(_d130a46ed3a8);
          return callback(_8aea90984b5b.join("\n"));
        }
        const _5224d6cd4ed4 = (((_9d0f1cbf2d55.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _e35506e650b8 = String((_9d0f1cbf2d55.data || {}).ticketnumber || "0");
        const _e1187af4cd71 = String((_9d0f1cbf2d55.data || {}).creditnumber || "");
        _8aea90984b5b.push("🎁 第 " + _8aea90984b5b.length + " 次：" + (_5224d6cd4ed4.join("、") || _9d0f1cbf2d55.msg || "成功"));
        _8aea90984b5b.push("🎟️ 剩余抽奖券：" + _e35506e650b8 + (_e1187af4cd71 ? "  💰 星币：" + _e1187af4cd71 : ""));
        if (_e35506e650b8 === "0") { _8aea90984b5b.forEach(_d130a46ed3a8); return callback(_8aea90984b5b.join("\n")); }
        _db68ca2a506d(guard - 1);
      });
    });
  };
  _db68ca2a506d(10);
}
function _60bc9c39ee1f(ctx, callback) {
  const _df16467de4a9 = Object.assign({}, ctx.headers);
  _df16467de4a9.Referer = _d44b9c375aa8(_b1c4ccd2f669 + "?id=" + _844f5456a630);
  _df16467de4a9[_86a57db15c8d(["X", "-", "Requested", "-", "With"])] = _86a57db15c8d(["XML", "Http", "Request"]);
  const _b1b0117d4c4e = ["🌾 农场与福利"];
  const _112e2b15ab4f = query => _d44b9c375aa8(_b1c4ccd2f669 + "?id=" + _844f5456a630 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _a78e23831b28 = [
    ["每日免费领取", _86a57db15c8d(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _86a57db15c8d(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _0b34e87116f8 = 1; _0b34e87116f8 <= 8; _0b34e87116f8 += 1) _a78e23831b28.push(["地块 " + _0b34e87116f8, _86a57db15c8d(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _0b34e87116f8]);
  const _1987505fd37f = _0b34e87116f8 => {
    if (_0b34e87116f8 >= _a78e23831b28.length) { _b1b0117d4c4e.forEach(_d130a46ed3a8); return callback(_b1b0117d4c4e.join("\n")); }
    const _f94370ebc629 = _a78e23831b28[_0b34e87116f8];
    _8ef27d65da79({ _daef94178548: _112e2b15ab4f(_f94370ebc629[1]), _df16467de4a9 }, (error, response, data) => {
      const _3ce224506a12 = _6836ef1c76f0(data)[0] || _6f3bb1a8d754(_c18088a6232a(data), 80);
      const _4d2093c28c35 = _8c51e093ec3c(_3ce224506a12, ["成功", "完成", "可领取"]) ? "✅" : _8c51e093ec3c(_3ce224506a12, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _b1b0117d4c4e.push(_4d2093c28c35 + " " + _f94370ebc629[0] + "：" + (error || _3ce224506a12 || "无返回"));
      const _c8fbffdd80df = _273ecbadff9c(_f94370ebc629[1], "jfid=", "&");
      if (_c8fbffdd80df && _8c51e093ec3c(data, ["已枯萎", "清除"])) {
        return _8ef27d65da79({ _daef94178548: _112e2b15ab4f(_86a57db15c8d(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _c8fbffdd80df), _df16467de4a9 }, (error2, response2, cleared) => {
          _b1b0117d4c4e.push((_8c51e093ec3c(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _c8fbffdd80df);
          _8ef27d65da79({ _daef94178548: _112e2b15ab4f(_86a57db15c8d(["do=", "plant", "seed", "&seed=1&jfid="]) + _c8fbffdd80df + "&timestamp=" + Math.floor(Date.now() / 1000)), _df16467de4a9 }, (error3, response3, planted) => {
            _b1b0117d4c4e.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _c8fbffdd80df + "：" + (_6836ef1c76f0(planted)[0] || "无返回"));
            _1987505fd37f(_0b34e87116f8 + 1);
          });
        });
      }
      _1987505fd37f(_0b34e87116f8 + 1);
    });
  };
  _8ef27d65da79({ _daef94178548: _112e2b15ab4f(_86a57db15c8d(["do=", "normal", "&ac=", "kuo", "zhan"])), _df16467de4a9 }, (error, response, data) => {
    _b1b0117d4c4e.push((_8c51e093ec3c(_6836ef1c76f0(data)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _6836ef1c76f0(data)[0] || "无返回"));
    _1987505fd37f(0);
  });
}
function _b765bac2f824() {
  _d130a46ed3a8("🚀 论坛任务开始");
  _d130a46ed3a8("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _591eee7eae13((error, ctx) => {
    if (error === "missing") return _b3231017e225(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _b3231017e225(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _b3231017e225(false, "论坛任务失败", String(error));
    _d130a46ed3a8("🔐 登录状态有效");
    _ee9bd3a20d0c(ctx, one => _cd7498caf65e(ctx, two => _60bc9c39ee1f(ctx, three => _b3231017e225(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
const _378dbe867b57 = typeof $request !== "undefined";
if (_378dbe867b57) _bedfcfb5dbc5();
else _b765bac2f824();

})();
