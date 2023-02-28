import { useState } from 'react';
import { HiSun, HiMoon, HiCollection } from "react-icons/hi";

import useTodoControls from '../app/todoControls';
import useThemeControls from '../app/themeControls';
import { clearDataLS } from '../utils/localStorage';

import './SettingPanel.css';

function SettingPanel(props) {

    const { toggleFilter } = props;

    const { resetTodo } = useTodoControls();
    const { theme, toggleDarkTheme } = useThemeControls();

    const [isHide, setisHide] = useState(false);

    const clearAllTodo = () => {
        resetTodo();
        clearDataLS();
    };

    const toggleCompletedTaskHide = function () {
        setisHide(!isHide);
        toggleFilter();
    };

    return (
        <div className="setting-panel">
            <button
                type='button'
                className={`filter btns-con--setting ${theme}`}
                onClick={toggleCompletedTaskHide}
            >
                <span type='button' className={`filter btn--setting ${theme}`}> {isHide ? 'show' : 'hide'}
                </span>
            </button>

            <button type="button"
                onClick={clearAllTodo}
            >
                <span type='button' className={`clear-btn btn--setting ${theme}`}>clear all</span>
                <HiCollection />
            </button>

            <button type='button' className={`toggle-dark-theme-btn ${theme}`}
                onClick={toggleDarkTheme}
            >
                theme
                {
                    theme === 'dark'
                        ? <HiSun />
                        : <HiMoon />
                }
            </button>
        </div>
    );
}

export default SettingPanel;