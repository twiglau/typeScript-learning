import { type } from "os";

namespace a {
    interface Bird {
        name: string,
        fly(): void
    }
    interface Person {
        name: string,
        eat(): void
    }
    // 交叉类型 其实就是二个接口类型的属性的并集;
    type BirdMan =Bird & Person;
    let p: BirdMan = {
        name: 'lau',
        fly(){},
        eat(){}
    }
}

// typeof 可以获取一个变量的类型
namespace b {
    // type Person = {
    //     name: string,
    //     age: number
    // }
    let p = {
        name: 'lau',
        age: 10
    }
    // 1.  type 是用来定义 类型的 let var 只能定义值.
    type Person = typeof p;
    let p2: Person = {
        name: 'lauer',
        age: 10
    }

    // 2. 索引访问操作符 -我们可以通过 [] 来获取一个类型的子类型
    interface Person2 {
        name: string,
        age: number,
        job: {
            name: string
        },
        interests: {name: string, level: number}[]
    }
    let myName: Person2['job']['name'] = 'lau';
    let myLevel: Person2['interests'][0]['level'] = 10;

    // 3. keyof 索引类型 查询操作符
    interface Person3 {
        name: string,
        age: number,
        gender: 'male' | 'female',
        // [propName: string]: any
    }
    // type PersonKeys = 'name' | 'age' | 'gender'
    // 返回一个接口 它的key的集合
    type Person3Keys = keyof Person3
    function getValueByKey(val: Person3, key: Person3Keys): any {
        return val[key];
    }
    let person3: Person3 = {
        name: 'alu',
        age: 1,
        gender: 'male'
    }
    // 不能赋值 'sex' 类型
    // let name = getValueByKey(person3, 'sex')

    // 4. 映射类型 在定义的时候用 in 操作符去批量定义  
    interface Person4 {
        name: string,
        age: number,
        gender: 'male' | 'female'
    }
    // 4.1 手动实现
    type PartialPerson = {
        [key in keyof Person4]?: Person4[key]
    }
    // 4.2 内置实现
    type PartPerson = Partial<Person4>;

    let p4: Person4 = {
        name: 'ual',
        age: 10,
        gender: 'male'
    }
    let part4: PartialPerson = {
        name: 'lauer'
    }

    // 4.2.1 required
    // type Required<T> = {
    //     [key in keyof T]-?:T[key];
    // }
    type RequiredPerson = Required<Person4>;
    let p5: RequiredPerson = {
        name: 'ual',
        age: 10,
        gender: 'male'
    }

    // 4.2.2 readOnly
    // type Readonly<T> = {
    //     readonly [key in keyof T]: T[key]
    // }
    type ReadOnlyPerson = Readonly<Person4>;
    let p6: ReadOnlyPerson = {
        name: 'ual',
        age: 10,
        gender: 'male'
    }
    // p6.name = 'twig'; // 不能修改

    // 4.2.3 pick
    type Pick<T, K extends keyof T> = {
        [key in K]: T[key]
    }
    type PickPerson = Pick<Person4,'name'>;
    // let x_tt: PickPerson = 'test name';
    // console.log(x_tt);




}