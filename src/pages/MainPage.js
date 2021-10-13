import react from "react"
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";

const MainPage = () => {
    return (
    <div>
        <h2>Image Upload 사진첩</h2>
        <UploadForm />
        <ImageList />
    </div>)

}

export default MainPage