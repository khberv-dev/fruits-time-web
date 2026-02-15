import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordField({ variant = 'standard', label = 'Parol', value, onChange, ...props }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const onToggleVisibility = () => {
        setIsPasswordVisible((oldValue) => !oldValue)
    }

    return (
        <TextField
            fullWidth={ true }
            label={ label }
            variant={ variant }
            type={ isPasswordVisible ? 'text' : 'password' }
            value={ value }
            onChange={ onChange }
            slotProps={ {
                input: {
                    endAdornment: (<InputAdornment position={ 'end' }>
                        <IconButton
                            size={ 'small' }
                            edge={ 'end' }
                            children={ !isPasswordVisible ? <Visibility/> : <VisibilityOff/> }
                            onClick={ onToggleVisibility }/>
                    </InputAdornment>)
                }
            } }
            { ...props }
        />
    )
}

export default PasswordField