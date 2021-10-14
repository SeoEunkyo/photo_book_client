import React, { createContext,useState, useEffect } from "react";
import axios from "axios";

export  const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [me, setMe] = useState();

    useEffect(()=>{
        if(me) axios.defaults.headers.common.sessionid = me.sessionId;
        else delete axios.defaults.headers.common.sessionid;

    },[me])
    
    return (
        <AuthContext.Provider value={[me, setMe]} >
            {prop.children}
        </AuthContext.Provider>
    )

}