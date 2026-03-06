import { Button } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import Space from "@/ui/components/space/index.jsx"
import ProductTable from "@/ui/components/product-table/index.jsx"
import { useGetProducts } from "@/services/product/query.js"
import { useNavigate } from "react-router-dom"

function ProductPage() {
    const { data: products, isLoading } = useGetProducts()
    const navigate = useNavigate()

    return (
        <div>
            <div>
                <Button onClick={ () => navigate('/product/new') }>
                    <PlusIcon/>
                    Qo'shish
                </Button>
            </div>
            <Space height={ 4 }/>
            <ProductTable
                data={ products }
                isLoading={ isLoading }/>
        </div>
    )
}

export default ProductPage

