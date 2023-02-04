// 1. 类型缩小: Type Narrowing
// 1.1 可以通过类似于 typeof padding === 'number'的判断语句, 来改变TypeScript的执行路径;
// 1.2 在给定的执行路径中, 我们可以缩小比声明时更小的类型, 这个过程称之为 缩小;
// 1.3 而我们编写的 typeof padding === 'number' 可以称之为: 类型保护(type guards)
// 1.4 typeof, 平等缩小( ===, !==), instanceof, in 等等...
type IDType = number | string
function printID(id: IDType) {
    if(typeof id === 'string') {
        console.log(id.length, id.toUpperCase())
    } else {
        console.log(id)
    }
}

// 2. ===
type Direction = "left"|"right"|"top"|"down"
function printDirection(direction: Direction) {
    // 1.
    if(direction === "left"){
        console.log(direction)
    }
    // 2.
    switch(direction) {
        case 'left':
            console.log(direction)
            break;
        case 'right':
            console.log(direction)
            break;
        case 'top':
            console.log(direction)
            break;
        
    }
}


// 3. instanceof
function printTime(time: string | Date) {
    if(time instanceof Date) {
        console.log(time.toUTCString())
    } else {
        console.log(time)
    }
}
class Student {
    studying() {}
}
class Teacher {
    teaching() {}
}
function doSth(per: Student|Teacher) {
    if(per instanceof Student) {
        per.studying()
    } else {
        per.teaching()
    }
}



// 4. in
type Fish = { 
    swimming: () => void
}
type Dog = {
    running: () => void
}
function action(animal: Fish|Dog) {
    if('swimming' in animal) {
        animal.swimming()
    } else {
        animal.running()
    }
}
const fish: Fish = {
    swimming() {
        console.log('fish swimming')
    }
}