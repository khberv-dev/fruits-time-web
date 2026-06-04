import {useState} from "react";
import {Dialog, Select, Text} from "@gravity-ui/uikit";

export default function BindStorageDialog({open, branch, storages = [], loading, onConfirm, onClose}) {
    const [selectedStorageId, setSelectedStorageId] = useState(
        branch?.storageId ? String(branch.storageId) : ''
    )

    const handleOpen = () => {
        setSelectedStorageId(branch?.storageId ? String(branch.storageId) : '')
    }

    const storageOptions = storages.map((s) => ({
        value: String(s.storage_id),
        content: s.storage_name,
    }))

    const handleApply = () => {
        onConfirm(selectedStorageId ? Number(selectedStorageId) : null)
    }

    return (
        <Dialog open={open} onClose={onClose} onEnterKeyDown={handleApply} onOpen={handleOpen} size="s">
            <Dialog.Header title={`${branch?.name} — omborxona biriktirish`}/>
            <Dialog.Body>
                <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                    <Text variant="body-2" color="secondary">Omborxona tanlang</Text>
                    <Select
                        options={storageOptions}
                        value={selectedStorageId ? [selectedStorageId] : []}
                        onUpdate={(vals) => setSelectedStorageId(vals[0] ?? '')}
                        placeholder="Omborxona tanlang..."
                        width="max"
                        size="l"
                    />
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
