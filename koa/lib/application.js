const http = require("http");
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
    constructor() {
      this.context = Object.create(context)
      this.request = Object.create(request)
      this.response = Object.create(response)
    }
  use(fn) {
    this.fn = fn;
  }
  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.fn(ctx);
  }
  createContext(req, res) {
    const ctx = Object.create(this.context);
    ctx.request = this.request;
    ctx.response = this.response;
    ctx.request.req = ctx.req = req;
    ctx.request.res = ctx.res = res;
    request.ctx = response.ctx = ctx;
    return ctx;
  }
  // 创建一个服务
  listen() {
    const serve = http.createServer(this.handleRequest.bind(this));
    serve.listen(...arguments)
  }
}
module.exports = Application;
