import {Button, Card, Label, Text} from "@gravity-ui/uikit";
import {Pencil} from "@gravity-ui/icons";
import s from "./main.module.css";

export default function BranchCard({branch, onEdit}) {
    return (
        <Card className={s.root} view="outlined">
            <div className={s.body}>
                <div className={s.titleRow}>
                    <Text variant="subheader-2">{branch.name}</Text>
                    <div className={s.labels}>
                        <Label theme={branch.isWorking ? 'success' : 'danger'} size="s">
                            {branch.isWorking ? 'Ochiq' : 'Yopiq'}
                        </Label>
                        <Label theme={branch.storageId ? 'info' : 'warning'} size="s">
                            {branch.storageId ? 'Ombor biriktirilgan' : 'Ombor yo\'q'}
                        </Label>
                    </div>
                </div>
                <div className={s.info}>
                    {branch.address && (
                        <Text variant="body-1" color="secondary">{branch.address}</Text>
                    )}
                    {branch.managerName && (
                        <Text as="div" variant="body-2" color="secondary">{branch.managerName}</Text>
                    )}
                    {branch.managerPhone && (
                        <Text as="div" variant="caption-2" color="hint">{branch.managerPhone}</Text>
                    )}
                </div>
                <div className={s.actions}>
                    <Button size="s" view="outlined" onClick={onEdit}>
                        <Button.Icon><Pencil/></Button.Icon>
                        Tahrirlash
                    </Button>
                </div>
            </div>
        </Card>
    )
}
