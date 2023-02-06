// interface 和 type 区别
// 1. interface 和 type 都可以用来定义对象类型, 那么在开发中定义对象类型时, 到底选择哪一个呢?
// 1.1 如果是定义非对象类型, 通常推荐使用 type, 比如: Direction, Alignment, 一些Function;

namespace a {
    // interface 可重复定义, 有相同的会合并
    interface IFoo {
        name: string
    }
    interface IFoo {
        age: number
    }
    const foo: IFoo = {
        name: "why",
        age: 18
    }
}
// 1.2 默认情况下 window 下没有 age,  可以使用 interface 定义一个 age
// 这种情况下, 会合并到 window 对象下面
interface Window {
    age: number
}
window.age = 19

namespace b {
    type IBar = {
        name: string
        age: string
    }
    // 1.3 type 不能重复定义
    // type IBar = {}
}