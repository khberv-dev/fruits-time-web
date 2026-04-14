import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Text, TextInput} from "@gravity-ui/uikit";
import {Plus, Xmark} from "@gravity-ui/icons";
import {useCreateProduct} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function ProductCreatePage() {
    const {catalogId} = useParams()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: createProduct, isPending} = useCreateProduct()
    const {setHeader} = useHeader()

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {title: '', description: '', compound: [''], file: null}
    })

    const [title, description, compound, file] = watch(['title', 'description', 'compound', 'file'])

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
        fd.append('title', title)
        fd.append('description', description)
        compound.forEach((c, i) => fd.append(`compound[${i}]`, c))
        if (file) fd.append('file', file)

        createProduct(
            {catalogId, data: fd, resource_locale: resourceLocale},
            {onSuccess: () => navigate(`/catalog/${catalogId}/product`)}
        )
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ImageUpload
                    value={file}
                    onUpdate={(f) => setValue('file', f)}
                    disabled={isPending}
                />

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
                    <Text variant="body-2">Tavsif</Text>
                    <textarea
                        className={s.textarea}
                        value={description}
                        onChange={(e) => setValue('description', e.target.value)}
                        placeholder="Mahsulot tavsifi"
                        rows={4}
                        disabled={isPending}
                    />
                </div>

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
