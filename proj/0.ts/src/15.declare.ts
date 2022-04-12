// 如何定义一个复杂对象
// jQuery
declare namespace jQuery {
    function ajax(url: string, config: any): void
    //不允许在环境上下文中使用初始化表达式
    let name: string;// = 'jquery';
    namespace fn {
        function extend(object: any): void
    }
}
jQuery.ajax('/api/users', {});
jQuery.name;
jQuery.fn.extend({});