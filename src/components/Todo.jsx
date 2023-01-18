import { useState } from 'react'
import './Todo.css'

import deleteIcon from '../assets/delete.png';

function Todo({ todo }) {
    // console.log(todo)
    return (
        <div className='todo'>
            <div>
                <input type="checkbox" className='checkbox--todo' />
                <span>{todo.task}</span>
            </div>
            <button className='del-btn--todo'>
                <img src={deleteIcon} />
            </button>
        </div>
    )
}

export default Todo
