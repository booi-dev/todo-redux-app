import { useState } from 'react'
import Todo from "./Todo";

function Todos({ initialTodos }) {
    const [todos, setTodos] = useState(initialTodos)

    // console.log(todos)

    return (
        <>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                />
            ))}
        </>
    )
}

export default Todos;