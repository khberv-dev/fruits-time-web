import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Select, Switch, Text, TextInput} from "@gravity-ui/uikit";
import {useGetStorages, useUpdateBranch} from "@/services/branch/query.js";
import {useHeader} from "@/providers/header.jsx";
import s from "./main.module.css";

export default function BranchEditPage() {
    const {branchId} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {mutate: updateBranch, isPending} = useUpdateBranch()
    const {data: storages = []} = useGetStorages()
    const {setHeader} = useHeader()

    const branch = state?.branch

    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {
            storageId: branch?.storageId ? String(branch.storageId) : '',
            managerName: branch?.managerName ?? '',
            managerPhone: branch?.managerPhone ?? '',
            isWorking: branch?.isWorking ?? true,
            long: branch?.long != null ? String(branch.long) : '',
            lat: branch?.lat != null ? String(branch.lat) : '',
        }
    })

    const [storageId, managerName, managerPhone, isWorking, long, lat] =
        watch(['storageId', 'managerName', 'managerPhone', 'isWorking', 'long', 'lat'])

    useEffect(() => {
        setHeader({
            title: branch?.name ?? 'Filial tahrirlash',
            onBack: () => navigate('/branch'),
        })
    }, [branch?.name])

    const storageOptions = storages.map((s) => ({
        value: String(s.storage_id),
        content: s.storage_name,
    }))

    const onSubmit = () => {
        updateBranch(
            {
                id: branchId,
                data: {
                    storageId: storageId ? Number(storageId) : null,
                    managerName: managerName || null,
                    managerPhone: managerPhone || null,
                    isWorking,
                    long: long !== '' ? Number(long) : undefined,
                    lat: lat !== '' ? Number(lat) : undefined,
                },
            },
            {onSuccess: () => navigate('/branch')}
        )
    }

    return (
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.field}>
                    <Text variant="body-2">Omborxona</Text>
                    <Select
                        options={storageOptions}
                        value={storageId ? [storageId] : []}
                        onUpdate={(vals) => setValue('storageId', vals[0] ?? '')}
                        placeholder="Omborxona tanlang..."
                        width="max"
                        size="l"
                        disabled={isPending}
                    />
                </div>

                <div className={s.field}>
                    <Text variant="body-2">Menejer ismi</Text>
                    <TextInput
                        value={managerName}
                        onUpdate={(v) => setValue('managerName', v)}
                        placeholder="Ism familiya"
                        size="l"
                        disabled={isPending}
                    />
                </div>

                <div className={s.field}>
                    <Text variant="body-2">Menejer telefoni</Text>
                    <TextInput
                        value={managerPhone}
                        onUpdate={(v) => setValue('managerPhone', v)}
                        placeholder="+998901234567"
                        size="l"
                        disabled={isPending}
                    />
                </div>

                <div className={s.row}>
                    <div className={s.field}>
                        <Text variant="body-2">Longitude</Text>
                        <TextInput
                            value={long}
                            onUpdate={(v) => setValue('long', v)}
                            placeholder="69.2876"
                            size="l"
                            disabled={isPending}
                        />
                    </div>
                    <div className={s.field}>
                        <Text variant="body-2">Latitude</Text>
                        <TextInput
                            value={lat}
                            onUpdate={(v) => setValue('lat', v)}
                            placeholder="41.3645"
                            size="l"
                            disabled={isPending}
                        />
                    </div>
                </div>

                <div className={s.switchRow}>
                    <Switch
                        checked={isWorking}
                        onUpdate={(v) => setValue('isWorking', v)}
                        disabled={isPending}
                        size="l"
                    >
                        Buyurtma qabul qilmoqda
                    </Switch>
                </div>

                <div className={s.footer}>
                    <Button
                        view="outlined"
                        size="l"
                        disabled={isPending}
                        onClick={() => navigate('/branch')}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </div>
    )
}
