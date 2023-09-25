import { createContext, useEffect, useState } from "react";
import { isLoggedIn } from "../services/auth-service";
import { getMyProfile } from "../services/connector-service";
import { User } from "../models/user";

const defaultProvider: {user: User | null} = {
    user: null,
}

const AuthContext = createContext(defaultProvider);

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(defaultProvider.user);

    const initAuth = () => {
        if (isLoggedIn()) {
            getMyProfile().then((profile) => {setUser(profile)})
        }
    };

    useEffect(() => {
        initAuth();
    }, []);

    const values = {
        user,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
