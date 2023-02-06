// 字面量复制
namespace a {
    interface IPerson {
        name: string
        age: number
        height: number
    }
    // 1. 编译时, 一直报错
    // 1.0 依然会进行类型推导 => 会报错
    const p: IPerson = {
        name: "lau",
        age: 18,
        height: 1.9,
        // address: "广州市"
    }

    // 1.1 没有IPerson, 会进行类型推导
    // 1.2 
    const info = {
        name: "twig",
        age: 16,
        height: 1.8,
        address: "洛阳"
    }
    // 2. 这样反而不报错
    // 2.1 对象的引用赋值过来,会做一个操作: freshness 擦除: 在类型检测时, 会去除掉多余的属性后, 如果依然满足 IPerson,就不会报错
    const p1: IPerson = info;

    // 3. 例子
    function printInfo(per: IPerson) {
        console.log(per.name)
    }
    // 3.1 会报错, 类型检测过不去
    // printInfo({
    //     name: "twig",
    //     age: 12,
    //     height: 1.5,
    //     address: "LuoYang"
    // })

    // 3.2 这个就没有问题了: 内部类型检测, freshness 擦除操作.
    printInfo(info)

}