import axios, { AxiosResponse, AxiosRequestConfig } from "./axios";
const baseURL = 'http://localhost:8080';

// 服务器返回的对象
interface User {
    name: string,
    password: string
}
let user: User = {
    name: 'lau',
    password: '123456'
}
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers!.name += "1";
    console.time('cost');
    return config;
})
let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers!.name += "2";
    return config;
})
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig>=> {
    
    return new Promise(function(resolve){
        setTimeout(()=>{
            config.headers!.name += "3";
            resolve(config);
        },3000);
    })
    // return Promise.reject('拦截,直接失败')
})

axios.interceptors.request.eject(request);
let response = axios.interceptors.response.use((response:AxiosResponse) => {
    response.data.name += "1";
    return response;
});
axios.interceptors.response.use((response:AxiosResponse) => {
    response.data.name += "2";
    return response;
});
axios.interceptors.response.use((response:AxiosResponse) => {
    response.data.name += "3";
    return response;
});
axios.interceptors.response.eject(response);
// axios({
//     method: 'get',
//     url: baseURL + '/get',
//     params: user
// }).then((response: User) =>{
//     console.log(response);
// }).catch((error:any)=>{
//     console.log(error);
// })

axios({
    method: 'post',
    url: baseURL + '/post',
    headers:{
        'content-type':'application/json'
    },
    timeout: 1000,
    data: user
}).then((response: AxiosResponse) =>{
    console.log(response);
    console.log(response.data);
}).catch((error:any)=>{
    console.log(error);
})