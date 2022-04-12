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
        myName: string;
        constructor(name: string){
            this.myName = name;
        }
        get name(){
            return this.myName
        }
        set name(newVal: string){
            this.myName = newVal.toUpperCase();
        }
    }
    let p = new Person('lau');
    console.log(p.name);
}

namespace c {
    class Person {
        constructor( public readonly name: string){
            // this.name = name 
        }
    }
    let p = new Person('lau');
    p.name;
    // p.name = 'twig' // readonly

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