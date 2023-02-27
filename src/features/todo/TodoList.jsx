import TodoItem from "./TodoItem";
import './TodoList.css';

function TodoList(props) {
    const { todos } = props;
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                // toggleCompleteStatus={toggleCompleteStatus}
                // handleUpdateTodo={handleUpdateTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;