const md5 = require("md5");

function getSignString(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    if (key != "sign") {
      newArgs[key] = args[key];
    }
  });
  var string = "";
  for (var k in newArgs) {
    string += "&" + k + "=" + newArgs[k];
  }
  string = string.substr(1);
  return string;
}

//开放设备，固定
const deviceApp = [
  { appId: "2020000001", appKey: "K2mBKv3PwRjGRui1e1" }, //
];

module.exports = options => {
  return async function sign(ctx, next) {
    let data = ctx.request.body;
    let sign = data.sign;
    let { appId, appKey } = deviceApp.find(p => p.appId == data.appId) || {};

    if (!appId) {
      ctx.body = {
        success: false,
        msg: "无效的appId"
      };
    } else {
      let str = getSignString(data);
      str = str + appKey;
      let praramsSign = md5(str);
      ctx.logInfo("sign", str, praramsSign, sign);
      if (sign == praramsSign) {
        await next();
      } else {
        ctx.body = {
          success: false,
          msg: "签名错误"
        };
      }
    }
  };
};
