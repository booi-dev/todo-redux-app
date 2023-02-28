import { useState } from 'react';

import { updateDataLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import BackDrop from '../../components/BackDrop';

import './TodoExpand.css';

function TodoView(props) {

    const { todo, toggleTodoView } = props;

    const { updateTodo } = useTodoControls();
    const { theme } = useThemeControls();

    const [todoData, setTodoData] = useState({ ...todo });

    // const closeTodoView = useCallback(() => {
    //     toggleTodoView();
    // }, []);

    const handleUpdateTodo = function (targetTodo) {
        updateTodo(targetTodo);
        updateDataLS(targetTodo);
    };

    const handlerEnterKey = function (e) {
        e.key === "Enter" && handleUpdateTodo(todoData);
    };

    return (
        <div>
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

                <button type='button' onClick={() => toggleTodoView()}
                    className={`del-btn--view ${theme}`}
                >close</button>
            </div>
            <BackDrop handler={toggleTodoView} />

        </div>
    );
}

export default TodoView;