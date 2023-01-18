import { useState, useRef, useEffect, Fragment } from 'react'

function TodoInput() {
    const inputRef = useRef()

    let initialTodo = {
        id: 1,
        complete: false,
        name: ""
    }

    useEffect(() => {
        inputRef.current.focus()
    })

    const inputHandler = function (e) {
        // initialTodo = { ...initialTodo, name: e.target.value }
        initialTodo = { ...initialTodo, name: inputRef.current.value }
    }

    const submitHandler = function (e) {
        e.preventDefault();
        console.log(initialTodo.name)
    }

    const enterHandler = function (e) {
        e.key === "Enter" && submitHandler(e)
    }

    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <input
                    ref={inputRef}
                    onChange={inputHandler}
                    onKeyDown={enterHandler}
                />
                <button type='submit'>add</button>
            </form>
        </Fragment>
    )

}

export default TodoInput;