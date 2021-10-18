import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";


const Toolbar = () => {
    const [me, setMe] = useContext(AuthContext);
    const logoutHandler = async () => {

        try {
            await axios.patch("/user/logout");
            setMe();
            toast.success("logout성공");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    return (
        <div>
            <Link to='/'>
                <span>Home</span>
            </Link>
            {me ? (
                <>
                    <span onClick={logoutHandler} style={{ float: 'right', cursor:"pointer" }}>로그아웃 ({me.name})</span>
                </>
            ) : (
                <>
                    <Link to='/auth/login'>
                        <span style={{ float: 'right' }}>로그인</span>
                    </Link>
                    <Link to='/auth/register'>
                        <span style={{ float: 'right', marginRight: 15 }}>회원가입</span>
                    </Link>
                </>
            )}
        </div>
    )
}

export default Toolbar;