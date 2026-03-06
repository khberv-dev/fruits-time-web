import InputText from "@/ui/components/input-text/index.jsx"
import { extractDigits, formatPrice } from "@/utils/formatter.js"

function InputPrice({ value, onChange, ...props }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(extractDigits(e.target.value))
        }
    }

    return (
        <InputText
            value={ formatPrice(value) }
            onChange={ handleChange }
            { ...props }/>
    )
}

export default InputPrice
