import { Exception } from "sass";
import { useContext } from "react";
import { AlertContext } from "@/providers/alert/AlertContext.js";

export const useAlert = () => {
    const context = useContext(AlertContext)

    if (!context) {
        throw new Exception('useAlert must be used inside AlertContext')
    }

    return context
}