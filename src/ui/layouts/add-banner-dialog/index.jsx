import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { CloudUpload } from "@mui/icons-material";
import VisuallyHiddenInput from "@/ui/components/visually-hidden-input/index.jsx";
import { useState } from "react";
import { objectToFormData } from "@/utils/lib.js";
import { useCreateBanner } from "@/services/promotion/query.js";

function AddBannerDialog({ open, onClose }) {
    const { handleSubmit, register, reset } = useForm()
    const createBanner = useCreateBanner()
    const [fileName, setFileName] = useState(null)

    const handleUploadFile = (e) => {
        setFileName(e.target.files[0].name)
    }

    const onSubmit = (data) => {
        const formData = objectToFormData(data)

        createBanner.mutateAsync(formData).then(() => {
            reset()
            onClose()
        })
    }

    return (
        <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
            <DialogTitle>
                Banner qo'shish
            </DialogTitle>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <DialogContent className={ 'd-flex flex-column gap-2' }>
                    <Button
                        component={ 'label' }
                        variant={ 'contained' }
                        startIcon={ <CloudUpload/> }>
                        { fileName || 'Rasm yuklash' }
                        <VisuallyHiddenInput
                            type={ 'file' }
                            accept={ 'image/*' }
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
                        loading={ createBanner.isPending }
                        type={ 'submit' }
                        variant={ 'contained' }>
                        Saqlash
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddBannerDialog