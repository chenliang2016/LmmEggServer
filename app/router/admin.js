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
  
};
