import axios from 'axios';
export function request(config){
  //创建axios实例
  const instacne=axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });
  //axios的请求拦截器
  instacne.interceptors.request.use(config=>{
    return config;
  },err=>{
    console.log(err)
  })
  //axios的相应拦截器
  instacne.interceptors.response.use(config=>{
    return config
  },err=>{
    console.log(err);
  })
  //发送真正的网络请求
  return instacne(config);
}
