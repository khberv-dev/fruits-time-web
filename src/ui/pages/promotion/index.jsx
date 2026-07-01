import {useEffect} from "react";
import {Switch, Text} from "@gravity-ui/uikit";
import {useGetAllPromotions, useUpdatePromotion} from "@/services/promotion/query.js";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const PROMOTION_INFO = {
    first_order_first_item: {
        title: 'Birinchi buyurtma chegirmasi',
        description: 'Mijozning birinchi buyurtmasidagi birinchi mahsulotga 30% chegirma beriladi',
    },
}

export default function PromotionPage() {
    const {data: promotions = [], isLoading} = useGetAllPromotions()
    const {mutate: updatePromotion, isPending} = useUpdatePromotion()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Aksiyalar'})
    }, [])

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
                        <div className={s.info}>
                            <Text variant="subheader-3">{info.title}</Text>
                            {info.description && (
                                <Text as="div" variant="body-2" color="secondary">{info.description}</Text>
                            )}
                        </div>
                        <Switch
                            checked={promotion.isActive}
                            disabled={isPending}
                            onUpdate={(isActive) => updatePromotion({promotionId: promotion.id, isActive})}
                        />
                    </div>
                )
            })}
        </div>
    )
}
