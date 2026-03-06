import { Button } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import Space from "@/ui/components/space/index.jsx"
import BannerTable from "@/ui/components/banner-table/index.jsx"
import { useGetBanners } from "@/services/banner/query.js"
import { useNavigate } from "react-router-dom"

function BannerPage() {
    const { data: banners, isLoading } = useGetBanners()
    const navigate = useNavigate()

    return (
        <div>
            <div>
                <Button onClick={ () => navigate('/banner/new') }>
                    <PlusIcon/>
                    Qo'shish
                </Button>
            </div>
            <Space height={ 4 }/>
            <BannerTable
                data={ banners }
                isLoading={ isLoading }/>
        </div>
    )
}

export default BannerPage

