import React, { useContext } from "react";
import './ImageList.css';
import {ImageContext}  from "../context/ImageContext"


const ImageList = () =>{
    const [images] = useContext(ImageContext);

    const imglist = images.map((image)=>(  
    <img key={image.key}
    style={{width:'100%'}} 
    src={`http://localhost:5000/uploads/${image.key}`}/> ))

    return(
        <div>
            <h3>ImageList</h3>
            {imglist}
        </div>
    )
}

export default ImageList