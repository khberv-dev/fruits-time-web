import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Select, Switch, Text, TextInput} from "@gravity-ui/uikit";
import {useCreateSubscription} from "@/services/subscription/query.js";
import {useGetAllCatalogsList} from "@/services/catalog/query.js";
import {useGetAllProductsAcrossCatalogs} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import s from "./main.module.css";

export default function SubscriptionCreatePage() {
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: createSubscription, isPending} = useCreateSubscription()
    const {data: catalogs = []} = useGetAllCatalogsList()
    const {data: products = []} = useGetAllProductsAcrossCatalogs(catalogs.map((c) => c.id))
    const {setHeader} = useHeader()

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {title: '', productIds: [], isActive: true}
    })

    const [title, productIds, isActive] = watch(['title', 'productIds', 'isActive'])

    useEffect(() => {
        setHeader({
            title: 'Yangi obuna',
            onBack: () => navigate(-1),
        })
    }, [])

    const onSubmit = () => {
        createSubscription(
            {data: {title: title.trim(), productIds, isActive}, locale: resourceLocale},
            {onSuccess: () => navigate('/subscription')}
        )
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.field}>
                    <Text variant="body-2">Nomi</Text>
                    <TextInput
                        value={title}
                        onUpdate={(v) => setValue('title', v, {shouldDirty: true})}
                        placeholder="Obuna nomi"
                        disabled={isPending}
                        size="l"
                    />
                </div>

                <div className={s.field}>
                    <Text variant="body-2">Mahsulotlar</Text>
                    <Select
                        value={productIds}
                        onUpdate={(v) => setValue('productIds', v, {shouldDirty: true})}
                        options={products.map((p) => ({value: p.id, content: p.title}))}
                        placeholder="Mahsulotlarni tanlang"
                        multiple
                        filterable
                        hasCounter
                        disabled={isPending}
                        width="max"
                        size="l"
                    />
                    <Text variant="caption-2" color="hint">
                        Obunachi tanlangan har bir mahsulotdan kuniga 1 tadan bepul oladi
                    </Text>
                </div>

                <div className={s.activeRow}>
                    <Text variant="body-2">Faol</Text>
                    <Switch
                        checked={isActive}
                        onUpdate={(v) => setValue('isActive', v, {shouldDirty: true})}
                        disabled={isPending}
                    />
                </div>

                <div className={s.footer}>
                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                        disabled={!title.trim() || productIds.length === 0}
                    >
                        Yaratish
                    </Button>
                </div>
            </form>
        </div>
    )
}
