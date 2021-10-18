import React from "react";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Switch, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ImagePage from "./pages/ImagePage";
import Toolbar from "./components/ToolBar";


const App = () => {
  return (
    <div style = {{maxWidth:'600px', margin:'auto'}}>
      <ToastContainer/>
      <Toolbar/>
      <Switch>
        <Route path='/images/:imageId' exact component={ImagePage}/>
        <Route path='/auth/register' exact component={RegisterPage}/>
        <Route path='/auth/login' exact component={LoginPage}/>
        <Route path='/' component={MainPage} />
      </Switch>

    </div>

  );
}

export default App;
