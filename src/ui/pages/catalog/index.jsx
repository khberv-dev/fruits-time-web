import { Button } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import CatalogTable from "@/ui/components/catalog-table/index.jsx"
import Space from "@/ui/components/space/index.jsx"
import { useGetCatalogs } from "@/services/catalog/query.js"
import { useNavigate } from "react-router-dom"

function CatalogPage() {
    const { data: catalogs, isLoading } = useGetCatalogs()
    const navigate = useNavigate()

    return (
        <div>
            <div>
                <Button onClick={ () => navigate('/catalog/new') }>
                    <PlusIcon/>
                    Qo'shish
                </Button>
            </div>
            <Space height={ 4 }/>
            <CatalogTable
                data={ catalogs }
                isLoading={ isLoading }/>
        </div>
    )
}

export default CatalogPage