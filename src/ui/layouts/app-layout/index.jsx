import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import {AsideHeader} from "@gravity-ui/navigation";
import {
    ArrowLeft,
    Gear,
    GeoFill,
    House,
    ListUl,
    Megaphone,
    Percent,
    PersonPlus,
    Persons,
    Rectangles4,
    ShoppingBag,
    Sparkles,
    Ticket,
} from "@gravity-ui/icons";
import {Button, Text} from "@gravity-ui/uikit";
import ProfileCard from "@/ui/components/profile-card/index.jsx";
import LocaleSwitch from "@/ui/components/locale-switch/index.jsx";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

const NAV_ITEMS = [
    {id: 'main', title: 'Asosiy', icon: House, path: '/'},
    {id: 'catalog', title: 'Kataloglar', icon: Rectangles4, path: '/catalog'},
    {id: 'orders', title: 'Buyurtmalar', icon: ShoppingBag, path: '/orders'},
    {id: 'users', title: 'Foydalanuvchilar', icon: Persons, path: '/users'},
    {id: 'banner', title: 'Bannerlar', icon: Megaphone, path: '/banner'},
    {id: 'branch', title: 'Filiallar', icon: GeoFill, path: '/branch'},
    {id: 'advisor', title: 'AI Maslahatchi', icon: Sparkles, path: '/advisor'},
    {id: 'promotion', title: 'Aksiyalar', icon: Percent, path: '/promotion'},
    {
        id: 'subscription',
        title: 'Obunalar',
        icon: Ticket,
        path: '/subscription',
        children: [
            // The list shares the section root, so it has to yield the highlight to the
            // requests page whenever that one is open.
            {id: 'subscription-list', title: 'Obunalar', icon: ListUl, path: '/subscription', except: '/subscription/requests'},
            {id: 'subscription-requests', title: "So'rovlar", icon: PersonPlus, path: '/subscription/requests'},
        ],
    },
    {id: 'settings', title: 'Sozlamalar', icon: Gear, path: '/settings'},
]

const isCurrent = (item, pathname) => {
    if (item.except && (pathname === item.except || pathname.startsWith(item.except + '/'))) {
        return false
    }

    return pathname === item.path || pathname.startsWith(item.path + '/')
}

export default function AppLayout() {
    const [compact, setCompact] = useState(false)
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {title, onBack} = useHeader()

    // AsideHeader has no nested menu items, so a section's children are flattened in
    // below it — indented, and only while that section is open. The parent then gives up
    // its highlight so exactly one row reads as current.
    const menuItems = NAV_ITEMS.flatMap((item) => {
        const sectionOpen = isCurrent(item, pathname)

        const parent = {
            id: item.id,
            title: item.title,
            icon: item.icon,
            current: sectionOpen && !item.children,
            onItemClick: () => navigate(item.path),
        }

        if (!item.children || !sectionOpen) return [parent]

        return [
            parent,
            ...item.children.map((child) => ({
                id: child.id,
                title: <span className={s.subItem}>{child.title}</span>,
                icon: child.icon,
                current: isCurrent(child, pathname),
                onItemClick: () => navigate(child.path),
            })),
        ]
    })

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
                        {/* Requests carry no localized content, unlike the rest of /subscription. */}
                        {(pathname.startsWith('/catalog') || pathname.startsWith('/banner')
                            || (pathname.startsWith('/subscription') && !pathname.startsWith('/subscription/requests')))
                            && <LocaleSwitch/>}
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
