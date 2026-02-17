import { Button, Typography } from "@mui/material";
import CategoryTable from "@/ui/components/category-table/index.jsx";
import { useGetCategories, useUpdateCategory } from "@/services/category/query.js";
import AddCategoryDialog from "@/ui/layouts/add-category-dialog/index.jsx";
import { useState } from "react";
import EditCategoryDialog from "@/ui/layouts/edit-category-dialog/index.jsx";

function CategoriesPage() {
    const { data } = useGetCategories(1, 100)
    const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
    const [isUpdateCategoryDialogOpen, setIsUpdateCategoryDialogOpen] = useState(false)
    const updateCategory = useUpdateCategory()
    const [categoryToEdit, setCategoryToEdit] = useState(null)

    const handleCategoryActiveUpdated = (categoryId, checked) => {
        updateCategory.mutate({
            id: categoryId,
            data: {
                isActive: checked
            }
        })
    }

    const handleEditCategoryClick = (category) => {
        setIsUpdateCategoryDialogOpen(true)
        setCategoryToEdit(category)
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
                onIsActiveUpdate={ handleCategoryActiveUpdated }
                onEditClick={ handleEditCategoryClick }/>
            <AddCategoryDialog
                open={ isAddCategoryDialogOpen }
                onClose={ () => setIsAddCategoryDialogOpen(false) }/>
            <EditCategoryDialog
                open={ isUpdateCategoryDialogOpen }
                onClose={ () => setIsUpdateCategoryDialogOpen(false) }
                category={ categoryToEdit }/>
        </div>
    )
}

export default CategoriesPage