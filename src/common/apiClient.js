import axios from 'axios'


// https://github.com/mzabriskie/axios#creating-an-instance
const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  params: {
    access_token: 'eb97d2e8cf0821814ebc731796440bc629b1f0bd'
  },
})

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
