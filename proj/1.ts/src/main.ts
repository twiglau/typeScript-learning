import axios from 'axios';
import lodash from 'lodash'; // 自定义lodash声明文件 或者 @types/lodash
import { add , sub } from './utils/math';
import { time }  from './utils/format';

import testImg from './img/1.jpeg' // lau.d.ts 声明文件

console.group('自己定义的模块使用:')
console.log(add(1, 2));
console.log(sub(100, 50));
console.log(time.format("时间"));
console.groupEnd()

console.group('第三方模块采用自定义声明: ')
console.log(lodash.join(["a", "b", "c"]));
console.groupEnd()


console.group('index.html中变量在main.ts中访问,采用自定义声明: ')
console.log(lauName)
console.log(lauAge)
console.log(lauHeight)
console.log(lauEat())
const p = new LauPerson("lau", 18)
console.log(p)
console.groupEnd()

// 命名空间的使用
$.ajax({

})