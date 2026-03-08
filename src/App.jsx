import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@/ui/pages/login/index.jsx"
import AppRoute from "@/routes/AppRoute.jsx"
import CatalogPage from "@/ui/pages/catalog/index.jsx"
import SingleCatalogPage from "@/ui/pages/single-catalog/index.jsx"
import ProductPage from "@/ui/pages/product/index.jsx"
import SingleProductPage from "@/ui/pages/single-product/index.jsx"
import BannerPage from "@/ui/pages/banner/index.jsx"
import SingleBannerPage from "@/ui/pages/single-banner/index.jsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ '/login' } element={ <LoginPage/> }/>

                <Route path={ '/' } element={ <AppRoute/> }>
                    <Route index element={ <Navigate to="/catalog" replace/> }/>
                    <Route path={ '/catalog' } element={ <CatalogPage/> }/>
                    <Route path={ '/catalog/:id' } element={ <SingleCatalogPage/> }/>
                    <Route path={ '/product' } element={ <ProductPage/> }/>
                    <Route path={ '/product/:id' } element={ <SingleProductPage/> }/>
                    <Route path={ '/banner' } element={ <BannerPage/> }/>
                    <Route path={ '/banner/:id' } element={ <SingleBannerPage/> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
