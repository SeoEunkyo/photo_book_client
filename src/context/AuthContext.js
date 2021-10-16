import React, { createContext,useState, useEffect } from "react";
import axios from "axios";

export  const AuthContext = createContext();

export const AuthProvider = (prop) => {
    const [me, setMe] = useState();

    useEffect(()=>{
        const sessionId = localStorage.getItem("sessionId");
        console.log("session Id ", sessionId);
        if(me){
            axios.defaults.headers.common.sessionid = me.sessionId;
            localStorage.setItem("sessionId" , me.sessionId)
        }else if(sessionId){

            console.log("session Id ", sessionId);
            axios.get("/user/me",{headers : {sessionid : sessionId}}).then( result =>{
                setMe({
                    name : result.data.name,
                    sessionId : result.data.sessionId,
                })

            }).catch((err)=>{
                console.log(err)
                // delete axios.defaults.headers.common.sessionid;
                // localStorage.removeItem("sessionId");
            })
        }
        else delete axios.defaults.headers.common.sessionid;

    },[me])
    
    return (
        <AuthContext.Provider value={[me, setMe]} >
            {prop.children}
        </AuthContext.Provider>
    )

}