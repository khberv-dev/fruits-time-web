import { Button, Typography } from "@mui/material";
import { useGetProducts, useUpdateProduct } from "@/services/product/query.js";
import ProductTable from "@/ui/components/product-table/index.jsx";
import { useState } from "react";
import AddProductDialog from "@/ui/components/add-product-dialog/index.jsx";

function ProductsPage() {
    const { data } = useGetProducts(1, 100)
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
    const updateProduct = useUpdateProduct()

    const handleProductActiveUpdated = (productId, checked) => {
        updateProduct.mutate({
            id: productId,
            data: {
                isActive: checked
            }
        })
    }

    return (
        <div>
            <Typography variant={ 'h5' } className={ 'mb-3' }>
                Mahsulotlar
            </Typography>
            <div className={ 'mb-3' }>
                <Button
                    variant={ 'contained' }
                    onClick={ () => setIsAddProductDialogOpen(true) }>
                    Qo'shish
                </Button>
            </div>
            <ProductTable
                data={ data || [] }
                onIsActiveUpdate={ handleProductActiveUpdated }/>
            <AddProductDialog
                open={ isAddProductDialogOpen }
                onClose={ () => setIsAddProductDialogOpen(false) }/>
        </div>
    )
}

export default ProductsPage