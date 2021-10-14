import react, {useState, useContext} from "react"
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import {AuthContext}  from "../context/AuthContext"

const RegisterPage = () =>{
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [me, setMe] = useContext(AuthContext);

    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();

            if(username.length < 3)  throw new Error("사용자ID가 너무 짧습니다, 3자이상으로 입력해주세요.");
            if(password.length < 6)  throw new Error("비밀번호가 너무 짧습니다, 6자이상으로 입력해주세요.");
            if(password !== passwordCheck) throw new Error("비밀번호 불일치");

            const result = await axios.post('/user/register',{name,username,password});

            console.log(result);
            setMe({username:result.data.username, sessionId : result.data.sessionId});
            toast.success("가입성공")
            


        } catch (error) {
            toast.error(error.message);
        }

    }

    return(
        <div style={{
            maxWidth:350,
            marginRight:"auto",
            marginLeft:"auto",
            marginTop:100 }}>

            <h3>회원가입</h3>
            <form onSubmit={onSubmitHandler} >
                <CustomInput label="이름" value={name} setValue={setName}/>
                <CustomInput label="사용자ID" value={username} setValue={setUsername}/>
                <CustomInput label="password" value={password} setValue={setPassword} type="password"/>
                <CustomInput label="retype password" value={passwordCheck} setValue={setPasswordCheck} type="password"/>

                <button type='submit'>회원가입</button>
            </form>
        </div>
    )}

export default  RegisterPage