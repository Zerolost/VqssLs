/*94ad01a5efdc*/
(function(){
const _557c128f597d = typeof $argument === "object" && $argument ? $argument : {};
const _bbde0f9ac93c = $persistentStore;
const _d59de0b91bab = "f3k9m2_store";
const _4ff89100d874 = true;
const _42e9d094b546 = { value: false };
const _2623d2f68863 = [];
const _4994e913259f = values => values.join("");

function _a85f19da9d5c() {
  try { return JSON.parse(_bbde0f9ac93c.read(_d59de0b91bab) || "{}") || {}; }
  catch (error) { return {}; }
}
function _d22793e3f56a(_6df20d9f3fef) { return _bbde0f9ac93c.write(JSON.stringify(_6df20d9f3fef), _d59de0b91bab); }
function _caf45653a8e9(name) { return String(_a85f19da9d5c()[name] || ""); }
function _65479fda15b1(name, value) {
  const _6df20d9f3fef = _a85f19da9d5c();
  if (value == null) delete _6df20d9f3fef[name];
  else _6df20d9f3fef[name] = String(value);
  return _d22793e3f56a(_6df20d9f3fef);
}
function _340b7ce28b31(_75840600bd03, name) {
  const _3b6ecfa739cd = Object.keys(_75840600bd03 || {}).find(item => item.toLowerCase() === name.toLowerCase());
  return _3b6ecfa739cd ? String(_75840600bd03[_3b6ecfa739cd] || "") : "";
}
function _2481c592ed40(_2c214ef62d87) {
  const _db3b6f4736cf = String(_2c214ef62d87);
  _2623d2f68863.push(_db3b6f4736cf);
  if (_4ff89100d874) console.log(_db3b6f4736cf);
}
function _8015bb83384f(value, size) {
  const _db3b6f4736cf = String(value || "").split(String.fromCharCode(32)).join(" ").trim();
  return _db3b6f4736cf.length > size ? _db3b6f4736cf.slice(0, size) + "..." : _db3b6f4736cf;
}
function _5fd455ac8caa(value) { return String(value || "").split("<").join(" ").split(">").join(" ").trim(); }
function _64f8760e1f0b(value, _4c7402924159, _ec7ce75a029f) {
  const _db3b6f4736cf = String(value || "");
  const _d9e27403fdce = _db3b6f4736cf.indexOf(_4c7402924159);
  if (_d9e27403fdce < 0) return "";
  const _a1e0736e9b33 = _d9e27403fdce + _4c7402924159.length;
  const _c9257813d70c = _db3b6f4736cf.indexOf(_ec7ce75a029f, _a1e0736e9b33);
  return _db3b6f4736cf.slice(_a1e0736e9b33, _c9257813d70c < 0 ? _a1e0736e9b33 + 16 : _c9257813d70c).trim();
}
function _14b662c1365d(value) { return _64f8760e1f0b(value, _4994e913259f(["form", "hash", "="]), "&"); }
function _1823fb5c3a96(value) {
  const _543850e2092a = _4994e913259f(["layer", ".msg('"]);
  const _db3b6f4736cf = String(value || "");
  const _4c7402924159 = _db3b6f4736cf.indexOf(_543850e2092a);
  if (_4c7402924159 < 0) return [];
  const _a1e0736e9b33 = _4c7402924159 + _543850e2092a.length;
  const _ec7ce75a029f = _db3b6f4736cf.indexOf("')", _a1e0736e9b33);
  return _ec7ce75a029f < 0 ? [] : [_db3b6f4736cf.slice(_a1e0736e9b33, _ec7ce75a029f)];
}
function _d47506a8fd46(value, words) { return words.some(word => String(value || "").indexOf(word) >= 0); }
function _06baedc31cac(ok, title, body) {
  if (_42e9d094b546.value) return;
  _42e9d094b546.value = true;
  _2481c592ed40("━━━━━━━━ 执行结束 ━━━━━━━━");
  _2481c592ed40(ok ? "✅ 本次任务完成" : "❌ 本次任务未完成");
  const _1d4e27b39659 = typeof $notification !== "undefined";
  if (_557c128f597d.notify_enabled !== false && _1d4e27b39659) $notification.post(title || "论坛任务", ok ? "✅ 已完成" : "❌ 未完成", _8015bb83384f(body || _2623d2f68863.join("\n"), 700));
  const _b4c73b7ce8d2 = typeof $done === "function";
  if (_b4c73b7ce8d2) $done({});
}
function _fb3b88c7a35c(options, callback, attempt) {
  const _608c4cc8f6c4 = String(options.method || "GET").toLowerCase();
  const _914a3048c76c = $httpClient[_608c4cc8f6c4] || $httpClient.get;
  const _fdac56f2ad38 = {};
  _fdac56f2ad38["url"] = String(options.url || "");
  _fdac56f2ad38["headers"] = options.headers || {};
  _fdac56f2ad38["body"] = options.body || "";
  _fdac56f2ad38["timeout"] = options.timeout || 20000;
  _fdac56f2ad38["auto-redirect"] = true;
  _fdac56f2ad38["auto-cookie"] = true;
  _fdac56f2ad38["alpn"] = "h2";
  _2481c592ed40("🌐 请求：" + _fdac56f2ad38["url"]);
  _914a3048c76c(_fdac56f2ad38, (error, response, _6df20d9f3fef) => {
    const _db3b6f4736cf = String(error || "");
    if (_db3b6f4736cf && (attempt || 0) < 2 && (_db3b6f4736cf.indexOf("closed") >= 0 || _db3b6f4736cf.indexOf("timed out") >= 0)) {
      _2481c592ed40("🔁 连接中断，正在重试");
      return _fb3b88c7a35c(options, callback, (attempt || 0) + 1);
    }
    callback(error, response || {}, String(_6df20d9f3fef || ""));
  });
}
function _504aace2fdf1(value) {
  return String(value || "").split(",").map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") >= 0).join("; ");
}
const _ab956b87cd14 = _4994e913259f(["ht", "tps", "://"]);
const _8797430ab596 = [121, 99, 111, 111, 46, 110, 101, 116].map(_e28294dcd661 => String.fromCharCode(_e28294dcd661)).join("");
function _97cb8a9e74b7(path) { return _ab956b87cd14 + _8797430ab596 + String.fromCharCode(47) + String(path || ""); }
const _4878c1a92a84 = _4994e913259f(["plu", "gin", ".", "php"]);
const _6e6b7d4d5803 = _4994e913259f(["k", "_", "mi", "sign"]);
const _9c0fb850c291 = _4994e913259f(["view", "ui", "_", "lottery"]);
const _0cf400246a39 = _4994e913259f(["jn", "farm"]);

function _6192a82ee332(_75840600bd03, name) {
  const _0d32a5478e6b = _340b7ce28b31(_75840600bd03, name);
  return Array.isArray(_0d32a5478e6b) ? _0d32a5478e6b.join(",") : String(_0d32a5478e6b || "");
}
function _cd3ed02d10d5(value) {
  const _db3b6f4736cf = String(value || "");
  const _6c5898279031 = (_db3b6f4736cf.match(/;/g) || []).length;
  const _32d6adafa46d = (_db3b6f4736cf.match(/,/g) || []).length;
  const _ab9a2aee5d05 = _32d6adafa46d > _6c5898279031 ? "," : ";";
  return _db3b6f4736cf.split(_ab9a2aee5d05).map(item => item.split(";")[0].trim()).filter(item => item.indexOf("=") > 0);
}
function _8ef3a33e01d1(_5459cc404514, extra) {
  const _b333661cf640 = {};
  _cd3ed02d10d5(_5459cc404514).concat(_cd3ed02d10d5(extra)).forEach(item => {
    const _10fceac16165 = item.indexOf("=");
    _b333661cf640[item.slice(0, _10fceac16165)] = item.slice(_10fceac16165 + 1);
  });
  return Object.keys(_b333661cf640).map(_3b6ecfa739cd => _3b6ecfa739cd + "=" + _b333661cf640[_3b6ecfa739cd]).join("; ");
}
function _ae70f6e0b054() {
  try {
    const _ee58d25b36fe = typeof $request !== "undefined" ? $request : {};
    const _4881fccac74e = typeof $response !== "undefined" ? $response : {};
    const _67d96be9b603 = String(_ee58d25b36fe.url || "");
    const _8c62ef9fb399 = _6192a82ee332(_ee58d25b36fe.headers, "Cookie");
    const _36e12931ed7c = _6192a82ee332(_4881fccac74e.headers, "Set-Cookie");
    const _9a70f2476c99 = _8ef3a33e01d1(_8c62ef9fb399, "");
    const _023f89958a06 = _9a70f2476c99.split("; ").filter(Boolean);
    const _39a1cded26ce = Object.keys(_ee58d25b36fe.headers || {}).concat(Object.keys(_4881fccac74e.headers || {}));
    const _a0d00e1a7190 = _023f89958a06.some(item => item.indexOf("auth=") >= 0);
    _2481c592ed40("🧪 调试模式：开启");
    _2481c592ed40("🍪 登录状态抓取");
    _2481c592ed40("🌐 页面：" + _8015bb83384f(_67d96be9b603, 180));
    _2481c592ed40("📋 头名称：" + _39a1cded26ce.map(item => item.toLowerCase()).join(","));
    _2481c592ed40("🔑 请求长度：" + _8c62ef9fb399.length + "，字段：" + _023f89958a06.length);
    _2481c592ed40("🏷️ 字段名：" + _023f89958a06.map(item => item.slice(0, item.indexOf("="))).join(","));
    if (!_a0d00e1a7190) {
      _2481c592ed40("ℹ️ 当前响应没有完整登录状态");
      return _06baedc31cac(true, "", "");
    }
    const _ee92bd0d859b = _caf45653a8e9("session");
    const _86ea96a19cc3 = Number(_caf45653a8e9("notified") || 0);
    const _a87f2e545500 = _65479fda15b1("session", _9a70f2476c99);
    _65479fda15b1("updated", new Date().toISOString());
    _2481c592ed40(_ee92bd0d859b === _9a70f2476c99 ? "✅ 登录状态未变化" : "✅ 登录状态已获取");
    _2481c592ed40("💾 存储键：" + _d59de0b91bab + "，写入：" + _a87f2e545500 + "，回读长度：" + _caf45653a8e9("session").length);
    if (_ee92bd0d859b !== _9a70f2476c99 && Date.now() - _86ea96a19cc3 > 60000) {
      _65479fda15b1("notified", Date.now());
      $notification.post("论坛登录状态", "✅ 已获取", _023f89958a06.length + " 项 / " + _9a70f2476c99.length);
    }
    _06baedc31cac(true, "", "");
  } catch (error) {
    _2481c592ed40("❌ 登录状态异常：" + error);
    _06baedc31cac(false, "登录状态失败", String(error));
  }
}
function _dea32ec3c4f3(callback) {
  const _9a70f2476c99 = _caf45653a8e9("session");
  if (!_9a70f2476c99) return callback("missing");
  const _75840600bd03 = {};
  _75840600bd03[_4994e913259f(["C", "ookie"])] = _9a70f2476c99;
  _75840600bd03[_4994e913259f(["User", "-", "Agent"])] = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  _75840600bd03.Accept = "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8";
  _fb3b88c7a35c({ url: _97cb8a9e74b7("forum.php"), _75840600bd03 }, (error, response, _6df20d9f3fef) => {
    if (error) return callback(error);
    if (_6df20d9f3fef.indexOf(_4994e913259f(["action", "=", "logout"])) < 0) return callback("expired");
    const _e28294dcd661 = _14b662c1365d(_6df20d9f3fef);
    if (!_e28294dcd661) return callback("token");
    callback(null, { _75840600bd03, _e28294dcd661 });
  });
}
function _c7a633a68201(ctx, callback) {
  const _75840600bd03 = Object.assign({}, ctx.headers);
  _75840600bd03.Referer = _97cb8a9e74b7(_4994e913259f([_6e6b7d4d5803, "-", "sign", ".", "html"]));
  _75840600bd03[_4994e913259f(["X", "-", "Requested", "-", "With"])] = _4994e913259f(["XML", "Http", "Request"]);
  _fb3b88c7a35c({ url: _97cb8a9e74b7(_4878c1a92a84 + "?id=" + _6e6b7d4d5803 + ":sign&operation=qiandao&format=empty&inajax=1&formhash=" + ctx.code), _75840600bd03 }, (error, response, _6df20d9f3fef) => {
    _2481c592ed40("📅 每日签到");
    if (error) return callback("❌ 请求失败：" + error);
    const _c4b121545874 = _6df20d9f3fef.indexOf("今日已签") >= 0;
    const _1cf768470a76 = _c4b121545874 || _6df20d9f3fef.indexOf("<![CDATA[]]>") >= 0;
    _fb3b88c7a35c({ url: _97cb8a9e74b7(_4994e913259f([_6e6b7d4d5803, "-", "sign", ".", "html"])), headers: ctx.headers }, (error2, response2, page) => {
      const _f34c5fc0d147 = _64f8760e1f0b(page, "签到排名：", " ");
      const _f0b0d71d9bd1 = _64f8760e1f0b(page, 'id="lxtdays" value="', '"');
      const _2d1f48de1890 = _64f8760e1f0b(page, 'id="lxlevel" value="', '"');
      const _d6d499a31107 = _64f8760e1f0b(page, 'id="lxreward" value="', '"');
      _2481c592ed40(_c4b121545874 ? "ℹ️ 今日已经签到" : _1cf768470a76 ? "✅ 今日签到成功" : "⚠️ 签到返回异常");
      if (_f34c5fc0d147) _2481c592ed40("🏆 当前排名：" + _f34c5fc0d147);
      if (_f0b0d71d9bd1) _2481c592ed40("📆 累计天数：" + _f0b0d71d9bd1);
      if (_2d1f48de1890) _2481c592ed40("🏅 签到等级：LV." + _2d1f48de1890);
      if (_d6d499a31107) _2481c592ed40("💰 最近奖励：" + _d6d499a31107);
      callback([_c4b121545874 ? "ℹ️ 今日已签到" : _1cf768470a76 ? "✅ 签到成功" : "⚠️ 签到异常", _f34c5fc0d147 ? "🏆 排名 " + rank : "", _f0b0d71d9bd1 ? "📆 累计 " + _f0b0d71d9bd1 + " 天" : ""].filter(Boolean).join("\n"));
    });
  });
}
function _e264ddecea07(ctx, callback) {
  const _75840600bd03 = Object.assign({}, ctx.headers);
  _75840600bd03.Referer = _97cb8a9e74b7(_4878c1a92a84 + "?id=" + _9c0fb850c291);
  _75840600bd03[_4994e913259f(["X", "-", "Requested", "-", "With"])] = _4994e913259f(["XML", "Http", "Request"]);
  _75840600bd03.Accept = "application/json,text/javascript,*/*;q=0.8";
  const _5459cc404514 = _97cb8a9e74b7(_4878c1a92a84 + "?id=" + _9c0fb850c291 + ":draw");
  const _60d702352774 = ["🎰 幸运抽奖"];
  const _38b0478d8084 = guard => {
    if (guard <= 0) { _60d702352774.forEach(_2481c592ed40); return callback(_60d702352774.join("\n")); }
    _fb3b88c7a35c({ url: _5459cc404514 + "?drawnumber=1&inajax=1", _75840600bd03 }, (error, response, _6df20d9f3fef) => {
      let _eb2b6c7b4097 = {};
      try { _eb2b6c7b4097 = JSON.parse(_6df20d9f3fef); } catch (ignored) {}
      const _5dc0dc71b0d1 = String((_eb2b6c7b4097.data || {})["2"] || "");
      if (error || _eb2b6c7b4097.result !== "succeed" || _5dc0dc71b0d1.indexOf("抽奖券") < 0) {
        _60d702352774.push("ℹ️ " + (error || _eb2b6c7b4097.msg || "没有可用抽奖券"));
        _60d702352774.forEach(_2481c592ed40);
        return callback(_60d702352774.join("\n"));
      }
      _fb3b88c7a35c({ url: _5459cc404514 + "?drawnumber=1&pay=2&formhash=" + ctx.code + "&inajax=1", _75840600bd03 }, (error2, response2, raw) => {
        let _6a2c83be3586 = {};
        try { _6a2c83be3586 = JSON.parse(raw); } catch (ignored) {}
        if (error2 || _6a2c83be3586.result !== "succeed") {
          _60d702352774.push("⚠️ " + (error2 || _6a2c83be3586.msg || "抽奖失败"));
          _60d702352774.forEach(_2481c592ed40);
          return callback(_60d702352774.join("\n"));
        }
        const _f333573018a2 = (((_6a2c83be3586.data || {}).getprizes) || []).map(item => (item.typename || "奖品") + "：" + (item.name || "未知"));
        const _d9e27403fdce = String((_6a2c83be3586.data || {}).ticketnumber || "0");
        const _8bda203ce0b4 = String((_6a2c83be3586.data || {}).creditnumber || "");
        _60d702352774.push("🎁 第 " + _60d702352774.length + " 次：" + (_f333573018a2.join("、") || _6a2c83be3586.msg || "成功"));
        _60d702352774.push("🎟️ 剩余抽奖券：" + _d9e27403fdce + (_8bda203ce0b4 ? "  💰 星币：" + credit : ""));
        if (_d9e27403fdce === "0") { _60d702352774.forEach(_2481c592ed40); return callback(_60d702352774.join("\n")); }
        _38b0478d8084(guard - 1);
      });
    });
  };
  _38b0478d8084(10);
}
function _6e0d1a355d8f(ctx, callback) {
  const _75840600bd03 = Object.assign({}, ctx.headers);
  _75840600bd03.Referer = _97cb8a9e74b7(_4878c1a92a84 + "?id=" + _0cf400246a39);
  _75840600bd03[_4994e913259f(["X", "-", "Requested", "-", "With"])] = _4994e913259f(["XML", "Http", "Request"]);
  const _926107509fad = ["🌾 农场与福利"];
  const _5e467fde5b1a = query => _97cb8a9e74b7(_4878c1a92a84 + "?id=" + _0cf400246a39 + "&" + query + "&formhash=" + ctx.code + "&inajax=1");
  const _062b88d54c23 = [
    ["每日免费领取", _4994e913259f(["do=", "daily", "quest", "&", "quest", "id=1"])],
    ["批量收获", _4994e913259f(["do=", "harvest", "&ac=", "all"])]
  ];
  for (let _751a409b24c3 = 1; _751a409b24c3 <= 8; _751a409b24c3 += 1) _062b88d54c23.push(["地块 " + _751a409b24c3, _4994e913259f(["do=", "normal", "&ac=", "this", "farm", "&jfid="]) + _751a409b24c3]);
  const _a909aaf193ff = _751a409b24c3 => {
    if (_751a409b24c3 >= _062b88d54c23.length) { _926107509fad.forEach(_2481c592ed40); return callback(_926107509fad.join("\n")); }
    const _c7bbd3fb278f = _062b88d54c23[_751a409b24c3];
    _fb3b88c7a35c({ url: _5e467fde5b1a(_c7bbd3fb278f[1]), _75840600bd03 }, (error, response, _6df20d9f3fef) => {
      const _2c214ef62d87 = _1823fb5c3a96(_6df20d9f3fef)[0] || _8015bb83384f(_5fd455ac8caa(_6df20d9f3fef), 80);
      const _2eee0fafe2b3 = _d47506a8fd46(_2c214ef62d87, ["成功", "完成", "可领取"]) ? "✅" : _d47506a8fd46(_2c214ef62d87, ["未到", "没有", "不足", "已", "未知"]) ? "ℹ️" : "⚠️";
      _926107509fad.push(_2eee0fafe2b3 + " " + _c7bbd3fb278f[0] + "：" + (error || _2c214ef62d87 || "无返回"));
      const _bf6673097c2b = _64f8760e1f0b(_c7bbd3fb278f[1], "jfid=", "&");
      if (_bf6673097c2b && _d47506a8fd46(_6df20d9f3fef, ["已枯萎", "清除"])) {
        return _fb3b88c7a35c({ url: _5e467fde5b1a(_4994e913259f(["do=", "normal", "&ac=", "this", "farm", "&", "eradicate", "=true&jfid="]) + _bf6673097c2b), _75840600bd03 }, (error2, response2, cleared) => {
          _926107509fad.push((_d47506a8fd46(cleared, ["成功", "清除"]) ? "🧹" : "⚠️") + " 清理地块 " + _bf6673097c2b);
          _fb3b88c7a35c({ url: _5e467fde5b1a(_4994e913259f(["do=", "plant", "seed", "&seed=1&jfid="]) + _bf6673097c2b + "&timestamp=" + Math.floor(Date.now() / 1000)), _75840600bd03 }, (error3, response3, planted) => {
            _926107509fad.push((planted.indexOf("播种成功") >= 0 ? "🌱" : "ℹ️") + " 播种地块 " + _bf6673097c2b + "：" + (_1823fb5c3a96(planted)[0] || "无返回"));
            _a909aaf193ff(_751a409b24c3 + 1);
          });
        });
      }
      _a909aaf193ff(_751a409b24c3 + 1);
    });
  };
  _fb3b88c7a35c({ url: _5e467fde5b1a(_4994e913259f(["do=", "normal", "&ac=", "kuo", "zhan"])), _75840600bd03 }, (error, response, _6df20d9f3fef) => {
    _926107509fad.push((_d47506a8fd46(_1823fb5c3a96(_6df20d9f3fef)[0] || "", ["成功", "完成"]) ? "✅" : "ℹ️") + " 农场扩展：" + (error || _1823fb5c3a96(_6df20d9f3fef)[0] || "无返回"));
    _a909aaf193ff(0);
  });
}
function _9e0df8169e8f() {
  _2481c592ed40("🧪 调试模式：开启");
  _2481c592ed40("🚀 论坛任务开始");
  _2481c592ed40("🕒 " + new Date().toLocaleString("zh-CN", { hour12: false }));
  _2481c592ed40("💾 存储键：" + _d59de0b91bab + "，登录状态长度：" + _caf45653a8e9("session").length);
  _dea32ec3c4f3((error, ctx) => {
    if (error === "missing") return _06baedc31cac(false, "论坛任务未执行", "尚未捕获登录状态，请先登录论坛");
    if (error === "expired") return _06baedc31cac(false, "论坛登录失效", "请重新登录论坛");
    if (error) return _06baedc31cac(false, "论坛任务失败", String(error));
    _2481c592ed40("🔐 登录状态有效");
    _c7a633a68201(ctx, one => _e264ddecea07(ctx, two => _6e0d1a355d8f(ctx, three => _06baedc31cac(true, "论坛任务完成", [one, two, three].join("\n")))));
  });
}
_2481c592ed40("🧪 调试模式：开启");
_2481c592ed40("🚦 运行入口：" + (typeof $request !== "undefined" ? "登录 Cookie 抓取" : "论坛任务"));
const _851f3ddd02aa = typeof $request !== "undefined";
if (_851f3ddd02aa) _ae70f6e0b054();
else _9e0df8169e8f();

})();
