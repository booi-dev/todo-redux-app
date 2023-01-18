import Todo from "./Todo";

function Todos({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    // key={todo.id}
                    todo={todo}
                />
            ))}
        </ul>
    )
}

export default Todos;