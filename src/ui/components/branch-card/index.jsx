import {Button, Card, Label, Text} from "@gravity-ui/uikit";
import {Database} from "@gravity-ui/icons";
import s from "./main.module.css";

export default function BranchCard({branch, onBindStorage}) {
    return (
        <Card className={s.root} view="outlined">
            <div className={s.body}>
                <div className={s.titleRow}>
                    <Text variant="subheader-2" ellipsis>{branch.name}</Text>
                    <Label theme={branch.storageId ? 'success' : 'warning'} size="s">
                        {branch.storageId ? 'Omborxona biriktirilgan' : 'Omborxona yo\'q'}
                    </Label>
                </div>
                {branch.address && (
                    <Text variant="body-1" color="secondary">{branch.address}</Text>
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
