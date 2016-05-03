import axios from 'axios'


// https://github.com/mzabriskie/axios#creating-an-instance
const axiosOptions = {
  timeout: 8000
};

if (__DEV__) {
  axiosOptions.baseURL = '/api'
}

const instance = axios.create(axiosOptions)

instance.interceptors.response.use(function (res) {
  console.log(res);
  return res
}, function (error) {
  console.error('XHR ERROR :', error);
  return error

})
export default instance
