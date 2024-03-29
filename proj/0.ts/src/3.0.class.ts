// 如何定义类
namespace a {

    class Person {
        name: string = 'lau';
        age: number;
        constructor(){
            this.age = 10;
        }
    }

    let p1 = new Person();
    console.log(p1.name, p1.age);
    
}

// 存取器 getter setter  
namespace b {

    class Person {
        private _name: string;
        constructor(name: string){
            this._name = name;
        }
        get name(){
            return this._name
        }
        set name(newVal: string){
            this._name = newVal.toUpperCase();
        }
    }
    let p = new Person('lau');
    console.log(p.name);
}

namespace c {
    class Person {
        // 只读属性是可以在构造器中赋值, 赋值之后就不可以修改
        readonly friend?: Person
        age?:number
        constructor( public readonly name: string, friend?: Person){
            // this.name = name 
        }
    }
    let p = new Person('lau', new Person('kobe'));
    p.name;
    // p.name = 'twig' // readonly
    // 赋值的时候, 不允许使用: 可选链
    // p.friend?.name = "james"
    if(p.friend) {
        p.friend.age = 30
    }

}

// 继承  
// 1. 子类继承父类后, 子类的实例上就拥有了父类中的睡醒和方法
// 2. 访问修饰符 : public protected private 
// public: 自己的子类 和 其他类都可以访问
// protected: 自己的子类能访问, 其他类不可以访问
// private: 只能自己访问, 子类不能访问,其他类也不能访问
namespace d {
    class Person {
        public name: string;
        protected age: number;
        private money:number;
        constructor(name:string, age:number){
            this.name = name;
            this.age = age
            this.money = 100;
        }
        getName(){
            return this.name;
        }
        setName(newName: string){
            this.name = newName;
        }
        say() {
            console.log('say hello')
        }
    }
    class Student extends Person {
        static type = 'Student'
        stuNo: number;
        constructor(name:string, age:number, stuNo:number){
            super(name, age);
            this.stuNo = stuNo;
        }
        static getType(){
            return Student.type;
        }
        say(): void {
            super.say()
            console.log('student say hello')
        }
        getStuNo(){
            // this.amount 
            return this.name + this.stuNo + this.age;
        }
        setStuNo(newStuNo: number){
            this.stuNo = newStuNo;
        }
    }
    let s = new Student('lau', 20, 10001);
    console.log(s.name); // public 在外面也可以访问 name
    // console.log(s.age); // protected 在外面不可以访问 age
    console.log(Student.type);
    console.log(Student.getType());
}

// 多态: 父类引用(类型) 指向 子类对象
// 多态的目的: 为了写出更加具有通用性的代码
namespace e {
    class Animal {
        action() {
            console.log("animal action")
        }
    }
    class Dog extends Animal {
        action(): void {
            console.log("dog running!")
        }
    }
    class Fish extends Animal {
        action(): void {
            console.log("fish swimming")
        }
    }

    function makeActions(animals: Animal[]) {
        animals.forEach(animal => {
            animal.action()
        })
    }
    makeActions([new Dog(), new Fish()])
}