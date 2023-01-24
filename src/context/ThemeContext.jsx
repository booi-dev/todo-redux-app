import { useState, createContext, useContext } from 'react'

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export function useTheme() {
    return useContext(ThemeContext)
}
export function useUpdateTheme() {
    return useContext(ThemeUpdateContext)
}

function ThemeProvider({ children }) {
    const [lightTheme, setLightTheme] = useState(false)

    const toggleTheme = function () {
        setLightTheme(prevTheme => !prevTheme)
    }

    return (
        <ThemeContext.Provider value={lightTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;