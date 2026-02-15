import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CloudUpload } from "@mui/icons-material";
import VisuallyHiddenInput from "@/ui/components/visually-hidden-input/index.jsx";
import { useCreateCategory } from "@/services/category/query.js";

function AddCategoryDialog({ open, onClose }) {
    const { handleSubmit, register, reset } = useForm()
    const createCategory = useCreateCategory()

    const onSubmit = (data) => {
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('file', data.file[0])

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
                        Rasm yuklash
                        <VisuallyHiddenInput
                            type={ 'file' }
                            accept={ 'image/png' }
                            { ...register('file', { required: true }) }/>
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