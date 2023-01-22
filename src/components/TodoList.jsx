import Todo from "./Todo";
import './TodoList.css'

function TodoList(props) {
    const { todos, deleteTodo, toggleCompleteStatus, updateTodo } = props;
    return (
        <ul className="todo-list">
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