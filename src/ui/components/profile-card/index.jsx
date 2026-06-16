import {useNavigate} from "react-router";
import {Avatar, User} from "@gravity-ui/uikit";
import {useAuth} from "@/providers/auth.jsx";
import {formatPhoneNumber} from "@/utils/lib.js";
import s from "./main.module.css";

export default function ProfileCard({compact}) {
    const {user} = useAuth()
    const navigate = useNavigate()

    if (!user) return null

    const initials = user.firstName?.slice(0, 2).toUpperCase() ?? '?'

    if (compact) {
        return (
            <div className={s.compact} onClick={() => navigate('/settings')} role="button">
                <Avatar text={initials} size="m" theme="brand"/>
            </div>
        )
    }

    return (
        <div className={s.root} onClick={() => navigate('/settings')} role="button">
            <User
                avatar={{text: initials, theme: 'brand'}}
                name={user.firstName}
                description={formatPhoneNumber(user.phoneNumber)}
                size="m"
            />
        </div>
    )
}
