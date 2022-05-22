
const url = require('url')
const request = {
  get url() {
    //   this指代谁获取的url
    return this.req.url;
  },
  get path() {
    const { pathname } = url.parse(this.req.url, true);
    return pathname;
  },
};
module.exports = request;
