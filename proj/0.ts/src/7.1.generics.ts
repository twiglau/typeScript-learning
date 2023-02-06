/**
 * 在开发中我们可能会看到一些常用的名称:
 * T: Type的缩写, 类型
 * K, V: key和value的缩写, 键值对
 * E: Element的缩写, 元素
 * O: Object的缩写, 对象
 */

namespace a {
    // 泛型接口
    interface IPerson<T1, T2> {
        name: T1
        age: T2
    }

    const p: IPerson<string, number> = {
        name: "why",
        age: 18
    }
}

namespace b {
    // 泛型类
    class Point<T> {
        x: T
        y: T
        z?: T
        constructor(x: T, y: T, z?:T) {
            this.x = x; this.y = y; this.z = z;
        }
    }
    const p: Point<string> = new Point("1.33", "2.22")

    const names: string[] = ["a", "b", "c"];
    const names1: Array<string> = ["a", "b", "c"]; // 不推荐 (react jsx <>)

}

namespace c {
    // 泛型类型的约束
    interface ILength {
        length: number
    }
    function getLength<T extends ILength>(arg: T) {
        return arg.length
    }

    getLength("abc");
    getLength([1, 2, 3]);
    getLength({length: 100})
}