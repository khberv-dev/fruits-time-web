import { Typography } from "@mui/material";
import { useGetProducts } from "@/services/product/query.js";
import ProductTable from "@/ui/components/product-table/index.jsx";

function ProductsPage() {
    const { data } = useGetProducts(1, 100)

    return (
        <div>
            <Typography variant={ 'h5' } className={ 'mb-3' }>
                Mahsulotlar
            </Typography>
            <ProductTable data={ data || [] }/>
        </div>
    )
}

export default ProductsPage