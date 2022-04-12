import { type } from "os";

namespace a {
    let x = {name: 'lau'};
    const a = typeof x;
    type b = typeof x; // b 是类型,不是值

    class Person {
        public name: string = 'lau'
    }
    type PartialPerson = Partial<Person>;
    let man:PartialPerson = {
        name: 'twig'
    }

    // 什么时候用:
    // interface, type, class
    // 1. interface 是定义接口类型, 它是正式的类型, 也可能会被导出和导入
    // 2. type 只是临时用的别名, 并不会真正产生类型

    // 条件
    interface Fish {
        name1: string
    }
    interface FishExtends {
        // 属性与 Fish 一样, 判断为继承
        name1: string,
        trailer: string
    }
    interface Water {
        name2: string
    }
    interface Bird {
        name3: string
    }
    interface Sky {
        name4: string
    }

    type Condition<T> = T extends Fish? Water : Sky;
    let condition: Condition<FishExtends> = {
        name2: 'Water'
    }


    // 条件类型的分发
    type Condition2<T> = T extends Fish ? Water : Sky;
    let c1: Condition2<Fish | Bird> = {
        name2: 'lau'
    }
    let c2: Condition2<Fish | Bird> = {
        name4: 'lau'
    }
    let c3: Water | Sky = {
        name2: 'lau'
    }
    let c4: Water | Sky  = {
        name4: 'lau'
    }

}

// 2. 内置条件类型
namespace b {
    // 2.1 Exclude
    type E = Exclude<string | number, string>;
    let e: E = 10;
    // 2.2 Extract
    type E1 = Extract<string | number | null, string>;
    let e2: E1 = 'hello';
    // 2.3 NonNullable
    type E2 = NonNullable<string | number | undefined | null>;
    let e3: E2 = 'hell0';
    let e4: E2 = 10;
    // 2.4 redux 会用到的 ReturnType
    function getUserInfo() {
        return { name: 'lau', age: 10};
    }
    type UserInfo = ReturnType<typeof getUserInfo>;
    let user: UserInfo = {name: 'twig', age: 10};

    // 2.5 instanceType 获取构造函数的实例类型
    class Person5 {
        name: string;
        constructor(name: string){
            this.name = name
        }
    }
    type P = InstanceType<typeof Person5>;
    let p: P = new Person5('lau');

}