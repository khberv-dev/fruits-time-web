import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Switch, Text, TextInput} from "@gravity-ui/uikit";
import {useCreateBanner} from "@/services/banner/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function BannerCreatePage() {
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: createBanner, isPending} = useCreateBanner()
    const {setHeader} = useHeader()

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {title: '', content: '', file: null, thumbnail: null, popup: false}
    })

    const [title, content, file, thumbnail, popup] = watch(['title', 'content', 'file', 'thumbnail', 'popup'])

    useEffect(() => {
        setHeader({
            title: 'Yangi banner',
            onBack: () => navigate(-1),
        })
    }, [])

    const onSubmit = () => {
        const fd = new FormData()
        fd.append('title', title.trim())
        fd.append('content', content.trim())
        if (file) fd.append('file', file)
        if (thumbnail) fd.append('thumbnail', thumbnail)
        fd.append('popup', String(popup))

        createBanner(
            {data: fd, locale: resourceLocale},
            {onSuccess: () => navigate('/banner')}
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
                    <Text variant="body-2">Kichik rasm (ixtiyoriy)</Text>
                    <ImageUpload
                        value={thumbnail}
                        onUpdate={(f) => setValue('thumbnail', f)}
                        disabled={isPending}
                    />
                </div>

                <div className={s.field}>
                    <Text variant="body-2">Sarlavha</Text>
                    <TextInput
                        value={title}
                        onUpdate={(v) => setValue('title', v, {shouldDirty: true})}
                        placeholder="Banner sarlavhasi"
                        disabled={isPending}
                        size="l"
                    />
                </div>

                <div className={s.field}>
                    <Text variant="body-2">Matn</Text>
                    <textarea
                        className={s.textarea}
                        value={content}
                        onChange={(e) => setValue('content', e.target.value)}
                        placeholder="Banner matni"
                        rows={4}
                        disabled={isPending}
                    />
                </div>

                <div className={s.activeRow}>
                    <Text variant="body-2">Popup sifatida ko'rsatish</Text>
                    <Switch
                        checked={popup}
                        onUpdate={(v) => setValue('popup', v, {shouldDirty: true})}
                        disabled={isPending}
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
