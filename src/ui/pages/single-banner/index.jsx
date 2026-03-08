import { useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateBanner, useGetBanners, useUpdateBanner } from "@/services/banner/query.js"
import { Button, Card, Flex, Spinner, Switch, Text } from "@radix-ui/themes"
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons"
import Space from "@/ui/components/space/index.jsx"
import ImageUpload from "@/ui/components/image-upload/index.jsx"
import { Controller, useForm } from "react-hook-form"
import BannerImage from "@/ui/components/banner-image/index.jsx"

function SingleBannerPage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const navigate = useNavigate()

    const { data: banners, isLoading } = useGetBanners()
    const banner = useMemo(() => {
        if (!banners || isNew) return null
        return (banners || []).find((b) => String(b.id) === String(id)) ?? null
    }, [banners, id, isNew])

    const createBanner = useCreateBanner()
    const updateBanner = useUpdateBanner(id)

    const { control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            file: null,
            isActive: true
        }
    })

    useEffect(() => {
        if (isNew) {
            reset({ file: null, isActive: true })
            return
        }

        if (banner) {
            reset({
                file: null,
                isActive: Boolean(banner.isActive)
            })
        }
    }, [banner, isNew, reset])

    const onSubmit = async (data) => {
        if (isNew) {
            const formData = new FormData()
            formData.append('file', data.file)
            formData.append('isActive', data.isActive ? 'true' : 'false')

            await createBanner.mutateAsync(formData)
        } else {
            await updateBanner.mutateAsync({ isActive: data.isActive })
        }
        navigate('/banner')
    }

    const isSaving = isNew ? createBanner.isPending : updateBanner.isPending
    const file = watch('file')

    if (!isNew && isLoading) {
        return <center><Spinner/></center>
    }

    if (!isNew && !isLoading && !banner) {
        return <center><Text size={ '3' }>Banner topilmadi</Text></center>
    }

    const bannerSrc = banner
        ? ((banner.image && banner.image.startsWith('http'))
            ? banner.image
            : import.meta.env.VITE_CDN_URL + 'banner/' + banner.image)
        : null

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
                        onClick={ () => navigate('/banner') }>
                        <ArrowLeftIcon/>
                        Orqaga
                    </Button>
                </div>

                <Space height={ 4 }/>

                <Flex gap={ '2' }>
                    <Card style={ { flex: 1 } }>
                        <Flex align={ 'center' } justify={ 'between' }>
                            <Text size={ '3' }>Aktiv</Text>
                            <Controller
                                control={ control }
                                name={ 'isActive' }
                                render={ ({ field }) =>
                                    <Switch
                                        checked={ Boolean(field.value) }
                                        onCheckedChange={ (v) => field.onChange(v) }/>
                                }/>
                        </Flex>
                    </Card>

                    <Card style={ { width: '300px' } }>
                        { isNew ? (
                            <Controller
                                control={ control }
                                name={ 'file' }
                                render={ ({ field }) =>
                                    <ImageUpload
                                        { ...field }
                                        src={ null }
                                        variant="banner"
                                    />
                                }/>
                        ) : (
                            <BannerImage
                                src={ bannerSrc }
                                alt={ 'banner' }/>
                        ) }
                    </Card>
                </Flex>
            </form>
        </div>
    )
}

export default SingleBannerPage

