import react,{useState, useContext} from "react"
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import {AuthContext}  from "../context/AuthContext"
import {useHistory} from "react-router-dom"


const LoginPage = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setMe] = useContext(AuthContext);
    const history = useHistory();

    const loginHandler = async(e) =>{
        e.preventDefault();
        
        try {
            if(username.length < 3 || password.length <6) throw new Error("입력하신 정보가 올바르지 않습니다.");
            const result = await axios.patch('/user/login',{username,password});
            setMe({name:result.data.name, sessionId : result.data.sessionId, id : result.data.id});
            toast.success('로그인을 성공하였습니다.');
            history.push("/")
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }

    }

    return (
        <div style={{
            maxWidth:350,
            marginRight:"auto",
            marginLeft:"auto",
            marginTop:100 }}>

            <h3>로그인</h3>
            <form onSubmit={loginHandler} >
                <CustomInput label="회원ID" value={username} setValue={setUsername}/>
                <CustomInput label="password" value={password} setValue={setPassword} type="password"/>
                <button type='submit'>로그인</button>
            </form>
        </div>
    )
}

export default  LoginPage