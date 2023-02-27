import { useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import useThemeUpdator from '../../hooks/useThemeUpdator';
import './todoForm.css';

const date = new Date();
const dateFormated = format(date, 'dd-MMM');

function TodoForm({ handleAddTodo }) {
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

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const theme = useThemeUpdator();

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

    return (
        <form
            onSubmit={submitHandler}
            className='form'
        >
            <input
                className={`input--form ${theme}`}
                ref={inputRef}
                onChange={inputHandler}
                onKeyDown={enterHandler}
                placeholder="add note"
                required
            />
            <button type='submit' className={`sub-btn--form ${theme}`}>add</button>
        </form>
    );

}

export default TodoForm;