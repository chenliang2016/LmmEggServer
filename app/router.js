'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/generate')(app);
  require('./router/admin')(app);
};
