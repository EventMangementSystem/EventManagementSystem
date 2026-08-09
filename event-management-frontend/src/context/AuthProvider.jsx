import { useState } from "react";
import AuthContext from "./AuthContext";
import {
    getToken,
    getRole,
    saveAuth,
    removeAuth,
} from "../utils/tokenUtils";

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(getToken());
    const [role, setRole] = useState(getRole());

    const login = (token, role) => {
        saveAuth(token, role);
        setToken(token);
        setRole(role);
    };

    const logout = () => {
        removeAuth();
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}