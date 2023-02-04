
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
/**
 * 默认参数 (=), 可选参数 (?) 一般都放置于后面
 * 默认参数可以不指定类型, 会自动判断和计算
 */
// 可选参数
function print(name:string, age?:number, home?:string){}
print();
print('lau');
print('lau',10);
print('lau',10,'beijing');

// 默认参数
function ajax(url:string, method: string='GET'){
    console.log(url,method);
}
function foo1(x: number = 30, y: number) {
    console.log(x, y)
}
foo1(undefined, 10)

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
// 根据参数的类型,个数来匹配
attr('lau');
attr(10);
// attr(true);// No overload matches this call;

// 实现方式一: 联合类型实现
function getLength1(args: string | any[]) {
    return args.length
}
// 实现方式二: 函数重载
function getLength2(args: string): number;
function getLength2(args: any[]): number;
function getLength2(args: any) : number {
    return args.length
}



// ts 怎么写箭头函数?  
let delay = (ms: number)=>{
    setTimeout(function(){},ms);
}