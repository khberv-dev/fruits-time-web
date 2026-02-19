import st from './main.module.scss'
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import imgBannerLogo from '@/assets/banner_logo.png'
import { Apps, Campaign, Home, LocalMall, Settings } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

function SideNavigation({ children }) {
    const nav = useNavigate()
    const location = useLocation()

    const navItems = [
        {
            icon: <Home/>,
            title: 'Asosiy',
            path: '/'
        },
        {
            icon: <Apps/>,
            title: 'Katalog',
            path: '/categories'
        },
        {
            icon: <LocalMall/>,
            title: 'Mahsulotlar',
            path: '/products'
        },
        {
            icon: <Campaign/>,
            title: 'Marketing',
            path: '/marketing'
        },
        {
            icon: <Settings/>,
            title: 'Sozlamalar',
            path: '/settings'
        }
    ]

    const handleMenuItemClick = (path) => {
        nav(path)
    }

    return (
        <div className={ st.container }>
            <div className={ st.navigation }>
                <div className={ 'm-2' }>
                    <div className={ 'text-center' }>
                        <img
                            className={ 'w-75 mb-4' }
                            src={ imgBannerLogo }
                            alt="fruits-time"/>
                    </div>
                    <Divider/>
                    <MenuList>
                        {
                            navItems.map((item, index) =>
                                <MenuItem
                                    key={ index }
                                    selected={ location.pathname === item.path }
                                    onClick={ () => handleMenuItemClick(item.path) }>
                                    <ListItemIcon>{ item.icon }</ListItemIcon>
                                    <ListItemText>{ item.title }</ListItemText>
                                </MenuItem>
                            )
                        }
                    </MenuList>
                </div>
            </div>
            <div className={ st.content }>
                { children }
            </div>
        </div>
    )
}

export default SideNavigation