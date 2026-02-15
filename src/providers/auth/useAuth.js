import { useContext } from "react";
import { AuthContext } from "@/providers/auth/AuthContext.js";
import { Exception } from "sass";

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Exception('useAuth must be used inside AuthContext')
    }

    return context
}