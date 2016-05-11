module.exports = {
  locals: function (options) {
    console.log(options);
    var option = options.entity.options;
    return {
      type: option.type || 'table'
    }
  },
  description() {
    return '生成一个路由 '
  }
}
