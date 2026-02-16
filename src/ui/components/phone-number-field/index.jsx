import { TextField } from "@mui/material";
import { extractNumbers, formatPhoneNumber } from "@/utils/formatter.js";

function PhoneNumberField({ variant = 'standard', label = 'Telefon raqam', value, onChange, ...props }) {
    const handleChange = (e) => {
        const val = formatPhoneNumber(e.target.value)

        onChange(extractNumbers(val))
    }

    return (
        <TextField
            label={ label }
            variant={ variant }
            defaultValue={ `+998` }
            value={ formatPhoneNumber(value) }
            onChange={ handleChange }
            { ...props }
        />
    )
}

export default PhoneNumberField