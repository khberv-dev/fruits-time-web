import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateCatalog, useGetCatalogById, useUpdateCatalog } from "@/services/catalog/query.js"
import { Button, Card, Flex, Spinner } from "@radix-ui/themes"
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons"
import Space from "@/ui/components/space/index.jsx"
import InputText from "@/ui/components/input-text/index.jsx"
import { Controller, useForm } from "react-hook-form"
import ImageUpload from "@/ui/components/image-upload/index.jsx"
import { objToFormData } from "@/utils/lib.js"

function SingleCatalogPage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const { data: catalog, isLoading } = useGetCatalogById(id)
    const updateCatalog = useUpdateCatalog(id)
    const createCatalog = useCreateCatalog()
    const navigate = useNavigate()
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title: ''
        }
    })

    useEffect(() => {
        if (!isNew && catalog) {
            reset({ title: catalog.title ?? '' })
        }
        if (isNew) {
            reset({ title: '' })
        }
    }, [catalog, isNew, reset])

    const onSubmit = async (data) => {
        const formData = objToFormData(data)

        if (isNew) {
            await createCatalog.mutateAsync(formData)
        } else {
            await updateCatalog.mutateAsync(formData)
        }
        navigate('/catalog')
    }

    const isSaving = isNew ? createCatalog.isPending : updateCatalog.isPending

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
                        onClick={ () => navigate('/catalog') }>
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
                    </Card>
                    <Card style={ { width: '300px' } }>
                        <Controller
                            control={ control }
                            name={ 'file' }
                            render={ ({ field }) =>
                                <ImageUpload
                                    { ...field }
                                    src={ catalog ? import.meta.env.VITE_CDN_URL + 'category/' + catalog.image : null }
                                />
                            }/>
                    </Card>
                </Flex>
            </form>
        </div>
    )
}

export default SingleCatalogPage