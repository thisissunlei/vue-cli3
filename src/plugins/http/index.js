import axios from "axios";
import APIS from '@/api/index';
import RequestIn from './interceptor';
import utils from '@/plugins/utils';

axios.defaults = {
  timeout: 10000,//超时时间
  withCredentials: true,//允许携带cookie
  mode: 'cors',//允许跨域
};

//过滤空參和空格
function filterNull(o) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (utils.dataType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (utils.dataType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (utils.dataType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

function findUrl(url) {
  if (!APIS[url] || !APIS[url].url) {
    console.error('找不到对应的api: ', url);
    return;
  }
}


export default {
  postJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    findUrl(url);
    axios.interceptors.request.eject(RequestIn.requestInterceptor);
    axios.post(APIS[url].url, params)
      .then(function (response) {
        response = response.data;
        success && success(response)
        resolve(response)
      })
      .catch(function (error) {
        if (error && error.data) {
          error = error.data;
          failure && failure(error)
          reject(error)
        }
      });
  }),

  putJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    findUrl(url);
    axios.interceptors.request.eject(RequestIn.requestInterceptor);
    axios.put(APIS[url].url, params)
      .then(function (response) {
        response = response.data;
        success && success(response)
        resolve(response)
      })
      .catch(function (error) {
        if (error && error.data) {
          error = error.data;
          failure && failure(error)
          reject(error)
        }
      });
  }),

  get: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    findUrl(url);
    axios.get(APIS[url].url, {params: params})
      .then(function (response) {
        response = response.data;
        success && success(response)
        resolve(response)
      })
      .catch(function (error) {
        if (error && error.data) {
          error = error.data;
          failure && failure(error)
          reject(error)
        }
      });
  }),

  post: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    findUrl(url);
    axios.post(APIS[url].url, params)
      .then(function (response) {
        response = response.data;
        success && success(response)
        resolve(response)
      })
      .catch(function (error) {
        if (error && error.data) {
          error = error.data;
          failure && failure(error)
          reject(error)
        }
      });
  }),

  delete: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    findUrl(url);
    axios.delete(APIS[url].url, {params: params})
      .then(function (response) {
        response = response.data;
        success && success(response)
        resolve(response)
      })
      .catch(function (error) {
        if (error && error.data) {
          error = error.data;
          failure && failure(error)
          reject(error)
        }
      });
  }),

  put: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    findUrl(url);
    axios.put(APIS[url].url, params)
      .then(function (response) {
        response = response.data;
        success && success(response)
        resolve(response)
      })
      .catch(function (error) {
        if (error && error.data) {
          error = error.data;
          failure && failure(error)
          reject(error)
        }
      });
  })
};
