import {useEffect} from "react";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

export default function OrdersPage() {
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Buyurtmalar'})
    }, [])

    return <div className={s.root}/>
}
