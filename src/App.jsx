import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {ToasterComponent, ToasterProvider} from "@gravity-ui/uikit";
import {toaster} from "@/services/toaster.js";
import {AuthProvider} from "@/providers/auth.jsx";
import {ResourceLocaleProvider} from "@/providers/resource-locale.jsx";
import {HeaderProvider} from "@/providers/header.jsx";
import AppLayout from "@/ui/layouts/app-layout/index.jsx";
import LoginPage from "@/ui/pages/login/index.jsx";
import MainPage from "@/ui/pages/main/index.jsx";
import CatalogPage from "@/ui/pages/catalog/index.jsx";
import CatalogProductsPage from "@/ui/pages/catalog-products/index.jsx";
import CatalogCreatePage from "@/ui/pages/catalog-create/index.jsx";
import CatalogEditPage from "@/ui/pages/catalog-edit/index.jsx";
import ProductCreatePage from "@/ui/pages/product-create/index.jsx";
import ProductEditPage from "@/ui/pages/product-edit/index.jsx";
import OrdersPage from "@/ui/pages/orders/index.jsx";
import BannerPage from "@/ui/pages/banner/index.jsx";
import BannerCreatePage from "@/ui/pages/banner-create/index.jsx";
import BannerEditPage from "@/ui/pages/banner-edit/index.jsx";
import BranchPage from "@/ui/pages/branch/index.jsx";
import BranchEditPage from "@/ui/pages/branch-edit/index.jsx";

const RequireAuth = ({children}) => {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to="/login" replace/>
    }
    return children
}

function App() {
    return (
        <ToasterProvider toaster={toaster}>
            <ToasterComponent/>
            <BrowserRouter>
                <ResourceLocaleProvider>
                    <AuthProvider>
                        <HeaderProvider>
                            <Routes>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route element={<RequireAuth><AppLayout/></RequireAuth>}>
                                    <Route path="/" element={<MainPage/>}/>
                                    <Route path="/catalog" element={<CatalogPage/>}/>
                                    <Route path="/catalog/create" element={<CatalogCreatePage/>}/>
                                    <Route path="/catalog/:catalogId/product" element={<CatalogProductsPage/>}/>
                                    <Route path="/catalog/:catalogId/product/create" element={<ProductCreatePage/>}/>
                                    <Route path="/catalog/:catalogId/edit" element={<CatalogEditPage/>}/>
                                    <Route path="/catalog/:catalogId/product/:productId/edit"
                                           element={<ProductEditPage/>}/>
                                    <Route path="/orders" element={<OrdersPage/>}/>
                                    <Route path="/banner" element={<BannerPage/>}/>
                                    <Route path="/banner/create" element={<BannerCreatePage/>}/>
                                    <Route path="/banner/:bannerId/edit" element={<BannerEditPage/>}/>
                                    <Route path="/branch" element={<BranchPage/>}/>
                                    <Route path="/branch/:branchId/edit" element={<BranchEditPage/>}/>
                                </Route>
                            </Routes>
                        </HeaderProvider>
                    </AuthProvider>
                </ResourceLocaleProvider>
            </BrowserRouter>
        </ToasterProvider>
    )
}

export default App
