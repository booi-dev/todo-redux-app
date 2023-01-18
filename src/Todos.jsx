import { useState } from 'react'
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import { nanoid } from 'nanoid'

function Todos() {

    const initialTodos = [
        {
            id: nanoid(),
            complete: false,
            name: "i'll become the pirate king"
        },
        {
            id: nanoid(),
            complete: true,
            name: "I'll become Hokage"
        },
        {
            id: nanoid(),
            complete: false,
            name: "I'll exterminate all titans"
        }
    ]

    const [todos, setTodos] = useState(initialTodos)

    const addTodoHandler = function (todo) {
        // initialTodos.push(todo)
        setTodos([...todos, todo])
    }

    return (
        <>
            <TodoInput
                addTodoHandler={addTodoHandler}
            />

            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    // key={todo.id}
                    todo={todo}
                />
            ))}
        </>
    )
}

export default Todos;