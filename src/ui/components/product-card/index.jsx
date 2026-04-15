import dayjs from "dayjs";
import {Button, Card, Text} from "@gravity-ui/uikit";
import {Pencil, TrashBin} from "@gravity-ui/icons";
import {baseCdnUrl} from "@/services/config.js";
import {formatNumber} from "@/utils/lib.js";
import s from "./main.module.css";

export default function ProductCard({product, onEdit, onDelete}) {
    return (
        <Card className={s.root} view="outlined">
            <img
                className={s.image}
                src={`${baseCdnUrl}/product/${product.image}`}
                alt={product.title}
            />
            <div className={s.body}>
                <Text variant="subheader-2" ellipsis>{product.title}</Text>
                {product.price != null && (
                    <Text variant="body-1">{formatNumber(product.price)} UZS</Text>
                )}
                <Text variant="caption-2" color="hint">
                    {dayjs(product.createdAt).format('DD-MM-YYYY')}
                </Text>
                <div className={s.actions}>
                    <Button size="s" view="flat" onClick={onEdit}>
                        <Button.Icon><Pencil/></Button.Icon>
                    </Button>
                    <Button size="s" view="flat-danger" onClick={onDelete}>
                        <Button.Icon><TrashBin/></Button.Icon>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
