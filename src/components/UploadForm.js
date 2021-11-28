import React, { useState, useContext} from "react";
import axios from "axios"
import "./UploadForm.css"
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";


const UploadForm = () => {
    const {images, setImages, myImages, setMyImages} = useContext(ImageContext);

    const [files, setFiles] = useState(null);
    const [previews , setPreviews] = useState([]);
    const [percent, setPercent] = useState([]);
    const [isPublic, setIsPublic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const imageSelectHander = async(event) => {
        const imageFiles = event.target.files;
        setFiles(imageFiles);

        const imagePreviews = await Promise.all( [...imageFiles].map(async(imagFile)=>{
            return  new Promise((resolve, reject) =>{
                    try {
                        const filereader = new FileReader();
                        filereader.readAsDataURL(imagFile);
                        filereader.onload = e => resolve({imgSrc : e.target.result, fileName:imagFile.name});
                    } catch (error) {
                        reject(error)
                    }
                }
            )
        }))
        console.log('imagePreviews ',imagePreviews)
        setPreviews(imagePreviews);
    }

    const onSubmitV2 = async (e) => {

        try {
            setIsLoading(true);
            const presignedData = await axios.post("/images/presigned",{
                contentType: [...files].map(file=> file.type)
            });

            const result = await Promise.all([...files].map((file,index)=>{
                const {presigned}= presignedData.data[index];
                const formData = new FormData();
                for(const key in presigned.fields){
                    formData.append(key, presigned.fields[key]);
                }
                formData.append("content-Type",file.type);
                formData.append("file",file);
                return axios.post(presigned.url, formData,{
                    onUploadProgress : (e) =>{
                        setPercent(prevData=>{
                            const newData = [...prevData];
                            newData[index] = Math.round(100*e.loaded / e.total);
                            return newData;
                        })
                        
                    }
                })

            }))

            const res = await axios.post("/images", {images:[...files].map((file,index)=>
                ({imagekey : presignedData.data[indxe].imagekey, 
                    originalname:file.name}))
            ,public:isPublic})

            if(!isPublic) setMyImages([...res.data, ...myImages]);
            else setImages([...res.data, ...images]);

            toast.success('good');
            setTimeout(() => {
                setPercent([]);
                // setFileName(defaultFileName);
                setPreviews([]);
            }, 3000);

        } catch (error) {
            toast.error('fail')
            setPercent([]);
            // setFileName(defaultFileName);
            setPreviews([]);
            console.log(`Erro : ${error}`);
        } finally{
            setIsLoading(false);
        }

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for(let file of files)  formData.append('image', file);

        formData.append('public', isPublic);
        try {
            const res = await axios.post('/images', formData, {
                headers: { "Content-type": "multipart/form-data" },
                onUploadProgress : (e) =>{
                    setPercent( Math.round(100*e.loaded / e.total))
                }
            });
            
            // console.log(res)
            if(!isPublic) setMyImages([...res.data, ...myImages]);
            else setImages([...res.data, ...images]);
            toast.success('good');
            setTimeout(() => {
                setPercent(0);
                // setFileName(defaultFileName);
                setPreviews([]);
            }, 3000);

        } catch (error) {
            toast.error('fail')
            setPercent(0);
            // setFileName(defaultFileName);
            setPreviews([]);
            console.log(`Erro : ${error}`);
            
        }
    }



    const previewImages = previews.map((preview, index) => (
        <div key={index}>
            <img
                style={{ width: 200, height: 200, objectFit: "cover" }}
                src={preview.imgSrc}
                className={`image_preview ${preview.imgSrc && 'image_preview_show'} `} />
            <ProgressBar percent={percent[index]} />
        </div>
    ))

    const fileName = previews.length === 0 ? '이미지를 입력해 주세요' : previews.reduce((previous, currunt) => previous+`${currunt.fileName}, `,"" )


    return (
        <form onSubmit={onSubmitV2}>
            <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}> {previewImages} </div>
            
            
            <div className={'file-dropper'}>
                {fileName}
                <input id="image" type="file" multiple  accept="image/*"
                    onChange={imageSelectHander} />
            </div>
            <input onChange={()=>setIsPublic(!isPublic)} type="checkbox" id="public-check"/>
            <label htmlFor="public-check"> 비공개 </label>
            <button type="submit" diabled={isLoading} style={{width:'100%', height : '40px', borderRadius:'3px'}}> 제공 </button>
        </form>
    )

}

export default UploadForm;