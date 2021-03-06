'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 部门管理
  router.post('/api/b/dept/list', controller.admin.dept.list);
  router.post('/api/b/dept/update', controller.admin.dept.update);
  router.post('/api/b/dept/add', controller.admin.dept.add);
  router.post('/api/b/dept/delete', controller.admin.dept.delete);

  // 管理员管理
  router.post('/api/b/admin/list', controller.admin.admin.list);
  router.post('/api/b/admin/update', controller.admin.admin.update);
  router.post('/api/b/admin/add', controller.admin.admin.add);
  router.post('/api/b/admin/delete', controller.admin.admin.delete);
  router.post('/api/b/admin/login', controller.admin.admin.login);
  router.post('/api/b/admin/changePassword', controller.admin.admin.changePassword);
  router.post('/api/b/admin/resetPassword', controller.admin.admin.resetPassword);
  
  // 字典管理
  router.post('/api/b/dicname/list', controller.admin.dicName.list);
  router.post('/api/b/dicname/update', controller.admin.dicName.update);
  router.post('/api/b/dicname/add', controller.admin.dicName.add);
  router.post('/api/b/dicname/delete', controller.admin.dicName.delete);
  router.post('/api/b/dicvalues/list', controller.admin.dicValues.list);
  router.post('/api/b/dicvalues/update', controller.admin.dicValues.update);
  router.post('/api/b/dicvalues/add', controller.admin.dicValues.add);
  router.post('/api/b/dicvalues/delete', controller.admin.dicValues.delete);

  // 附件管理
  router.post('/api/b/file/list', controller.admin.aFile.list);
  router.post('/api/b/file/update', controller.admin.aFile.update);
  router.post('/api/b/file/add', controller.admin.aFile.add);
  router.post('/api/b/file/delete', controller.admin.aFile.delete);
  router.post('/api/b/file/upload', controller.admin.upload.uploadFile);
  router.post('/api/b/file/qiniuToken', controller.admin.upload.qiniuToken);
  
  router.post('/api/b/menu/list', controller.admin.menu.list);
  router.post('/api/b/menu/update', controller.admin.menu.update);
  router.post('/api/b/menu/add', controller.admin.menu.add);
  router.post('/api/b/menu/delete', controller.admin.menu.delete);
  
  router.post('/api/b/role/list', controller.admin.role.list);
  router.post('/api/b/role/update', controller.admin.role.update);
  router.post('/api/b/role/add', controller.admin.role.add);
  router.post('/api/b/role/delete', controller.admin.role.delete);
  
  router.post('/api/b/role/configRole', controller.admin.menuRole.configRole);
  router.post('/api/b/role/getRoleMenu', controller.admin.menuRole.getRoleMenu);
  
  router.post('/api/b/aconfig/list', controller.admin.aconfig.list);
  router.post('/api/b/aconfig/update', controller.admin.aconfig.update);
  router.post('/api/b/aconfig/add', controller.admin.aconfig.add);
  router.post('/api/b/aconfig/delete', controller.admin.aconfig.delete);
  
  // 信息发布
  router.post('/api/b/infoCategory/list', controller.admin.infoCategory.list);
  router.post('/api/b/infoCategory/update', controller.admin.infoCategory.update);
  router.post('/api/b/infoCategory/add', controller.admin.infoCategory.add);
  router.post('/api/b/infoCategory/delete', controller.admin.infoCategory.delete);

  router.post('/api/b/info/list', controller.admin.info.list);
  router.post('/api/b/info/update', controller.admin.info.update);
  router.post('/api/b/info/add', controller.admin.info.add);
  router.post('/api/b/info/detail', controller.admin.info.detail);
  router.post('/api/b/info/delete', controller.admin.info.delete);
};
