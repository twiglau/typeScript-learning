// 1. 函数类型
function foo() { console.log('foo')}
// 1.1 函数作为参数时, 在参数中如何编写类型
function bar(fn: () => void) {
    fn()
}
bar(foo)
// 1.2 定义常量时, 编写函数的类型
type AddFnType = (n1: number, n2: number) => void
const add: AddFnType = (num1: number, num2: number) => {}

// 2. 案例
function calc(n1:number, n2:number, fn: (n1: number, n2: number) => number) {
    return fn(n1, n2)
}
let addVal = calc(20, 30, function(a1, a2) {
    return a1 + a2;
})
let minusVal = calc(20, 30, function(a1, a2) {
    return a1 - a2;
})
console.log(addVal, minusVal);