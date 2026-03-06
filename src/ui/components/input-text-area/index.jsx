import { forwardRef } from "react"
import { Text, TextArea } from "@radix-ui/themes"

const InputTextArea = forwardRef(function InputTextArea(
    { label, value, placeholder, onChange, rows = 4, ...props },
    ref
) {
    return (
        <div { ...props }>
            <Text color="gray" size="2">
                { label }
            </Text>
            <TextArea
                ref={ ref }
                placeholder={ placeholder }
                value={ value ?? '' }
                onChange={ (e) => onChange?.(e.target.value) }
                rows={ rows }
                radius="large"
                style={ { resize: 'vertical', minHeight: '80px' } }
            />
        </div>
    )
})

export default InputTextArea