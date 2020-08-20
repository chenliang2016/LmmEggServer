const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  callback(res) {
    if (res.success){
      this.success(res.data)
    } else {
      this.error(res.message)
    }
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
      msg: "",
    };
  }

  error(msg) {
    this.ctx.body = {
      success: false,
      data: {},
      msg
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;