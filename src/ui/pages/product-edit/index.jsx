import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Select, Switch, Text, TextInput} from "@gravity-ui/uikit";
import {Plus, Xmark} from "@gravity-ui/icons";
import {useDeleteProduct, useGetProduct, useUpdateProduct} from "@/services/product/query.js";
import ConfirmDialog from "@/ui/components/confirm-dialog/index.jsx";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {baseCdnUrl} from "@/services/config.js";
import {extractDigits, formatNumber} from "@/utils/lib.js";
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
            price: state?.product?.price ?? '',
            type: state?.product?.type ?? 'juice',
            posId: state?.product?.posId ?? state?.product?.pos_id ?? '',
            isActive: state?.product?.isActive ?? false,
            index: state?.product?.index ?? '',
            file: null,
        }
    })

    const [title, description, compound, price, type, posId, isActive, index, file] = watch(['title', 'description', 'compound', 'price', 'type', 'posId', 'isActive', 'index', 'file'])

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
        setValue('price', productData.price ?? '', {shouldDirty: true})
        setValue('type', productData.type ?? 'juice', {shouldDirty: true})
        setValue('posId', productData.posId ?? '', {shouldDirty: true})
        setValue('isActive', productData.isActive ?? false, {shouldDirty: true})
        setValue('index', productData.index ?? '', {shouldDirty: true})
        setValue('file', null, {shouldDirty: true})
    }, [productData])

    const addCompound = () => setValue('compound', [...compound, ''])
    const removeCompound = (i) => setValue('compound', compound.filter((_, idx) => idx !== i))
    const updateCompound = (i, v) => setValue('compound', compound.map((c, idx) => idx === i ? v : c))

    const onSubmit = () => {
        const fd = new FormData()
        fd.append('title', title.trim())
        fd.append('description', description.trim())
        fd.append('price', Number(extractDigits(String(price))))
        fd.append('type', type)
        if (posId) fd.append('posId', posId)
        fd.append('isActive', String(isActive))
        if (index !== '') fd.append('index', Number(index))
        compound.filter((c) => c.trim()).forEach((c, i) => fd.append(`compound[${i}]`, c.trim()))
        if (file) fd.append('file', file)

        updateProduct(
            {catalogId, productId, data: fd, locale: resourceLocale},
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
                            <Text variant="body-2">Narx</Text>
                            <TextInput
                                value={price ? formatNumber(extractDigits(String(price))) : ''}
                                onUpdate={(v) => setValue('price', extractDigits(v), {shouldDirty: true})}
                                placeholder="0"
                                endContent={<Text variant="body-2" color="hint">UZS</Text>}
                                disabled={isPending}
                                size="l"
                            />
                        </div>

                        <div className={s.field}>
                            <Text variant="body-2">Turi</Text>
                            <Select
                                value={[type]}
                                onUpdate={([v]) => setValue('type', v, {shouldDirty: true})}
                                options={[
                                    {value: 'juice', content: 'Sharbat'},
                                    {value: 'vitamin', content: 'Vitamin'},
                                ]}
                                disabled={isPending}
                                size="l"
                                width="max"
                            />
                        </div>

                        <div className={s.field}>
                            <Text variant="body-2">POS ID</Text>
                            <TextInput
                                value={posId}
                                onUpdate={(v) => setValue('posId', v, {shouldDirty: true})}
                                placeholder="POS ID"
                                disabled={isPending}
                                size="l"
                            />
                        </div>

                        <div className={s.field}>
                            <Text variant="body-2">Tartib raqami</Text>
                            <TextInput
                                value={String(index)}
                                onUpdate={(v) => setValue('index', v, {shouldDirty: true})}
                                placeholder="0"
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

                        <div className={s.activeRow}>
                            <Text variant="body-2">Faol</Text>
                            <Switch
                                checked={isActive}
                                onUpdate={(v) => setValue('isActive', v, {shouldDirty: true})}
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
                onConfirm={() => deleteProduct({
                    catalogId,
                    productId
                }, {onSuccess: () => navigate(`/catalog/${catalogId}/product`)})}
                onClose={() => setConfirmOpen(false)}
            />
        </div>
    )
}
