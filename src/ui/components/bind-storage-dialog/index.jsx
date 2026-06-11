import {useState} from "react";
import {Dialog, Select, Switch, Text, TextInput} from "@gravity-ui/uikit";

export default function BindStorageDialog({open, branch, storages = [], loading, onConfirm, onClose}) {
    const [selectedStorageId, setSelectedStorageId] = useState('')
    const [managerName, setManagerName] = useState('')
    const [managerPhone, setManagerPhone] = useState('')
    const [isWorking, setIsWorking] = useState(true)

    const handleOpen = () => {
        setSelectedStorageId(branch?.storageId ? String(branch.storageId) : '')
        setManagerName(branch?.managerName ?? '')
        setManagerPhone(branch?.managerPhone ?? '')
        setIsWorking(branch?.isWorking ?? true)
    }

    const storageOptions = storages.map((s) => ({
        value: String(s.storage_id),
        content: s.storage_name,
    }))

    const handleApply = () => {
        onConfirm({
            storageId: selectedStorageId ? Number(selectedStorageId) : null,
            managerName: managerName || null,
            managerPhone: managerPhone || null,
            isWorking,
        })
    }

    return (
        <Dialog open={open} onClose={onClose} onOpen={handleOpen} size="s">
            <Dialog.Header title={`${branch?.name} — tahrirlash`}/>
            <Dialog.Body>
                <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                        <Text variant="body-2" color="secondary">Omborxona</Text>
                        <Select
                            options={storageOptions}
                            value={selectedStorageId ? [selectedStorageId] : []}
                            onUpdate={(vals) => setSelectedStorageId(vals[0] ?? '')}
                            placeholder="Omborxona tanlang..."
                            width="max"
                            size="l"
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                        <Text variant="body-2" color="secondary">Menejer ismi</Text>
                        <TextInput
                            value={managerName}
                            onUpdate={setManagerName}
                            placeholder="Ism familiya"
                            size="l"
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                        <Text variant="body-2" color="secondary">Menejer telefoni</Text>
                        <TextInput
                            value={managerPhone}
                            onUpdate={setManagerPhone}
                            placeholder="+998 90 123 45 67"
                            size="l"
                        />
                    </div>
                    <Switch checked={isWorking} onUpdate={setIsWorking} size="l">
                        Buyurtma qabul qilmoqda
                    </Switch>
                </div>
            </Dialog.Body>
            <Dialog.Footer
                textButtonApply="Saqlash"
                textButtonCancel="Bekor qilish"
                loading={loading}
                onClickButtonApply={handleApply}
                onClickButtonCancel={onClose}
            />
        </Dialog>
    )
}
