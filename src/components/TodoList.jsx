import Todo from "./Todo";

function TodoList({ todos, handleTodoDelete }) {

    return (
        <ul>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    // key={todo.id}
                    todo={todo}
                    handleTodoDelete={handleTodoDelete}
                />
            ))}
        </ul>
    )
}

export default TodoList;