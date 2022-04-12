// 声明文件怎么写  
export {}
// 引用 jquery js 文件
declare const $: (selector: string) => {
    click(): void,
    width(length: number): void
}
// ---------------------- 以前写的JS 文件
$('root').click();
$('#root').width(100);

declare let name:string;
declare let age: number;
declare function getName():string;

declare enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}
let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]