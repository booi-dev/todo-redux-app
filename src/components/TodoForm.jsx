import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { useTheme } from './ThemeContext';
import './todoForm.css'

let date = new Date()
let dateFormated = format(date, 'dd-MMM')

function TodoInput({ addTodo }) {

    const lightTheme = useTheme()
    const inputRef = useRef()

    const [theme, setTheme] = useState('dark');

    let todo = {
        id: nanoid(),
        task: "",
        note: "",
        dateOfCreation: Date.now(),
        dueDate: dateFormated,
        priority: "medium",
        group: "dragon",
        isComplete: false,
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        lightTheme ? setTheme('light') : setTheme('dark')
    }, [lightTheme])

    const inputHandler = function (e) {
        // initialTodo = { ...initialTodo, name: e.target.value }
        todo = { ...todo, task: inputRef.current.value }
    }

    const clearInputVal = function () {
        todo = {
            ...todo,
            id: nanoid(),
            complete: false,
            task: ""
        }
        inputRef.current.value = ''
    }

    const submitHandler = function (e) {
        e.preventDefault();
        addTodo(todo)
        clearInputVal()
    }

    const enterHandler = function (e) {
        e.key === "Enter" && submitHandler(e)
    }

    return (
        <>
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
        </>
    )

}

export default TodoInput;