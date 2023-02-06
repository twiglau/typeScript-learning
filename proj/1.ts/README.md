# 模块化开发
* TypeScript支持两种方式来控制我们的作用域:
- 模块化: 每个文件可以是一个独立的模块, 支持 ES Module, 也支持 CommonJS;
- 命名空间: 通过namespace来声明一个命名空间;

* 命名空间
- 早期,称之为`内部模块`, 主要的目的是将一个模块内部再进行作用域的划分, 防止一些命名冲突的问题;
> 同一个模块,有可能出现命名冲突

# 类型查找
* 之前我们所有的typescript中的类型, 几乎都是我们自己编写的, 但是我们也有用到一些其他的类型:
```
const imageEl = document.getElementById("image") as HTMLImageElement;
```  
* 是否奇怪, `HTMLImageElement`类型来自哪里呢? 甚至是 `document`为什么可以有 `getElementById`的方法呢?
- 其实这里就涉及到 typescript 对类型的管理和查找规则了.

* 我们这里先给大家介绍另外的一种typescript文件: `.d.ts`文件
- 我们之前编写的typescript文件都是 .ts 文件, 这些文件最终会输出 .js 文件, 也是我们通常编写代码的地方;
- 还有另外一种文件 `.d.ts` 文件, 它是用来做类型的声明(declare). 它仅仅用来做类型检测, 告知 typescript 我们有哪些类型;

* 那么 typescript 会在哪里查找我们的类型声明呢?
- 内置类型声明;
- 外部定义类型声明;
- 自己定义类型声明;

* 内置类型声明
- 内置类型声明时 typescript 自带的, 帮助我们内置了 JavaScript 运行时的一些标准化API的声明文件;
> 包括: Math, Date 等内置类型, 也包括: DOM API, 比如 Window, Document 等.
> https://github.com/microsoft/TypeScript/tree/main/lib

* 外部类型声明和自定义声明
- 外部类型声明通常是 我们使用一些库(比如第三方库)时, 需要的一些类型声明;
- 这些库通常有两种类型声明方式:
> 方式一: 在自己库中进行类型声明(编写 `.d.ts`文件), 比如 axios
> 方式二: 通过社区的一个公有库`DefinitelyTyped`存放类型声明文件:
>> 该库的Github地址: https://github.com/DefinitelyTyped/DefinitelyTyped/
>> 该库查找声明安装方式的地址: https://www.typescriptlang.org/dt/search?
>> 比如我们安装react的类型声明: `npm i @types/react --save-dev`
- 自定义类型声明文件:
```
// lau.d.ts
declare module 'lodash' {
    export function join(args: any[]): void
}
```  