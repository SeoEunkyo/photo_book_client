import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () =>{

    return(
        <div>
            <Link to='/'>
                <span>Home</span>
            </Link>
            <Link to='/auth/login'>
                <span style={{float:'right'}}>로그인</span>
            </Link>
            <Link to='/auth/register'>
                <span style={{float:'right' , marginRight : 15}}>회원가입</span>
            </Link>
            
        </div>
    )
}

export default Toolbar;