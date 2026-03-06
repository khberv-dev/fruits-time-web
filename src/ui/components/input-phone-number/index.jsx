import InputText from "@/ui/components/input-text/index.jsx"
import { extractDigits, formatPhoneNumber } from "@/utils/formatter.js"

function InputPhoneNumber({ value, onChange, ...props }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(extractDigits(formatPhoneNumber(e.target.value)))
        }
    }

    return (
        <InputText
            value={ formatPhoneNumber(value) }
            onChange={ handleChange }
            { ...props }/>
    )
}

export default InputPhoneNumber