import { useRef, useState, useEffect, useContext} from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axios, { axiosPrivate } from '../api/axios'
import "../output.css"
import useInput from "../Hooks/useInput";
import useToggle from "../Hooks/useToggle";
import useAuth from "../Hooks/useAuth";

const LOGIN_URL = "/auth"



function Login() {
  const { setAuth, persist, setPersist }= useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef();
  const errRef = useRef();


  const [userName, resetUserName, userNameAttributeObj] = useInput("userName",'')
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle('persist', false)

    useEffect(() => {
        setErrMsg("")
    },[userName,password])
    useEffect(()=>{
        userRef.current.focus()
    },[])
    useEffect(()=> {
      localStorage.setItem("persist", persist)
    },[persist])
    const togglePersist = () =>{
      setPersist(prev => !prev)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =await  axiosPrivate.post ("https://schedularback-production.up.railway.app/auth",JSON.stringify({userName,password}),
            {headers:{'Content-Type':'application/json'}, withCredentials:true})
            console.log(response?.data)
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const id = response?.data?.id
            const storeId = response?.data?.storeId
            console.log(storeId)
            if(id)
            localStorage.setItem("id", id)
            if(storeId)
            localStorage.setItem("storeId",storeId)
            setAuth({userName,password,roles,accessToken});
            resetUserName("")
            setPassword("")
            navigate(from,{replace:true})
        } catch (error) {
          console.log(error)
            if(!error?.response)
            setErrMsg("No response from server")
            else if(error.response?.status === 400 )
            setErrMsg("Incoorect Username or Password. Try Agian.")
            else
            setErrMsg("Login Failed.")
            errRef.current.focus()
        }
    }

  return (
        <section className="min-h-screen w-full bg-gray-800 border-gray-700'
         text-white flex flex-col  m-auto items-center justify-center">
          <p
            ref={errRef}
            className={errMsg ? "bg-red-500" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="m-3 font-semibold text-xl">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col my-2">
            <label htmlFor="username" className="mb-2">Username:</label>
            <input className="mb-1 rounded-sm text-black"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              {...userNameAttributeObj}
              required
            />
            <label className="mt-2" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="my-1 rounded-sm text-black"
            />
            <button className="text-gray-800 bg-white my-3 font-semibold rounded-xl">Sign In</button>
            <div className= "text-white">
              <input  type="checkbox"
              id= "persist"
              onChange= { togglePersist}
              checked= {persist}
              />
              <label htmlFor="persist" className="text-white ml-2">Trust this device</label>
            </div>
            <p className="">
              Need an account?
              <br />
              <span>
                <Link className="underline " to={"/register"}>
                  Sign up
                </Link>
              </span>
            </p>
          </form>
        
        </section>
  )
}

export default Login
