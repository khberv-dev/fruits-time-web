import { useForm } from "react-hook-form";
import { useUpdateCategory } from "@/services/category/query.js";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import VisuallyHiddenInput from "@/ui/components/visually-hidden-input/index.jsx";
import { objectToFormData } from "@/utils/lib.js";

function EditCategoryDialog({ open, onClose, category }) {
    const { handleSubmit, register, reset } = useForm()
    const updateCategory = useUpdateCategory()
    const [fileName, setFileName] = useState(null)

    const handleUploadFile = (e) => {
        setFileName(e.target.files[0].name)
    }

    const onSubmit = (data) => {
        const formData = objectToFormData(data)

        updateCategory.mutateAsync({ id: category.id, data: formData }).then(() => {
            onClose()
        })
    }

    useEffect(() => {
        reset()
    }, [open])

    if (!category) {
        return
    }

    return (
        <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
            <DialogTitle>
                Katalog qo'shish
            </DialogTitle>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <DialogContent className={ 'd-flex flex-column gap-2' }>
                    <TextField
                        defaultValue={ category.title }
                        fullWidth={ true }
                        label={ 'Nomi' }
                        { ...register('title') }/>
                    <Button
                        component={ 'label' }
                        variant={ 'contained' }
                        startIcon={ <CloudUpload/> }>
                        { fileName || 'Rasm yuklash' }
                        <VisuallyHiddenInput
                            type={ 'file' }
                            accept={ 'image/png' }
                            { ...register('file', { onChange: handleUploadFile }) }/>
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={ 'outlined' }
                        color={ 'error' }
                        onClick={ onClose }>
                        Yopish
                    </Button>
                    <Button
                        loading={ updateCategory.isPending }
                        type={ 'submit' }
                        variant={ 'contained' }>
                        Saqlash
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditCategoryDialog