import axios from 'axios'
import {message} from 'hen'
import store from 'store2';

// https://github.com/mzabriskie/axios#creating-an-instance
const axiosOptions = {
  timeout: 8000,
  params: {
    // access_token: 'eb97d2e8cf0821814ebc731796440bc629b1f0bd'
  }
};

if(__DEV__){
    axiosOptions.baseURL = '/suneee-cloud'
}

const instance = axios.create(axiosOptions)

const loop = (items) => {
    Object.keys(items).forEach((val) => {
        let prop = items[val];
        if (prop === null || prop === 'undefined') {
            console.warn(`REQUEST => 删除参数：${val}:${prop}`);
            delete items[val];
        } else if (prop.constructor.name === "Object"){
            loop(prop)
        }
    })
}


instance.interceptors.request.use(function (config) {
    if (typeof config.data === 'string') {
        config.data = JSON.parse(config.data);
        loop(config.data)
        config.data = JSON.stringify(config.data);
    }
    return config;
}, function (error) {
    console.error('XHR REQUEST ERROR :', error);
    return error
});

instance.interceptors.response.use(function (res) {
  console.log(res)
  if(res.data.status == 1){
      if(!res.config.hasMsg){
          if(!res.config.msgStatus){
              message.success(res.data.message || '数据获取成功');
          }else{
              message.error(res.data.message || '数据异常')
          }
      }else{
          if (res.config.hasMsg !== true){
              if(!res.config.msgStatus){
                  message.success(res.config.hasMsg || '数据获取成功');
              }else{
                  message.error(res.config.hasMsg || '数据异常');
              }
          }
      }
  }else{
      message.error(res.data.message || '获取数据失败');
  }
  return res.data;
}, function (error) {
  console.error('XHR RESPONSE ERROR :', error);
  if(error.data){
      error.data.code !== "TIMEOUT_SESSION" &&  message.error('服务错误：［'+ error.data +'] 错误码：［'+error.status+ ']', 2);
  }else{
      if(error.code){
          message.error('请求超时：［'+ error.message +'] 错误码：［'+error.code+ ']', 2);
      }else{
          message.error('请求超时：［'+ error.message +']', 2);
      }      
  }
  return error.data
})

export default instance
