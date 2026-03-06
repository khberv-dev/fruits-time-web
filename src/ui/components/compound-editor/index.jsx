import st from './main.module.css'
import { Button, Flex, Text, TextField } from "@radix-ui/themes"
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"

function CompoundEditor({ label, value, onChange }) {
    const [input, setInput] = useState('')

    const items = Array.isArray(value) ? value : []

    const handleAdd = () => {
        const trimmed = input.trim()
        if (!trimmed) return
        onChange([...(items || []), trimmed])
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
        }
    }

    const handleRemove = (index) => {
        const next = items.filter((_, i) => i !== index)
        onChange(next)
    }

    return (
        <div className={ st.container }>
            <Text color={ 'gray' } size={ '2' }>
                { label }
            </Text>
            <Flex gap={ '2' } align={ 'center' } mt={ '1' }>
                <TextField.Root
                    value={ input }
                    onChange={ (e) => setInput(e.target.value) }
                    onKeyDown={ handleKeyDown }
                    placeholder={ 'Masalan: Olma' }
                    radius={ 'large' }
                    className={ st.input }>
                </TextField.Root>
                <Button type={ 'button' } onClick={ handleAdd }>
                    <PlusIcon/>
                    Qo'shish
                </Button>
            </Flex>
            <Flex gap={ '2' } wrap={ 'wrap' } mt={ '2' }>
                { items.map((item, index) =>
                    <div
                        key={ index }
                        className={ st.tag }>
                        <Text size={ '2' }>
                            { item }
                        </Text>
                        <button
                            type={ 'button' }
                            className={ st.removeButton }
                            onClick={ () => handleRemove(index) }>
                            <Cross2Icon/>
                        </button>
                    </div>
                ) }
            </Flex>
        </div>
    )
}

export default CompoundEditor

