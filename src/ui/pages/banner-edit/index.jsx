import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Switch, Text, TextInput} from "@gravity-ui/uikit";
import {useGetBanner, useUpdateBanner} from "@/services/banner/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {baseCdnUrl} from "@/services/config.js";
import ImageUpload from "@/ui/components/image-upload/index.jsx";
import s from "./main.module.css";

export default function BannerEditPage() {
    const {bannerId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: updateBanner, isPending} = useUpdateBanner()
    const {setHeader} = useHeader()

    const {data: bannerData} = useGetBanner(bannerId, resourceLocale)

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {
            title: state?.banner?.title ?? '',
            content: state?.banner?.content ?? '',
            isActive: state?.banner?.isActive ?? false,
            popup: state?.banner?.popup ?? false,
            file: null,
            thumbnail: null,
        }
    })

    const [title, content, isActive, popup, file, thumbnail] = watch(['title', 'content', 'isActive', 'popup', 'file', 'thumbnail'])

    useEffect(() => {
        setHeader({
            title: state?.banner?.title ?? 'Bannerni tahrirlash',
            onBack: () => navigate(-1),
        })
    }, [state?.banner?.title])

    useEffect(() => {
        if (!bannerData) return
        setValue('title', bannerData.title ?? '', {shouldDirty: true})
        setValue('content', bannerData.content ?? '', {shouldDirty: true})
        setValue('isActive', bannerData.isActive ?? false, {shouldDirty: true})
        setValue('popup', bannerData.popup ?? false, {shouldDirty: true})
        setValue('file', null, {shouldDirty: true})
        setValue('thumbnail', null, {shouldDirty: true})
    }, [bannerData])

    const onSubmit = () => {
        const fd = new FormData()
        fd.append('title', title.trim())
        fd.append('content', content.trim())
        fd.append('isActive', String(isActive))
        fd.append('popup', String(popup))
        if (file) fd.append('file', file)
        if (thumbnail) fd.append('thumbnail', thumbnail)

        updateBanner(
            {bannerId, data: fd, locale: resourceLocale},
            {onSuccess: () => navigate('/banner')}
        )
    }

    const previewSrc = state?.banner?.image ? `${baseCdnUrl}/banner/${state.banner.image}` : null
    const thumbnailPreviewSrc = state?.banner?.thumbnail ? `${baseCdnUrl}/banner/${state.banner.thumbnail}` : null

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <ImageUpload
                    value={file}
                    onUpdate={(f) => setValue('file', f)}
                    previewSrc={previewSrc}
                    disabled={isPending}
                />

                <div className={s.field}>
                    <Text variant="body-2">Kichik rasm (ixtiyoriy)</Text>
                    <ImageUpload
                        value={thumbnail}
                        onUpdate={(f) => setValue('thumbnail', f)}
                        previewSrc={thumbnailPreviewSrc}
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
                    <Text variant="body-2">Faol</Text>
                    <Switch
                        checked={isActive}
                        onUpdate={(v) => setValue('isActive', v, {shouldDirty: true})}
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
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}
