import { createContext, useContext } from "react"

export const AlertContext = createContext(null)

export function useAlert() {
    const context = useContext(AlertContext)

    if (!context) {
        throw 'useAlert must be used inside AlertProvider'
    }

    return context
}