import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'

function TodoInput({ addTodoHandler }) {
    const inputRef = useRef()

    let todo = {
        id: nanoid(),
        complete: false,
        name: ""
    }

    useEffect(() => {
        inputRef.current.focus()
    })

    const inputHandler = function (e) {
        // initialTodo = { ...initialTodo, name: e.target.value }
        todo = { ...todo, name: inputRef.current.value }
    }


    const clearInputVal = function () {
        todo = {
            id: nanoid(),
            complete: false,
            name: ""
        }
        inputRef.current.value = ''
    }


    const submitHandler = function (e) {
        e.preventDefault();
        addTodoHandler(todo)
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