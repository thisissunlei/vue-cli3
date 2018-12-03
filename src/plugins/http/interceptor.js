import handleStatus from './status';
import handleCode from './code';
import Qs from "qs";
import axios from "axios";
//添加一个请求拦截器，用于设置请求过渡状态
const requestInterceptor = axios.interceptors.request.use(config => {
  if (config.method == 'post' || config.method == 'put') {
    let data = Qs.stringify(config.data);
    config.data = data;
  }
  return config
}, error => {
  return Promise.reject(error)
});


//添加一个响应拦截器
const responseInterceptor = axios.interceptors.response.use(response => {
  return handleCode(response);
}, error => {
  if (error.response) {
    return handleStatus(error.response)
  }
});

export default {
  requestInterceptor,
  responseInterceptor
}
