import { Button, Typography } from "@mui/material";
import { useGetProducts, useUpdateProduct } from "@/services/product/query.js";
import ProductTable from "@/ui/components/product-table/index.jsx";
import { useState } from "react";
import AddProductDialog from "@/ui/layouts/add-product-dialog/index.jsx";
import EditProductDialog from "@/ui/layouts/edit-product-dialog/index.jsx";

function ProductsPage() {
    const { data } = useGetProducts(1, 100)
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
    const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false)
    const updateProduct = useUpdateProduct()
    const [productToEdit, setProductToEdit] = useState(null)

    const handleProductActiveUpdated = (productId, checked) => {
        updateProduct.mutate({
            id: productId,
            data: {
                isActive: checked
            }
        })
    }

    const handleEditClick = (product) => {
        setProductToEdit(product)
        setIsEditProductDialogOpen(true)
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
                onIsActiveUpdate={ handleProductActiveUpdated }
                onEditClick={ handleEditClick }/>
            <AddProductDialog
                open={ isAddProductDialogOpen }
                onClose={ () => setIsAddProductDialogOpen(false) }/>
            <EditProductDialog
                open={ isEditProductDialogOpen }
                onClose={ () => setIsEditProductDialogOpen(false) }
                product={ productToEdit }/>
        </div>
    )
}

export default ProductsPage