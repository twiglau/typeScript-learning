import AxiosInterceptorManager from "./AxiosInterceptorManager";
export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'options' | 'OPTIONS';
/**
 * Record<string, any>
 * 相当于:
 * interface PlainObj {
 *    [name: string]:any
 * }
 */
export interface AxiosRequestConfig {
    url?: string,
    method?: Methods,
    params?: any,
    headers?: Record<string, any>,
    data?: Record<string, any>,
    timeout?: number,
    transformRequest?:(data:any, headers: any) => any;
    transformResponse?:(data: any) => any;
    cancelToken?: any;
    isCancel?: any;
}

// Axios.prototype.request 这个方法
// Promise 的泛型T 代表此 promise变成成功态之后 resolve 的值 resolve(Value)
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: {
        request:AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    }
    cancelToken: any;
    isCancel: any
}
// 泛型T 代表响应体的类型
export interface AxiosResponse<T = any> {
    data: T,
    status: number,
    statusText: string,
    headers: Record<string, any>,
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest
}