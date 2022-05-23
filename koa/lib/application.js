const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Application {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewares = [];
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }
  compose(middleware) {
    if (!Array.isArray(middleware)) {
      throw new TypeError("Middleware stack must be an array!");
    }
    for (let fn of middleware) {
      if (typeof fn !== "function") {
        throw new TypeError("Middleware must be composed of functions!");
      }
    }
    return function (ctx) {
      let dspatch = (i) => {
        let fn = middleware[i];
        if (!fn) {
          return Promise.resolve();
        }
        let next = () => {
          return dspatch(i + 1);
        };
        return Promise.resolve(fn(ctx, next))
      };
      return dspatch(0)
    };
  }
  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    const fn = this.compose(this.middlewares);
    fn(ctx);
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
    serve.listen(...arguments);
  }
}
module.exports = Application;
