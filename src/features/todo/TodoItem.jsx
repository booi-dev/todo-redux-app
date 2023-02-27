import { useCallback, useState } from 'react';
// import TodoView from './TodoView';
import deleteIcon from '../../assets/delete.png';
import deleteIconWarning from '../../assets/delete-warn.png';
import useThemeUpdator from '../../hooks/useThemeUpdator';

import './TodoItem.css';

function TodoView(props) {

    const { todo, deleteTodo, toggleCompleteStatus, updateTodo } = props;

    const [btnClass, setBtnClass] = useState('del-btn--todo');
    const [delBtnWarning, setSelBtnWarning] = useState(false);
    const [todoAnimClass, setTodoAnimClass] = useState('');

    const [todoView, setTodoView] = useState(false);

    const theme = useThemeUpdator();

    const handleDelBtnClick = function () {
        setTodoAnimClass('vanishing-anim');
        setTimeout(() => { deleteTodo(todo.id); }, 1000);
    };

    const handleCheckboxOnChange = function () {
        toggleCompleteStatus(todo.id);
    };

    const toggleTodoView = useCallback(() => {
        setTodoView(!todoView);
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
                        onChange={handleCheckboxOnChange}
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
                    onClick={handleDelBtnClick}
                    onMouseEnter={() => setSelBtnWarning(true)}
                    onMouseLeave={() => setSelBtnWarning(false)}
                >
                    {delBtnWarning
                        ? <img src={deleteIconWarning} alt="delete button" className='del-icon-warning--todo' />
                        : <img src={deleteIcon} alt="delete button" />}
                </button>
            </div>
            {todoView && <TodoView todo={todo}
                toggleTodoView={toggleTodoView}
                updateTodo={updateTodo}
            />}
        </>
    );
}

export default TodoView;


