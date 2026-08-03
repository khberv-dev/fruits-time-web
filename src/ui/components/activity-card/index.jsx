import {Button, Card, Text} from "@gravity-ui/uikit";
import {ChevronRight} from "@gravity-ui/icons";
import s from "./main.module.css";

// Card shell for the dashboard's recent-activity feeds. Rows are passed in as children so
// each feed can lay its own fields out; the shell owns the header, the "see all" link and
// the empty state.
export default function ActivityCard({title, onSeeAll, isLoading, isEmpty, emptyMessage, children}) {
    return (
        <Card className={s.root} view="outlined">
            <div className={s.header}>
                <Text variant="subheader-2">{title}</Text>
                {onSeeAll && (
                    <Button view="flat" size="s" onClick={onSeeAll}>
                        Barchasi
                        <Button.Icon><ChevronRight/></Button.Icon>
                    </Button>
                )}
            </div>

            <div className={s.rows}>
                {isLoading && <Text variant="body-2" color="hint">Yuklanmoqda...</Text>}
                {!isLoading && isEmpty && <Text variant="body-2" color="hint">{emptyMessage}</Text>}
                {!isLoading && !isEmpty && children}
            </div>
        </Card>
    )
}

export function ActivityRow({onClick, children}) {
    return (
        <div
            className={onClick ? s.rowClickable : s.row}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick() } : undefined}
        >
            {children}
        </div>
    )
}
