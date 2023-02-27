import { useCallback, useState } from 'react';
import deleteIcon from '../../assets/delete.png';
import deleteIconWarning from '../../assets/delete-warn.png';
import useThemeUpdator from '../../hooks/useThemeUpdator';
import TodoExpand from './TodoExpand';

import './TodoItem.css';

function TodoView(props) {

    const { todo, handleDeleteTodo, toggleCompleteStatus, updateTodo } = props;

    const [btnClass, setBtnClass] = useState('del-btn--todo');
    const [delBtnWarning, setSelBtnWarning] = useState(false);
    const [todoAnimClass, setTodoAnimClass] = useState('');

    const [isExpand, setIsExpand] = useState(false);

    const theme = useThemeUpdator();

    const handleDelBtnClick = (tobeDeleteTodo) => {
        setTodoAnimClass('vanishing-anim');
        setTimeout(() => { handleDeleteTodo(tobeDeleteTodo); }, 1000);
    };

    const handleCheckboxOnChange = (targetTodo) => {
        toggleCompleteStatus(targetTodo);
    };

    const toggleTodoView = useCallback(() => {
        setIsExpand(!isExpand);
    });

    const handleEnterForTask = function (e) {
        /* eslint-disable-next-line no-unused-expressions */
        e.key === "Enter" && toggleTodoView();
    };

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
                        onChange={() => handleCheckboxOnChange(todo)}
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
                updateTodo={updateTodo}
            />}
        </>
    );
}

export default TodoView;


