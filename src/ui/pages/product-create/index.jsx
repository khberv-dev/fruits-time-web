import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Select, Text, TextInput} from "@gravity-ui/uikit";
import {Plus, Xmark} from "@gravity-ui/icons";
import {useCreateProduct} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {extractDigits, formatNumber} from "@/utils/lib.js";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function ProductCreatePage() {
    const {catalogId} = useParams()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: createProduct, isPending} = useCreateProduct()
    const {setHeader} = useHeader()

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {title: '', description: '', compound: [''], price: '', type: 'juice', posId: '', file: null}
    })

    const [title, description, compound, price, type, posId, file] = watch(['title', 'description', 'compound', 'price', 'type', 'posId', 'file'])

    useEffect(() => {
        setHeader({
            title: 'Yangi mahsulot',
            onBack: () => navigate(-1),
        })
    }, [])

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
        compound.filter((c) => c.trim()).forEach((c, i) => fd.append(`compound[${i}]`, c.trim()))
        if (file) fd.append('file', file)

        createProduct(
            {catalogId, data: fd, locale: resourceLocale},
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
                                onUpdate={(v) => setValue('title', v, {shouldDirty: true})}
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
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                        disabled={!title.trim()}
                    >
                        Yaratish
                    </Button>
                </div>
            </form>
        </div>
    )
}
