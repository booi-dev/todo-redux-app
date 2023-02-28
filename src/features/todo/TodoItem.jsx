/* eslint-disable no-unused-expressions */
import { useCallback, useState } from 'react';

import { deleteDataFromLS, toggleDataCompleteLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
// import useThemeControls from '../../app/themeControls';

import deleteIcon from '../../assets/delete.png';
import deleteIconWarning from '../../assets/delete-warn.png';
// import useThemeUpdator from '../../hooks/useThemeUpdator';

import TodoExpand from './TodoExpand';

import './TodoItem.css';

function TodoView(props) {

    const { todo } = props;

    const { deleteTodo, switchComplete } = useTodoControls();
    // const { theme } = useThemeControls();

    const [btnClass, setBtnClass] = useState('del-btn--todo');
    const [delBtnWarning, setSelBtnWarning] = useState(false);
    const [todoAnimClass, setTodoAnimClass] = useState('');
    const [isExpand, setIsExpand] = useState(false);

    const handleDelBtnClick = (targetTodo) => {
        setTodoAnimClass('vanishing-anim');
        setTimeout(() => {
            deleteTodo(targetTodo);
            deleteDataFromLS(targetTodo);
        }, 1000);
    };

    const handleToggleComplete = (targetTodo) => {
        switchComplete(targetTodo);
        toggleDataCompleteLS(targetTodo);
    };

    const toggleTodoView = useCallback(() => {
        setIsExpand(!isExpand);
    });

    const handleEnterForTask = function (e) {
        e.key === "Enter" && toggleTodoView();
    };

    return (
        <>
            <div
                className={`todo ${todoAnimClass}`}
                onMouseEnter={() => setBtnClass('del-btn--todo show')}
                onMouseLeave={() => setBtnClass('del-btn--todo')}
            >
                <div>
                    <input
                        type="checkbox"
                        className='checkbox--todo'
                        onChange={() => handleToggleComplete(todo)}
                        checked={todo.isComplete}
                    />
                    <button type='button'
                        tabIndex={0}
                        className={`task--todo ${todoAnimClass}`}
                        onClick={toggleTodoView}
                        onKeyDown={handleEnterForTask}
                    >
                        {todo.task}
                    </button>
                </div>
                <button
                    type='button'
                    className={btnClass}
                    onClick={() => handleDelBtnClick(todo)}
                    onMouseEnter={() => setSelBtnWarning(true)}
                    onMouseLeave={() => setSelBtnWarning(false)}
                >
                    {delBtnWarning
                        ? <img src={deleteIconWarning} alt="delete button" className='del-icon-warning--todo' />
                        : <img src={deleteIcon} alt="delete button" />}
                </button>
            </div>
            {isExpand && <TodoExpand todo={todo}
                toggleTodoView={toggleTodoView}
            />}
        </>
    );
}

export default TodoView;


