import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Button, ClipboardButton, Dialog, Label, NumberInput, Table, Text} from "@gravity-ui/uikit";
import {Plus, QrCode as QrCodeIcon} from "@gravity-ui/icons";
import dayjs from "dayjs";
import {
    useGenerateSubscriptionCodes,
    useGetSubscription,
    useGetSubscriptionCodes,
} from "@/services/subscription/query.js";
import {useHeader} from "@/providers/header.jsx";
import {useResourceLocale} from "@/providers/resource-locale.jsx";
import {formatPhoneNumber, pickLocale} from "@/utils/lib.js";
import QrCode from "@/ui/components/qr-code/index.jsx";
import s from "./main.module.css";

const COLUMNS = (setQrEntry) => [
    {
        id: 'code',
        name: 'Kod',
        template: (entry) => (
            <div className={s.codeCell}>
                <Text variant="code-1">{entry.code}</Text>
                <ClipboardButton
                    text={entry.code}
                    size="s"
                    view="flat"
                    tooltipInitialText="Nusxalash"
                    tooltipSuccessText="Nusxalandi"
                />
            </div>
        ),
    },
    {
        id: 'status',
        name: 'Holat',
        width: 130,
        template: (entry) => (
            <Label theme={entry.user ? 'info' : 'success'} size="s">
                {entry.user ? 'Ishlatilgan' : 'Bo\'sh'}
            </Label>
        ),
    },
    {
        id: 'user',
        name: 'Foydalanuvchi',
        template: (entry) => entry.user ? (
            <div>
                <Text as="div" variant="body-2">{entry.user.firstName ?? '—'}</Text>
                {entry.user.phoneNumber && (
                    <Text as="div" variant="caption-2" color="hint">
                        {formatPhoneNumber(entry.user.phoneNumber)}
                    </Text>
                )}
            </div>
        ) : (
            <Text variant="body-2" color="hint">—</Text>
        ),
    },
    {
        id: 'redeemedAt',
        name: 'Ishlatilgan sana',
        width: 160,
        template: (entry) => (
            <Text variant="body-2" color="hint" whiteSpace="nowrap">
                {entry.redeemedAt ? dayjs(entry.redeemedAt).format('DD.MM.YYYY HH:mm') : '—'}
            </Text>
        ),
    },
    {
        id: 'createdAt',
        name: 'Yaratilgan sana',
        width: 140,
        template: (entry) => (
            <Text variant="body-2" color="hint" whiteSpace="nowrap">
                {dayjs(entry.createdAt).format('DD.MM.YYYY')}
            </Text>
        ),
    },
    {
        id: 'actions',
        name: '',
        width: 56,
        template: (entry) => (
            <Button
                size="s"
                view="flat"
                onClick={(e) => { e.stopPropagation(); setQrEntry(entry) }}
            >
                <Button.Icon><QrCodeIcon/></Button.Icon>
            </Button>
        ),
    },
]

export default function SubscriptionCodesPage() {
    const {subscriptionId} = useParams()
    const navigate = useNavigate()
    const {resourceLocale} = useResourceLocale()
    const {data: subscription} = useGetSubscription(subscriptionId)
    const {data: codes = [], isLoading} = useGetSubscriptionCodes(subscriptionId)
    const {mutate: generateCodes, isPending} = useGenerateSubscriptionCodes()
    const {setHeader} = useHeader()

    const [count, setCount] = useState(10)
    const [qrEntry, setQrEntry] = useState(null)

    const title = pickLocale(subscription?.title, resourceLocale)
    const unredeemed = codes.filter((entry) => !entry.user)

    useEffect(() => {
        setHeader({
            title: title ? `${title} — kodlar` : 'Obuna kodlari',
            onBack: () => navigate('/subscription'),
        })
    }, [title])

    const handleGenerate = () => {
        generateCodes({subscriptionId, count})
    }

    return (
        <div className={s.root}>
            <div className={s.toolbar}>
                <NumberInput
                    className={s.count}
                    value={count}
                    onUpdate={(v) => setCount(v ?? 1)}
                    min={1}
                    max={500}
                    disabled={isPending}
                    size="l"
                />
                <Button
                    view="action"
                    size="l"
                    loading={isPending}
                    disabled={!count}
                    onClick={handleGenerate}
                >
                    <Button.Icon><Plus/></Button.Icon>
                    Kod yaratish
                </Button>
                {unredeemed.length > 0 && (
                    <ClipboardButton
                        text={unredeemed.map((entry) => entry.code).join('\n')}
                        size="l"
                        view="outlined"
                        tooltipInitialText="Barcha bo'sh kodlarni nusxalash"
                        tooltipSuccessText="Nusxalandi"
                    >
                        Bo'sh kodlarni nusxalash
                    </ClipboardButton>
                )}
            </div>

            <div className={s.stats}>
                <Text variant="body-2" color="secondary">Jami: {codes.length}</Text>
                <Text variant="body-2" color="secondary">Ishlatilgan: {codes.length - unredeemed.length}</Text>
                <Text variant="body-2" color="secondary">Bo'sh: {unredeemed.length}</Text>
            </div>

            <div className={s.tableWrapper}>
                <Table
                    width="max"
                    data={codes}
                    columns={COLUMNS(setQrEntry)}
                    getRowId={(entry) => entry.id}
                    emptyMessage={isLoading ? 'Yuklanmoqda...' : 'Kodlar topilmadi'}
                />
            </div>

            <Dialog open={!!qrEntry} onClose={() => setQrEntry(null)} size="s">
                <Dialog.Header title="QR kod"/>
                <Dialog.Body>
                    {qrEntry && (
                        <div className={s.qrBody}>
                            {/* The QR carries the bare code, which is what the redeem endpoint expects. */}
                            <QrCode value={qrEntry.code} downloadName={`obuna-kodi-${qrEntry.code.slice(0, 8)}`}/>
                            <div className={s.codeCell}>
                                <Text variant="code-1">{qrEntry.code}</Text>
                                <ClipboardButton
                                    text={qrEntry.code}
                                    size="s"
                                    view="flat"
                                    tooltipInitialText="Nusxalash"
                                    tooltipSuccessText="Nusxalandi"
                                />
                            </div>
                        </div>
                    )}
                </Dialog.Body>
            </Dialog>
        </div>
    )
}
