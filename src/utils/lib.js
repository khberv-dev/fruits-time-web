export function cn(...classes) {
    return classes.join(' ')
}

export function objToFormData(data) {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value)
        }
    })

    return formData
}