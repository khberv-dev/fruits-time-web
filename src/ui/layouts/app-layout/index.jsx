import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import {AsideHeader} from "@gravity-ui/navigation";
import {ArrowLeft, Gear, GeoFill, House, Megaphone, Rectangles4, ShoppingBag, Sparkles} from "@gravity-ui/icons";
import {Button, Text} from "@gravity-ui/uikit";
import ProfileCard from "@/ui/components/profile-card/index.jsx";
import LocaleSwitch from "@/ui/components/locale-switch/index.jsx";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const NAV_ITEMS = [
    {id: 'main', title: 'Asosiy', icon: House, path: '/'},
    {id: 'catalog', title: 'Kataloglar', icon: Rectangles4, path: '/catalog'},
    {id: 'orders', title: 'Buyurtmalar', icon: ShoppingBag, path: '/orders'},
    {id: 'banner', title: 'Bannerlar', icon: Megaphone, path: '/banner'},
    {id: 'branch', title: 'Filiallar', icon: GeoFill, path: '/branch'},
    {id: 'advisor', title: 'AI Maslahatchi', icon: Sparkles, path: '/advisor'},
    {id: 'settings', title: 'Sozlamalar', icon: Gear, path: '/settings'},
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
                        {(pathname.startsWith('/catalog') || pathname.startsWith('/banner')) && <LocaleSwitch/>}
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
