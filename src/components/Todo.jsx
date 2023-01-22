import { useState, useEffect } from 'react'
import TodoView from './TodoView'
import './Todo.css'

import deleteIcon from '../assets/delete.png';
import deleteIconWarning from '../assets/delete-warn.png';

import { useTheme } from './ThemeContext';

function Todo(props) {

    const { todo, deleteTodo, toggleCompleteStatus, updateTodo } = props;

    const lightTheme = useTheme()
    const [theme, setTheme] = useState('dark');

    const [btnClass, setBtnClass] = useState('del-btn--todo');
    const [delBtnWarning, setSelBtnWarning] = useState(false);
    const [todoAnimClass, setTodoAnimClass] = useState('');

    const [todoView, setTodoView] = useState(false)

    useEffect(() => {
        lightTheme ? setTheme('light') : setTheme('dark')
    }, [lightTheme])

    const handleDelBtnClick = function () {
        setTodoAnimClass('vanishing-anim')
        setTimeout(() => { deleteTodo(todo.id) }, 1000);
    }

    const handleCheckboxOnChange = function () {
        toggleCompleteStatus(todo.id)
    }

    const toggleTodoView = function () {
        setTodoView(!todoView)
    }

    const handleEnterForTask = function (e) {
        e.key === "Enter" && toggleTodoView()
    }

    return (
        <>
            <div
                className={`todo ${todoAnimClass} ${theme}`}
                onMouseEnter={() => setBtnClass('del-btn--todo show')}
                onMouseLeave={() => setBtnClass('del-btn--todo')}
            >
                <div>
                    <input
                        type="checkbox"
                        className='checkbox--todo'
                        onChange={handleCheckboxOnChange}
                        checked={todo.isComplete}
                    />
                    <h1
                        tabIndex={0}
                        className={`task--todo ${todoAnimClass}`}
                        onClick={toggleTodoView}
                        onKeyDown={handleEnterForTask}
                    >
                        {todo.task}
                    </h1>
                </div>
                <button
                    className={btnClass}
                    onClick={handleDelBtnClick}
                    onMouseEnter={() => setSelBtnWarning(true)}
                    onMouseLeave={() => setSelBtnWarning(false)}
                >
                    {delBtnWarning
                        ? <img src={deleteIconWarning} className='del-icon-warning--todo' />
                        : <img src={deleteIcon} />}
                </button>
            </div>
            {todoView && <TodoView todo={todo}
                toggleTodoView={toggleTodoView}
                updateTodo={updateTodo}
            />}
        </>
    )
}

export default Todo;