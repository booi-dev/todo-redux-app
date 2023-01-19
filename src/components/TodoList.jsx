import Todo from "./Todo";

function TodoList({ todos, deleteTodo, toggleCompleteStatus }) {

    return (
        <ul>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleCompleteStatus={toggleCompleteStatus}
                />
            ))}
        </ul>
    )
}

export default TodoList;