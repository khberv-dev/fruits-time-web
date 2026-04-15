import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Text, TextInput} from "@gravity-ui/uikit";
import {useCreateCatalog} from "@/services/catalog/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function CatalogCreatePage() {
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: createCatalog, isPending} = useCreateCatalog()
    const {setHeader} = useHeader()

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {title: '', file: null}
    })

    const [title, file] = watch(['title', 'file'])

    useEffect(() => {
        setHeader({
            title: 'Yangi katalog',
            onBack: () => navigate(-1),
        })
    }, [])

    const onSubmit = () => {
        const fd = new FormData()
        fd.append('title', title.trim())
        if (file) fd.append('file', file)

        createCatalog(
            {data: fd, locale: resourceLocale},
            {onSuccess: () => navigate('/catalog')}
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
                        placeholder="Katalog nomi"
                        disabled={isPending}
                        size="l"
                    />
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
