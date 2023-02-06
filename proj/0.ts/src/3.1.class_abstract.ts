abstract class Shape {
    abstract getArea():number
}

class Rectangle extends Shape {
    private width: number
    private height: number

    constructor(width: number, height:  number) {
        super()
        this.width = width
        this.height = height
    }

    getArea(): number {
        return this.width * this.height
    }
}
export {}