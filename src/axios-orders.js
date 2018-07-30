import axios from 'axios';

const axiosOrderInstance = axios.create({
  baseURL: 'https://burger-builder-fb626.firebaseio.com'
});

export default axiosOrderInstance;
