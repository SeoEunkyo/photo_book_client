import react, {useContext} from "react"
import UploadForm from "../components/UploadForm";
import ImageList from "../components/ImageList";
import { AuthContext } from "../context/AuthContext";


const MainPage = () => {
    const [me] = useContext(AuthContext);
    
    return (
    <div>
        <h2 style={{textAlign:"center"}}>Image Upload 사진첩</h2>
        {me && <UploadForm />}
        <ImageList />
    </div>)

}

export default MainPage