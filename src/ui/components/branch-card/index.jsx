import {Button, Card, Label, Text} from "@gravity-ui/uikit";
import {Database} from "@gravity-ui/icons";
import s from "./main.module.css";

export default function BranchCard({branch, onBindStorage}) {
    return (
        <Card className={s.root} view="outlined">
            <div className={s.body}>
                <div className={s.titleRow}>
                    <Text variant="subheader-2" ellipsis>{branch.name}</Text>
                    <div style={{display: 'flex', gap: 4}}>
                        <Label theme={branch.isWorking ? 'success' : 'danger'} size="s">
                            {branch.isWorking ? 'Ochiq' : 'Yopiq'}
                        </Label>
                        <Label theme={branch.storageId ? 'info' : 'warning'} size="s">
                            {branch.storageId ? 'Ombor biriktirilgan' : 'Ombor yo\'q'}
                        </Label>
                    </div>
                </div>
                {branch.address && (
                    <Text variant="body-1" color="secondary">{branch.address}</Text>
                )}
                {branch.managerName && (
                    <Text variant="body-2" color="secondary">{branch.managerName}</Text>
                )}
                {branch.managerPhone && (
                    <Text variant="caption-2" color="hint">{branch.managerPhone}</Text>
                )}
                {branch.storageId && (
                    <Text variant="caption-2" color="hint">Omborxona ID: {branch.storageId}</Text>
                )}
                <div className={s.actions}>
                    <Button size="s" view="outlined" onClick={onBindStorage}>
                        <Button.Icon><Database/></Button.Icon>
                        Omborxona biriktirish
                    </Button>
                </div>
            </div>
        </Card>
    )
}
