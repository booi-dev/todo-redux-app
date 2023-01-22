import { useState, useEffect } from 'react'
import checkboxIcon from '../assets/checkbox.png'
import storageIcon from '../assets/storage.png'
import storageWarningIcon from '../assets/storage-warning.png'
import themeSwitchDark from '../assets/theme-switch-dark.png'
import themeSwitchLight from '../assets/theme-switch-light.png'

import { useTheme, useUpdateTheme } from './ThemeContext';

import './SettingPanel.css'

function SettingPanel({ toggleCompletedTasks, clearAllTodo, todoList, deleteTodo }) {

    const lightTheme = useTheme()
    const updateTheme = useUpdateTheme()
    const [theme, setTheme] = useState('dark');
    // console.log(lightTheme)

    const [isCompletedTaskHide, setIsCompletedTaskHide] = useState(false);
    // const [isStorage, setIsStorage] = useState(false);
    const [isStorageBtnHover, setIsStorageBtnHover] = useState(false);

    const [themeClass, setThemeClass] = useState('light')

    const [filterLabelClass, setFilterLabelClass] = useState('hide')
    const [clearLabelClass, setClearLabelClass] = useState('hide')
    const [themeClassLabel, setThemeClassLabel] = useState('hide')

    let btnHideTaskText = isCompletedTaskHide ? 'show' : 'hide'
    let btnHideTaskLabel = isCompletedTaskHide ? 'show completeed task(s)' : 'hide completeed task(s)'
    let btnClearStorageLabel = 'clear local storage'

    useEffect(() => {
        lightTheme ? setTheme('light') : setTheme('dark')
    }, [lightTheme])

    const toggleCompletedTaskHide = function () {
        setIsCompletedTaskHide(!isCompletedTaskHide)
        toggleCompletedTasks()
    }

    const clearLocalStorage = function (params) {
        // localStorage.clear();
        // todoList.forEach((todo) => {
        //     deleteTodo(todo.id)
        // })
        // clearAllTodo()
        console.log("clearing storage")
    }

    const addWarningOnClearStorageHover = function () {
        setClearLabelClass('show');
        setIsStorageBtnHover(true)
    }

    const removeWarningOnClearStorageHover = function () {
        setClearLabelClass('hide');
        setIsStorageBtnHover(false)
    }

    const toggleTheme = function () {
        updateTheme()
        lightTheme ? setThemeClass('light') : setThemeClass('dark')
    }

    return (
        <>
            <div className="setting-panel">
                <div className={`filter btns-con--setting ${theme}`}
                    onClick={toggleCompletedTaskHide}
                    onMouseEnter={() => setFilterLabelClass('show')}
                    onMouseLeave={() => setFilterLabelClass('hide')}>
                    <label className={`filter label ${filterLabelClass}`}>{btnHideTaskLabel}</label>
                    <button className={`filter btn--setting ${theme}`}> {btnHideTaskText}</button>
                    <img src={checkboxIcon} className='icon--setting'></img>
                </div>
                <div className={`clear btns-con--setting ${theme}`}
                    onClick={clearLocalStorage}
                    onMouseEnter={addWarningOnClearStorageHover}
                    onMouseLeave={removeWarningOnClearStorageHover}>
                    <label className={`clear-storage label ${clearLabelClass}`}>{btnClearStorageLabel}</label>
                    <button className={`clear-btn btn--setting ${theme}`}>clear</button>
                    {isStorageBtnHover
                        ? <img src={storageWarningIcon} className='icon--setting'></img>
                        : <img src={storageIcon} className='icon--setting'></img>
                    }

                </div>
                <div className={`theme ${themeClass} btns-con--setting`}
                    onMouseEnter={() => setThemeClassLabel('show')}
                    onMouseLeave={() => setThemeClassLabel('hide')}
                >
                    <label className={`theme-switch label ${themeClassLabel}`}>toggle theme</label>
                    <button className='theme-switch-btn btn--setting'
                        onClick={toggleTheme}
                    >
                        {lightTheme
                            ? <img src={themeSwitchLight} />
                            : <img src={themeSwitchDark} />
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default SettingPanel;