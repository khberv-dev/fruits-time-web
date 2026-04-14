import {useEffect} from "react";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

export default function MainPage() {
    const {setHeader} = useHeader()

    useEffect(() => {
        setHeader({title: 'Asosiy'})
    }, [])

    return <div className={s.root}/>
}
