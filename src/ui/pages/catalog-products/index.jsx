import {useEffect, useState} from "react";
import {useNavigate, useParams, useLocation} from "react-router";
import {useGetAllProducts, useDeleteProduct} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import {Button} from "@gravity-ui/uikit";
import {Plus} from "@gravity-ui/icons";
import ProductCard from "@/ui/components/product-card/index.jsx";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import s from "./main.module.css";

export default function CatalogProductsPage() {
    const {catalogId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {data: products = [], isLoading} = useGetAllProducts(catalogId)
    const {mutate: deleteProduct, isPending: isDeleting} = useDeleteProduct()
    const {setHeader} = useHeader()

    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        setHeader({
            title: state?.catalogTitle ?? '',
            onBack: () => navigate('/catalog'),
        })
    }, [state?.catalogTitle])

    const handleDelete = () => {
        deleteProduct({catalogId, productId: deletingId}, {onSuccess: () => setDeletingId(null)})
    }

    if (isLoading) return null

    return (
        <div className={s.root}>
            <div>
                <Button view="action" size="l" onClick={() => navigate(`/catalog/${catalogId}/product/create`)}>
                    <Button.Icon><Plus/></Button.Icon>
                    Mahsulot qo'shish
                </Button>
            </div>
            <div className={s.grid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() => navigate(`/catalog/${catalogId}/product/${product.id}/edit`, {state: {product}})}
                        onDelete={() => setDeletingId(product.id)}
                    />
                ))}
            </div>

            <ConfirmDialog
                open={!!deletingId}
                title="Mahsulotni o'chirish"
                description="Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?"
                loading={isDeleting}
                onConfirm={handleDelete}
                onClose={() => setDeletingId(null)}
            />
        </div>
    )
}
