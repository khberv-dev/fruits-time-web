import st from './main.module.css'
import { AlertContext } from "@/providers/alert/context.js"
import { useState } from "react"
import { ErrorAlert, SuccessAlert } from "@/providers/alert/alerts.jsx"
import { cn } from "@/utils/lib.js"

function AlertProvider({ children }) {
    const [currentAlert, setCurrentAlert] = useState(null)
    const [currentAlertDisappear, setCurrentAlertDisappear] = useState(false)
    const [currentTimeout, setCurrentTimeout] = useState(null)

    function show(message, type) {
        if (currentTimeout) {
            clearTimeout(currentTimeout)
        }

        setCurrentAlert({
            message,
            type
        })

        setCurrentTimeout(setTimeout(() => {
            setCurrentAlertDisappear(true)

            setTimeout(() => {
                setCurrentAlert(null)
                setCurrentAlertDisappear(false)
            }, 200)
        }, 2000))
    }

    return (
        <AlertContext.Provider value={ { show } }>
            { (currentAlert && currentAlert.type === 'success') ?
                <SuccessAlert className={ cn(st.alert, currentAlertDisappear ? st.disappear : '') }
                              message={ currentAlert.message }/> : '' }

            { (currentAlert && currentAlert.type === 'error') ?
                <ErrorAlert className={ cn(st.alert, currentAlertDisappear ? st.disappear : '') }
                            message={ currentAlert.message }/> : '' }

            { children }
        </AlertContext.Provider>
    )
}

export default AlertProvider