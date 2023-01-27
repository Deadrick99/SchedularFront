import { useRef, useState, useEffect} from "react";
import useAuth  from "../hooks/useAuth";
import {Link, useNavigate, useLocation, } from 'react-router-dom'
import axios from '../api/axios'
import "../../dist/output.css";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
const LOGIN_URL = "/auth"



function Login() {
  const {setAuth} = useAuth()

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef();
  const errRef = useRef();


  const [userName, resetUserName, userNameAttributeObj] = useInput("user",'')
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle('persist', false)

    useEffect(() => {
        setErrMsg("")
    },[user,pwd])
    useEffect(()=>{
        userRef.current.focus()
    },[])
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =await  axios.post (LOGIN_URL,json.stringify({userName,password}),
            {headers:{'Content-Type':'application/json'}, withCredentails:true})
            console.log(response)
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({userName,password,roles,accessToken})
            resetUserName()
            setPassword("")
            navigate(from,{replace:true})
        } catch (error) {
            if(!error?.response)
            setErrMsg("Nor response from server")
            else if(error.respons?.status === 400 )
            setErrMsg("Incoorect Username or Password. Try Agian.")
            else
            setErrMsg("Login Failed.")
            errRef.current.focus()
        }
    }

  return (
    <div>
      
    </div>
  )
}

export default Login
