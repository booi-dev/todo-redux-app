import Todo from "./Todo";

function TodoList({ todos, deleteTodo, toggleCompleteStatus, updateTodo }) {

    return (
        <ul>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleCompleteStatus={toggleCompleteStatus}
                    updateTodo={updateTodo}
                />
            ))}
        </ul>
    )
}

export default TodoList;