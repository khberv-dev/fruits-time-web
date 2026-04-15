import dayjs from "dayjs";
import {Button, Card, Label, Text} from "@gravity-ui/uikit";
import {Pencil} from "@gravity-ui/icons";
import {baseCdnUrl} from "@/services/config.js";
import s from "./main.module.css";

export default function BannerCard({banner, onEdit}) {
    return (
        <Card className={s.root} view="outlined">
            <img
                className={s.image}
                src={`${baseCdnUrl}/banner/${banner.image}`}
                alt={banner.title}
            />
            <div className={s.body}>
                <div className={s.titleRow}>
                    <Text variant="subheader-2" ellipsis>{banner.title}</Text>
                    <Label theme={banner.isActive ? 'success' : 'default'} size="s">
                        {banner.isActive ? 'Faol' : 'Nofaol'}
                    </Label>
                </div>
                {banner.content && (
                    <Text variant="body-1" color="secondary" ellipsis>{banner.content}</Text>
                )}
                <Text variant="caption-2" color="hint">
                    {dayjs(banner.createdAt).format('DD-MM-YYYY')}
                </Text>
                <div className={s.actions}>
                    <Button size="s" view="flat" onClick={onEdit}>
                        <Button.Icon><Pencil/></Button.Icon>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
