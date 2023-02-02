import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('UID') || null);

    const values = {
        user,
        setUser
    };

    return <UserContext.Provider value={values}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);