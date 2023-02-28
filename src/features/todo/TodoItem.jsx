/* eslint-disable no-unused-expressions */
import { useCallback, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { deleteDataFromLS, toggleDataCompleteLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import TodoExpand from './TodoExpand';

import './TodoItem.css';

function TodoView(props) {

    const { todo } = props;

    const { deleteTodo, switchComplete } = useTodoControls();
    const { theme } = useThemeControls();

    const [isDelBtnShow, setIsDelBtn] = useState(false);
    const [isExpand, setIsExpand] = useState(false);

    const [todoAnimClass, setTodoAnimClass] = useState('');

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
                className={`todo ${todoAnimClass} ${theme}`}
                onMouseEnter={() => setIsDelBtn(true)}
                onMouseLeave={() => setIsDelBtn(false)}
            >
                <div>
                    <input
                        type="checkbox"
                        className='checkbox--todo'
                        onChange={() => handleToggleComplete(todo)}
                        checked={todo.isComplete}
                    />
                    <span type='button'
                        role='button'
                        tabIndex={0}
                        className={`task--todo ${todoAnimClass}`}
                        onClick={toggleTodoView}
                        onKeyDown={handleEnterForTask}
                    >
                        {todo.task}
                    </span>
                </div>
                {
                    isDelBtnShow
                    && <button
                        type='button'
                        className='del-btn--todo'
                        onClick={() => handleDelBtnClick(todo)}
                    >
                        <MdDeleteForever size={23} className="del-btn--icon" />
                    </button>
                }
            </div>
            {isExpand && <TodoExpand todo={todo}
                toggleTodoView={toggleTodoView}
            />}
        </>
    );
}

export default TodoView;


