import React, { createContext, useContext, useEffect,useState } from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext";


export  const ImageContext = createContext();

export const ImageProvider = (prop) => {
    const [images, setImages] = useState([]);
    const [myImages, setMyImages] = useState([]);
    const [isPublic, setIsPublic] = useState(true);
    const [me] = useContext(AuthContext);
    
    useEffect(()=>{
        axios.get("/images")
        .then(result => setImages(result.data))
        .catch(err=> console.log(err));
    }, []);

    useEffect(()=>{

        if(me){
            setTimeout(()=>{
                axios.get("/user/me/images")
                .then(result => setMyImages(result.data))
                .catch(err=> console.log(err));
            },0)
        }else{
            setMyImages([]);
            setIsPublic(true);
        }
        
    }, [me]);

    return (
        <ImageContext.Provider value={{images, setImages, myImages, setMyImages, isPublic, setIsPublic}} >
            {prop.children}
        </ImageContext.Provider>
    )

}