// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTheme } from '../features/theme/themeSlice';

function useThemeControls() {

    const theme = useSelector((state) => state.themeStore.theme);
    const dispatch = useDispatch();

    const setTheme = (t) => {
        dispatch(updateTheme(t));
    };

    const toggleDarkTheme = () => {
        if (theme === 'dark') setTheme('light');
        else { setTheme('dark'); }
    };

    return { theme, setTheme, toggleDarkTheme };
}

export default useThemeControls;
