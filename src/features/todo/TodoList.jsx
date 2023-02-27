import TodoItem from "./TodoItem";
import './TodoList.css';

function TodoList(props) {
    const { todos, deleteTodo, toggleCompleteStatus, updateTodo } = props;
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleCompleteStatus={toggleCompleteStatus}
                    updateTodo={updateTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;