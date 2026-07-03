import {useEffect} from "react";
import {Select, Switch, Text} from "@gravity-ui/uikit";
import {useGetAllPromotions, useUpdatePromotion} from "@/services/promotion/query.js";
import {useGetAllCatalogs} from "@/services/catalog/query.js";
import {useGetAllProductsAcrossCatalogs} from "@/services/product/query.js";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const PROMOTION_INFO = {
    first_order_first_item: {
        title: 'Birinchi buyurtma chegirmasi',
        description: 'Mijozning birinchi buyurtmasidagi birinchi mahsulotga 30% chegirma beriladi',
    },
    loyalty_every_10th_item: {
        title: 'Sodiqlik dasturi',
        description: "Mijoz umrbod buyurtma qilgan har 10-mahsulot bepul bo'ladi",
    },
    buy_two_get_one_free: {
        title: '2+1 aksiyasi',
        description: "Tanlangan mahsulotlardan har 3-tasi bepul bo'ladi. Qaysi mahsulotlarga tegishli ekanini tanlang",
        productScoped: true,
    },
    free_delivery_3km: {
        title: 'Yetkazib berish chegirmasi',
        description: "Yetkazib berish narxidan 22 000 so'm chegirma qilinadi",
    },
}

export default function PromotionPage() {
    const {data: promotions = [], isLoading} = useGetAllPromotions()
    const {data: catalogs = []} = useGetAllCatalogs()
    const {data: products = []} = useGetAllProductsAcrossCatalogs(catalogs.map((c) => c.id))
    const {mutate: updatePromotion, isPending} = useUpdatePromotion()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Aksiyalar'})
    }, [])

    const productOptions = products.map((p) => ({value: p.id, content: p.title}))

    return (
        <div className={s.root}>
            {isLoading && <Text color="hint">Yuklanmoqda...</Text>}

            {!isLoading && promotions.length === 0 && (
                <Text color="hint">Aksiyalar topilmadi</Text>
            )}

            {promotions.map((promotion) => {
                const info = PROMOTION_INFO[promotion.type] ?? {title: promotion.type, description: null}

                return (
                    <div key={promotion.id} className={s.card}>
                        <div className={s.row}>
                            <div className={s.info}>
                                <Text variant="subheader-3">{info.title}</Text>
                                {info.description && (
                                    <Text as="div" variant="body-2" color="secondary">{info.description}</Text>
                                )}
                            </div>
                            <Switch
                                checked={promotion.isActive}
                                disabled={isPending}
                                onUpdate={(isActive) => updatePromotion({promotionId: promotion.id, data: {isActive}})}
                            />
                        </div>

                        {info.productScoped && (
                            <Select
                                value={promotion.productIds ?? []}
                                onUpdate={(productIds) => updatePromotion({promotionId: promotion.id, data: {productIds}})}
                                options={productOptions}
                                placeholder="Mahsulotlarni tanlang"
                                multiple
                                filterable
                                hasCounter
                                disabled={isPending}
                                width="max"
                                size="l"
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
