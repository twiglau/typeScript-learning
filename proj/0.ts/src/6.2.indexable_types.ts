namespace a {
    interface States {
        [state: string]: boolean;
    }
    let s: States = { 'enabled': true, 'maximized': false}
    console.log(s);
    console.log(s["enabled"]);
}