import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CloudUpload } from "@mui/icons-material";
import VisuallyHiddenInput from "@/ui/components/visually-hidden-input/index.jsx";
import { useEffect, useState } from "react";
import { useUpdateProduct } from "@/services/product/query.js";
import { useGetCategories } from "@/services/category/query.js";
import NumberField from "@/ui/components/number-field/index.jsx";
import { objectToFormData } from "@/utils/lib.js";

function EditProductDialog({ open, onClose, product }) {
    const { handleSubmit, register, reset, control } = useForm()
    const updateProduct = useUpdateProduct()
    const { data: categories } = useGetCategories(1, 999)
    const [fileName, setFileName] = useState(null)

    const handleUploadFile = (e) => {
        setFileName(e.target.files[0].name)
    }

    const onSubmit = (data) => {
        const formData = objectToFormData(data)

        updateProduct.mutateAsync({
            id: product.id,
            data: formData
        }).then(() => {
            onClose()
        })
    }

    useEffect(() => {
        reset()
    }, [open])

    if (!product) {
        return
    }

    return (
        <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
            <DialogTitle>
                { product.title }
            </DialogTitle>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <DialogContent className={ 'd-flex flex-column gap-3' }>
                    <TextField
                        defaultValue={ product.title }
                        fullWidth={ true }
                        label={ 'Nomi' }
                        { ...register('title') }/>
                    <FormControl>
                        <InputLabel id={ 'input-product-category' }>Katalog</InputLabel>
                        <Select
                            defaultValue={ product.category.id }
                            variant={ 'outlined' }
                            label={ 'Katalog' }
                            { ...register('categoryId') }>
                            <MenuItem disabled>Tanlang</MenuItem>
                            { (categories || []).map((item) =>
                                <MenuItem value={ item.id }>{ item.title }</MenuItem>
                            ) }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id={ 'input-product-category' }>Turi</InputLabel>
                        <Select
                            defaultValue={ product.type }
                            variant={ 'outlined' }
                            label={ 'Turi' }
                            { ...register('type') }>
                            <MenuItem disabled>Tanlang</MenuItem>
                            <MenuItem value='FRUIT'>Meva</MenuItem>
                            <MenuItem value='VITAMIN'>Vitamin</MenuItem>
                        </Select>
                    </FormControl>
                    <Controller
                        name={ 'price' }
                        control={ control }
                        defaultValue={ product.price }
                        render={ ({ field }) =>
                            <NumberField
                                variant={ 'outlined' }
                                label={ 'Narxi' }
                                { ...field }
                            />
                        }
                    />
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
                        loading={ updateProduct.isPending }
                        type={ 'submit' }
                        variant={ 'contained' }>
                        Saqlash
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditProductDialog