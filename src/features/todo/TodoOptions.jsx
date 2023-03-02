import React from 'react';
import useThemeControls from '../../app/themeControls';
import './TodoOptions.css';

function TodoOptions(props) {

    const { todo, handleExpandBtn, handleDelBtnClick, isOptionShow } = props;

    const { theme } = useThemeControls();

    return (
        <div className={`todo-option-menu ${theme} ${isOptionShow && 'show'}`} >
            <button type='button' className={`todo-option-btn ${theme}`}
                onClick={handleExpandBtn}
            >view note</button>
            <button type='button' className={`todo-option-btn delete ${theme}`}
                onClick={() => handleDelBtnClick(todo)}>delete
            </button>
        </div>
    );
}

export default TodoOptions;