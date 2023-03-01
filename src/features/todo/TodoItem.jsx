/* eslint-disable no-unused-expressions */
import { useCallback, useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';

import { deleteDataFromLS, toggleDataCompleteLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import TodoExpand from './TodoExpand';
import BackDrop from '../../components/BackDrop';

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
        setIsExpand(!isExpand);
        setIsOptions(false);
    };

    const handleDelBtnClick = (targetTodo) => {
        setTodoAnimClass('vanishing-anim');
        setIsOptions(false);
        setTimeout(() => {
            deleteTodo(targetTodo);
            deleteDataFromLS(targetTodo);
        }, 1000);
    };

    const backdropHandler = () => {
        setIsOptions(false);
    };

    const onParentClick = () => {
        console.log("parent clicked");
    };

    return (
        <>
            <div className={`todo ${todoAnimClass} ${theme}`}>
                <div role='group'
                    className='todo-check-task-container'
                    onClick={onParentClick}>
                    <button type='button'
                        className='todo-check-btn'
                        onClick={(e) => { handleToggleComplete(todo, e); }}
                    >
                        {
                            todo.isComplete
                                ? <BsCheckCircle size={20} className='circle-icon checked' />
                                : <BsCircle size={20} className='circle-icon' />
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
                    <GoKebabVertical className='kebab-menu-btn' size={20} />
                </button>
                {isOptions &&
                    <BackDrop handler={backdropHandler} />
                }
                {isOptions &&
                    <div className='option-menu'
                        onMouseLeave={() => setIsOptions(false)}>
                        <button type='button' className='option-btn'
                            onClick={handleExpandBtn}
                        >expand</button>
                        <button type='button' className='option-btn delete'
                            onClick={() => handleDelBtnClick(todo)}>delete </button>
                    </div>
                }

            </div>
            {isExpand && <TodoExpand todo={todo}
                toggleTodoView={toggleTodoView}
            />}
        </>
    );
}

export default TodoView;


