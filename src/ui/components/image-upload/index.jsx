import {useRef} from "react";
import {Text} from "@gravity-ui/uikit";
import {CloudArrowUpIn} from "@gravity-ui/icons";
import s from "./main.module.css";

export default function ImageUpload({value, onUpdate, previewSrc, disabled}) {
    const inputRef = useRef(null)

    const preview = value ? URL.createObjectURL(value) : previewSrc ?? null

    return (
        <div
            className={`${s.root} ${disabled ? s.disabled : ''}`}
            onClick={() => !disabled && inputRef.current?.click()}
        >
            {preview ? (
                <img className={s.preview} src={preview} alt="preview"/>
            ) : (
                <div className={s.placeholder}>
                    <CloudArrowUpIn width={32} height={32} color="var(--g-color-text-hint)"/>
                    <Text variant="body-2" color="hint">Rasm yuklash uchun bosing</Text>
                </div>
            )}

            {value && (
                <div className={s.badge}>
                    <Text variant="caption-2">{value.name}</Text>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className={s.input}
                disabled={disabled}
                onChange={(e) => onUpdate(e.target.files[0] ?? null)}
            />
        </div>
    )
}
