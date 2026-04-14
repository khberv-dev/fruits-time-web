import {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Text, TextInput} from "@gravity-ui/uikit";
import {Plus, Xmark} from "@gravity-ui/icons";
import {useUpdateProduct, useDeleteProduct, useGetProduct} from "@/services/product/query.js";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {baseCdnUrl} from "@/services/config.js";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function ProductEditPage() {
    const {catalogId, productId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: updateProduct, isPending} = useUpdateProduct()
    const {mutate: deleteProduct, isPending: isDeleting} = useDeleteProduct()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const {setHeader} = useHeader()

    const {data: productData} = useGetProduct(catalogId, productId, resourceLocale)

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {
            title: state?.product?.title ?? '',
            description: state?.product?.description ?? '',
            compound: state?.product?.compound ?? [''],
            file: null,
        }
    })

    const [title, description, compound, file] = watch(['title', 'description', 'compound', 'file'])

    useEffect(() => {
        setHeader({
            title: state?.product?.title ?? '',
            onBack: () => navigate(-1),
        })
    }, [state?.product?.title])

    useEffect(() => {
        if (!productData) return
        setValue('title', productData.title ?? '', {shouldDirty: true})
        setValue('description', productData.description ?? '', {shouldDirty: true})
        setValue('compound', productData.compound?.length ? productData.compound : [''], {shouldDirty: true})
        setValue('file', null, {shouldDirty: true})
    }, [productData])

    const addCompound = () => setValue('compound', [...compound, ''])
    const removeCompound = (i) => setValue('compound', compound.filter((_, idx) => idx !== i))
    const updateCompound = (i, v) => setValue('compound', compound.map((c, idx) => idx === i ? v : c))

    const onSubmit = () => {
        const fd = new FormData()
        fd.append('title', title)
        fd.append('description', description)
        compound.forEach((c, i) => fd.append(`compound[${i}]`, c))
        if (file) fd.append('file', file)

        updateProduct(
            {catalogId, productId, data: fd, resource_locale: resourceLocale},
            {onSuccess: () => navigate(`/catalog/${catalogId}/product`)}
        )
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.columns}>
                    <div className={s.column}>
                        <div className={s.field}>
                            <Text variant="body-2">Nomi</Text>
                            <TextInput
                                value={title}
                                onUpdate={(v) => setValue('title', v)}
                                placeholder="Mahsulot nomi"
                                disabled={isPending}
                                size="l"
                            />
                        </div>

                        <div className={s.field}>
                            <Text variant="body-2">Tavsif</Text>
                            <textarea
                                className={s.textarea}
                                value={description}
                                onChange={(e) => setValue('description', e.target.value)}
                                placeholder="Mahsulot tavsifi"
                                rows={6}
                                disabled={isPending}
                            />
                        </div>
                    </div>

                    <div className={s.column}>
                        <ImageUpload
                            value={file}
                            onUpdate={(f) => setValue('file', f)}
                            previewSrc={state?.product?.image ? `${baseCdnUrl}/product/${state.product.image}` : null}
                            disabled={isPending}
                        />

                        <div className={s.field}>
                            <Text variant="body-2">Tarkib</Text>
                            <div className={s.compoundList}>
                                {compound.map((item, i) => (
                                    <div key={i} className={s.compoundRow}>
                                        <TextInput
                                            value={item}
                                            onUpdate={(v) => updateCompound(i, v)}
                                            placeholder={`Tarkib ${i + 1}`}
                                            disabled={isPending}
                                            size="m"
                                        />
                                        {compound.length > 1 && (
                                            <Button
                                                view="flat-danger"
                                                size="m"
                                                onClick={() => removeCompound(i)}
                                                disabled={isPending}
                                            >
                                                <Button.Icon><Xmark/></Button.Icon>
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button view="outlined" size="m" onClick={addCompound} disabled={isPending}>
                                    <Button.Icon><Plus/></Button.Icon>
                                    Tarkib qo'shish
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.footer}>
                    <Button
                        view="outlined-danger"
                        size="l"
                        loading={isDeleting}
                        disabled={isPending}
                        onClick={() => setConfirmOpen(true)}
                    >
                        O'chirish
                    </Button>
                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                        disabled={!title.trim() || isDeleting}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>

            <ConfirmDialog
                open={confirmOpen}
                title="Mahsulotni o'chirish"
                description="Bu amalni ortga qaytarib bo'lmaydi. Davom etasizmi?"
                loading={isDeleting}
                onConfirm={() => deleteProduct({catalogId, productId}, {onSuccess: () => navigate(`/catalog/${catalogId}/product`)})}
                onClose={() => setConfirmOpen(false)}
            />
        </div>
    )
}
