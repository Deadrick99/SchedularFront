import {useRef,useState, useEffect} from "react";
import { useNavigate,useLocation} from "react-router";
import {Link} from "react-router-dom"
import axios from "../api/axios";
import "../../dist/output.css"
import useInput from "../Hooks/useInput";
import useToggle from "../Hooks/useToggle";
import useAuth from "../Hooks/useAuth";
const REGISTER_URL = '/register'
const STORE_URL = '/store'
const USERNAME_URL = "/userName"
const EMPLOYEE_URL = '/'
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
  
    const [mondayStart ,setMondayStart]=useState("");
    const [mondayEnd,setMondayEnd]=useState("");
    const [tuesdayStart ,setTuesdayStart]=useState("");
    const [tuesdayEnd,setTuesdayEnd]=useState("");
    const [wednesdayStart ,setWednesdayStart]=useState("");
    const [wednesdayEnd,setWednesdayEnd]=useState("");
    const [thursdayStart ,setThursdayStart]=useState("");
    const [thursdayEnd,setThursdayEnd]=useState("");
    const [fridayStart , setFridayStart]=useState("");
    const [fridayEnd,setFridayEnd]=useState("");
    const [saturdayStart , setSaturdayStart]=useState("");
    const [saturdayEnd, setSaturdayEnd]=useState("");
    const [sundayStart ,setSundayStart]=useState("");
    const [sundayEnd,setSundayEnd]=useState("");

    const [mondayFocus, setMondayFocus] = useState(false)
    const [tuesdayFocus, setTuesdayFocus] = useState(false)
    const [wednesdayFocus, setWednesdayFocus] = useState(false)
    const [thursdayFocus, setThursdayFocus] = useState(false)
    const [fridayFocus, setFridayFocus] = useState(false)
    const [saturdayFocus, setSaturdayFocus] = useState(false)
    const [sundayFocus, setSundayFocus] = useState(false)

    const [validMonday,setValidMonday] = useState(false)
    const [validTuesday,setValidTuesday] = useState(false)
    const [validWednesday,setValidWednesday] = useState(false)
    const [validThursday,setValidThursday] = useState(false)
    const [validFriday,setValidFriday] = useState(false)
    const [validSaturday,setValidSaturday] = useState(false)
    const [validSunday,setValidSunday] = useState(false)


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

    useEffect (() => 
    { 
        console.log(mondayStart,mondayEnd)
        console.log(availibilty.get(mondayStart),availibilty.get(mondayEnd))
        if(mondayStart === ""|| mondayEnd === ""){
            console.log("empty")
          setValidMonday(false)
        }
        else if((mondayStart ==="OFF" || mondayEnd === "OFF") && (mondayStart !=="OFF" || mondayEnd !== "OFF")){
            console.log("both need OFF")
            setValidMonday(false)
        }
        else if((availibilty.get(mondayEnd)- availibilty.get(mondayStart) <3)&& (mondayStart !=="OFF" && mondayEnd!=="OFF")){
            console.log("too short")
            setValidMonday(false)
        }
        else 
            setValidMonday(true)
                
            
        
    },[mondayStart,mondayEnd])
    useEffect (() => 
    { 
        console.log(tuesdayStart,tuesdayEnd)
        console.log(availibilty.get(tuesdayStart),availibilty.get(tuesdayEnd))
        if(tuesdayStart === ""|| tuesdayEnd === ""){
            console.log("empty")
          setValidTuesday(false)
        }
        else if((tuesdayStart ==="OFF" || tuesdayEnd === "OFF") && (tuesdayStart !=="OFF" || tuesdayEnd !== "OFF")){
            console.log("both need OFF")
            setValidTuesday(false)
        }
        else if((availibilty.get(tuesdayEnd)- availibilty.get(tuesdayStart) <3)&& (tuesdayStart !=="OFF" && tuesdayEnd!=="OFF")){
            console.log("too short")
            setValidTuesday(false)
        }
        else 
            setValidTuesday(true)
                
            
        
    },[tuesdayStart,tuesdayEnd])
    useEffect (() => 
    { 
        console.log(wednesdayStart,wednesdayEnd)
        console.log(availibilty.get(wednesdayStart),availibilty.get(wednesdayEnd))
        if(wednesdayStart === ""|| wednesdayEnd === ""){
            console.log("empty")
          setValidWednesday(false)
        }
        else if((wednesdayStart ==="OFF" || wednesdayEnd === "OFF") && (wednesdayStart !=="OFF" || wednesdayEnd !== "OFF")){
            console.log("both need OFF")
            setValidWednesday(false)
        }
        else if((availibilty.get(wednesdayEnd)- availibilty.get(wednesdayStart) <3)&& (wednesdayStart !=="OFF" && wednesdayEnd!=="OFF")){
            console.log("too short")
            setValidWednesday(false)
        }
        else 
            setValidWednesday(true)
                
            
        
    },[wednesdayStart,wednesdayEnd])
    useEffect (() => 
    { 
        console.log(thursdayStart,thursdayEnd)
        console.log(availibilty.get(thursdayStart),availibilty.get(thursdayEnd))
        if(thursdayStart === ""|| thursdayEnd === ""){
            console.log("empty")
          setValidThursday(false)
        }
        else if((thursdayStart ==="OFF" || thursdayEnd === "OFF") && (thursdayStart !=="OFF" || thursdayEnd !== "OFF")){
            console.log("both need OFF")
            setValidThursday(false)
        }
        else if((availibilty.get(thursdayEnd)- availibilty.get(thursdayStart) <3)&& (thursdayStart !=="OFF" && thursdayEnd!=="OFF")){
            console.log("too short")
            setValidThursday(false)
        }
        else 
            setValidThursday(true)
                
            
        
    },[thursdayStart,thursdayEnd])
    useEffect (() => 
    { 
        console.log(fridayStart,fridayEnd)
        console.log(availibilty.get(fridayStart),availibilty.get(fridayEnd))
        if(fridayStart === ""|| fridayEnd === ""){
            console.log("empty")
          setValidFriday(false)
        }
        else if((fridayStart ==="OFF" || fridayEnd === "OFF") && (fridayStart !=="OFF" || fridayEnd !== "OFF")){
            console.log("both need OFF")
            setValidFriday(false)
        }
        else if((availibilty.get(fridayEnd)- availibilty.get(fridayStart) <3)&& (fridayStart !=="OFF" && fridayEnd!=="OFF")){
            console.log("too short")
            setValidFriday(false)
        }
        else 
            setValidFriday(true)
                
            
        
    },[fridayStart,fridayEnd])
    useEffect (() => 
    { 
        console.log(saturdayStart,saturdayEnd)
        console.log(availibilty.get(saturdayStart),availibilty.get(saturdayEnd))
        if(saturdayStart === ""|| saturdayEnd === ""){
            console.log("empty")
          setValidSaturday(false)
        }
        else if((saturdayStart ==="OFF" || saturdayEnd === "OFF") && (saturdayStart !=="OFF" || saturdayEnd !== "OFF")){
            console.log("both need OFF")
            setValidSaturday(false)
        }
        else if((availibilty.get(saturdayEnd)- availibilty.get(saturdayStart) <3)&& (saturdayStart !=="OFF" && saturdayEnd!=="OFF")){
            console.log("too short")
            setValidSaturday(false)
        }
        else 
            setValidSaturday(true)
                
            
        
    },[saturdayStart,saturdayEnd])
    useEffect (() => 
    { 
        console.log(sundayStart,sundayEnd)
        console.log(availibilty.get(sundayStart),availibilty.get(sundayEnd))
        if(sundayStart === ""|| sundayEnd === ""){
            console.log("empty")
          setValidSunday(false)
        }
        else if((sundayStart ==="OFF" || sundayEnd === "OFF") && (sundayStart !=="OFF" || sundayEnd !== "OFF")){
            console.log("both need OFF")
            setValidSunday(false)
        }
        else if((availibilty.get(sundayEnd)- availibilty.get(sundayStart) <3)&& (sundayStart !=="OFF" && sundayEnd!=="OFF")){
            console.log("too short")
            setValidSunday(false)
        }
        else 
            setValidSunday(true)
                
            
        
    },[sundayStart,sundayEnd])
   
     const availibityArr = ["OPEN", "10AM", "11AM","12PM","1PM", "2PM","3PM","4PM", "5PM", "6PM","7PM", "8PM","CLOSE","OFF"]
    const availibilty= new Map([
    ["OPEN",-1],
    ["10AM",1],
    ["11AM",2],
    ["12PM",3],
    ["1PM",4],
    ["2PM",5],
    ["3PM",6],
    ["4PM",7],
    ["5PM",8],
    ["6PM",9],
    ["7PM",10],
    ["8PM",11],
    ["CLOSE",12],
    ["OFF",13],
    ]);

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
    const nextForm = async (e) => {
        e.preventDefault()
        console.log(userName)
        try {
             await axios.post (USERNAME_URL,
                 JSON.stringify({userName}),
                   { headers:{"Content-type":"application/json"}, withCredentials:true})
            setFirstForm(false)
           // setSuccess(true)
            
        }
        catch(error){
            console.log(error)
            if(!error?.response){
                setErrMessage("Server Down")
            }
            else if(error.response?.status === 409){
                setErrMessage("Username Taken")
            }
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
        <div className={firstForm ? "hidden" : ""}>
            <h1 className=" text-center font-semibold text-xl">Availibility</h1>
            <form className="flex flex-col my-2" onSubmit={handleSubmit}>
               
                    <div key="Monday">
                <label htmlFor= "Monday" className="mb-2 font-medium underline underline-offset-1">Monday</label>
                <div id={'MondayStart'} className="flex flex-col" >
                     <label htmlFor= {`Mondaystart`} className="mb-2 " >Monday Start Time:</label>
                    <select id={`Mondaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setMondayStart(e.target.value)} onFocus={() => setMondayFocus(true)} onBlur={() => setMondayFocus(false)}
                    className={validMonday && mondayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validMonday && mondayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Monday:${time}`} value={time}>{time}</option>
                    ))                        
                    }
                </select>
                    <label htmlFor= {`Mondayend`} className="mb-2">Monday End Time:</label>
                    <select id={`Mondayend`} defaultValue={"DEFAULT"} onChange={(e)=> setMondayEnd(e.target.value)} onFocus={() => setMondayFocus(true)} onBlur={() => setMondayFocus(false)}
                     className={validMonday && mondayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validMonday && mondayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Monday:${time}`} value={time}>{time}</option>
                    ))}             
                    
                </select>
                </div>
                </div>
                <div key="Tuesday">
                <label htmlFor= "Tuesday" className="mb-2 font-medium underline underline-offset-1">Tuesday</label>
                <div id={'TuesdayStart'} className="flex flex-col" >
                     <label htmlFor= {`Tuesdaystart`} className="mb-2 " >Tuesday Start Time:</label>
                    <select id={`Tuesdaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setTuesdayStart(e.target.value)} onFocus={() => setTuesdayFocus(true)} onBlur={() => setTuesdayFocus(false)}
                    className={validTuesday && tuesdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validTuesday && tuesdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Tuesday:${time}`} value={time}>{time}</option>
                    ))                        
                    }
                </select>
                    <label htmlFor= {`Tuesdayend`} className="mb-2">Tuesday End Time:</label>
                    <select id={`Tuesdayend`} defaultValue={"DEFAULT"} onChange={(e)=> setTuesdayEnd(e.target.value)} onFocus={() => setTuesdayFocus(true)} onBlur={() => setTuesdayFocus(false)}
                     className={validTuesday && tuesdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validTuesday && tuesdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Tuesday:${time}`} value={time}>{time}</option>
                    ))}             
                    
                </select>
                </div>
                </div>
                <div key="Wednesday">
                <label htmlFor= "Wednesday" className="mb-2 font-medium underline underline-offset-1">Wednesday</label>
                <div id={'WednesdayStart'} className="flex flex-col" >
                     <label htmlFor= {`Wednesdaystart`} className="mb-2 " >Monday Start Time:</label>
                    <select id={`Wednesdaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setWednesdayStart(e.target.value)} onFocus={() => setWednesdayFocus(true)} onBlur={() => setWednesdayFocus(false)}
                    className={validWednesday && wednesdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validWednesday && wednesdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Wednesday:${time}`} value={time}>{time}</option>
                    ))                        
                    }
                </select>
                    <label htmlFor= {`Wednesdayend`} className="mb-2">Wednesday End Time:</label>
                    <select id={`Wednesdayend`} defaultValue={"DEFAULT"} onChange={(e)=> setWednesdayEnd(e.target.value)} onFocus={() => setWednesdayFocus(true)} onBlur={() => setWednesdayFocus(false)}
                     className={validWednesday && wednesdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validWednesday && wednesdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Wednesday${time}`} value={time}>{time}</option>
                    ))}             
                    
                </select>
                </div>
                </div>
                <div key="Thursday">
                <label htmlFor= "Thursday" className="mb-2 font-medium underline underline-offset-1">Thursday</label>
                <div id={'ThursdayStart'} className="flex flex-col" >
                     <label htmlFor= {`Thursdaystart`} className="mb-2 " >Thursday Start Time:</label>
                    <select id={`Thursdaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setThursdayStart(e.target.value)} onFocus={() => setThursdayFocus(true)} onBlur={() => setThursdayFocus(false)}
                    className={validThursday && thursdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validThursday && thursdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Thursday:${time}`} value={time}>{time}</option>
                    ))                        
                    }
                </select>
                    <label htmlFor= {`Thursdayend`} className="mb-2">Thursday End Time:</label>
                    <select id={`Thursdayend`} defaultValue={"DEFAULT"} onChange={(e)=> setThursdayEnd(e.target.value)} onFocus={() => setThursdayFocus(true)} onBlur={() => setThursdayFocus(false)}
                     className={validThursday && thursdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validThursday && thursdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Thursday:${time}`} value={time}>{time}</option>
                    ))}             
                    
                </select>
                </div>
                </div>
                <div key="Friday">
                <label htmlFor= "Friday" className="mb-2 font-medium underline underline-offset-1">Friday</label>
                <div id={'FridayStart'} className="flex flex-col" >
                     <label htmlFor= {`Fridaystart`} className="mb-2 " >Friday Start Time:</label>
                    <select id={`Fridaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setFridayStart(e.target.value)} onFocus={() => setFridayFocus(true)} onBlur={() => setFridayFocus(false)}
                    className={validFriday && fridayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validFriday && fridayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Friday:${time}`} value={time}>{time}</option>
                    ))                     
                    }
                </select>
                    <label htmlFor= {`Fridayend`} className="mb-2">Friday End Time:</label>
                    <select id={`Fridayend`} defaultValue={"DEFAULT"} onChange={(e)=> setFridayEnd(e.target.value)} onFocus={() => setFridayFocus(true)} onBlur={() => setFridayFocus(false)}
                     className={validFriday && fridayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validFriday && fridayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Friday:${time}`} value={time}>{time}</option>
                    ))}             
                    
                </select>
                </div>
                </div>
                <div key="Saturday">
                <label htmlFor= "Saturday" className="mb-2 font-medium underline underline-offset-1">Saturday</label>
                <div id={'SaturdayStart'} className="flex flex-col" >
                     <label htmlFor= {`Saturdaystart`} className="mb-2 " >Saturday Start Time:</label>
                    <select id={`Saturdaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setSaturdayStart(e.target.value)} onFocus={() => setSaturdayFocus(true)} onBlur={() => setSaturdayFocus(false)}
                    className={validSaturday && saturdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validSaturday && saturdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Saturday:${time}`} value={time}>{time}</option>
                    ))                        
                    }
                </select>
                    <label htmlFor= {`Saturdayend`} className="mb-2">Saturday End Time:</label>
                    <select id={`Saturdayend`} defaultValue={"DEFAULT"} onChange={(e)=> setSaturdayEnd(e.target.value)} onFocus={() => setSaturdayFocus(true)} onBlur={() => setSaturdayFocus(false)}
                     className={validSaturday && saturdayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validSaturday && saturdayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Saturday:${time}`} value={time}>{time}</option>
                    ))}             
                    
                </select>
                </div>
                </div>
                <div key="Sunday">
                <label htmlFor= "Sunday" className="mb-2 font-medium underline underline-offset-1">Sunday</label>
                <div id={'SundayStart'} className="flex flex-col" >
                     <label htmlFor= {`Sundaystart`} className="mb-2 " >Sunday Start Time:</label>
                    <select id={`Sundaystart`} defaultValue={"DEFAULT"} onChange={(e)=> setSundayStart(e.target.value)} onFocus={() => setSundayFocus(true)} onBlur={() => setSundayFocus(false)}
                    className={validSunday && sundayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                    !validSunday && sundayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Sunday:${time}`} value={time}>{time}</option>
                    ))                        
                    }
                </select>
                    <label htmlFor= {`Sundayend`} className="mb-2">Sunday End Time:</label>
                    <select id={`Sundayend`} defaultValue={"DEFAULT"} onChange={(e)=> setSundayEnd(e.target.value)} onFocus={() => setSundayFocus(true)} onBlur={() => setSundayFocus(false)}
                     className={validSunday && sundayFocus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                     !validSunday && sundayFocus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm" }>
                    <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                    {
                    availibityArr.map((time)=> (
                        <option key={`Sunday:${time}`} value={time}>{time}</option>
                    ))}             

                </select>
                </div>
                </div>
               <label></label>
                
            </form>
        </div>
    </section>
    
   ) }
   </>
  )

            
}

export default Register