import { useState } from "react"
import { Button, Flex } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import Space from "@/ui/components/space/index.jsx"
import ProductTable from "@/ui/components/product-table/index.jsx"
import InputSelect from "@/ui/components/input-select/index.jsx"
import { useGetProducts } from "@/services/product/query.js"
import { useGetCatalogs } from "@/services/catalog/query.js"
import { useNavigate } from "react-router-dom"

function ProductPage() {
    const [categoryFilter, setCategoryFilter] = useState('')
    const { data: products = [], isLoading } = useGetProducts(categoryFilter || undefined)
    const { data: catalogs = [] } = useGetCatalogs()
    const navigate = useNavigate()

    const categoryOptions = catalogs.map((c) => ({ value: c.id, label: c.title ?? '' }))

    return (
        <div>
            <Flex gap="4" align="end" wrap="wrap">
                <div style={ { minWidth: 200 } }>
                    <InputSelect
                        label="Katalog"
                        value={ categoryFilter }
                        onChange={ setCategoryFilter }
                        placeholder="Barcha kataloglar"
                        options={ categoryOptions }/>
                </div>
                <Button onClick={ () => navigate('/product/new') }>
                    <PlusIcon/>
                    Qo'shish
                </Button>
            </Flex>
            <Space height={ 4 }/>
            <ProductTable
                data={ products }
                isLoading={ isLoading }/>
        </div>
    )
}

export default ProductPage

