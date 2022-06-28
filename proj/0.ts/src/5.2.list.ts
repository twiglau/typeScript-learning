interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;

}
class Todo1 {
    userId: number;
    id:number;
    title: string;
    completed: boolean;
}
let todos: Todo1[] = [
    {
        "userId":1,
        "id":1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId":2,
        "id":3,
        "title": "delectus aut autem",
        "completed": true
    }
]