import React, { useContext, useReducer } from "react";
import './ImageList.css';
import {ImageContext}  from "../context/ImageContext"
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Image from "./Image"

const ImageList = () =>{
    const {images, myImages, isPublic, setIsPublic} = useContext(ImageContext);
    const [me] = useContext(AuthContext);
    const imglist = (isPublic ? images : myImages).map((image) => (
        <Link key={image.key} to={`/images/${image._id}`}>
            
            <Image imageUrl={`https://drxfpur890wkn.cloudfront.net/w140/${image.key}`} />
        </Link>
     ))
    return(
        <div>
            <h3 style={{display:"inline-block", marginRight:"10px"}}>Image List ({isPublic ? "공개":"개인"})</h3>
            {me && <button onClick={() => setIsPublic(!isPublic)}> {!isPublic ? "공개":"개인"} 사진 </button> }
            <div className="image-list-container">
                {imglist}
            </div>
            
        </div>
    )
}

export default ImageList