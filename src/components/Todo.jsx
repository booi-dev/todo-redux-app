import { useState } from 'react'
import './Todo.css'

import deleteIcon from '../assets/delete.png';

function Todo({ todo }) {
    const [btnClass, setBtnClass] = useState('del-btn--todo')

    return (
        <div
            className='todo'
            onMouseEnter={() => setBtnClass('del-btn--todo show')}
            onMouseLeave={() => setBtnClass('del-btn--todo')}
        >
            <div>
                <input type="checkbox" className='checkbox--todo' />
                <h1 className='task--todo'>{todo.task}</h1>
            </div>
            <button className={btnClass}>
                <img src={deleteIcon} />
            </button>
        </div>
    )
}

export default Todo
