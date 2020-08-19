'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/generate/java', controller.generate.java);
  router.get('/api/generate/node', controller.generate.node);
  router.get('/api/generate/front', controller.generate.front);
};
