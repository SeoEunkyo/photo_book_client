import reac, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router";
import { ImageContext } from "../context/ImageContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const ImagePage = () => {
    const history = useHistory();
    const { imageId } = useParams();
    const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
    const [hasLiked, setHasLiked] = useState(false);
    const [me] = useContext(AuthContext)

    const image = images.find(image => image._id === imageId) || myImages.find(image => image._id === imageId);



    useEffect(() => {
        if (me && image && image.like.includes(me.id)) setHasLiked(true)
    }, [me, image])

    const updateImage = (images, image) => [
        ...images.filter((image) => image._id !== imageId), image].sort((a, b) => {
            return new Date(b.creatAt).getTime() - new Date(a.creatAt).getTime()
        })

    const onSubmit = async () => {
        // console.log(me.sessionId);
        const result = await axios.get(`/images/${imageId}/${hasLiked ? 'unlike' : 'like'}`)
        if (result.data.public) setImages(updateImage(images, result.data));
        else setMyImages(updateImage(myImages, result.data));
        setHasLiked(!hasLiked);
    }

    const deleteHandler = async () => {
        if (!window.confirm("정말 삭제 하시겠습니까?")) return
        try {
            const result = await axios.delete(`/images/${imageId}`);
            
            setImages(images.filter(image => image._id !== imageId));
            setMyImages(myImages.filter(image => image._id !== imageId));
            history.push('/');
            toast.success(result.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    if (!image) return <div>Loading .... </div>


    return (
        <div>
            <h3>Image Page </h3>
            <img style={{ maxWidth: "100%" }} alt={imageId} src={`http://localhost:5000/uploads/${image.key}`} />
            <span>좋아요 {image.like.length}</span>
            {me && image.user._id === me.id && <button
                style={{ float: "right", marginLeft: 20 }}
                onClick={deleteHandler}
            > 삭제 </button>
            }

            <button style={{ float: "right" }} onClick={onSubmit}>
                {hasLiked ? "좋아요 취소" : "좋아요"}
            </button>

        </div>
    )
}


export default ImagePage;