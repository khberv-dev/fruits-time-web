import { createContext, useContext } from "react"

export const AuthContext = createContext(null)

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw 'useAuth must be used inside AuthProvider'
    }

    return context
}