module.exports = {
    logInfo(modal,event,inparams,result) {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
        this.logger.info(`模块：${modal}|事件：${event}|入参：${inparams}|结果：${result}`)
    },

    logError(modal,event,inparams,error) {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
        this.logger.error(`模块：${modal}|事件：${event}|入参：${inparams}|错误：${error}`)
    },
  };
  