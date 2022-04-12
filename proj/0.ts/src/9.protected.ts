namespace a {
        // 1. 类型保护 typeof 就是更精确的知道 是那种类型
    function double(input: string | number | boolean){
        if(typeof input === 'string') {
            input.toLowerCase();
        }else if(typeof input === 'number'){
            input.toFixed(2);
        }else {
            input;
        }
    }
    // 1.1 instanceof
    class Animal {
        public name:string = 'Dog'
    }
    class Bird extends Animal {
        public swing: number = 2;
    }
    function getName(a: Animal){
        if(a instanceof Bird){
            a.swing;
        }else{
            a.name;
        }
    }
    // 1.2 null保护
    function getFirstLetter(s: string | null) {
        if(s === null){
            s='';
        }
        return s.charAt(0);
    }

    // 1.3 链判断 标识类型
    namespace a {
        let c = {b: 1};
        console.log(c?.b);
    }

    // 1.4 可辨识的联合类型
    /**
     * 1. 就是利用联合类型中的公有字段进行类型保护的一种技巧
     * 2. 相同字段的不同取值就是可辨识
     */
    interface WarningButton {
        class: 'warning',
        text1: '修改'
    }
    interface DangerButton {
        class: 'danger',
        text2: '删除'
    }
    type Button = WarningButton|DangerButton;
    function getButton(button: Button) {
        if(button.class === 'warning') {
            button.text1;
        }else{
            button.text2;
        }
    }

    interface Bird {
        swing: number
    }
    interface Dog {
        leg: number
    }
    function getNumber(x:Bird|Dog){
        if('swing' in x) {
            x.swing
        }else{
            x.leg;
        }
    }

}
// 自定义的 类型保护
namespace b {
    interface Bird {
        name1: 'sparrow'
        legs: number
    }
    interface Dog {
        name2: 'mastiff',
        legs: number
    }
    function isBird(x: Bird|Dog): x is Bird {
        return (<Bird>x).legs === 2;
        return (x as Bird).legs === 2;
        return x.legs === 2;
    }
    function getAnimal(x: Bird|Dog){
        if(isBird(x)){
            x.name1;
        }else{
            x.name2;
            //类型“never”上不存在属性“legs”。
            // x.legs;
        }
    }
}
