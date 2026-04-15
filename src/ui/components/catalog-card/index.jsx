import dayjs from "dayjs";
import {Button, Card, Label, Text} from "@gravity-ui/uikit";
import {Pencil, TrashBin} from "@gravity-ui/icons";
import {baseCdnUrl} from "@/services/config.js";
import s from "./main.module.css";

export default function CatalogCard({catalog, onClick, onEdit, onDelete}) {
    const stopProp = (fn) => (e) => {
        e.stopPropagation()
        fn()
    }

    return (
        <Card className={s.root} type="action" view="outlined" onClick={onClick}>
            <img
                className={s.image}
                src={`${baseCdnUrl}/catalog/${catalog.image}`}
                alt={catalog.title}
            />
            <div className={s.body}>
                <div className={s.titleRow}>
                    <Text variant="subheader-2" ellipsis>{catalog.title}</Text>
                    <Label theme={catalog.isActive ? 'success' : 'default'} size="s">
                        {catalog.isActive ? 'Faol' : 'Nofaol'}
                    </Label>
                </div>
                <Text variant="body-1" color="secondary">{catalog.productsCount} ta mahsulot</Text>
                <Text variant="caption-2" color="hint">
                    {dayjs(catalog.createdAt).format('DD-MM-YYYY')}
                </Text>
                <div className={s.actions}>
                    <Button size="s" view="flat" onClick={stopProp(onEdit)}>
                        <Button.Icon><Pencil/></Button.Icon>
                    </Button>
                    <Button size="s" view="flat-danger" onClick={stopProp(onDelete)}>
                        <Button.Icon><TrashBin/></Button.Icon>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
