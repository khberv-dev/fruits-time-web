import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {Button, Card, Text, TextInput} from "@gravity-ui/uikit";
import {useSignIn} from "@/services/auth/query.js";
import {extractDigits, formatPhoneNumber} from "@/utils/lib.js";
import s from "./main.module.css";

export default function LoginPage() {
    const navigate = useNavigate()
    const {mutate: signIn, isPending, error} = useSignIn()
    const {handleSubmit, watch, setValue} = useForm({
        defaultValues: {phoneNumber: '', password: ''}
    })

    const onSubmit = (data) => {
        signIn(data, {onSuccess: () => navigate('/')})
    }

    const [phoneNumber, password] = watch(['phoneNumber', 'password'])
    const isValid = /^998\d{9}$/.test(phoneNumber) && password.length >= 8
    const errorMessage = error?.response?.data?.message ?? error?.message

    return (
        <div className={s.root}>
            <Card className={s.card}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <Text className={s.title} variant="header-2">Kirish</Text>

                    <div className={s.fields}>
                        <div className={s.field}>
                            <Text variant="body-2">Telefon raqam</Text>
                            <TextInput
                                placeholder="998 00 000 00 00"
                                value={formatPhoneNumber(phoneNumber)}
                                onUpdate={(v) => setValue('phoneNumber', extractDigits(v).slice(0, 12), {shouldDirty: true})}
                                disabled={isPending}
                                size="l"
                            />
                        </div>

                        <div className={s.field}>
                            <Text variant="body-2">Parol</Text>
                            <TextInput
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onUpdate={(v) => setValue('password', v, {shouldDirty: true})}
                                disabled={isPending}
                                size="l"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <Text color="danger" variant="body-2">{errorMessage}</Text>
                    )}

                    <Button
                        type="submit"
                        view="action"
                        size="l"
                        loading={isPending}
                        disabled={!isValid}
                        width="max"
                    >
                        Kirish
                    </Button>
                </form>
            </Card>
        </div>
    )
}
