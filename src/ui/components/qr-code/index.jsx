import {useEffect, useState} from "react";
import QRCode from "qrcode";
import {Button, Spin, Text} from "@gravity-ui/uikit";
import {ArrowDownToLine} from "@gravity-ui/icons";
import s from "./main.module.css";

// Rendered as a PNG data URL rather than an SVG so the same bytes can be handed to the
// download link. Colors are pinned to black-on-white — a themed QR stops scanning.
export default function QrCode({value, size = 256, downloadName}) {
    // The generated code is stored together with the value it came from, so a result that
    // lands after `value` changed is ignored instead of being reset from inside the effect.
    const [result, setResult] = useState(null)

    useEffect(() => {
        let cancelled = false

        QRCode.toDataURL(value, {width: size, margin: 2, color: {dark: '#000000', light: '#ffffff'}})
            .then((dataUrl) => { if (!cancelled) setResult({value, dataUrl}) })
            .catch(() => { if (!cancelled) setResult({value, failed: true}) })

        return () => { cancelled = true }
    }, [value, size])

    const current = result?.value === value ? result : null

    if (current?.failed) {
        return <Text variant="body-2" color="danger">QR kod yaratilmadi</Text>
    }

    return (
        <div className={s.root}>
            <div className={s.frame} style={{width: size, height: size}}>
                {current
                    ? <img className={s.image} src={current.dataUrl} alt={value} width={size} height={size}/>
                    : <Spin size="m"/>}
            </div>

            {downloadName && current && (
                <Button
                    view="outlined"
                    size="m"
                    href={current.dataUrl}
                    download={`${downloadName}.png`}
                >
                    <Button.Icon><ArrowDownToLine/></Button.Icon>
                    Yuklab olish
                </Button>
            )}
        </div>
    )
}
