interface OnFulfilled<V> {
    (value: V):V | Promise<V>
}
interface OnRejected {
    (error: any) : any
}
export interface Interceptor<V> { // 某个拦截器
    onFulfilled?:OnFulfilled<V>;
    onRejected?:OnRejected;
}
// export interface AxiosInterceptorManager<V> {
//     use(onFulfilled?: (value: V) =>V | Promise<V>, onRejected?: (error: any) => any): number;
//     eject(id: number): void;
// }
// 请求拦截器是 先添加后执行
// 响应拦截器是 先添加先执行
export default class InterceptorManager<V> {
    public interceptors: Array<Interceptor<V> | null> = []
    use(onFulfilled?:OnFulfilled<V>, onRejected?: OnRejected): number{
        this.interceptors.push({
            onFulfilled,
            onRejected
        });
        return this.interceptors.length - 1;
    }
    eject(id: number){
        if(this.interceptors[id]){
            this.interceptors[id] = null
        }
    }
}