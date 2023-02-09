export interface Student {
  name: string;
  age: number;
  class: string;
  school: string;
}

export type PersonAttr = "name" | "age";
export type StudentAttr = "name" | "age" | "class" | "school";

/**
 * 1. Partial (部分的)
 * > Make all properties in T optional
 * > 作用是让传入类型中的所有属性变成都是可选的
 * type Partial<T> = {
 *    [P in keyof T]?: T[P];
 * }
 */
// 1.1 Type '{}' is missing the following properties from type 'Student': name, age, class, schoolts(2739)
// const student_partial1: Student = {}
const student_partial2: Partial<Student> = {};

/**
 * 2. Required (必须的)
 * > Make all properties in T required
 * > 跟Partial作用是相反的, 是让传入类型的所有属性编程都是必须的
 * type Required<T> = {
 *    [P in keyof T]-?: T[P]
 * }
 */
export interface Animal {
  legs?: number;
  wings?: number;
}

const dog: Animal = {};
// 2.1 Type '{}' is missing the following properties from type 'Required<Animal>': legs, wingsts(2739)
// const bird: Required<Animal> = {}

/**
 * 3. Readonly (只读的)
 * > Make all properties in T readonly
 * > 让传入类型中的所有属性变成都是只读的 (不能修改属性)
 * type Readonly<T> = {
 *    readonly [P in keyof T]: T[P];
 * }
 */

const student_readonly1: Student = {
  name: "张",
  age: 20,
  class: "中",
  school: "小",
};
student_readonly1.age = 21;

const student_readonly2: Readonly<Student> = {
  name: "李",
  age: 18,
  class: "长川",
  school: "小学",
};
// 3.1 Cannot assign to 'age' because it is a read-only property.ts(2540)
// student_readonly2.age = 20

/**
 * 4. Pick (选择)
 * > From T, pick a set of properties whose keys are in the union K
 * > 选择传入类型的部分属性组成新的类型
 * type Pick<T, K extends keyof T> = {
 *    [P in K]: T[P]
 * }
 */

const student_pick1: Student = {
  name: "赵",
  age: 24,
  class: "小四",
  school: "兆审县",
};

// 4.1 'class' does not exist in type 'Pick<Student, "name" | "age">'.
const student_pick2: Pick<Student, "name" | "age"> = {
  name: "秦",
  age: 21,
  //   class: "秦岭",
};

/**
 * 5. Record (记录)
 * > Construct a type with a set of properties K of type T
 * > 构建一个类型, 这个类型用来描述一个对象, 这个对象的属性都具有相同的类型
 * > Record应该是日常使用频率较高的内置类型了, 主要用来描述对象, 一般建议是不用Object来描述对象,
 * > 而是用Record代替, Record<string, any> 几乎可以说是万金油了
 * type Record<K extends keyof any, T> = {
 *    [P in K]: T;
 * }
 */

const student_record: Record<string, any> = {
  name: "常",
  age: 30,
};

/**
 * 6. Exclude (排除)
 * > Exclude from T those types that are assignable to U
 * > 针对联合类型(interface这种没有), 排除相同的, 留下不同的
 * type Exclude<T, U> = T extends U ? never : T;
 */

// 6.1 只能被赋值为'class' 或者'school'
const student_exclude: Exclude<StudentAttr, PersonAttr> = "class";

/**
 * 7. Extract (取出)
 * > Extract from T those types that are assignable to U
 * > 针对联合类型, 排除不同的, 取出相同的
 * type Extract<T, U> = T extends U ? T : never;
 */

// 7.1 只能被赋值为 'name' 或者 'age'
const student_extract: Extract<StudentAttr, PersonAttr> = "name";

/**
 * 8. Omit (省略)
 * > Construct a type with the properties of T except for those in type K.
 * > 传入一个类型, 和这个类型的几个属性, 把传入的属性省略掉, 组成一个新类型
 * type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, k>>;
 */

// 8.1 Property 'school' is missing in type '{ class: string; }' but required in type 'Omit<Student, PersonAttr>'.ts(2741)
// const student_omit1: Omit<Student, PersonAttr> = { class: "大五" };
// 8.2
const student_omit2: Omit<Student, StudentAttr> = {};

/**
 * 9. NonNullable (不能为null)
 * > Exclude null and undefined from T
 * > 不能为空
 * type NonNullable<T> = T extends null | undefined ? never : T;
 */

// 9.1 student_nonnullable赋值为null会报错（在tsconfig.json配置文件中开启类型检查，"skipLibCheck": false）
const student_nonnullable: NonNullable<Student | undefined | null> = null;

/**
 * 10 Parameters (参数)
 * > Obtain the parameters of a function type in a tuple
 * > 传入函数的参数组成的类型
 * > 需要理解的是因为Parameters2计算的是函数参数类型，所以其泛型约束是一个函数
 * > 在这函数类型约束里面通过infer P 占位，然后就可以获取参数类型了
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
 */

export interface StudentFunc {
  (fname: string, age: number): Student;
}

// 10.1 student1的类型为[fname: string, age: number]
const student_paramter: Parameters<StudentFunc> = ["lau", 8];

// 10.2 infer: 表示条件类型中的类型推断, 必须在条件类型中出现. 可以理解为在声明类型中的占位符, 在后面类型推断时才
// 确定具体的类型
type GetParent<T> = T extends infer R ? R : never;
// 计算逻辑 type Get<number> = number extends infer number ? number : never
type MyNumber = GetParent<number>;
let my_num: MyNumber = 10;

/**
 * 11. ConstructorParameters (构造参数)
 * > Obtain the parameters of a constructor function type in a tuple
 * > 获取传入构造函数的参数组成的类型
 * type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
 */

export interface StudentConstructor {
  new (name: string, age: number): Student;
}
// 11.1 student_constructor的类型为[name: string, age: number]
const student_constructor: ConstructorParameters<StudentConstructor> = [
  "twig",
  10,
];

/**
 * 12. ReturnType (返回类型)
 * > Obtain the return type of a function type
 * > 获取传入函数的返回类型
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;
 */

// 12.1 student_returntype的类型为Student
const student_returntype: ReturnType<StudentFunc> = {
  name: "lau",
  age: 8,
  class: "大四",
  school: "可难",
};

/**
 * 13 InstanceType (构造返回类型, 实例类型)
 * > Obtain the ruturn type of a constructor function type
 * > 获取传入构造函数的返回类型
 * type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
 */

const Teacher = class {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  showProfile() {
    console.log("name: ", this.name, "age: ", this.age);
  }
};
const teacher: InstanceType<typeof Teacher> = new Teacher("李师", 30);
