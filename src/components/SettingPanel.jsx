import { useState } from 'react'
import checkboxIcon from '../assets/checkbox.png'
import storageIcon from '../assets/storage.png'
import storageWarningIcon from '../assets/storage-warning.png'
import './SettingPanel.css'

function SettingPanel({ toggleCompletedTasks, clearAllTodo, todoList, deleteTodo }) {

    const [isCompletedTaskHide, setIsCompletedTaskHide] = useState(false);
    const [isStorage, setIsStorage] = useState(false);
    const [isStorageBtnHover, setIsStorageBtnHover] = useState(false);
    const [filterLabelClass, setFilterLabelClass] = useState('filter-label')
    const [clearLabelClass, setClearLabelClass] = useState('filter-label')

    let btnHideTaskText = isCompletedTaskHide ? 'show' : 'hide'
    let btnHideTaskLabel = isCompletedTaskHide ? 'show completeed task(s)' : 'hide completeed task(s)'
    let btnClearStorageLabel = 'clear local storage'

    const toggleCompletedTaskHide = function () {
        setIsCompletedTaskHide(!isCompletedTaskHide)
        toggleCompletedTasks()
    }

    const clearLocalStorage = function (params) {
        // localStorage.clear();
        todoList.forEach((todo) => {
            deleteTodo(todo.id)
        })
        // clearAllTodo()
        console.log("clearing storage")
    }

    const addWarningOnClearStorageHover = function () {
        setClearLabelClass('clear-label show');
        setIsStorageBtnHover(true)
    }

    const removeWarningOnClearStorageHover = function () {
        setClearLabelClass('clear-label');
        setIsStorageBtnHover(false)
    }


    return (
        <>
            <div className="setting-panel">
                <div className='filter btns-con--setting'
                    onClick={toggleCompletedTaskHide}
                    onMouseEnter={() => setFilterLabelClass('filter-label show')}
                    onMouseLeave={() => setFilterLabelClass('filter-label')}>
                    <label className={filterLabelClass}>{btnHideTaskLabel}</label>
                    <button className='btn--setting'> {btnHideTaskText}</button>
                    <img src={checkboxIcon} className='icon--setting'></img>
                </div>
                <div className='clear btns-con--setting'
                    onClick={clearLocalStorage}
                    onMouseEnter={addWarningOnClearStorageHover}
                    onMouseLeave={removeWarningOnClearStorageHover}>
                    <label className={clearLabelClass}>{btnClearStorageLabel}</label>
                    <button className='clear-btn btn--setting'>clear</button>
                    {isStorageBtnHover
                        ? <img src={storageWarningIcon} className='icon--setting'></img>
                        : <img src={storageIcon} className='icon--setting'></img>
                    }

                </div>
            </div>
        </>
    )
}

export default SettingPanel;