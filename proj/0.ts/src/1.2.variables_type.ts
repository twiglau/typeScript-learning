//1.  null类型只有一个值 null
const n1: null = null; 
const n2: string = null; // strict 严格模式下是不可以的


//2. undefined类型只有一个值 undefined
const n3: undefined = undefined; 

//3. any类型: 确实无法确定一个变量的类型, 并且可能它会发生一些变化,这个时候可以使用 any 类型
// 当进行一些类型断言: as any
// 在不想给某些JavaScript添加具体的数据类型时
let message: any = "hello world"
message = 124
const arr: any[] = []

//4. unknown类型: 用于描述类型不确定的类型;
//4.1 unknown类型只能给 any 和 unknown 类型
//4.2 any类型可以复制给任何类型
function func1():string {
    return "lau"
}
function func2():number {
    return 124
}
let result:unknown // 最好不使用any
let flag:boolean = true
if(flag) {
    result = func1()
}else {
    result = func2()
}
console.log('result', result);

// 5. void类型
// 5.1 void通常用来指定一个函数是没有返回值的, 那么它的返回值就是void类型:
// 5.2 可以将null和undefined赋值给void类型, 也就是函数可以返回null或者undefined
function func3(num1: number, num2: number): void {
     console.log(num1, num2);
     return undefined // null
}

// 6. never类型: 表示永远不会发生值的类型,比如一个函数:
// 6.1 如果一个函数中是一个死循环或者抛出一个异常, 那么这个函数会返回东西吗?
// 6.2 不会, 那么写void类型或者其他类型作为返回值类型都不合适, 我们就可以使用never类型;
function func4(): never { // 永远不会有返回结果
    while(true) {}
}
function func5(): never {
    throw new Error()
}
// 6.3: 封装一个核心函数: 如果message添加一个 新的boolean类型, default就会报错,提示调用者添加新的 case 'boolean':
function handleMessage(message: string|number) {
    switch(typeof message) {
        case 'string':
            console.log("string方式处理message")
            break
        case 'number':
            console.log('number方式处理message')
            break
        default: 
            const check: never = message
    }
}

// 7. tuple的应用场景
// 7.1
function useState(state: any) {
    let currentState = state
    const changeState = (newState: any) => {
        currentState = newState
    }
    const tuple: [any, (newState: any) => void] = [currentState, changeState];
    return tuple
}
const [counter, setCounter] = useState(10)
setCounter(1000)

// 7.2 优化
function useState2<T>(state: T) {
    let currentState = state
    const changeState = (newState: T) => {
        currentState = newState
    }
    const tuple: [T, (newState: T) => void] = [currentState, changeState];
    return tuple
}
const [msg, setMsg] = useState2("Hello")
setCounter("Hello world")


// 8 字面量类型
// 8.1 "Hello world"也是可以作为类型的,叫做字面量类型
const message8 = "Hello world"
let num: 123 = 123
// num = 321 => 不能赋值
// 8.1.1 字面量类型的意义, 就是必须结合联合类型
let align: 'left'|'right'|'center' = 'left'
align = 'right'

// 8.2 字面量推理
const info8 = {
    name: "why",
    age: 18
}
type Method = 'GET'|'POST'
function request(url: string, method: Method) {}

type Req = {
    url: string,
    method:Method
}
// 8.2.0 数据确定为具体的类型
const options1:Req = {
    url: 'https://www.lau.org/lau',
    method: 'POST'
}
request(options1.url, options1.method)
// 8.2.1 将比较宽泛的类型 转换为 字面量类型
const options2 = {
    url: 'https://www.lau.org/lau',
    method: 'POST'
} as const
request(options2.url, options2.method)
// 8.2.2 使用时 as 转换
const options3 = {
    url: 'https://www.lau.org/lau',
    method: 'POST'
}
request(options2.url, options2.method as Method)


