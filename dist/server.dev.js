"use strict";

var Koa = require("./koa/lib/application");

var app = new Koa();
app.use(function (ctx) {
  // handleRequest 原生的
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);
  console.log('----------------'); // koa包装后的request

  console.log(ctx.request.url);
  console.log(ctx.request.path, '-------');
  console.log(ctx.url, 'url');
});
app.listen(3002, function () {
  console.log('启动成功');
});