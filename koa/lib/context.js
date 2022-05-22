let proto = {};
function defineGetter(key, obj) {
  proto.__defineGetter__(key, function(){
    return this[obj][key];
  });
}
// 属性代理
defineGetter('path', 'req');
defineGetter('url', 'req');

module.exports = proto;
