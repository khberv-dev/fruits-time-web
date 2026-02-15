import { Button, Divider, Typography } from "@mui/material";
import PhoneNumberField from "@/ui/components/phone-number-field/index.jsx";
import { Controller, useForm } from "react-hook-form";
import PasswordField from "@/ui/components/password-field/index.jsx";
import { useSignIn } from "@/services/auth/query.js";

function LoginPage() {
    const { control, handleSubmit } = useForm()
    const signIn = useSignIn()

    const onSubmit = (data) => {
        signIn.mutate(data)
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className={ 'd-flex justify-content-center align-items-center' } style={ { height: '100vh' } }>
                <div className={ 'w-25 d-flex flex-column gap-2' }>
                    <Typography
                        variant={ 'h5' }>
                        Fruits time
                    </Typography>
                    <Controller
                        name={ 'phoneNumber' }
                        rules={ { required: true, minLength: 12 } }
                        control={ control }
                        render={ ({ field }) =>
                            <PhoneNumberField { ...field }/> }/>
                    <Controller
                        name={ 'password' }
                        rules={ { required: true } }
                        control={ control }
                        render={ ({ field }) =>
                            <PasswordField { ...field }/> }/>
                    <Divider/>
                    <Button
                        loading={ signIn.isPending }
                        type={ 'submit' }
                        variant={ 'contained' }>
                        Kirish
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default LoginPage