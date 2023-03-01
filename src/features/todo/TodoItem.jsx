/* eslint-disable no-unused-expressions */
import { useCallback, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';

import { deleteDataFromLS, toggleDataCompleteLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import TodoExpand from './TodoExpand';

import './TodoItem.css';

function TodoView(props) {

    const { todo } = props;

    const { deleteTodo, switchComplete } = useTodoControls();
    const { theme } = useThemeControls();

    const [isOptions, setIsOptions] = useState(false);
    const [isExpand, setIsExpand] = useState(false);

    const [todoAnimClass, setTodoAnimClass] = useState('');

    const handleToggleComplete = (targetTodo, e) => {
        e.stopPropagation();
        switchComplete(targetTodo);
        toggleDataCompleteLS(targetTodo);
    };

    const toggleTodoView = useCallback(() => {
        setIsExpand(!isExpand);
    });

    const handleEnterForTask = function (e) {
        e.key === "Enter" && toggleTodoView();
    };

    const handleExpandBtn = () => {
        if (!isOptions) return;
        setIsExpand(!isExpand);
        setIsOptions(false);
    };

    const handleDelBtnClick = (targetTodo) => {
        if (!isOptions) return;
        setIsOptions(false);
        setTodoAnimClass('vanishing-anim');
        setTimeout(() => {
            deleteTodo(targetTodo);
            deleteDataFromLS(targetTodo);
        }, 1000);
    };

    return (
        <>
            <div>
                <div className={`todo ${todoAnimClass} ${theme}`}>
                    <div role='group'
                        className='todo-check-task-container'>
                        <button type='button'
                            className='todo-check-btn'
                            onClick={(e) => { handleToggleComplete(todo, e); }}
                        >
                            {
                                todo.isComplete
                                    ? <BsCheckCircle size={20} className='circle-icon checked' />
                                    : <BsCircle size={20} className={`circle-icon ${theme}`} />
                            }
                        </button>
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

                    <button type='button'
                        onClick={() => setIsOptions(!isOptions)}>
                        <MdKeyboardArrowDown className={`arrow-down-icon ${isOptions && 'up'}`} size={28} />
                    </button>
                </div>
                <div className={`option-menu ${theme} ${isOptions && 'show'}`}
                    onMouseLeave={() => setIsOptions(false)} >
                    <button type='button' className={`option-btn ${theme}`}
                        onClick={handleExpandBtn}
                    >view note</button>
                    <button type='button' className={`option-btn delete ${theme}`}
                        onClick={() => handleDelBtnClick(todo)}>delete
                    </button>
                </div>
            </div>
            {isExpand && <TodoExpand todo={todo}
                toggleTodoView={toggleTodoView}
            />}
        </>
    );
}

export default TodoView;


