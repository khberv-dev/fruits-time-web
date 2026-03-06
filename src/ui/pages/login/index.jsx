import { Button, Card, Flex, Text } from "@radix-ui/themes"
import InputText from "@/ui/components/input-text/index.jsx"
import Space from "@/ui/components/space/index.jsx"
import Phone from "@/assets/icons/phone.jsx"
import Lock from "@/assets/icons/lock.jsx"
import { Controller, useForm } from "react-hook-form"
import InputPhoneNumber from "@/ui/components/input-phone-number/index.jsx"
import { useSignIn } from "@/services/auth/query.js"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const { control, handleSubmit } = useForm()
    const signIn = useSignIn()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        signIn.mutateAsync(data).then(() => {
            navigate('/')
        })
    }

    return (
        <Flex
            style={ { height: '100vh' } }
            justify={ "center" }
            align={ "center" }>
            <Card
                style={ { width: '400px' } }
                size={ '3' }>
                <Text
                    weight={ 'bold' }
                    size={ '4' }>
                    Tizimga kirish
                </Text>
                <Space height={ 4 }/>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Controller
                        control={ control }
                        defaultValue={ '+998' }
                        rules={ { required: true } }
                        name={ 'phoneNumber' }
                        render={ ({ field }) =>
                            <InputPhoneNumber
                                { ...field }
                                icon={ Phone }
                                label={ 'Telefon raqam' }/>
                        }/>
                    <Space height={ 2 }/>
                    <Controller
                        control={ control }
                        name={ 'password' }
                        rules={ { required: true } }
                        render={ ({ field }) =>
                            <InputText
                                { ...field }
                                icon={ Lock }
                                label={ 'Parol' }
                                type={ 'password' }
                                placeholder={ '•••••••••' }/>
                        }/>
                    <Space height={ 3 }/>
                    <Button
                        className={ 'w-100' }
                        loading={ signIn.isPending }
                        type={ 'submit' }>
                        Kirish
                    </Button>
                </form>
            </Card>
        </Flex>
    )
}

export default LoginPage