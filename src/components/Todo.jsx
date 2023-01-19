import { useState } from 'react'
import './Todo.css'

import deleteIcon from '../assets/delete.png';
import deleteIconWarning from '../assets/delete-warn.png';

function Todo({ todo }) {
    const [btnClass, setBtnClass] = useState('del-btn--todo')
    const [delBtnWarning, setSelBtnWarning] = useState(false)

    const handleDelBtnClick = function () {
        console.log("Del btn click")
    }


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
            <button
                className={btnClass}
                onClick={handleDelBtnClick}
                onMouseEnter={() => setSelBtnWarning(true)}
                onMouseLeave={() => setSelBtnWarning(false)}
            >
                {delBtnWarning
                    ? <img src={deleteIconWarning} className='del-icon-warning--todo' />
                    : <img src={deleteIcon} />}
            </button>
        </div>
    )
}

export default Todo
