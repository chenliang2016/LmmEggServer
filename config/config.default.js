'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    view : {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.nj': 'nunjucks',
      },
    },
    multipart: {
        mode: 'stream',
        fileExtensions: [ '.apk',".docx",".doc",".xls" ] // 增加对 apk 扩展名的文件支持
    },
    bodyParser: {
        jsonLimit: '10mb',
        formLimit: '10mb',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597806524891_7869';

  // add your middleware config here
  config.middleware = ['sign','authmToken','authbToken','getWxOpenId'];

  config.sign = {
      match: [
        "/api/open/*"
      ]
  }

  config.getWxOpenId = {
      match:[
          '/api/b/admin/bindwx'
      ]
  }

  config.authmToken = {
    match: [
     
    ]
   }

  config.authbToken = {
    match: [
      "/api/b/*",
    ]
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    qiniu: {
        ak:"0Wda9EfCYW6qRN-76tFnfuv42voNOaph3srJgUav",
        sk:"RKv22xX99ncnUubXv20ifRTTNCF5sGgFNpwpfPYJ",
        bucket:"hgc",
        fileprex:"https://image.zhelut.com/",
    },
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: 'rm-bp1hq2g7279tedkiqo.mysql.rds.aliyuncs.com',
        // 端口号
        port: '3306',
        // 用户名
        user: 'lmm',
        // 密码
        password: '9MazHFtXrPzlxPwI',
        // 数据库名
        database: 'lmm_frame',
      },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};