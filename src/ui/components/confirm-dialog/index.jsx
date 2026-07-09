import {Dialog, Text} from "@gravity-ui/uikit";

export default function ConfirmDialog({
    open,
    title,
    description,
    onConfirm,
    onClose,
    loading,
    confirmText = "O'chirish",
    cancelText = 'Bekor qilish',
}) {
    return (
        <Dialog open={open} onClose={onClose} size="s">
            <Dialog.Header title={title}/>
            <Dialog.Body>
                <Text>{description}</Text>
            </Dialog.Body>
            <Dialog.Footer
                preset="danger"
                textButtonApply={confirmText}
                textButtonCancel={cancelText}
                loading={loading}
                onClickButtonApply={onConfirm}
                onClickButtonCancel={onClose}
            />
        </Dialog>
    )
}
