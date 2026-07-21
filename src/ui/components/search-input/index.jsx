import {useEffect, useRef, useState} from "react";
import {TextInput} from "@gravity-ui/uikit";
import {Magnifier} from "@gravity-ui/icons";
import s from "./main.module.css";

export default function SearchInput({value = '', onUpdate, placeholder = 'Qidirish...', delay = 400}) {
    const [inner, setInner] = useState(value)
    const timerRef = useRef(null)

    useEffect(() => {
        setInner(value)
    }, [value])

    useEffect(() => () => clearTimeout(timerRef.current), [])

    const handleUpdate = (next) => {
        setInner(next)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => onUpdate(next), delay)
    }

    return (
        <TextInput
            className={s.root}
            size="l"
            value={inner}
            onUpdate={handleUpdate}
            placeholder={placeholder}
            hasClear
            startContent={<Magnifier className={s.icon}/>}
        />
    )
}
