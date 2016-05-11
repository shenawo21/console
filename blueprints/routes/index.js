module.exports = {
  locals: function (options) {
    console.log(options);
    var option = options.entity.options;
    return {
      type: option.type || 'table',
      hasSearch : option.search || true,
      hasQuickButton : option.quick || false
    }
  },
  description() {
    return '生成一个路由 '
  }
}
