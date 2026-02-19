import { Button, Typography } from "@mui/material";
import { useGetBanners, useUpdateBanner } from "@/services/promotion/query.js";
import BannersTable from "@/ui/components/banners-table/index.jsx";
import { useState } from "react";
import AddBannerDialog from "@/ui/layouts/add-banner-dialog/index.jsx";

function MarketingPage() {
    const { data } = useGetBanners()
    const updateBanner = useUpdateBanner()
    const [isAddBannerDialogOpen, setIsAddBannerDialogOpen] = useState(false)

    const handleBannerActiveUpdated = (bannerId, checked) => {
        updateBanner.mutate({
            id: bannerId,
            data: {
                isActive: checked
            }
        })
    }

    return (
        <div>
            <Typography variant={ 'h5' } className={ 'mb-3' }>
                Marketing
            </Typography>
            <div className={ 'mb-3' }>
                <Button
                    variant={ 'contained' }
                    onClick={ () => setIsAddBannerDialogOpen(true) }>
                    Qo'shish
                </Button>
            </div>
            <BannersTable
                data={ data || [] }
                onIsActiveUpdate={ handleBannerActiveUpdated }/>
            <AddBannerDialog
                open={ isAddBannerDialogOpen }
                onClose={ () => setIsAddBannerDialogOpen(false) }/>
        </div>
    )
}

export default MarketingPage