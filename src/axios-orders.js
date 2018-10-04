import axios from 'axios';

import store from './App/store';

const axiosOrderInstance = axios.create({
  baseURL: 'https://burger-builder-fb626.firebaseio.com'
});

// Add a request interceptor
axiosOrderInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.params = { auth: store.getState().auth.token };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosOrderInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosOrderInstance;
