import React, { useState, useContext} from "react";
import axios from "axios"
import "./UploadForm.css"
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";


const UploadForm = () => {
    const [images, setImages] = useContext(ImageContext);

    const defaultFileName = '이미지를 입력해 주세요';
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(defaultFileName);
    const [percent, setPercent] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);

    const imageSelectHander = (event) => {
        const imagFile = event.target.files[0];
        setFile(imagFile);
        setFileName(imagFile.name);

        const filereader = new FileReader();
        filereader.readAsDataURL(imagFile);
        filereader.onload = e => setImgSrc(e.target.result);
    }

    const onSumit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('/images', formData, {
                headers: { "Content-type": "multipart/form-data" },
                onUploadProgress : (e) =>{
                    setPercent( Math.round(100*e.loaded / e.total))
                }
            });
            toast.success('good');
            // console.log(res)
            setImages([res.data, ...images]);
            setTimeout(() => {
                setPercent(0);
                setFileName(defaultFileName);
                setImgSrc(null);
            }, 3000);

        } catch (error) {
            toast.error('fail')
            setPercent(0);
            setFileName(defaultFileName);
            setImgSrc(null);
            console.log(`Erro : ${error}`);
            
        }
    }



    return (
        <form onSubmit={onSumit}>
            <img src={imgSrc}  className={`image_preview ${imgSrc && 'image_preview_show'} `}/>
            <ProgressBar percent={percent} />
            <div className={'file-dropper'}>
                {fileName}
                <input id="image" type="file"  accept="image/*"
                    onChange={imageSelectHander} />
            </div>
            <button type="submit" style={{width:'100%', height : '40px', borderRadius:'3px'}}> 제공 </button>
        </form>
    )

}

export default UploadForm;