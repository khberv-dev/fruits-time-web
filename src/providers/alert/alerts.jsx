import { Callout } from "@radix-ui/themes"
import { ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons"

export function SuccessAlert({ message, ...props }) {
    return (
        <Callout.Root
            color={ 'green' }
            { ...props }>
            <Callout.Icon>
                <InfoCircledIcon/>
            </Callout.Icon>
            <Callout.Text>
                { message }
            </Callout.Text>
        </Callout.Root>
    )
}

export function ErrorAlert({ message, ...props }) {
    return (
        <Callout.Root
            color={ 'red' }
            { ...props }>
            <Callout.Icon>
                <ExclamationTriangleIcon/>
            </Callout.Icon>
            <Callout.Text>
                { message }
            </Callout.Text>
        </Callout.Root>
    )
}