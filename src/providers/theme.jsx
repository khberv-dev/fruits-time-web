import {createContext, useContext, useState} from "react";
import {ThemeProvider} from "@gravity-ui/uikit";

const ThemeContext = createContext(null)

export function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'light')

    const setAndPersist = (next) => {
        localStorage.setItem('theme', next)
        setTheme(next)
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme: setAndPersist}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)
