import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./ui/pages/login/index.jsx";
import PrivateRoutes from "@/routes/privateRoutes.jsx";
import StatsPage from "@/ui/pages/stats/index.jsx";
import CategoriesPage from "@/ui/pages/categories/index.jsx";
import ProductsPage from "@/ui/pages/products/index.jsx";
import MarketingPage from "@/ui/pages/marketing/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ '/login' } element={ <LoginPage/> }/>

                <Route path={ '/' } element={ <PrivateRoutes/> }>
                    <Route index element={ <StatsPage/> }/>
                    <Route path={ 'categories' } element={ <CategoriesPage/> }/>
                    <Route path={ 'products' } element={ <ProductsPage/> }/>
                    <Route path={ 'marketing' } element={ <MarketingPage/> }/>
                    <Route path={ 'settings' } element={ <>Settings</> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
