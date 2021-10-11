import React from "react";
import UploadForm from "./components/UploadForm";
import ImageList from "./components/ImageList";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const App = () => {
  return (
    <div style = {{maxWidth:'600px', margin:'auto'}}>
      <ToastContainer/>
      <h2>Image Upload 사진첩</h2>
      <UploadForm />
      <ImageList/>
    </div>

  );
}

export default App;
