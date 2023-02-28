import { useState } from 'react';

import { updateDataLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import './TodoExpand.css';

function TodoView(props) {

    const { todo, toggleTodoView } = props;

    const { updateTodo } = useTodoControls();
    const { theme } = useThemeControls;

    const [todoData, setTodoData] = useState({ ...todo });

    const closeTodoView = function () {
        toggleTodoView();
    };

    const handleUpdateTodo = function (targetTodo) {
        updateTodo(targetTodo);
        updateDataLS(targetTodo);
    };

    const handlerEnterKey = function (e) {
        e.key === "Enter" && handleUpdateTodo(todoData);
    };

    return (
        <>
            <div className={`todo-view ${theme}`}>
                <textarea
                    className={`task--view ${theme}`}
                    value={todoData.task}
                    onChange={(e) => setTodoData({
                        ...todoData,
                        task: e.currentTarget.value
                    })}
                    onKeyDown={handlerEnterKey}
                    onBlur={() => handleUpdateTodo(todoData)}
                />
                <textarea
                    id="note"
                    className={`note--view ${theme}`}
                    value={todoData.note}
                    placeholder='add note ...'
                    onChange={(e) => setTodoData({
                        ...todoData,
                        note: e.currentTarget.value
                    })}
                    onKeyDown={handlerEnterKey}
                    onBlur={() => handleUpdateTodo(todoData)}
                />

                <button type='button' onClick={closeTodoView}
                    className={`del-btn--view ${theme}`}
                >close</button>
            </div>

            <button type='button'
                className='back-drop--todo-view'
                onClick={closeTodoView}
                onKeyDown={event => {
                    if (event.key === 'Esc') {
                        closeTodoView();
                    }
                }}
            />

        </>
    );
}

export default TodoView;