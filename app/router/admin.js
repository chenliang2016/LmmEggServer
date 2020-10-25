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
  
  // 字典管理
  router.post('/api/b/dicname/list', controller.admin.dicName.list);
  router.post('/api/b/dicname/update', controller.admin.dicName.update);
  router.post('/api/b/dicname/add', controller.admin.dicName.add);
  router.post('/api/b/dicname/delete', controller.admin.dicName.delete);
  router.post('/api/b/dicvalues/list', controller.admin.dicValues.list);
  router.post('/api/b/dicvalues/update', controller.admin.dicValues.update);
  router.post('/api/b/dicvalues/add', controller.admin.dicValues.add);
  router.post('/api/b/dicvalues/delete', controller.admin.dicValues.delete);
  
};
