// 函数定义
function hello(name: string): void {
    console.log('hello',name);
}
// type 用来定义一个类型 或者 类型别名
type GetUserNameType = (firstName:string, lastName: string) => {
    name: string
};
// 函数表达式
let getUserName: GetUserNameType = function(firstName:string, lastName: string): {
    name: string
}{
    return {name: firstName + lastName};
}

// 可选参数
function print(name:string, age?:number, home?:string){

}
print();
print('lau');
print('lau',10);
print('lau',10,'beijing');

// 默认参数
function ajax(url:string, method: string='GET'){
    console.log(url,method);
}

// 剩余参数
function sum(...numbers: Array<number>){
   return numbers.reduce((acc,item)=>acc + item, 0);
}

// 函数的重载
// 重载定义 和 函数声明 要挨着一起
let obj: any = {}
function attr(val: string):void;
function attr(val: number):void;
function attr(val: any): void {
    if(typeof val === 'string'){
        obj.name = val;
    }
    if(typeof val === 'number'){
        obj.age = val;
    }
}
attr('lau');
attr(10);
// attr(true);// No overload matches this call;


// ts 怎么写箭头函数?  
let delay = (ms: number)=>{
    setTimeout(function(){},ms);
}