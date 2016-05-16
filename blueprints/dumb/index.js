module.exports = {
  locals: function (options) {
    var option = options.entity.options;
    return {
      type: option.t
    }
  },
  description () {
    return '创建一个commponent组件'
  }
}
