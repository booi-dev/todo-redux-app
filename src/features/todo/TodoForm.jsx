import { useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import { addDataToLS } from '../../utils/localStorage';
import useTodoControls from '../../app/todoControls';
import useThemeControls from '../../app/themeControls';

import './todoForm.css';

const date = new Date();
const dateFormated = format(date, 'dd-MMM');

function TodoForm() {

    const { addTodo } = useTodoControls();
    const { theme } = useThemeControls();

    const inputRef = useRef();

    let todo = {
        id: nanoid(),
        task: "",
        note: "",
        dateOfCreation: Date.now(),
        dueDate: dateFormated,
        priority: "medium",
        group: "dragon",
        isComplete: false,
    };

    const handleAddTodo = () => {
        addDataToLS(todo);
        addTodo(todo);
    };

    const inputHandler = function (e) {
        todo = { ...todo, task: e.target.value };
    };

    const clearInputVal = function () {
        todo = {
            ...todo,
            id: nanoid(),
            complete: false,
            task: ""
        };
        inputRef.current.value = '';
    };

    const submitHandler = function (e) {
        e.preventDefault();
        handleAddTodo(todo);
        clearInputVal();
    };

    const enterHandler = function (e) {
        /* eslint-disable-next-line no-unused-expressions */
        e.key === "Enter" && submitHandler(e);
    };

    const autoClearInputField = () => {
        setTimeout(() => {
            clearInputVal();
        }, 2000);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <form
            onSubmit={submitHandler}
            className='form'
        >
            <input
                className={`input--form ${theme}`}
                ref={inputRef}
                placeholder="add note"
                required
                onChange={inputHandler}
                onKeyDown={enterHandler}
                onBlur={autoClearInputField}

            />
            <button type='submit' className={`sub-btn--form ${theme}`}>add</button>
        </form>
    );

}

export default TodoForm;