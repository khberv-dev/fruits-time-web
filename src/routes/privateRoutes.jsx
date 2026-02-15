import { Outlet } from "react-router-dom";
import AuthProvider from "@/providers/auth/AuthProvider.jsx";
import SideNavigation from "@/ui/layouts/side-navigation/index.jsx";

function PrivateRoutes() {
    return (
        <AuthProvider>
            <SideNavigation header={ 'Fruits time' }>
                <Outlet/>
            </SideNavigation>
        </AuthProvider>
    )
}

export default PrivateRoutes