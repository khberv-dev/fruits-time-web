import st from './main.module.css'
import { Text, TextField } from "@radix-ui/themes";

function InputText({ label, value, type, icon, tailIcon, placeholder, onChange, ...props }) {
    return (
        <div { ...props }>
            <Text color={ 'gray' } size={ '2' }>
                { label }
            </Text>
            <TextField.Root
                type={ type }
                placeholder={ placeholder }
                value={ value }
                onChange={ onChange }
                radius={ 'large' }>
                { icon ?
                    <TextField.Slot className={ st.inputSlot }>
                        { icon }
                    </TextField.Slot>
                    : '' }

                { tailIcon ?
                    <TextField.Slot
                        className={ st.inputSlot }
                        side={ 'right' }>
                        { tailIcon }
                    </TextField.Slot>
                    : '' }
            </TextField.Root>
        </div>
    )
}

export default InputText