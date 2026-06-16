import {useEffect} from "react";
import {Avatar, Button, SegmentedRadioGroup, Text} from "@gravity-ui/uikit";
import {ArrowRightFromSquare, Moon, Sun} from "@gravity-ui/icons";
import {useAuth} from "@/providers/auth.jsx";
import {useThemeContext} from "@/providers/theme.jsx";
import {useHeader} from "@/providers/header.jsx";
import {formatPhoneNumber} from "@/utils/lib.js";
import s from "./main.module.css";

export default function SettingsPage() {
    const {user, logout} = useAuth()
    const {theme, setTheme} = useThemeContext()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Sozlamalar'})
    }, [])

    const initials = user?.firstName?.slice(0, 2).toUpperCase() ?? '?'

    return (
        <div className={s.root}>
            <section className={s.section}>
                <Text variant="subheader-2" color="secondary" className={s.sectionLabel}>Profil</Text>
                <div className={s.card}>
                    <Avatar text={initials} size="xl" theme="brand"/>
                    <div className={s.info}>
                        <Text variant="subheader-3">{user?.firstName ?? '—'}</Text>
                        <Text variant="body-2" color="secondary">
                            {user?.phoneNumber ? formatPhoneNumber(user.phoneNumber) : '—'}
                        </Text>
                    </div>
                </div>
            </section>

            <section className={s.section}>
                <Text variant="subheader-2" color="secondary" className={s.sectionLabel}>Ko'rinish</Text>
                <div className={s.card}>
                    <div className={s.row}>
                        <div>
                            <Text variant="body-2">Mavzu</Text>
                            <Text as="div" variant="caption-2" color="hint">Interfeys rangini tanlang</Text>
                        </div>
                        <SegmentedRadioGroup value={theme} onUpdate={setTheme} size="l">
                            <SegmentedRadioGroup.Option value="light">
                                <Sun/> Yorug'
                            </SegmentedRadioGroup.Option>
                            <SegmentedRadioGroup.Option value="dark">
                                <Moon/> Qorong'u
                            </SegmentedRadioGroup.Option>
                        </SegmentedRadioGroup>
                    </div>
                </div>
            </section>

            <section className={s.section}>
                <Text variant="subheader-2" color="secondary" className={s.sectionLabel}>Hisob</Text>
                <div className={s.card}>
                    <div className={s.row}>
                        <div>
                            <Text variant="body-2">Tizimdan chiqish</Text>
                            <Text as="div" variant="caption-2" color="hint">Joriy sessiya tugaydi</Text>
                        </div>
                        <Button view="outlined-danger" size="l" onClick={logout}>
                            <Button.Icon><ArrowRightFromSquare/></Button.Icon>
                            Chiqish
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
