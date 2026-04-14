import {Dialog, Text} from "@gravity-ui/uikit";

export default function ConfirmDialog({open, title, description, onConfirm, onClose, loading}) {
    return (
        <Dialog open={open} onClose={onClose} size="s">
            <Dialog.Header title={title}/>
            <Dialog.Body>
                <Text>{description}</Text>
            </Dialog.Body>
            <Dialog.Footer
                preset="danger"
                textButtonApply="O'chirish"
                textButtonCancel="Bekor qilish"
                loading={loading}
                onClickButtonApply={onConfirm}
                onClickButtonCancel={onClose}
            />
        </Dialog>
    )
}
