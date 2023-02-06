// 声明模块
declare module 'lodash' {
    export function join(args: any[]): void
}

// 声明变量/函数/类
declare let lauName: string
declare let lauAge: number
declare let lauHeight: number
declare function lauEat(): void
declare class  LauPerson {
    name: string
    age: number
    constructor(name: string, age: number)
}

// 声明文件
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.svg'
// declare module '*.vue' {
//     import { DefineComponent } from 'vue'
//     const component: DefineComponent
// }

// 声明名称空间: 在index.html 中引入jquery, 需要再 main.ts 中使用, 就需要以下声明
declare namespace $ {
    export function ajax(settings: any): any
}