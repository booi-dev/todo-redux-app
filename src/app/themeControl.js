// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTheme } from '../features/theme/themeSlice';

function useThemeControl() {

    const theme = useSelector((state) => state.themeStore.theme);
    const dispatch = useDispatch();

    const setTheme = (t) => {
        dispatch(updateTheme(t));
    };

    return [
        theme,
        setTheme
    ];
}

export default useThemeControl;
