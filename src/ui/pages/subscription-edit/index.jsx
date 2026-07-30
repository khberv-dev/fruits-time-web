import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Select, Switch, Text, TextInput} from "@gravity-ui/uikit";
import {Ticket} from "@gravity-ui/icons";
import {useGetSubscription, useUpdateSubscription} from "@/services/subscription/query.js";
import {useGetAllCatalogsList} from "@/services/catalog/query.js";
import {useGetAllProductsAcrossCatalogs} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {extractDigits, formatNumber, pickLocale} from "@/utils/lib.js";
import s from "./main.module.css";

export default function SubscriptionEditPage() {
    const {subscriptionId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {mutate: updateSubscription, isPending} = useUpdateSubscription()
    const {data: subscription} = useGetSubscription(subscriptionId)
    const {data: catalogs = []} = useGetAllCatalogsList()
    const {data: products = []} = useGetAllProductsAcrossCatalogs(catalogs.map((c) => c.id))
    const {setHeader} = useHeader()

    const initial = subscription ?? state?.subscription

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {
            // The title input is per-locale: it holds the title of the locale currently
            // selected in the header, and only that locale is written back.
            title: pickLocale(state?.subscription?.title, resourceLocale),
            productIds: state?.subscription?.productIds ?? [],
            discountAmount: state?.subscription?.discountAmount ?? '',
            isActive: state?.subscription?.isActive ?? false,
        }
    })

    const [title, productIds, discountAmount, isActive] = watch(['title', 'productIds', 'discountAmount', 'isActive'])

    useEffect(() => {
        setHeader({
            title: pickLocale(initial?.title, resourceLocale) || 'Obuna',
            onBack: () => navigate('/subscription'),
        })
    }, [initial?.title, resourceLocale])

    useEffect(() => {
        if (!subscription) return
        setValue('title', subscription.title?.[resourceLocale] ?? '', {shouldDirty: true})
        setValue('productIds', subscription.productIds ?? [], {shouldDirty: true})
        setValue('discountAmount', subscription.discountAmount ?? '', {shouldDirty: true})
        setValue('isActive', subscription.isActive ?? false, {shouldDirty: true})
    }, [subscription, resourceLocale])

    const onSubmit = () => {
        updateSubscription(
            {
                subscriptionId,
                // An empty title is left out so the other locales' titles stay untouched.
                data: {
                    ...(title.trim() && {title: title.trim()}),
                    productIds,
                    discountAmount: Number(extractDigits(String(discountAmount))),
                    isActive,
                },
                locale: resourceLocale,
            },
            {onSuccess: () => navigate('/subscription')}
        )
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.field}>
                    <Text variant="body-2">Nomi ({resourceLocale.toUpperCase()})</Text>
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
                        Kunlik chegirma faqat shu mahsulotlarga ishlatiladi
                    </Text>
                </div>

                <div className={s.field}>
                    <Text variant="body-2">Kunlik chegirma</Text>
                    <TextInput
                        value={discountAmount !== '' ? formatNumber(extractDigits(String(discountAmount))) : ''}
                        onUpdate={(v) => setValue('discountAmount', extractDigits(v), {shouldDirty: true})}
                        placeholder="0"
                        endContent={<Text variant="body-2" color="hint">UZS</Text>}
                        disabled={isPending}
                        size="l"
                    />
                    <Text variant="caption-2" color="hint">
                        Obunachi kuniga tanlangan mahsulotlardan jami shu summagacha chegirma oladi. Yangi summa
                        keyingi buyurtmadan boshlab ishlaydi.
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

                <Text variant="caption-2" color="hint">
                    Nofaol qilinganda obuna barcha egalaridan darhol olib qo'yiladi, kodlar esa saqlanib qoladi —
                    qayta faollashtirilsa, obuna tiklanadi.
                </Text>

                <div className={s.footer}>
                    <Button
                        view="outlined"
                        size="l"
                        disabled={isPending}
                        onClick={() => navigate(`/subscription/${subscriptionId}/codes`)}
                    >
                        <Button.Icon><Ticket/></Button.Icon>
                        Kodlar
                    </Button>
                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                        disabled={productIds.length === 0 || discountAmount === ''}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}
