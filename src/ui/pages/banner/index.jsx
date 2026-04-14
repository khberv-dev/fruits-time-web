import {useEffect} from "react";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

export default function BannerPage() {
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Bannerlar'})
    }, [])

    return <div className={s.root}/>
}
