namespace p {
    abstract class Animal {
        name: string;
        abstract getName():string;
    }
    class Cat extends Animal {
        getName(): string {
            return this.name
        }
    }
    let cat = new Cat();
    cat.name = '🐱';
    console.log(cat.getName());
    
    // 1 可用用来描述对象, 指的是对象有哪些属性, 属性是什么类型  
    interface Point {
        x: number
        y: number
    }
    let point: Point = { x:0, y:0};
    // 2 还可以用来描述行为的抽象  
    interface Speakable {
        speak():void // 接口里面不能放实现,只能放定义,所有的方法都是抽象的  
    }
    interface Eatable {
        eat(): void
    }
    // 类可以实现多个接口, 但只能继承一个父类
    class Person implements Speakable, Eatable {
        speak(): void {}
        eat(): void {}
    }
}


namespace a {
    abstract class Animal {
        name:string;
        constructor(name:string){
            this.name = name;
        }
        abstract speak():void;
    }
    interface Flying {
        fly():void
    }
    class Duck extends Animal implements Flying {
        speak(): void {
            console.log('quack');
        }
        fly(): void {
            console.log('I can fly');
        }
    }
}

// 1. 重写(override) vs 重载(overload)
namespace b {
    class Animal {
        speak(word: string):string {
            return 'howl: ' + word;
        }
    }
    class Cat extends Animal {
        // 重写
        speak(word: string): string {
            return 'Meow:' + word;
        }
    }
    let cat = new Cat();
    console.log(cat.speak('eat fish'));

    //重载
    function double(val:number):number
    function double(val:string):string
    function double(val: any):any {}
}