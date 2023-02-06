export namespace time {
    // 如果另一个模块需要调用该 命名空间, 那么命名空间也需要导出.
    export function format(time: string) {
        return "2023-02-04"
    }

    function foo(){}
    const name: string = "time"
}
namespace price {
    export function format(price: number) {
        return "99.99"
    }
}

time.format("time") // 需要 export
// time.foo() // foo函数是找不到的
price.format(99.99)