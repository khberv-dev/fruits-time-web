export function objectToFormData(obj) {
    const formData = new FormData()

    Object.keys(obj).forEach((key) => formData.append(key, obj[key]))

    if (obj['file']) {
        if (obj.file.length === 1) {
            formData.set('file', obj.file[0])
        } else {
            formData.delete('file')
        }
    }

    return formData
}