namespace c {
    class Person {
        name: string = "123"
        eating() {}
    }
    
    const p = new Person()

    // 1. 类的类型
    const p1: Person = {
        name: "why",
        eating() {
            console.log("why eating")
        }
    }

    // 2. 作用
    function printPerson(p: Person) {
        console.log(p.name)
    }
    printPerson(new Person())
    printPerson({ name: "kobe", eating: function() {}})
    
}