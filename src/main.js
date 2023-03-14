import Vue from 'vue'
import App from './App'
import axios from "axios";
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res) => {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  },
});

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    const settle = require('axios/lib/core/settle');
    const buildURL = require('axios/lib/helpers/buildURL');
    uni.request({
      method: config.method.toUpperCase(),
      url: buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };

        settle(resolve, reject, response);
      }
    })
  })
}

const app = new Vue({
  ...App,
  store
})
app.$mount()
