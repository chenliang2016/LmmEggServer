'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/b/wx/getOpenId', controller.wx.wxMini.getOpenId);
};
