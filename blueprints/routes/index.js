module.exports = {
  locals: function (options) {
    var option = options.entity.options;
    return {
      type: option.t || 'table',
      hasSearch : option.s || true,
      hasQuickButton : option.q || false
    }
  },
  description() {
    return '生成一个路由 '
  }
}
