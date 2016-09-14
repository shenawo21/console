// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
  proxy: {
    enabled: true,
    options: {
      // koa-proxy options
      //host: 'http://172.19.5.118:8080/',
      host: 'http://172.19.6.151:8088/',
      fileServiceUrl : 'http://172.19.6.131:8081/',
      fileProxyFlag : 'file-service',
      match: /^\/suneee-cloud|file-service\/.*/,
      hook: (opt) => {
           opt.url = opt.url.replace(/(suneee-cloud\/)/g, '');
           return opt
      }
    }
  }
})
