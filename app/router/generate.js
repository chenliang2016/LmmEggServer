'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/generate/java', controller.generate.java);
  router.post('/api/generate/node', controller.generate.node.index);
  router.post('/api/generate/front', controller.generate.front.index);
  router.post('/api/generate/mysql/list', controller.generate.mysqlTable.list);
};
