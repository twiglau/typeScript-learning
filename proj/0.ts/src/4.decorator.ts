namespace a {
    interface Person {
        xx: string;
        yy: string;
    }
    // 类增强
    function enhancer(target: any){
        target.prototype.xx = 'test_x';
        target.prototype.yy = 'test_y';
    }
    @enhancer
    class Person {
        constructor(){}
    }
    let p = new Person();
    // console.log(Person.xx);
    console.log(p.yy);
    console.log(p.xx);
}
// 把类整个替换
namespace b {
    interface Person {
        age: number;
    }
    // 类增强 - @enhancer 不用传参
    // function enhancer(target: any){
    //     return class {
    //         public name: string = 'Strong Man'
    //         public age: number = 10
    //     }
    // }
    // 装饰器工厂函数 需要传参 类名
    function enhancer(name: string){
        return function enhancer(target: any){
            return class extends target {
                public name: string = name
                public age: number = 10
            }
        }
    }
    @enhancer('Strong Man')
    class Person {
        name: string = 'Person'
        constructor(){}
    }
    let p = new Person();
    console.log(p.age);
    console.log(p.name);
}

// 属性 装饰器
namespace c {
    // target
    // 1. 装饰的是个普通属性的话, 那么这个 target 指向类的原型 Person.prototype
    // 2. 装饰的是一个类的属性 static, 那么这个 target 指向类的定义
    function upperCase(target: any, propertyName: string){
        let value = target[propertyName];
        const getter = () => value;
        const setter = (newVal: string) => {
            value = newVal.toUpperCase();
        }
        delete target[propertyName];
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
    function propertyEnumerable(flag: boolean) {
        return function(target:any, methodName:string) {
        }
    }
    function methodEnumerable(flag: boolean) {
        // target 指向类的原型
        return function(target:any, methodName:string, propertyDescriptor: PropertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        }
    }
    function setAge(age: number) {
        // target 指向类本身
        return function(target:any, methodName:string, propertyDescriptor: PropertyDescriptor) {
            target.age = age;
        }
    }
    function toNumber(target:any, methodName:string, propertyDescriptor: PropertyDescriptor){
        let oldMethod = propertyDescriptor.value; // sum 方法
        propertyDescriptor.value = function(...args: any[]) {
            args = args.map(item=>parseFloat(item));
            return oldMethod.apply(this, args);
        }
    }
    class Person {
        static age:number;
        @upperCase
        @propertyEnumerable(false)
        name: string = 'lau'

        @methodEnumerable(true)
        getName(){
            console.log('getName');
        }
        @setAge(100)
        static getAge(){}
        @toNumber
        sum(...args: any[]){
            return args.reduce((acc,item)=> acc + item,0);
        }
    }
    let p = new Person();
    p.name = 'twig';
    console.log(p);
    console.log(Person.prototype);
    console.log(p.name); // TWIG
    for(let attr in p){
        console.log('attr',attr);
    }
    console.log(Person.age);
    console.log(p.sum(1, '2', '3'));

}

// 参数 装饰器  装饰方法参数
namespace d {
    interface Person {
        age: number
    }
    // Person.prototype  login  1
    function addAge(target:any, methodName:String, paramsIndex:number){
        target.age = 10;
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age,username, password);
        }
    }
    let p = new Person();
    p.login('lau', '123');
}

// 装饰器执行顺序
// 1. 属性, 方法 先执行, 谁先写先执行谁 [类里面]
// 2. 方法的时候, 先参数再方法, 而且, 它们一定会在一起  
// 3. 最后是 类  
// 4. 类装饰器:  如果是 同类型的, 先执行后写的