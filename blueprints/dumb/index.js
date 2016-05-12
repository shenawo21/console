module.exports = {
  locals: function (options) {
    var option = options.entity.options;
    return {
      type: option.type
    }
  },
  description () {
    return '创建一个commponent组件'
  }
}
