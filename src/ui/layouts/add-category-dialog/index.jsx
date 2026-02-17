import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CloudUpload } from "@mui/icons-material";
import VisuallyHiddenInput from "@/ui/components/visually-hidden-input/index.jsx";
import { useCreateCategory } from "@/services/category/query.js";
import { useState } from "react";
import { objectToFormData } from "@/utils/lib.js";

function AddCategoryDialog({ open, onClose }) {
    const { handleSubmit, register, reset } = useForm()
    const createCategory = useCreateCategory()
    const [fileName, setFileName] = useState(null)

    const handleUploadFile = (e) => {
        setFileName(e.target.files[0].name)
    }

    const onSubmit = (data) => {
        const formData = objectToFormData(data)

        createCategory.mutateAsync(formData).then(() => {
            reset()
            onClose()
        })
    }

    return (
        <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
            <DialogTitle>
                Katalog qo'shish
            </DialogTitle>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <DialogContent className={ 'd-flex flex-column gap-2' }>
                    <TextField
                        fullWidth={ true }
                        label={ 'Nomi' }
                        { ...register('title', { required: true }) }/>
                    <Button
                        component={ 'label' }
                        variant={ 'contained' }
                        startIcon={ <CloudUpload/> }>
                        { fileName || 'Rasm yuklash' }
                        <VisuallyHiddenInput
                            type={ 'file' }
                            accept={ 'image/png' }
                            { ...register('file', { required: true, onChange: handleUploadFile }) }/>
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
                        loading={ createCategory.isPending }
                        type={ 'submit' }
                        variant={ 'contained' }>
                        Saqlash
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddCategoryDialog