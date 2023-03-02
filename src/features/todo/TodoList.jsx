import { useState } from "react";
import TodoItem from "./TodoItem";
import './TodoList.css';

function TodoList(props) {
    const { todos } = props;

    const [activeOptionIndex, setActiveOptionIndex] = useState('');

    const setIsOptionShow = (state) => {
        setActiveOptionIndex(state);
    };

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    isOptionShow={activeOptionIndex === todo.id}
                    setIsOptionShow={setIsOptionShow}
                />
            ))}
        </ul>
    );
}

export default TodoList;