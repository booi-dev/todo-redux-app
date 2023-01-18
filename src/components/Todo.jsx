import { useState } from 'react'
import './Todo.css'

function Todo({ todo }) {
    // console.log(todo)
    return (
        <div className='todo'>
            <input type="checkbox" className='checkbox' />
            <span>{todo.task}</span>
        </div>
    )
}

export default Todo
