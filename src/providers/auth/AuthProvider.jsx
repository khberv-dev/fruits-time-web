import { AuthContext } from "@/providers/auth/AuthContext.js";
import { useCallback, useMemo } from "react";
import { useGetMe } from "@/services/user/query.js";
import { CircularProgress } from "@mui/material";

function AuthProvider({ children }) {
    const { data, isLoading } = useGetMe()

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        window.location.replace('/login')
    }, [])

    const value = useMemo(() => ({
        user: data ?? null,
        logout,
        isLoading
    }), [data, logout, isLoading])

    if (!data && !isLoading) {
        logout()
    }

    return (
        <AuthContext.Provider value={ value }>
            { isLoading ? <CircularProgress/> : children }
        </AuthContext.Provider>
    )
}

export default AuthProvider