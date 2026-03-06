import { Text, Select } from "@radix-ui/themes"

const EMPTY_VALUE = '__none__'

function InputSelect({ label, value, onChange, options, placeholder = 'Tanlang…' }) {
    const raw = value ?? ''
    const selectValue = raw === '' ? EMPTY_VALUE : String(raw)
    return (
        <div>
            <Text color="gray" size="2">
                { label }
            </Text>
            <Select.Root
                value={ selectValue }
                onValueChange={ (v) => onChange?.(v === EMPTY_VALUE ? '' : v) }
            >
                <Select.Trigger radius="large" style={ { width: '100%' } }/>
                <Select.Content>
                    <Select.Item value={ EMPTY_VALUE }>{ placeholder }</Select.Item>
                    { (options ?? []).map((opt) => (
                        <Select.Item key={ opt.value } value={ String(opt.value) }>
                            { opt.label }
                        </Select.Item>
                    ) ) }
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export default InputSelect
