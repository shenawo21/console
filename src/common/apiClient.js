import axios from 'axios'


// https://github.com/mzabriskie/axios#creating-an-instance
const axiosOptions = {
  timeout: 8000,
  params: {
    access_token: 'eb97d2e8cf0821814ebc731796440bc629b1f0bd'
  },
};

if (__DEV__) {
  axiosOptions.baseURL = '/api'
}

const instance = axios.create(axiosOptions)

// github token
// eb97d2e8cf0821814ebc731796440bc629b1f0bd
instance.interceptors.response.use(function (res) {
  console.log(res);
  return res
}, function (error) {
  console.error('XHR ERROR :', error);
  return error

})
export default instance
