import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

let date = new Date()
let dateFormated = format(date, 'dd-MMM')

function TodoInput({ handleTodoAdd }) {
    const inputRef = useRef()

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
    })

    const inputHandler = function (e) {
        // initialTodo = { ...initialTodo, name: e.target.value }
        todo = { ...todo, task: inputRef.current.value }
    }

    const clearInputVal = function () {
        todo = {
            id: nanoid(),
            complete: false,
            task: ""
        }
        inputRef.current.value = ''
    }

    const submitHandler = function (e) {
        e.preventDefault();
        handleTodoAdd(todo)
        clearInputVal()
    }

    const enterHandler = function (e) {
        e.key === "Enter" && submitHandler(e)
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input
                    ref={inputRef}
                    onChange={inputHandler}
                    onKeyDown={enterHandler}
                    required
                />
                <button type='submit'>add</button>
            </form>
        </>
    )

}

export default TodoInput;