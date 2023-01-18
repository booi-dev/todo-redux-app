import { useState } from 'react'
import './Todo.css'

function Todo({ todo }) {
    // console.log(todo)
    return (
        <div className='todo'>
            <input type="checkbox" id='checkbox' />
            <span>{todo.name}</span>
        </div>
    )
}

export default Todo
