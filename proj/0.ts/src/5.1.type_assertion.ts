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