
import {AxiosRequestConfig,AxiosResponse} from './types';
import AxiosInterceptorManager, {Interceptor} from './AxiosInterceptorManager';
import qs from 'qs';
import parseHeaders from 'parse-headers';
let defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        // 针对所有方法的请求生效
        common: {
            accept:'application/json' //指定告诉服务器返回JSON格式的数据
        }
    },
    transformRequest:(data: any, headers: any) => {
        headers['common']['content-type'] = 'application/json';
        return JSON.stringify(data)
    },
    transformResponse:(response: any) => {
        return response.data;
    }
}
let getStyleMethods = ['get','head','delete','options'];//get风格的请求
getStyleMethods.forEach((method:string) => {
    defaults.headers![method] = {
        'content-type': 'application/json'
    };
})
let postStyleMethods = ['put','post','patch']; //post风格请求
postStyleMethods.forEach((method:string) => {
    defaults.headers![method] = {
        'content-type': 'application/json'
    };
})
let allMethods = [...getStyleMethods,...postStyleMethods];
export default class Axios<T> {
    public defaults: AxiosRequestConfig = defaults;
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    // T 用来限制响应对象 response 里的 data 的类型
    request(config: AxiosRequestConfig): Promise< AxiosResponse<T>>{
        config.headers = Object.assign(this.defaults.headers,config.headers);

        if(config.transformRequest && config.data) {
            config.data = config.transformRequest(config.data,config.headers)
        }
        const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> = [
            { onFulfilled: this.dispatchRequest }
        ]
        // [request3, request2, request1]
        this.interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
            //向数组的左侧添加一个元素
            interceptor && chain.unshift(interceptor);
        })
        // [request3, request2, request1, request, response1, response2, response3]
        this.interceptors.response.interceptors.forEach((interceptor: Interceptor<AxiosResponse<T>> | null) => {
            //向数组的左侧添加一个元素
            interceptor && chain.push(interceptor);
        })
        let promise:Promise<any> = Promise.resolve(config);
        while(chain.length){//如果长度大于0
            const {onFulfilled, onRejected} = chain.shift()!;// shift 从头部删除元素,并返回该元素
            promise = promise.then(onFulfilled, onRejected)
        }
        return promise;

    }
    dispatchRequest<T>(config: AxiosRequestConfig): Promise< AxiosResponse<T>>{
        return new Promise< AxiosResponse<T>>(function(resolve,reject){
            let {method, url, params, headers, data, timeout} = config;
            let request = new XMLHttpRequest();
            if(params && typeof params == 'object'){
                //{name:'lau', password: '123456'} => name=lau&password=123456
                params = qs.stringify(params);
            }
            url += (url!.indexOf('?') == -1? '?' : '&') + params;
            request.open(method!, url!, true);
            request.responseType = 'json';
            request.onreadystatechange = function(){
                //指定一个状态变更函数
                // 0, 1, 2, 3, 4 表示完成
                if(request.readyState === 4 && request.status != 0){
                    if(request.status >= 200 && request.status < 300){
                        let response: AxiosResponse<T> = {
                            data: request.response?request.response:request.responseText,
                            status: request.status,
                            statusText:request.statusText,
                            // content-type=xx;content-length=42
                            // => content-type:xx, content-length: 42
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        if(config.transformResponse){
                            response = config.transformResponse(response);
                        }
                        resolve(response);
                    } else {
                        reject(`Error: Request failed with status code ${request.status}`);
                    }
                }
            }
            // if(headers){
            //     for(let key in headers){
            //         request.setRequestHeader(key, headers[key]);
            //     }
            // }
            /**
             * headers:{
             *    common:{accept: 'application/json'},
             *    post:{'content-type': 'application/json'}
             * }
             */
            
             for (let key in headers) {
                if (key === 'common' || allMethods.includes(key)) {
                    if (key === 'common' || key === config.method) {
                        for (let key2 in headers[key])
                            request.setRequestHeader(key2, headers[key][key2]);
                    }
                } else {
                    request.setRequestHeader(key, headers[key]);
                }
            }
            let body: string | null = null;
            if(data){
                body = JSON.stringify(data);
            }
            request.onerror = function(){
                reject('net::ERR_INTERNET_DISCONNECTED');
            }
            if(timeout){
                request.timeout = timeout;
                request.ontimeout = function(){
                    reject(`Error: timeout of ${timeout}ms exceeded`)
                }
            }
            if(config.cancelToken){
                config.cancelToken.then((message: string) => {
                    request.abort();
                    reject(message);
                });
            }
            request.send(body);
        })
    }
}