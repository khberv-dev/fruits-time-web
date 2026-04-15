import {useEffect} from "react";
import {useNavigate} from "react-router";
import {Button} from "@gravity-ui/uikit";
import {Plus} from "@gravity-ui/icons";
import {useGetAllBanners} from "@/services/banner/query.js";
import {useHeader} from "@/providers/header.jsx";
import BannerCard from "@/ui/components/banner-card/index.jsx";
import s from "./main.module.css";

export default function BannerPage() {
    const navigate = useNavigate()
    const {data: banners = [], isLoading} = useGetAllBanners()
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Bannerlar'})
    }, [])

    if (isLoading) return null

    return (
        <div className={s.root}>
            <div>
                <Button view="action" size="l" onClick={() => navigate('/banner/create')}>
                    <Button.Icon><Plus/></Button.Icon>
                    Banner qo'shish
                </Button>
            </div>
            <div className={s.grid}>
                {banners.map((banner) => (
                    <BannerCard
                        key={banner.id}
                        banner={banner}
                        onEdit={() => navigate(`/banner/${banner.id}/edit`, {state: {banner}})}
                    />
                ))}
            </div>
        </div>
    )
}
