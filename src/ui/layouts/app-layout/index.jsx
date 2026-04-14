import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import {AsideHeader} from "@gravity-ui/navigation";
import {House, LayoutCells, Megaphone} from "@gravity-ui/icons";
import ProfileCard from "@/ui/components/profile-card/index.jsx";
import s from "./main.module.css";

const NAV_ITEMS = [
    {id: 'main', title: 'Main', icon: House, path: '/'},
    {id: 'catalog', title: 'Catalogs', icon: LayoutCells, path: '/catalog'},
    {id: 'banner', title: 'Banners', icon: Megaphone, path: '/banner'},
]

export default function AppLayout() {
    const [compact, setCompact] = useState(false)
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const menuItems = NAV_ITEMS.map((item) => ({
        id: item.id,
        title: item.title,
        icon: item.icon,
        current: pathname === item.path,
        onItemClick: () => navigate(item.path),
    }))

    return (
        <AsideHeader
            className={s.aside}
            compact={compact}
            onChangeCompact={setCompact}
            menuItems={menuItems}
            renderContent={() => (
                <div className={s.content}>
                    <Outlet/>
                </div>
            )}
            renderFooter={({compact}) => <ProfileCard compact={compact}/>}
        />
    )
}
