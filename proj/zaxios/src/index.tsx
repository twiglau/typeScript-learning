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
const CancelToken = axios.cancelToken;
const isCancel = axios.isCancel;
const source = CancelToken.source();
axios({
    method: 'post',
    url: baseURL + '/post',
    headers:{},
    cancelToken: source.token,
    timeout: 1000,
    data: user
}).then((response: AxiosResponse) =>{
    console.log(response);
    console.log(response.data);
}).catch((error:any)=>{
    if(isCancel(error)){
        console.log('isCancel取消请求', error);
    }
    console.log(error);
});

// 取消请求
source.cancel('用户取消了请求');