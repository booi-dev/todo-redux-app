/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { clearDataLS } from '../utils/localStorage';
import { clearTodo } from '../features/todo/todoSlice';

import checkboxIcon from '../assets/checkbox.png';
import storageIcon from '../assets/storage.png';
import storageWarningIcon from '../assets/storage-warning.png';
import themeSwitchDark from '../assets/theme-switch-dark.png';
import themeSwitchLight from '../assets/theme-switch-light.png';

import { useTheme, useUpdateTheme } from '../context/ThemeContext';

import './SettingPanel.css';

function SettingPanel({ toggleFilter }) {

    const dispatch = useDispatch();

    const lightTheme = useTheme();
    const updateTheme = useUpdateTheme();
    const [theme, setTheme] = useState('dark');

    const [isCompletedTaskHide, setIsCompletedTaskHide] = useState(false);
    const [isStorageBtnHover, setIsStorageBtnHover] = useState(false);

    const [themeClass, setThemeClass] = useState('light');

    const [filterLabelClass, setFilterLabelClass] = useState('hide');
    const [clearLabelClass, setClearLabelClass] = useState('hide');
    const [themeClassLabel, setThemeClassLabel] = useState('hide');

    const btnHideTaskText = isCompletedTaskHide ? 'show' : 'hide';
    const btnHideTaskLabel = isCompletedTaskHide ? 'show completeed task(s)' : 'hide completeed task(s)';
    const btnClearStorageLabel = 'clear local storage';

    const clearAllTodo = () => {
        dispatch(clearTodo());
        clearDataLS();
    };

    useEffect(() => {
        lightTheme ? setTheme('light') : setTheme('dark');
    }, [lightTheme]);

    const toggleCompletedTaskHide = function () {
        setIsCompletedTaskHide(!isCompletedTaskHide);
        toggleFilter();
    };

    const addWarningOnClearStorageHover = function () {
        setClearLabelClass('show');
        setIsStorageBtnHover(true);
    };

    const removeWarningOnClearStorageHover = function () {
        setClearLabelClass('hide');
        setIsStorageBtnHover(false);
    };

    const toggleTheme = function () {
        updateTheme();
        lightTheme ? setThemeClass('light') : setThemeClass('dark');
    };

    return (
        <div className="setting-panel">
            <div role="button"
                tabIndex={0}
                className={`filter btns-con--setting ${theme}`}
                onClick={toggleCompletedTaskHide}
                onMouseEnter={() => setFilterLabelClass('show')}
                onMouseLeave={() => setFilterLabelClass('hide')}>
                <span className={`filter label ${filterLabelClass}`}>{btnHideTaskLabel}</span>
                <button type='button' className={`filter btn--setting ${theme}`}> {btnHideTaskText}</button>
                <img src={checkboxIcon} className='icon--setting' alt='check box icon' />
            </div>
            <div role="button"
                tabIndex={0}
                className={`clear btns-con--setting ${theme}`}
                onClick={clearAllTodo}
                onMouseEnter={addWarningOnClearStorageHover}
                onMouseLeave={removeWarningOnClearStorageHover}>
                <span className={`clear-storage label ${clearLabelClass}`}>{btnClearStorageLabel}</span>
                <button type='button' className={`clear-btn btn--setting ${theme}`}>clear</button>
                {isStorageBtnHover
                    ? <img src={storageWarningIcon} className='icon--setting' alt='' />
                    : <img src={storageIcon} className='icon--setting' alt='' />
                }

            </div>
            <div className={`theme ${themeClass} btns-con--setting`}
                onMouseEnter={() => setThemeClassLabel('show')}
                onMouseLeave={() => setThemeClassLabel('hide')}
            >
                <span className={`theme-switch label ${themeClassLabel}`}>toggle theme</span>
                <button type='button' className='theme-switch-btn btn--setting'
                    onClick={toggleTheme}
                >
                    {lightTheme
                        ? <img src={themeSwitchLight} alt='' />
                        : <img src={themeSwitchDark} alt='' />
                    }
                </button>
            </div>
        </div>
    );
}

export default SettingPanel;