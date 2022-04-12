
/**
 * 为什么会有泛型, 它的意义在哪里?  
 * 
 */
namespace a {
    // 1. 泛型
    function createArray<T>(length: number, value: T):Array<T> {
        let result: Array<T> = []
        for(let i=0;i<length;i++){
            result[i] = value;
        }
        return result;
    }
    let result = createArray<string>(3, 'x');
    console.log(result);

    // 2. 类数组 ArrayLike arguments
    function sum(...args2: any[]){
        let args: IArguments = arguments;
        for(let i=0;i<args.length;i++){
            console.log(args[i]);
        }
    }
    sum(1,2,3);
    //2.1 ArrayLike 
    // let root: HTMLElement | null = document.getElementById('root');
    // let children: HTMLCollection = root!.children;
    // let childNodes: NodeListOf<ChildNode> = root!.childNodes;

    // 3. 类泛型
    class MyArray<T>{
        private list: T[] = []
        add(val:T){
            this.list.push(val);
        }
        getMax(): T {
            let result = this.list[0];
            for(let i=1;i<this.list.length;i++){
                if(this.list[i]>result){
                    result = this.list[i];
                }
            }
            return result;
        }
    }
    let arr = new MyArray<number>();
    arr.add(1);arr.add(2);arr.add(3);
    let result3: number = arr.getMax();
    console.log(result3)


    //4. 接口泛型 
    // 断言: x as number 或 <number>x
    interface Calculate {
        <T>(a: T, b: T): T
    }
    let add:Calculate = function<T>(a:T, b:T):T {
        return a;
    }
    const result4 = add<number>(1,2);
    console.log(result4);


    //5. 多个类型参数  如何在不增加中间变量的情况下,交换二个变量的值  
    function swap<A,B>(tuple: [A,B]):[B,A] {
        return [tuple[1],tuple[0]];
    }
    let result5 = swap<string,number>(['lau',10]);
    console.log(result5);


    //6. 默认泛型
    function createArray2<T = number>(length: number):T|null{
        let t: T|null = null;
        return t;
    }
    let result6 = createArray2(3);

    //7. 泛型的约束  
    //在函数中使用泛型的时候, 由于预先并不知道具体的类型, 所以不能访问相应类型的方法
    interface LengthWise {
        length: number;
    }
    function logger<T extends LengthWise>(val: T){
        console.log(val.length);
    }
    //8. 泛型接口
    interface Cart<T> {
        list: T[]
    }
    const cart: Cart<string> = {
        list: ['1', '2', '3']
    }

    //9. 泛型 类型别名
    type Shop<T> = { list: T[]} | T[];
    let s: Shop<string> = {list: ['1']};
    let s1: Shop<string> = ['1'];
    // interface 定义一个实实在在的接口, 它是一个真正的类型  
    // type 一般用来定义别名, 并不是一真正的类型  
 }