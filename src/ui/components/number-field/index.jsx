import { TextField } from "@mui/material";
import { formatNumber } from "@/utils/formatter.js";

function NumberField({ variant = 'standard', label, value, onChange, ...props }) {
    const handleChange = (e) => {
        const val = formatNumber(e.target.value)

        onChange(val)
    }

    return (
        <TextField
            label={ label }
            variant={ variant }
            value={ formatNumber(value) }
            onChange={ handleChange }
            { ...props }
        />
    )
}

export default NumberField