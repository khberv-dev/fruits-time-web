import {Avatar, Button, User} from "@gravity-ui/uikit";
import {ArrowRightFromSquare} from "@gravity-ui/icons";
import {useAuth} from "@/providers/auth.jsx";
import {formatPhoneNumber} from "@/utils/lib.js";
import s from "./main.module.css";

export default function ProfileCard({compact}) {
    const {user, logout} = useAuth()

    if (!user) return null

    const initials = user.firstName?.slice(0, 2).toUpperCase() ?? '?'

    if (compact) {
        return (
            <div className={s.compact}>
                <Button view="flat" onClick={logout} title="Chiqish">
                    <Button.Icon><ArrowRightFromSquare/></Button.Icon>
                </Button>
                <Avatar text={initials} size="m" theme="brand"/>
            </div>
        )
    }

    return (
        <div className={s.root}>
            <Button view="flat" width="max" onClick={logout}>
                <Button.Icon><ArrowRightFromSquare/></Button.Icon>
                Chiqish
            </Button>
            <User
                avatar={{text: initials, theme: 'brand'}}
                name={user.firstName}
                description={formatPhoneNumber(user.phoneNumber)}
                size="m"
            />
        </div>
    )
}
