import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateProduct, useGetProductById, useUpdateProduct } from "@/services/product/query.js"
import { useGetCatalogs } from "@/services/catalog/query.js"
import { Button, Card, Flex, Spinner } from "@radix-ui/themes"
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons"
import Space from "@/ui/components/space/index.jsx"
import InputText from "@/ui/components/input-text/index.jsx"
import InputTextArea from "@/ui/components/input-text-area/index.jsx"
import { Controller, useForm } from "react-hook-form"
import ImageUpload from "@/ui/components/image-upload/index.jsx"
import { objToFormData } from "@/utils/lib.js"
import CompoundEditor from "@/ui/components/compound-editor/index.jsx"
import InputSelect from "@/ui/components/input-select/index.jsx"
import InputPrice from "@/ui/components/input-price/index.jsx"

const PRODUCT_TYPE_OPTIONS = [
    { value: 'FRUIT', label: 'FRUIT' },
    { value: 'VITAMIN', label: 'VITAMIN' }
]

function SingleProductPage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const { data: product, isLoading } = useGetProductById(id)
    const { data: catalogs = [] } = useGetCatalogs()
    const updateProduct = useUpdateProduct(id)
    const createProduct = useCreateProduct()
    const navigate = useNavigate()
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            categoryId: '',
            type: '',
            price: '',
            description: '',
            compound: []
        }
    })

    const categoryOptions = catalogs.map((c) => ({ value: c.id, label: c.title ?? '' }))

    useEffect(() => {
        if (!isNew && product) {
            reset({
                title: product.title ?? '',
                categoryId: product.category?.id ?? product.categoryId ?? '',
                type: product.type ?? '',
                price: product.price ?? '',
                description: product.description ?? '',
                compound: Array.isArray(product.compound) ? product.compound : []
            })
        }
        if (isNew) {
            reset({
                title: '',
                categoryId: '',
                type: '',
                price: '',
                description: '',
                compound: []
            })
        }
    }, [product, isNew, reset])

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            compound: typeof data.compound === 'string'
                ? data.compound.split(',').map((item) => item.trim()).filter(Boolean)
                : data.compound
        }

        const formData = objToFormData(payload)

        if (isNew) {
            await createProduct.mutateAsync(formData)
        } else {
            await updateProduct.mutateAsync(formData)
        }
        navigate('/product')
    }

    const isSaving = isNew ? createProduct.isPending : updateProduct.isPending

    if (!isNew && isLoading) {
        return <center><Spinner/></center>
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <Button
                        type={ 'submit' }
                        mr={ '2' }
                        loading={ isSaving }>
                        <CheckIcon/>
                        Saqlash
                    </Button>
                    <Button
                        type={ 'button' }
                        variant={ 'outline' }
                        color={ 'gray' }
                        onClick={ () => navigate('/product') }>
                        <ArrowLeftIcon/>
                        Orqaga
                    </Button>
                </div>
                <Space height={ 4 }/>
                <Flex gap={ '4' }>
                    <Card style={ { flex: 1 } }>
                        <Controller
                            control={ control }
                            name={ 'title' }
                            render={ ({ field }) =>
                                <InputText
                                    { ...field }
                                    label={ 'Nomi' }/>
                            }/>
                        <Space height={ 3 }/>
                        <Controller
                            control={ control }
                            name={ 'categoryId' }
                            render={ ({ field }) =>
                                <InputSelect
                                    { ...field }
                                    label={ 'Katalog' }
                                    placeholder={ 'Katalogni tanlang' }
                                    options={ categoryOptions }/>
                            }/>
                        <Space height={ 3 }/>
                        <Controller
                            control={ control }
                            name={ 'type' }
                            render={ ({ field }) =>
                                <InputSelect
                                    { ...field }
                                    label={ 'Mahsulot turi' }
                                    placeholder={ 'Turini tanlang' }
                                    options={ PRODUCT_TYPE_OPTIONS }/>
                            }/>
                        <Space height={ 3 }/>
                        <Controller
                            control={ control }
                            name={ 'price' }
                            render={ ({ field }) =>
                                <InputPrice
                                    { ...field }
                                    label={ 'Narxi' }
                                    placeholder={ '0' }/>
                            }/>
                        <Space height={ 3 }/>
                        <Controller
                            control={ control }
                            name={ 'description' }
                            render={ ({ field }) =>
                                <InputTextArea
                                    { ...field }
                                    label={ 'Tavsif' }
                                    placeholder={ 'Mahsulot tavsifi…' }/>
                            }/>
                        <Space height={ 3 }/>
                        <Controller
                            control={ control }
                            name={ 'compound' }
                            render={ ({ field }) =>
                                <CompoundEditor
                                    label={ 'Tarkibi' }
                                    value={ field.value }
                                    onChange={ field.onChange }/>
                            }/>
                    </Card>
                    <Card style={ { width: '300px' } }>
                        <Controller
                            control={ control }
                            name={ 'file' }
                            render={ ({ field }) =>
                                <ImageUpload
                                    { ...field }
                                    src={ product ? import.meta.env.VITE_CDN_URL + 'product/' + product.image : null }
                                />
                            }/>
                    </Card>
                </Flex>
            </form>
        </div>
    )
}

export default SingleProductPage

