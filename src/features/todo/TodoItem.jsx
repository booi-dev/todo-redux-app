/* eslint-disable no-unused-expressions */
import { useCallback, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';

import { deleteDataFromLS, toggleDataCompleteLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import TodoOptions from './TodoOptions';
import TodoExpand from './TodoExpand';

import './TodoItem.css';

function TodoView(props) {

    const { todo, isOptionShow, setIsOptionShow } = props;

    const { deleteTodo, switchComplete } = useTodoControls();
    const { theme } = useThemeControls();

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

    const toggleOptions = (targetTodo) => {
        if (isOptionShow) { setIsOptionShow(' '); }
        else { setIsOptionShow(targetTodo.id); }
    };

    const handleEnterForTask = function (e) {
        e.key === "Enter" && toggleTodoView();
    };

    const handleExpandBtn = useCallback(() => {
        if (isOptionShow) return;
        setIsExpand(!isExpand);
    }, [isOptionShow, isExpand]);

    const handleDelBtnClick = useCallback((targetTodo) => {
        if (isOptionShow) return;
        setTodoAnimClass('vanishing-anim');
        setTimeout(() => {
            deleteTodo(targetTodo);
            deleteDataFromLS(targetTodo);
        }, 1000);
    }, [isOptionShow]);

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
                        onClick={() => toggleOptions(todo)}>
                        <MdKeyboardArrowDown className={`arrow-down-icon ${isOptionShow && 'up'}`} size={28} />
                    </button>
                </div>
                <TodoOptions
                    todo={todo}
                    handleExpandBtn={handleExpandBtn}
                    handleDelBtnClick={handleDelBtnClick}
                    isOptionShow={isOptionShow}
                />
            </div>
            {isExpand && <TodoExpand todo={todo}
                toggleTodoView={toggleTodoView}
            />}
        </>
    );
}

export default TodoView;


