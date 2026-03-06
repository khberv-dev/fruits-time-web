import st from './main.module.css'
import { useAuth } from "@/providers/auth/context.js"
import { Text } from "@radix-ui/themes"
import Brand from "@/assets/icons/brand.jsx"
import { ExitIcon, GridIcon, ImageIcon, SectionIcon } from "@radix-ui/react-icons"
import { NavLink, useLocation } from "react-router-dom"

const NAV_ITEMS = [
    { title: 'Katalog', icon: GridIcon, path: '/catalog' },
    { title: 'Produkt', icon: ImageIcon, path: '/product' },
    { title: 'Banner', icon: SectionIcon, path: '/banner' },
]

function NavItem({ item }) {
    const Icon = item.icon
    return (
        <li className={ st.navItem }>
            <NavLink
                to={ item.path }
                className={ ({ isActive }) => (isActive ? st.navLinkActive : st.navLink) }
            >
                <span className={ st.navIcon } aria-hidden>
                    <Icon/>
                </span>
                <Text size="2" weight="medium" className={ st.navLabel }>
                    { item.title }
                </Text>
            </NavLink>
        </li>
    )
}

function Navigation({ children }) {
    const { logout } = useAuth()
    const location = useLocation()

    const currentItem = NAV_ITEMS.find((item) =>
        location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    )
    const pageTitle = currentItem?.title ?? 'Fruits time'

    return (
        <div className={ st.layout }>
            <aside className={ st.sidebar }>
                <div className={ st.brand }>
                    <span className={ st.brandIcon }>{ Brand }</span>
                    <Text size="3" weight="bold" color="indigo" className={ st.brandName }>
                        Fruits time
                    </Text>
                </div>
                <nav className={ st.nav } aria-label="Hauptmenü">
                    <ul className={ st.navList }>
                        { NAV_ITEMS.map((item) => (
                            <NavItem key={ item.path } item={ item }/>
                        )) }
                    </ul>
                </nav>
                <div className={ st.sidebarFooter }>
                    <button
                        type="button"
                        onClick={ logout }
                        className={ st.logoutBtn }
                        aria-label="Abmelden"
                    >
                        <ExitIcon className={ st.logoutIcon } color={ "red" }/>
                        <Text size="2" color="red">Chiqish</Text>
                    </button>
                </div>
            </aside>
            <main className={ st.main }>
                <header className={ st.pageHeader }>
                    <Text size="4" weight="medium" className={ st.pageTitle }>
                        { pageTitle }
                    </Text>
                </header>
                <div className={ st.pageBody }>
                    { children }
                </div>
            </main>
        </div>
    )
}

export default Navigation
