// 接口的兼容性
// ts 跟类型没有关系, 只跟属性有关系
namespace a {
    interface Animal {
        name: string;
        age: number;
    }
    interface Person {
        name: string;
        age: number;
        // speak: (words: string) => void
    }
    function getName(animal: Animal): string {
        return animal.name;
    }

    let p:Person = {
        name: 'lau', 
        age:10
    }
    // 只比较属性
    console.log(getName(p));
}

// 基本类型的兼容性
namespace b {
    let num: string | number = 1;
    let str: string = 'hello';
    num = str;
    num = 1;
    // str = num;

    let num2: {
        toString(): string
    }
    let str2:string = 'lau';
    num2 = str2;
}

// 类的兼容性 跟 类型无关
namespace c {
    class Animal {
        name: string
    }
    class Bird extends Animal {
        // swing: number
    }
    let a:Animal;
    a = new Bird();
    let b:Bird;
    b = new Animal();
}
// 函数兼容性
namespace c {
    // 比较参数
    type sumFunciton = (a: number, b: number) => number;
    let sum: sumFunciton;
    function f1(a: number, b: number):number {
        return a;
    }
    sum = f1;
    function f2(a: number): number {
        return a;
    }
    sum = f2;
    function f3(): number {
        return 1;
    }
    sum = f3;
    function f4(a: number, b: number, c: number): number {
        return a;
    }
    // sum = f4; // 参数可以少, 但是不能多

    // 比较返回值
    type GetPerson = () => {name: string, age: number};
    let getPerson:GetPerson;
    function g1(){
        return {name: 'lau', age: 10}
    }
    getPerson = g1;
    function g2(){
        return {name: 'twig'};
    }
    // getPerson = g2; // 少了可不行
    function g3(){
        return {name: 'purple', age: 10, gender: 'Man'}
    }
    getPerson = g3;

    // 函数参数的 协变
    type logFunc = (a: number | string) => void;
    let log: logFunc;
    function log1(a: number | string | boolean) {
        console.log(a);
    }
    log = log1;

    // 泛型的兼容性
    // 判断兼容性的时候先判断具体类型, 再进行兼容性 的判断
    interface Empty<T> {
        // data: T
    }
    let x:Empty<string>;
    let y:Empty<number>;

    x = y; // 加上属性 data 后, 就不能赋值

    interface NotEmptyString<T>{
        data: string
    }
    interface NotEmptyNumber<T>{
        data: number
    }

    // 枚举的兼容性  
    enum Colors {
        Red,Yellow
    }
    let c:Colors;
    c = Colors.Red; // 0
    c = 1;
    let d:number;
    d = Colors.Yellow; // 1

}