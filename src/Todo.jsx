import { useState } from 'react'
import './Todo.css'

function Todo() {
    const [note, setNote] = useState('')

    const noteInputHandler = function (e) {
        setNote(e.target.value);
    }

    return (
        <div>
            <input type="checkbox" id='checkbox' />
            <span>todo one alooha</span>

        </div>
    )
}

export default Todo
