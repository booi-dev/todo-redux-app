import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function useThemeUpdator() {
    const lightTheme = useTheme();
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        lightTheme ? setTheme('light') : setTheme('dark');
    }, [lightTheme]);

    return theme;
}

export default useThemeUpdator;