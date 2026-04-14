import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import {AsideHeader} from "@gravity-ui/navigation";
import {House, LayoutCells, Megaphone} from "@gravity-ui/icons";
import {Button, Text} from "@gravity-ui/uikit";
import {ArrowLeft} from "@gravity-ui/icons";
import ProfileCard from "@/ui/components/profile-card/index.jsx";
import LocaleSwitch from "@/ui/components/locale-switch/index.jsx";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const NAV_ITEMS = [
    {id: 'main', title: 'Asosiy', icon: House, path: '/'},
    {id: 'catalog', title: 'Kataloglar', icon: LayoutCells, path: '/catalog'},
    {id: 'banner', title: 'Bannerlar', icon: Megaphone, path: '/banner'},
]

export default function AppLayout() {
    const [compact, setCompact] = useState(false)
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {title, onBack} = useHeader()

    const menuItems = NAV_ITEMS.map((item) => ({
        id: item.id,
        title: item.title,
        icon: item.icon,
        current: pathname === item.path || pathname.startsWith(item.path + '/'),
        onItemClick: () => navigate(item.path),
    }))

    return (
        <AsideHeader
            className={s.aside}
            compact={compact}
            onChangeCompact={setCompact}
            menuItems={menuItems}
            renderContent={() => (
                <div className={s.wrapper}>
                    <header className={s.header}>
                        <div className={s.headerLeft}>
                            {onBack && (
                                <Button view="flat" onClick={onBack}>
                                    <Button.Icon><ArrowLeft/></Button.Icon>
                                </Button>
                            )}
                            {title && <Text variant="subheader-3">{title}</Text>}
                        </div>
                        {pathname.startsWith('/catalog') && <LocaleSwitch/>}
                    </header>
                    <div className={s.content}>
                        <Outlet/>
                    </div>
                </div>
            )}
            renderFooter={({compact}) => <ProfileCard compact={compact}/>}
        />
    )
}
