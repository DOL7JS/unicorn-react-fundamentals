import {createContext, useState} from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const[isAuthorized, setIsAuthorized] = useState(false);

    const value = {isAuthorized, setIsAuthorized}

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;