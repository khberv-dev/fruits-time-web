import { Button, Typography } from "@mui/material";
import CategoryTable from "@/ui/components/category-table/index.jsx";
import { useGetCategories, useUpdateCategory } from "@/services/category/query.js";
import AddCategoryDialog from "@/ui/components/add-category-dialog/index.jsx";
import { useState } from "react";

function CategoriesPage() {
    const { data } = useGetCategories(1, 100)
    const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
    const updateCategory = useUpdateCategory()

    const handleCategoryActiveUpdated = (categoryId, checked) => {
        updateCategory.mutate({
            id: categoryId,
            data: {
                isActive: checked
            }
        })
    }

    return (
        <div>
            <Typography variant={ 'h5' } className={ 'mb-3' }>
                Kataloglar
            </Typography>
            <div className={ 'mb-3' }>
                <Button
                    variant={ 'contained' }
                    onClick={ () => setIsAddCategoryDialogOpen(true) }>
                    Qo'shish
                </Button>
            </div>
            <CategoryTable
                data={ data || [] }
                onIsActiveUpdate={ handleCategoryActiveUpdated }/>
            <AddCategoryDialog
                open={ isAddCategoryDialogOpen }
                onClose={ () => setIsAddCategoryDialogOpen(false) }/>
        </div>
    )
}

export default CategoriesPage