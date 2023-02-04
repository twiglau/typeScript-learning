import { info } from "console";

function getLength(sth: string | number): number {
    if((<string>sth).length){
        return (<string>sth).length;
    }else{
        sth.toString().length;
    }
}

interface Person {
    name: string;
    age: number;
}
// 1. 断言方式 as
let person1 = {} as Person;
person1.name = "test";
person1.age = 27;
// person.hobbit = 'read book';

// 1.1 类型断言 as
// const el: HTMLElement = document.getElementById("why");
// const elImg: HTMLImageElement = el as HTMLImageElement;
// elImg.src = "img的url"

// 1.2 
class Person1 {}
class Student extends Person1 {
    studying() {}
}
function sayHello(p: Person1) {
    (p as Student).studying()
}
const stu = new Student()
sayHello(stu)


// 2. 断言方式
let person2 = <Person>{
    name: 'test2',
    age: 30
}
// 3. 2与3方式不一样, 3不是断言
let person3: Person = {
    name: 'test3',
    age: 32
}

// 4. 非空类型断言
// 4.1 message? 本质上就是 undefined|string 可选类型
// 4.2 !, 表示可以确定某个标识符是有值的, 跳过ts在编译阶段对它的检测;
function printMsgLength(message?:string) {
    console.log(message!.length)
}
printMsgLength("aaaa")
printMsgLength("hello world")

// 4.3 可选链的使用
// 4.3.1 可选链事实上并不是TypeScript独有的特性, 它是ES11(ES2020)中增加的特性;
// 4.3.2 可选链使用可选链操作符:`?.`;
// 4.3.3 它的作用是当对象的属性不存在时, 会短路, 直接返回undefined, 如果存在, 那么才会继续执行;
// 4.3.4 虽然可选链操作是ECMAScript提出的特性, 但是和TypeScript一起使用;
type Animal = {
    name: string
    wing?: {
        name: string
        age?:string
    }
}

const dog: Animal = {
    name: "lili",
    wing: {
        name: 'long'
    }
}

console.log(dog.name)
console.log(dog.wing?.name)
console.log(dog.wing?.age)

// 5 ??和!!的作用
// 5.1 !!: 将一个其他类型转换成boolean类型;
// 5.1 类似于Boolean(变量)的方式;
const message5 = "Hello world"
const flag:boolean = Boolean(message5)
const flag1: boolean = !!message5;
console.log(flag, flag1);

// 5.2 ??: ES11增加的新特性;
// 5.2.1 空值合并操作符(??)是一个逻辑操作符, 当操作符的左侧是null或者undefined时, 返回其右侧操作数, 否则返回左侧操作数;
let msg5: string|null = null
const content = msg5 ?? "lau"
console.log('content=>', content)