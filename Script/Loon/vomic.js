/*
name:Vomic每日签到
Version: 1.0.0
*/

const SCRIPT_NAME = "Vomic";
const TOKEN_KEY = "Vomic_Token";
const $ = new Env(SCRIPT_NAME);
const isCapture = ($argument || "").includes("capture");
const isCron = ($argument || "").includes("cron");
const notifyEnable = !($argument || "").includes("notify=false");
const debugEnable = ($argument || "").includes("debug=true");
function log(msg) {
    if (debugEnable) console.log(`[${SCRIPT_NAME}] ${msg}`);
}

function notify(title, sub, body) {
    if (notifyEnable) {
        $.msg(title, sub, body);
    }
}

(async () => {

    try {

        if (isCapture) {
            captureToken();
            return;
        }

        if (isCron) {
            await signTask();
            return;
        }

    } catch (e) {

        console.log(e);

        notify(
            SCRIPT_NAME,
            "脚本运行异常",
            String(e)
        );

    } finally {

        $.done();

    }

})();

//抓取Token
function captureToken() {

    if (!$request) {
        $.done();
        return;
    }

    const auth = $request.headers["authorization"]
        || $request.headers["Authorization"];

    if (!auth) {

        log("请求中不存在Authorization");

        $.done();

        return;
    }

    const token = auth.replace(/^Bearer\s+/i, "").trim();

    if (!token) {

        $.done();

        return;

    }

    const oldToken = $.read(TOKEN_KEY);

    if (oldToken === token) {

        log("Token未变化");

        $.done();

        return;

    }

    $.write(token, TOKEN_KEY);

    notify(
        SCRIPT_NAME,
        "Token更新成功",
        "已自动保存最新登录信息"
    );

    log("Token已保存");

    $.done();

}

//网络请求
function request(method, url, body = null) {

    const token = $.read(TOKEN_KEY);

    return new Promise((resolve, reject) => {

        if (!token) {

            reject("未获取Token");

            return;

        }

        const headers = {

            "authorization": "Bearer " + token,
            "platform": "ios",
            "store": "ios",
            "version": "1.2.0",
            "auditplatform": "default",
            "name": "pics",
            "showtoast": "false",
            "showsuccess": "false",
            "hide-content": "0",
            "content-type": "application/json; charset=utf-8"

        };

        const req = {

            url: url,
            headers: headers

        };

        if (body) {

            req.body = body;

        }

        const callback = (err, resp, data) => {

            if (err) {

                reject(err);

                return;

            }

            try {

                resolve(JSON.parse(data));

            } catch {

                reject(data);

            }

        };

        if (method === "GET") {

            $.get(req, callback);

        } else {

            $.post(req, callback);

        }

    });

}

//日期
function formatDate(date) {

    const y = date.getFullYear();

    const m = String(date.getMonth() + 1).padStart(2, "0");

    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;

}

function getMonthRange() {

    const now = new Date();

    const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    return {

        start: formatDate(start),

        end: formatDate(now),

        today: formatDate(now)

    };

}

//签到记录
async function getSignInfo() {

    const date = getMonthRange();

    const url =
        `https://api.vomicmh.com/pics_new/pics/c/getSignMonthInfo?start=${date.start}&end=${date.end}`;

    log(url);

    return await request(
        "GET",
        url
    );

}

//执行签到
async function doSign() {

    const url =
        "https://api.vomicmh.com/pics_new/pics/c/signIn";

    return await request(
        "POST",
        url,
        "{}"
    );

}

