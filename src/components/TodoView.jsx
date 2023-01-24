/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect } from 'react';
import './TodoView.css';

import { useTheme } from '../context/ThemeContext';

function TodoView({ todo, toggleTodoView, updateTodo }) {

    const lightTheme = useTheme();
    const [theme, setTheme] = useState('dark');

    const [task, setTask] = useState(todo.task);
    const [note, setNote] = useState(todo.note);

    useEffect(() => {
        lightTheme ? setTheme('light') : setTheme('dark');
    }, [lightTheme]);

    const closeTodoView = function () {
        toggleTodoView();
    };

    const handleUpdateTodo = function () {
        updateTodo({ ...todo, task, note });
    };

    const handlerEnterKey = function (e) {
        e.key === "Enter" && handleUpdateTodo();
    };

    return (
        <>
            <div className={`todo-view ${theme}`}>
                <textarea
                    className={`task--view ${theme}`}
                    value={task}
                    onChange={(e) => setTask(e.currentTarget.value)}
                    onKeyDown={handlerEnterKey}
                    onBlur={handleUpdateTodo}
                />
                {/* </div> */}
                <label htmlFor='note' className='note-label'>note :
                    <textarea
                        id='note'
                        className={`note--view ${theme}`}
                        value={note}
                        placeholder='add note ...'
                        onChange={(e) => setNote(e.currentTarget.value)}
                        onKeyDown={handlerEnterKey}
                        onBlur={handleUpdateTodo}
                    />
                </label>
                <button type='button' onClick={closeTodoView}
                    className={`del-btn--view ${theme}`}
                >close</button>
            </div>
            <div
                role='dialog'
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