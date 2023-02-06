

namespace a {
    // 通过类型(type)别名来声明对象类型
    type InfoType = { name: string, age: number }

    // 另外一种方式声明对象类型: 接口interface
    interface InfoType2 {
        name: string
        age: number
        friend?: {
            name: string
        }
    }

    // 任意属性 
    interface PlainObject {
        [propName:string]: number;
    }
    let obj: PlainObject = {
        x: 1,
        y: 2,
        z: 3
    }
}
namespace b {
    // 接口的继承
    interface Speakable {
        speak(): void;
    }
    interface SpeakChinese extends Speakable {
        speakChinese(): void
    }
    class Person implements SpeakChinese {
        speak(): void {}
        speakChinese(): void {}
    }
}
namespace g {
    // 接口的实现
    interface ISwim {
        swimming: ()=>void
    }
    interface IEat {
        eating: ()=>void
    }
    // 对象实现
    const a: ISwim = {
        swimming() {
            
        }
    }
    class Animal {}
    // 继承: 只能实现单继承
    // 实现: 类实现接口, 类可以实现多个接口
    class Fish extends Animal implements IEat, ISwim {
        eating() {}
        swimming() {}
    }
    // 作用: 编写一些公共的API: 面向接口编程
}
namespace c {
    // 接口的只读 readonly
    interface Circle {
        readonly PI: number,
        radius: number
    }
    let circle: Circle = {
        PI: 3.14,
        radius: 10
    }
    // circle.PI = 3.15; // readonly , 不能赋值
}

namespace d {
    // 接口还可以用来约束函数  
    interface Discount {
        (price:number):number
    }
    let cost: Discount = function (price: number): number {
        return price * 0.8;
    }
    // 可索引接口
    // 是用来对数组 和 对象 进行约束  
    interface UserInterface {
        [index: number]: string
    }
    let arr: UserInterface = ['1','2','3'];
    console.log(arr);
    let obj: UserInterface = {
        1: '1',
        2: '2'
    }
}
// TS核心: 接口 + 泛型
namespace e {
    // 类的接口, 可以用接口来装饰类
    interface Speakable {
        name:string;
        speak(words: string):void;
    }
    class Dog implements Speakable {
        name: string;
        speak(words: string): void {}
    }
    class Animal {
        constructor(public name: string){}
    }

    // 约束构造类型 使用 new 来约束
    interface WithNameClass {
        new(name: string): Animal
    }
    function createAnimal(clazz: WithNameClass, name: string){
        return new clazz(name);
    }
    let a = createAnimal(Animal, 'dog');
}

namespace f {
    // 一种组合类型的方式: 联合类型
    type WhyType = number | string
    type Direction = "left" | "right" | "center"

    // 另一种组合类型的方式: 交叉类型
    type WType = number & string

    interface ISwim {
        swimming: () => void
    }
    interface IFly {
        flying: () => void
    }

    type MyType1 = ISwim | IFly
    type MyType2 = ISwim & IFly

    const obj1: MyType1 = {
        swimming() {}
    }
    const obj2: MyType2 = {
        swimming() {},
        flying() {}
    }
}
