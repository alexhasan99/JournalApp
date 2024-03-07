import React, { createContext, useState } from 'react';
import {LoggedInUser, LoginUser} from "../interface/interface";



interface UserContextProps {
    user: LoggedInUser | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedInUser | null>>;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null,
});

export const UserProvider: React.FC = (props) => {
    const { children } = props as { children: React.ReactNode }; // Define the children property

    const [user, setUser] = useState<LoggedInUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};