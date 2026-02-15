import st from './main.module.scss'
import { AlertContext } from "@/providers/alert/AlertContext.js";
import { useState } from "react";
import { Alert } from "@mui/material";
import { randomId } from "@/utils/generator.js";
import dayjs from "dayjs";

function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([])

    const show = (type = 'success', message) => {
        const id = randomId()

        setAlerts((alerts) => [
            ...alerts, {
                id,
                type,
                message,
                disappearing: false,
                date: dayjs()
            }])

        setTimeout(() => {
            setAlerts((alerts) => alerts.map((alert) => alert.id === id ? { ...alert, disappearing: true } : alert))
        }, 1500)

        setTimeout(() => {
            setAlerts((alerts) => alerts.filter((alert) => alert.id !== id))
        }, 2000)
    }

    return (
        <AlertContext.Provider value={ { show } }>
            <div className={ 'position-absolute end-0 w-25 m-2 d-flex flex-column gap-2' }>
                {
                    alerts.map((alert) =>
                        <div key={ alert.id }
                             className={ `${ alert.disappearing ? st.alertDisappearing : '' } ${ st.alert }` }>
                            <Alert severity={ alert.type }>
                                { alert.message }
                            </Alert>
                        </div>
                    )
                }
            </div>
            { children }
        </AlertContext.Provider>
    )
}

export default AlertProvider