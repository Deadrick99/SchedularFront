import {useRef,useState, useEffect} from "react";
import { useNavigate,useLocation} from "react-router";
import {Link} from "react-router-dom"
import axios from "../api/axios";
import "../output.css"

const REGISTER_URL = '/register'
const STORE_URL = '/store'
import React from 'react'
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,23}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{0,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register= ()  => {
    const userRef = useRef();
    const errMsg = useRef();

    const [stores, setStores] = useState([])

    const [errMessage, setErrMessage] =useState();
    const [success, setSuccess] = useState();

    const [firstForm, setFirstForm] = useState(true);

    const [password,setPassword] = useState("");
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [passwordMatch, setPasswordMatch] = useState("");
    const [validPasswordMatch, setValidPasswordMatch] = useState(false);
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);
    
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false)
    const [firstNameFocus, setFirstNameFocus] = useState(false)

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false)
    const [lastNameFocus, setLastNameFocus] = useState(false)

    const [selectStore,setSelectStore] = useState("")
    const [validSelectStore, setValidSelectStore] = useState(false)
    const [selectStoreFocus, setSelectStoreFocus] = useState(false)

    const [userName,setUserName]= useState("")
    const [userNameFocus,setUserNameFocus] = useState(false);
    const [validUserName, setValidUserName] = useState(false);

    const [hours, setHours] = useState(0);
    const [hoursFocus, setHoursFocus] = useState(false);
    const [validHours, setValidHours] = useState(false);
  
  

    const initStores =( data )=>
    {
        let array = []
         for (var i in data.data)
            {
                array.push(data.data[i])
            }
        setStores(array)
     
    }
    useEffect(()=>{
        const getStores = async () => {
            const data = await axios.get(STORE_URL,{headers:{'Content-type': 
            "application/json"}, withCredentials:true});
            initStores(data)
        }
        getStores()
        console.log(stores)
        userRef.current.focus();
        
    },[])
    const checkUserName =(userName)=> {
        setUserName(userName)
        const result = USERNAME_REGEX.test(userName)
        setValidUserName(result);
    }
    const checkFirstName =(firstName)=> {
        setFirstName(firstName)
        const result = NAME_REGEX.test(firstName)
        setValidFirstName(result);
        
    }
    const checkLastName =(lastName)=> {
         setLastName(lastName)
        const result = NAME_REGEX.test(lastName)
        setValidLastName(result);
        
    }
    const checkStore=(selectStore)=> {
        setSelectStore(selectStore)
        if(selectStore !=="DEFAULT"){
        setValidSelectStore(true)
            
        }
        
    }
    const checkPassword=(password)=>{
        setPassword(password)
        const result = PASSWORD_REGEX.test(password)
        setValidPassword(result)
         
    }
    const checkPasswordMatch=(passwordMatch) => {
        const match = password === passwordMatch
        setValidPasswordMatch(match)
        if(match){
            setPasswordMatch(passwordMatch)
        }
    }

    const checkHours=(hours)=>{
        setHours(hours);
        if( hours> 4 && hours<41)
        setValidHours(true)
        else
        setValidHours(false)
    } 

    useEffect(()=> {
        //setErrMessage("")
        errMsg.current.focus()
    },[userName,password,passwordMatch,firstName,lastName, selectStore])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validFirstName|| !validLastName || !validUserName || !validPassword || !validPasswordMatch || !validSelectStore || !validHours){
            setErrMessage("All fields Required")
            errMsg.current.focus()
            setHoursFocus(true)
            console.log(hoursFocus)
            setUserNameFocus(true)
            setPasswordFocus(true)
            setPasswordMatchFocus(true)
            setSelectStoreFocus(true)
            setFirstNameFocus(true)
            setLastNameFocus(true)
            return
        }
        try {
             await axios.post (REGISTER_URL,
                 JSON.stringify({userName,password,firstName,lastName,storeId:selectStore, numHours:parseInt(hours)}),
                   { headers:{"Content-type":"application/json"}, withCredentials:true})
           setSuccess(true)
            
        }
        catch(error){
            console.log(error)
            if(!error?.response){
                setErrMessage("Server Down")
            }
            else if(error.response?.status === 409){
                setErrMessage("Username Taken")
            }
            else{
                setErrMessage("Registration failed")
            }
            errMsg.current.focus()
        }
    }
  return (
    <>
    {success ? (<section className="border-gray-200 bg-gray-50 min-h-screen w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col m-auto 
    items-center justify-center">
        <h1>Registered Succesfully!</h1>
        <p>
            <Link to ="/login">Login</Link>
        </p>
    </section>) :(
    <section className="border-gray-200  bg-gray-50 min-h-screen w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col m-auto 
    items-center justify-center">
        
        <p ref= {errMsg} 
        className={errMessage? 'bg-red-500 text-white' : 'hidden'}
        aria-live = "assertive"
        >
            {errMessage}
        </p>
        <div className={firstForm ? "" : "hidden"}>
        <h1 className="m-3 font-semibold text-xl text-center">Register</h1>
        <form className="flex flex-col my-2" onSubmit={handleSubmit}>
            <label htmlFor= "username" className="mb-2">Username:</label>
            
            <input className={validUserName && userNameFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validUserName && userNameFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"} 
             type = "text"
             id="username"
             ref={userRef}
             autoComplete= "off"
             onChange={(e)=> checkUserName(e.target.value)}
             onFocus={()=> setUserNameFocus(true)}
             onBlur = {() => setUserNameFocus(false)}

            />
             <p
            id="usernamenote"
            className={
            userNameFocus && !validUserName ? " text-red-500" : "hidden"
            }
            >
            3-23 charecters.
            </p>
            <label className="mt-2" htmlFor="password">Password:</label>
           
            <input className={validPassword && passwordFocus ? "border-green-500 my-1 border-4 rounded-sm text-black": !validPassword&& passwordFocus?"border-red-500 my-1 border-4 rounded-sm text-black":"my-1 border-4 rounded-sm text-black"}
            type="password"
            id="password"
            onChange={(e) => checkPassword(e.target.value)}
            value = {password}
            onFocus={()=> setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            />
             <p
            id="Passwordnote"
            className={
            passwordFocus && !validPassword? " text-red-500 max-w-full" : "hidden"
            }
            >
            8 to 24 charecters.
            <br />
            1 lower case.<br/>
            1 upper case.<br/>
            1 special charecter.<br/>
            Special charecters:!@#$%.
            </p>
            <label className="mt-2" htmlFor="matchPassword">Confirm Password:</label>
            <input className={validPasswordMatch && passwordMatchFocus ? "border-green-500 my-1 border-4 rounded-sm text-black": !validPasswordMatch&& passwordMatchFocus?"border-red-500 my-1 border-4 rounded-sm text-black":"my-1 border-4 rounded-sm text-black"}
            type="password"
            id="matchPassword"
            onChange={(e) => checkPasswordMatch(e.target.value)}
            onFocus={()=> setPasswordMatchFocus(true)}
            onBlur = {() => setPasswordMatchFocus(false)}
            />
            <p
            id="matchPasswordnote"
            className={
            passwordMatchFocus && !validPasswordMatch ? " text-red-500" : "hidden"
            }
            >
            Must match Password.
            </p>
            <label htmlFor="firstname" className="mt-2">First Name:</label>
            <input className={validFirstName && firstNameFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validFirstName && firstNameFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"} 
            type="text"
            id="firstname"
            value={firstName}
            autoComplete="off"
            onChange={(e)=> checkFirstName(e.target.value)}
            onFocus={()=> setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
            >
            </input>
            <p
            id="firstnamenote"
            className={
            firstNameFocus && !validFirstName ? " text-red-500" : "hidden"
            }
            >
            0-23 letters.
            </p>
            <label htmlFor="lastname" className="mt-2">Last Name:</label>
            <input className={validLastName && lastNameFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validLastName && lastNameFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"} 
            type="text"
            id="lastname"
            value={lastName}
            autoComplete="off"
            onChange={(e)=> checkLastName(e.target.value)}
            onFocus={()=> setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
            >
            </input>
            <p
            id="lastnamenote"
            className={
            lastNameFocus && !validLastName ? " text-red-500" : "hidden"
            }
            >
            0-23 letters.
            </p>
            <label htmlFor="desiredhours" className="mt-2">Desired Hours:</label>
            <input className={validHours && hoursFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validHours && hoursFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"}
            type="number"
            min='5'
            max='40'
            onChange={(e)=> checkHours(e.target.value)}
            onFocus={()=> setHoursFocus(true)}
            onBlur={() => setHoursFocus(false)}
            >

            </input>
            <p
            id="desiredhoursnote"
            className={
            hoursFocus && !validHours ? " text-red-500" : "hidden"
            }
            >
            5-40 hours.
            </p>
            <label htmlFor ="selectstore" className="mt-2">Please Select Your Store:</label>
            <select defaultValue={"DEFAULT"} className={ validSelectStore && selectStoreFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validSelectStore && selectStoreFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"} 
             id="selectstore" onChange={(e) => checkStore(e.target.value)} onFocus={() => setSelectStoreFocus(true)} onBlur={()=> setSelectStoreFocus(false)}>
                <option value={"DEFAULT"} disabled hidden>Select your store -{">"} </option>
            {stores.map((store)=> (
                <option key={store.id} value={store.id}>{store.name}</option>
                
            ))}
            </select>
            <button  className="bg-white text-black font-semibold text-center rounded-xl my-2">Sign Up</button>
        </form>
        <p className="">
        Already Registered?<br />
        <span>
          <Link className="underline" to={'/login'}>Sign In</Link>
        </span>
      </p>
        </div>
    </section>
    
   ) }
   </>
  )

            
}

export default Register