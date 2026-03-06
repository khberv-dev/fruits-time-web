import { Outlet } from "react-router-dom"
import AuthProvider from "@/providers/auth/index.jsx"
import Navigation from "@/ui/layouts/navigation/index.jsx"

function AppRoute() {
    return (
        <AuthProvider>
            <Navigation>
                <Outlet/>
            </Navigation>
        </AuthProvider>
    )
}

export default AppRoute