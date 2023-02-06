
namespace a {
    interface States {
        [state: string]: boolean;
    }
    let s: States = { 'enabled': true, 'maximized': false}
    console.log(s);
    console.log(s["enabled"]);
    
    interface ILanguageYear {
        [name: string]: number
    }
    const languageYear = {
        "C": 1972,
        "Java": 1995,
        "JavaScript": 1996,
        "TypeScript": 2014
    }
}

interface States1 {
    [index: number]: number;
}
let s1: States1 = [12, 34, 45, 1];
console.log(s1);
// console.log(s1.join('-'));
// console.log(s1.length);
let s2: number[] = [1,2,3];
console.log(s2, s2.length);
console.log(s2.join('-'));


interface State2 {
    [index: number]: boolean;
    length: number;
    pop(): boolean;
}
let s3: State2 = [true, false, false, true];
console.log(s3);
console.log(s3.length);
console.log(s3.pop());
