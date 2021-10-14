import React, { createContext,useState } from "react";


export  const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [me, setMe] = useState();
    
    return (
        <AuthContext.Provider value={[me, setMe]} >
            {prop.children}
        </AuthContext.Provider>
    )

}