//无法重新声明块范围变量“name”
// 如果代码里有 export import 之类的代码, 那么这个文件编程 一个模块  

export {}
// I. 基本数据类型
let name: string = 'lau';
let age: number = 20;
let married: boolean = true;
let hobbies: string[] = ['1','2','3'];
let interests: Array<string> = ['4','5','6'];

// II. 元组 类似一个数组  它是一个长度和类型都固定的数组  
// 1. 长度固定  2 类型可以不一样
let point: [number, number] = [100, 100];
point[0], point[1];
let person: [string, number] = ['lau', 32];

// III. 枚举类型(enum)
enum Gender {
    BOY,
    GIRL
}
let Gender2 = {
    0: "BOY",
    1: 'GIRL',
    "BOY": 0,
    "GIRL": 1
}
console.log(`lau is ${Gender.BOY}`);
console.log(`twig is ${Gender.GIRL}`);

enum Week {
    MONDAY = 1,
    TUESDAY = 2
}

// 常数枚举
const enum Colors {
    Red,
    Yellow,
    Blue
}

// IV. 任意类型 anyscript  
// 第三库没有类型定义 类型转换的时候 数据结构太复杂 太灵活 any  
// ts 为 dom 提供了一整套类型声明
let root: HTMLElement | null = document.getElementById('root');
root!.style.color = 'red'; // ! 断言肯定不为空

// null  undefined
// null 空  undefined 未定义
// 它们都是其他类型的子类型, 你可以把它们赋值给其他类型的变量  
// "strictNullChecks": false
let myName: string = null
let myAge: number = undefined


// V. void 类型 空的 没有  
function greeting(name: string): void {
    console.log(`hello ${name}`);
    return undefined;
}
greeting('lau');


// VI never 永远不
// never 是其他类型的子类型, 代表不会出现的值 
// A function returning 'never' cannot have a reachable end point  
// 1. 在函数内部永远会抛出错误, 导致函数无法正常结束  
function createError(message: string): never {
    console.log(1);
    throw new Error('error');
    console.log('end point');
}
function sum():never {
    while(true){
        console.log('always hello');
    }
    console.log('end point');
}

// VII. 类型推论
let name2 = 2; // number
name2 = 3;

let name3; // any
name3 = 4;
name3 = 'lau';

// VIII 包装对象  java装箱和拆箱 c#
// 自动在基本类型和对象类型之间切换  
// 1. 基本类型上没有方法
// 2. 在内部迅速的完成一个装箱的操作, 把基本类型迅速包装成对象
// 类型, 然后用对象来调用方法
let name4: string = 'lau';
let name44 = new String(name4);
name4.toLocaleLowerCase(); // let name4 = new String(name4);
name44.toLocaleLowerCase();

// IX. 联合类型
let name5: number | string;
name5 = 'lau';
name5.toLowerCase();
name5 = 5;
name5.toFixed(3);

// X. 类型断言  
let name6: string | number;
(name6 as string).toLowerCase();
(name6 as number).toFixed(2);


// XI 字面量类型
let Gender3: 'Boy' | 'GIRL';
Gender3 = 'Boy';
// Gender3 = 'Cat';

// XII 类型别名
type Point = {
    x: number
    y: number
}
function printPoint(point: Point) {}

type IDType = number|string
function getOpId(id:IDType) {}