//主任务
async function signTask() {

    const token = $.read(TOKEN_KEY);

    if (!token) {

        notify(
            SCRIPT_NAME,
            "签到失败",
            "未获取到登录Token，请先打开Vomic。"
        );

        return;

    }

    log("开始获取签到记录");

    const monthInfo = await getSignInfo();

    log(JSON.stringify(monthInfo));

    if (!monthInfo || monthInfo.code !== 200) {

        notify(
            SCRIPT_NAME,
            "签到失败",
            "获取签到记录失败"
        );

        return;

    }

    const today = getMonthRange().today;

    const signList = monthInfo.date || [];

    if (signList.includes(today)) {

        notify(
            SCRIPT_NAME,
            "今日已签到",
            today
        );

        log("今日已签到");

        return;

    }

    log("开始签到");

    const result = await doSign();

    log(JSON.stringify(result));

    if (!result) {

        notify(
            SCRIPT_NAME,
            "签到失败",
            "服务器无响应"
        );

        return;

    }

    if (result.code === 200) {

        const data = result.data || {};
        const exp = data.exp || 0;
        const coin = data.coin || 0;
        const streak = data.streak || 0;
        const month = data.month_sign_day || 0;
        const monthStreak = data.month_streak_sign_day || 0;
        const rank = data.rank || "-";

        notify(
            SCRIPT_NAME,
            "签到成功",
            `经验 +${exp}\n金币 +${coin}\n连续签到 ${streak} 天\n本月签到 ${month} 天\n本月连续 ${monthStreak} 天\n今日排名 ${rank}`
        );

        return;

    }

    if (result.code === 401) {

        notify(
            SCRIPT_NAME,
            "登录已失效",
            "请重新打开Vomic获取Token。"
        );

        return;

    }

    notify(
        SCRIPT_NAME,
        "签到失败",
        JSON.stringify(result)
    );

}

//Env
function Env(name) {
    return new (class {
        constructor(name) {
            this.name = name;
        }
        read(key) {
            return $persistentStore.read(key);
        }
        write(val, key) {
            return $persistentStore.write(val, key);
        }
        get(opts, cb) {
            $httpClient.get(opts, cb);
        }
        post(opts, cb) {
            $httpClient.post(opts, cb);
        }
        msg(title, sub, body) {
            $notification.post(title, sub, body);
        }
        done(v = {}) {
            $done(v);
        }
    })(name);
}

//数据存储
const HEADER_KEY = "Vomic_Header";

//抓取请求头
function captureToken() {

    if (!$request) {

        $.done();

        return;

    }

    const headers = Object.assign({}, $request.headers);

    const auth = headers["authorization"] || headers["Authorization"];

    if (!auth) {

        log("未发现Authorization");

        $.done();

        return;

    }

    const token = auth.replace(/^Bearer\s+/i, "").trim();

    headers["authorization"] = "Bearer " + token;
    headers["Authorization"] = "Bearer " + token;

    const old = $.read(TOKEN_KEY);

    $.write(token, TOKEN_KEY);
    $.write(JSON.stringify(headers), HEADER_KEY);

    if (old != token) {

        notify(
               SCRIPT_NAME,
               "Token已更新",
               "新的登录信息已保存"

        );

    }

    log("Header已保存");

    $.done();

}

//请求
function request(method, url, body = null) {

    return new Promise((resolve, reject) => {

        const headerStr = $.read(HEADER_KEY);

        if (!headerStr) {

            reject("未获取请求头");

            return;

        }

        let headers;

        try {

            headers = JSON.parse(headerStr);

        } catch {

            reject("请求头损坏");

            return;

        }

        const token = $.read(TOKEN_KEY);

        if (!token) {

               reject("Token不存在");

               return;

        }

       headers["authorization"] =
          "Bearer " + token;

       headers["Authorization"] =
          "Bearer " + token;

        headers["content-type"] =
            "application/json; charset=utf-8";

        headers["Content-Type"] =
            "application/json; charset=utf-8";
        
        headers["accept"] = "application/json";

        headers["accept-encoding"] = "gzip";

        headers["user-agent"] =
             "Vomic/1.2.0 CFNetwork Darwin";

        delete headers["Content-Length"];
        delete headers["content-length"];
        delete headers["Host"];
        delete headers["host"];

        const req = {

            url,

            headers

        };

      if (body !== null) {

           req.body = body;

           headers["content-length"] =
                     String(body.length);

      }

        const callback = (err, resp, data) => {

            if (err) {

                reject(err);

                return;

            }

            let obj;

            try {

                obj = JSON.parse(data);

            } catch {

                obj = data;

            }

            resolve(obj);

        };

        if (method === "GET") {

            $.get(req, callback);

        } else {

            $.post(req, callback);

        }

    });

}