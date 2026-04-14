import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {AuthProvider} from "@/providers/auth.jsx";
import AppLayout from "@/ui/layouts/app-layout/index.jsx";
import LoginPage from "@/ui/pages/login/index.jsx";
import MainPage from "@/ui/pages/main/index.jsx";
import CatalogPage from "@/ui/pages/catalog/index.jsx";
import BannerPage from "@/ui/pages/banner/index.jsx";

const RequireAuth = ({children}) => {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to="/login" replace/>
    }
    return children
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route element={<RequireAuth><AppLayout/></RequireAuth>}>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/catalog" element={<CatalogPage/>}/>
                        <Route path="/banner" element={<BannerPage/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
