import { AuthContext } from "@/providers/auth/context.js"
import { useGetMe } from "@/services/user/query.js"
import { useNavigate } from "react-router-dom"

function AuthProvider({ children }) {
    const { data, isPending } = useGetMe()
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    if (!isPending && !data) {
        logout()
    }

    return (
        <AuthContext.Provider value={ { user: data, logout } }>
            { data ? children : '' }
        </AuthContext.Provider>
    )
}

export default AuthProvider