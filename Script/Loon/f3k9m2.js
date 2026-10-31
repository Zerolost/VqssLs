/*84e4ff59fb27*/
(function(){
const _6af38c2ae5ee = typeof $argument === "object" && $argument ? $argument : {};
const _13504c97bc5b = $persistentStore;
const _6109da8dc790 = "f3k9m2_store";
const _6331bd6eb4a0 = true;
const _f17ae4aa5563 = { value: false };
const _d659c5e2bc0f = [];
const _883e2146b890 = values => values.join("");

function _3dee66fb6ba1() {
  try { return JSON.parse(_13504c97bc5b.read(_6109da8dc790) || "{}") || {}; }
  catch (error) { return {}; }
}
function _7e502c343ad0(_a1844a6dc099) { return _13504c97bc5b.write(JSON.stringify(_a1844a6dc099), _6109da8dc790); }
function _de69e2538263(name) { return String(_3dee66fb6ba1()[name] || ""); }
function _0551c438331a(name, value) {
  const _a1844a6dc099 = _3dee66fb6ba1();
  if (value == null) delete _a1844a6dc099[name];
  else _a1844a6dc099[name] = String(value);
  return _7e502c343ad0(_a1844a6dc099);
}
function _08a2d37ee504(_77cd2a4b1285, name) {
  const _096ef1d177bb = Object.keys(_77cd2a4b1285 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _096ef1d177bb ? String(_77cd2a4b1285[_096ef1d177bb] || "") : "";
}
function _2cb347651ce6(_dcb0d3a88bfe) {
  const _c54fa6b03104 = String(_dcb0d3a88bfe);
  _d659c5e2bc0f.push(_c54fa6b03104);
  if (_6331bd6eb4a0) console.log(_c54fa6b03104);
}
function _a143e69927c3(value, size) {
  const _c54fa6b03104 = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _c54fa6b03104.length > size ? _c54fa6b03104.slice(0, size) + "..." : _c54fa6b03104;
}
function _46e6b4895a35(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _cc3b74453686(value, _397607ddd0f9, _256050d35d18) {
  const _c54fa6b03104 = String(value || "");
  const _0b5df15a7105 = _c54fa6b03104.indexOf(_397607ddd0f9);
  if (_0b5df15a7105 < 0) return "";
  const _464236d318ac = _0b5df15a7105 + _397607ddd0f9.length;
  const _cce97cbb303d = _c54fa6b03104.indexOf(_256050d35d18, _464236d318ac);
  return _c54fa6b03104.slice(_464236d318ac, _cce97cbb303d < 0 ? _464236d318ac + 16 : _cce97cbb303d).trim();
}
function _1bdb8bb211c2(value) { return _cc3b74453686(value, _883e2146b890(["form", "hash", "="]), "&"); }
function _08e4c30df53d(value) {
  const _a807fd15c129 = _883e2146b890(["layer", ".msg('"]);
  const _c54fa6b03104 = String(value || "");
  const _397607ddd0f9 = _c54fa6b03104.indexOf(_a807fd15c129);
  if (_397607ddd0f9 < 0) return [];
  const _464236d318ac = _397607ddd0f9 + _a807fd15c129.length;
  const _256050d35d18 = _c54fa6b03104.indexOf("')", _464236d318ac);
  return _256050d35d18 < 0 ? [] : [_c54fa6b03104.slice(_464236d318ac, _256050d35d18)];
}
function _f661101523a6(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _1b25cffb6819(ok, title, body) {
  if (_f17ae4aa5563.value) return;
  _f17ae4aa5563.value = true;
  _2cb347651ce6("━━━━━━━━ 执行结束 ━━━━━━━━");
  _2cb347651ce6(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _7fd7b1c8b970 = typeof $notification !== "undefined";
  if (_6af38c2ae5ee.notify_enabled !== false && _7fd7b1c8b970) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _a143e69927c3(body || _d659c5e2bc0f.join("\n"), 700));
  const _37b34d59dd78 = typeof $done === "function";
  if (_37b34d59dd78) $done({});
}
function _24ab1aa954fc(options, callback, attempt) {
  const _3b6361650b9d = String(options.method || "GET").toLowerCase();
  const _f5a82b6f504c = $httpClient[_3b6361650b9d] || $httpClient.get;
  const _499f8c8ead69 = { _1dfecc653137: options.url, _77cd2a4b1285: options.headers, body: options.body, timeout: options.timeout || 20000 };
  _499f8c8ead69[_883e2146b890(["auto", "-", "redirect"])] = true;
  _499f8c8ead69[_883e2146b890(["auto", "-", "cookie"])] = true;
  _499f8c8ead69.alpn = "h2";
  _f5a82b6f504c(_499f8c8ead69, (error, response, _a1844a6dc099) => {
    const _c54fa6b03104 = String(error || "");
    if (_c54fa6b03104 && (attempt || 0) < 2 && (_c54fa6b03104.indexOf("closed") >= 0 || _c54fa6b03104.indexOf("timed out") >= 0)) {
      _2cb347651ce6("🔁 连接中断，正在重试");
      return _24ab1aa954fc(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_a1844a6dc099 || ""));
  });
}
function _e38f1bdc7bf3(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _0bbd777c8a59 = _883e2146b890(["ht", "tps", "://"]);
const _ae509c2b56f4 = [121, 99, 111, 111, 46, 110, 101, 116].map(_f124a9276e03 => String.fromCharCode(_f124a9276e03)).join("");
function _956e900b4aab(path) { return _0bbd777c8a59 + _ae509c2b56f4 + String.fromCharCode(47) + String(path || ""); }
const _8f3cbf4339b1 = _883e2146b890(["plu", "gin", ".", "php"]);
const _bc567016bd93 = _883e2146b890(["k", "_", "mi", "sign"]);
const _50025e4cb749 = _883e2146b890(["view", "ui", "_", "lottery"]);
const _476925493b95 = _883e2146b890(["jn", "farm"]);

function _29f171c6f9b2(_77cd2a4b1285, name) {
  const _36c7ea912d4e = _08a2d37ee504(_77cd2a4b1285, name);
  return Array.isArray(_36c7ea912d4e) ? _36c7ea912d4e.join(",") : String(_36c7ea912d4e || "");
}
function _69c31e77ec8b(_509bdb856777, extra) {
  const _5737583d9e5a = {};
  [_509bdb856777, extra].join("; ").split(";").forEach(item => {
    const _c54fa6b03104 = item.trim();
    const _7680f3fd4404 = _c54fa6b03104.indexOf("=");
    if (_7680f3fd4404 > 0) _5737583d9e5a[_c54fa6b03104.slice(0, _7680f3fd4404)] = _c54fa6b03104.slice(_7680f3fd4404 + 1);
  });
  return Object.keys(_5737583d9e5a).map(_096ef1d177bb => _096ef1d177bb + "=" + _5737583d9e5a[_096ef1d177bb]).join("; ");
}
function _c4d157b106e6() {
  try {
    const _ef920c56633f = typeof $request !== "undefined" ? $request : {};
    const _22f4e15028d8 = typeof $response !== "undefined" ? $response : {};
    const _1dfecc653137 = String(_ef920c56633f.url || "");
    const _243566d3734c = _29f171c6f9b2(_ef920c56633f.headers, "Cookie");
    const _70070aa3597a = _29f171c6f9b2(_22f4e15028d8.headers, "Set-Cookie");
    const _3ddf21a5a98a = _69c31e77ec8b(_243566d3734c, "");
    const _4d986e70f8f7 = _3ddf21a5a98a.split("; ").filter(Boolean);
    const _02c0e74c0818 = Object.keys(_ef920c56633f.headers || {}).concat(Object.keys(_22f4e15028d8.headers || {}));
    const _dce06ea230f0 = _4d986e70f8f7.some(item => item.indexOf("auth=") >= 0);
    _2cb347651ce6("🧪 调试模式：开启");
    _2cb347651ce6("🍪 登录状态抓取");
    _2cb347651ce6("🌐 页面：" + _a143e69927c3(_1dfecc653137, 180));
    _2cb347651ce6("📋 头名称：" + _02c0e74c0818.map(item => item.toLowerCase()).join(","));
    _2cb347651ce6("🔑 请求长度：" + _243566d3734c.length + "，字段：" + _4d986e70f8f7.length);
    _2cb347651ce6("🏷️ 字段名：" + _4d986e70f8f7.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_dce06ea230f0) {
      _2cb347651ce6("ℹ️ 当前响应没有完整登录状态");
      return _1b25cffb6819(true, "", "");
    }
    const _87e39e029e84 = _de69e2538263("session");
    const _527aaf8485f3 = Number(_de69e2538263("notified") || 0);
    const _0e1d267ffdba = _0551c438331a("session", _3ddf21a5a98a);
    _0551c438331a("updated", new Date().toISOString());
    _2cb347651ce6(_87e39e029e84 === _3ddf21a5a98a ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _2cb347651ce6("💾 存储键：" + _6109da8dc790 + "，写入：" + _0e1d267ffdba + "，回读长度：" + _de69e2538263("session").length);
    if (_87e39e029e84 !== _3ddf21a5a98a && Date.now() - _527aaf8485f3 > 60000) {
      _0551c438331a("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _4d986e70f8f7.length + " 项 / " + _3ddf21a5a98a.length);
    }
    _1b25cffb6819(true, "", "");
  } catch (error) {
    _2cb347651ce6("❌ 登录状态异常：" + error);
    _1b25cffb6819(false, "登录状态失败", String(error));
  }
}
function _422d0428ea2b(callback) {
  const _3ddf21a5a98a = _de69e2538263("session");
  if (!_3ddf21a5a98a) return callback("missing");
  const _77cd2a4b1285 = {};
  _77cd2a4b1285[_883e2146b890(["C", "ookie"])] = _3ddf21a5a98a;
  _77cd2a4b1285[_883e2146b890(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _77cd2a4b1285.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _24ab1aa954fc({ _1dfecc653137: _956e900b4aab("forum.php"), _77cd2a4b1285 }, (error, response, _a1844a6dc099) => {
    if (error) return callback(error);
    if (_a1844a6dc099.indexOf(_883e2146b890(["action", "=", "logout"])) < 0) return callback("expired");
    const _f124a9276e03 = _1bdb8bb211c2(_a1844a6dc099);
    if (!_f124a9276e03) return callback("token");
    callback(null, { _77cd2a4b1285, _f124a9276e03 });
  });
}
function _491996938f82(ctx, callback) {
  const _77cd2a4b1285 = Object.assign({}, ctx.headers);
  _77cd2a4b1285.Referer = _956e900b4aab(_883e2146b890([_bc567016bd93, "-", "sign", ".", "html"]));
  _77cd2a4b1285[_883e2146b890(["X", "-", "Requested", "-", "With"])] = _883e2146b890(["XML", "Http", "Request"]);
  _24ab1aa954fc({ _1dfecc653137: _956e900b4aab(_8f3cbf4339b1 + "?id=" + _bc567016bd93 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _77cd2a4b1285 }, (error, response, _a1844a6dc099) => {
    _2cb347651ce6("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _5039010a779c = _a1844a6dc099.indexOf("今日已签") >= 0;
    const _53ec631194e8 = _5039010a779c || _a1844a6dc099.indexOf("<![CDATA[]]>") >= 0;
    _24ab1aa954fc({ _1dfecc653137: _956e900b4aab(_883e2146b890([_bc567016bd93, "-", "sign", ".", "html"])), _77cd2a4b1285: ctx.headers }, (error2, response2, page) => {
      const _c23810c08ccf = _cc3b74453686(page, "签到排名：", " ");
      const _220bbd030404 = _cc3b74453686(page, 'id="lxtdays" value="', '"');
      const _3fd5b61bd87b = _cc3b74453686(page, 'id="lxlevel" value="', '"');
      const _2cae57f4ab69 = _cc3b74453686(page, 'id="lxreward" value="', '"');
      _2cb347651ce6(_5039010a779c ? "ℹ️ 今日已经签到" : _53ec631194e8 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_c23810c08ccf) _2cb347651ce6("🏆 当前排名：" + _c23810c08ccf);
      if (_220bbd030404) _2cb347651ce6("📆 累计天数：" + _220bbd030404);
      if (_3fd5b61bd87b) _2cb347651ce6("🏅 签到等级：LV." + _3fd5b61bd87b);
      if (_2cae57f4ab69) _2cb347651ce6("💰 最近奖励：" + _2cae57f4ab69);
      callback([_5039010a779c ? "ℹ️ 今日已签到" : _53ec631194e8 ? "✅ 签到成功" : "⚠️ 签到异常", _c23810c08ccf ? "🏆 排名 " + _c23810c08ccf : "", _220bbd030404 ? "📆 累计 " + _220bbd030404 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _883fdec37f2e(ctx, callback) {
  const _77cd2a4b1285 = Object.assign({}, ctx.headers);
  _77cd2a4b1285.Referer = _956e900b4aab(_8f3cbf4339b1 + "?id=" + _50025e4cb749);
  _77cd2a4b1285[_883e2146b890(["X", "-", "Requested", "-", "With"])] = _883e2146b890(["XML", "Http", "Request"]);
  _77cd2a4b1285.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _509bdb856777 = _956e900b4aab(_8f3cbf4339b1 + "?id=" + _50025e4cb749 + ":draw");
  const _3c9cd6a31d8f = ["🎰 幸运抽奖"];
  const _92ef51b80a6d = guard => {
    if (guard <= 0) { _3c9cd6a31d8f.forEach(_2cb347651ce6); return callback(_3c9cd6a31d8f.join("\n")); }
    _24ab1aa954fc({ _1dfecc653137: _509bdb856777 + "?drawnumber=1&inajax=1", _77cd2a4b1285 }, (error, response, _a1844a6dc099) => {
      let _4d4aa0caaeac = {};
      try { _4d4aa0caaeac = JSON.parse(_a1844a6dc099); } catch (ignored) {}
      const _45c9eab92a07 = String((_4d4aa0caaeac.data || {})["2"] || "");
      if (error || _4d4aa0caaeac.result !== "succeed" || _45c9eab92a07.indexOf("抽奖券") < 0) {
        _3c9cd6a31d8f.push("ℹ️ " + (error || _4d4aa0caaeac.msg || "没有可用抽奖券"));
        _3c9cd6a31d8f.forEach(_2cb347651ce6);
        return callback(_3c9cd6a31d8f.join("\n"));
      }
      _24ab1aa954fc({ _1dfecc653137: _509bdb856777 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _77cd2a4b1285 }, (error2, response2, raw) => {
        let _2acdb3afecb4 = {};
        try { _2acdb3afecb4 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _2acdb3afecb4.result !== "succeed") {
          _3c9cd6a31d8f.push("⚠️ " + (error2 || _2acdb3afecb4.msg || "抽奖失败"));
          _3c9cd6a31d8f.forEach(_2cb347651ce6);
          return callback(_3c9cd6a31d8f.join("\n"));
        }
        const _aeb8b3e5ec74 = (((_2acdb3afecb4.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _0b5df15a7105 = String((_2acdb3afecb4.data || {}).ticketnumber || "0");
        const _453675b49608 = String((_2acdb3afecb4.data || {}).creditnumber || "");
        _3c9cd6a31d8f.push("🎁 第 " + _3c9cd6a31d8f.length + " 次：" + (_aeb8b3e5ec74.join("、") || _2acdb3afecb4.msg || "成功"));
        _3c9cd6a31d8f.push("🎟️ 剩余抽奖券：" + _0b5df15a7105 + (_453675b49608 ? "  💰 星币：" + _453675b49608 : ""));
        if (_0b5df15a7105 === "0") { _3c9cd6a31d8f.forEach(_2cb347651ce6); return callback(_3c9cd6a31d8f.join("\n")); }
        _92ef51b80a6d(guard - 1);
      });
    });
  };
  _92ef51b80a6d(10);
}
function _0217bcdf654d(ctx, callback) {
  const _77cd2a4b1285 = Object.assign({}, ctx.headers);
  _77cd2a4b1285.Referer = _956e900b4aab(_8f3cbf4339b1 + "?id=" + _476925493b95);
  _77cd2a4b1285[_883e2146b890(["X", "-", "Requested", "-", "With"])] = _883e2146b890(["XML", "Http", "Request"]);
  const _ad894fb4d492 = ["🌾 农场与福利"];
  const _d409deb7105a = query => _956e900b4aab(_8f3cbf4339b1 + "?id=" + _476925493b95 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _493d339893d3 = [
    ["每日免费领取", _883e2146b890(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _883e2146b890(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _8b129fe482bf = 1; _8b129fe482bf <= 8; _8b129fe482bf += 1) _493d339893d3.push(["地块 " + _8b129fe482bf, _883e2146b890(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _8b129fe482bf]);
  const _8c9299dcc7a7 = _8b129fe482bf => {
    if (_8b129fe482bf >= _493d339893d3.length) { _ad894fb4d492.forEach(_2cb347651ce6); return callback(_ad894fb4d492.join("\n")); }
    const _f7ab8d2cd100 = _493d339893d3[_8b129fe482bf];
    _24ab1aa954fc({ _1dfecc653137: _d409deb7105a(_f7ab8d2cd100[1]), _77cd2a4b1285 }, (error, response, _a1844a6dc099) => {
      const _dcb0d3a88bfe = _08e4c30df53d(_a1844a6dc099)[0] || _a143e69927c3(_46e6b4895a35(_a1844a6dc099), 80);
      const _4a215a0c5bd5 = _f661101523a6(_dcb0d3a88bfe, ["成功", "完成", "可领取"]) ? "✅" : _f661101523a6(_dcb0d3a88bfe, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _ad894fb4d492.push(_4a215a0c5bd5 + " " + _f7ab8d2cd100[0] + "：" + (error || _dcb0d3a88bfe || "无返回"));
      const _8f4aaf207a22 = _cc3b74453686(_f7ab8d2cd100[1], "jfid=", "&");
      if (_8f4aaf207a22 && _f661101523a6(_a1844a6dc099, ["已枯萎", "清除"])) {
        return _24ab1aa954fc({ _1dfecc653137: _d409deb7105a(_883e2146b890(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _8f4aaf207a22), _77cd2a4b1285 }, (error2, response2, cleared) => {
          _ad894fb4d492.push((_f661101523a6(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _8f4aaf207a22);
          _24ab1aa954fc({ _1dfecc653137: _d409deb7105a(_883e2146b890(["do=", "plant", "seed", "&seed=1&jfid="]) + _8f4aaf207a22 + "&timestamp=" + Math.floor(Date.now() / 1000)), _77cd2a4b1285 }, (error3, response3, planted) => {
            _ad894fb4d492.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _8f4aaf207a22 + "：" + (_08e4c30df53d(planted)[0] || "无返回"));
            _8c9299dcc7a7(_8b129fe482bf + 1);
          });
        });
      }
      _8c9299dcc7a7(_8b129fe482bf + 1);
    });
  };
  _24ab1aa954fc({ _1dfecc653137: _d409deb7105a(_883e2146b890(["do=", "normal", "&ac=", "kuo", "zhan"])), _77cd2a4b1285 }, (error, response, _a1844a6dc099) => {
    _ad894fb4d492.push((_f661101523a6(_08e4c30df53d(_a1844a6dc099)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _08e4c30df53d(_a1844a6dc099)[0] || "无返回"));
    _8c9299dcc7a7(0);
  });
}
function _3597ca4e53e6() {
  _2cb347651ce6("🧪 调试模式：开启");
  _2cb347651ce6("🚀 论坛任务开始");
  _2cb347651ce6("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _2cb347651ce6("💾 存储键：" + _6109da8dc790 + "，登录状态长度：" + _de69e2538263("session").length);
  _422d0428ea2b((error, ctx) => {
    if (error === "missing") return _1b25cffb6819(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _1b25cffb6819(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _1b25cffb6819(false, "论坛任务失败", String(error));
    _2cb347651ce6("🔐 登录状态有效");
    _491996938f82(ctx, one => _883fdec37f2e(ctx, two => _0217bcdf654d(ctx, three => _1b25cffb6819(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_2cb347651ce6("🧪 调试模式：开启");
_2cb347651ce6("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录抓取" : "签到任务"));
const _4be8248c9868 = typeof $request !== "undefined";
if (_4be8248c9868) _c4d157b106e6();
else _3597ca4e53e6();

})();
