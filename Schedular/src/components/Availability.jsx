import React, { useState,useEffect } from 'react'
import "../output.css"
import axios from '../api/axios';
import useAxiosPrivate  from '../Hooks/useAxiosPrivate';
import useAuth from "../Hooks/useAuth";
import {MdEdit} from "react-icons/md"
import useRefreshToken from '../Hooks/useRefreshToken';
import {VscLoading} from "react-icons/vsc"
var availArr;
function Availability() {
   const {refresh} = useRefreshToken()
    const axiosPrivate = useAxiosPrivate()
    const {auth} = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    //constants for option map
     const availibityArr = ["OPEN","9AM","10AM", "11AM","12PM","1PM", "2PM","3PM","4PM", "5PM", "6PM","7PM", "8PM","CLOSE","OFF"]
     //hash table for logic in validation
    const availibilty= new Map([
    ["OPEN",-1],
    ["9AM",0],
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

    //states for time 
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
    //state for focus
    const [mondayFocus, setMondayFocus] = useState(false)
    const [tuesdayFocus, setTuesdayFocus] = useState(false)
    const [wednesdayFocus, setWednesdayFocus] = useState(false)
    const [thursdayFocus, setThursdayFocus] = useState(false)
    const [fridayFocus, setFridayFocus] = useState(false)
    const [saturdayFocus, setSaturdayFocus] = useState(false)
    const [sundayFocus, setSundayFocus] = useState(false)
    //states for validation
    const [validMonday,setValidMonday] = useState(false)
    const [validTuesday,setValidTuesday] = useState(false)
    const [validWednesday,setValidWednesday] = useState(false)
    const [validThursday,setValidThursday] = useState(false)
    const [validFriday,setValidFriday] = useState(false)
    const [validSaturday,setValidSaturday] = useState(false)
    const [validSunday,setValidSunday] = useState(false)
    //states for editing availiability
    const [mondayEdit, setMondayEdit] = useState(false);
    const [tuesdayEdit, setTuesdayEdit] = useState(false);
    const [wednesdayEdit, setWednesdayEdit] = useState(false);
    const [thursdayEdit, setThursdayEdit] = useState(false);
    const [fridayEdit, setFridayEdit] = useState(false);
    const [saturdayEdit, setSaturdayEdit] = useState(false);
    const [sundayEdit, setSundayEdit] = useState(false);

    //state to keep track of if user has already set a full availability
    const [availSet,setAvailSet] = useState(false);

    //hooks to check for valid start and end times on change
    useEffect (() => 
    { 
       
        if(mondayStart === ""|| mondayEnd === ""){
          
          setValidMonday(false)
        }
        else if((mondayStart ==="OFF" || mondayEnd === "OFF") && (mondayStart !=="OFF" || mondayEnd !== "OFF")){
          
            setValidMonday(false)
        }
        else if((availibilty.get(mondayEnd)- availibilty.get(mondayStart) <3)&& (mondayStart !=="OFF" && mondayEnd!=="OFF")){
           
            setValidMonday(false)
        }
        else 
            setValidMonday(true)
                
            
        
    },[mondayStart,mondayEnd])
    useEffect (() => 
    { 
        
        if(tuesdayStart === ""|| tuesdayEnd === ""){
           
          setValidTuesday(false)
        }
        else if((tuesdayStart ==="OFF" || tuesdayEnd === "OFF") && (tuesdayStart !=="OFF" || tuesdayEnd !== "OFF")){
            
            setValidTuesday(false)
        }
        else if((availibilty.get(tuesdayEnd)- availibilty.get(tuesdayStart) <3)&& (tuesdayStart !=="OFF" && tuesdayEnd!=="OFF")){
           
            setValidTuesday(false)
        }
        else 
            setValidTuesday(true)
                
            
        
    },[tuesdayStart,tuesdayEnd])
    useEffect (() => 
    { 
        
        if(wednesdayStart === ""|| wednesdayEnd === ""){
           
          setValidWednesday(false)
        }
        else if((wednesdayStart ==="OFF" || wednesdayEnd === "OFF") && (wednesdayStart !=="OFF" || wednesdayEnd !== "OFF")){
           
            setValidWednesday(false)
        }
        else if((availibilty.get(wednesdayEnd)- availibilty.get(wednesdayStart) <3)&& (wednesdayStart !=="OFF" && wednesdayEnd!=="OFF")){
           
            setValidWednesday(false)
        }
        else 
            setValidWednesday(true)
                
            
        
    },[wednesdayStart,wednesdayEnd])
    useEffect (() => 
    { 
       
        if(thursdayStart === ""|| thursdayEnd === ""){
           
          setValidThursday(false)
        }
        else if((thursdayStart ==="OFF" || thursdayEnd === "OFF") && (thursdayStart !=="OFF" || thursdayEnd !== "OFF")){
            
            setValidThursday(false)
        }
        else if((availibilty.get(thursdayEnd)- availibilty.get(thursdayStart) <3)&& (thursdayStart !=="OFF" && thursdayEnd!=="OFF")){
        
            setValidThursday(false)
        }
        else 
            setValidThursday(true)
                
            
        
    },[thursdayStart,thursdayEnd])
    useEffect (() => 
    { 
       
        if(fridayStart === ""|| fridayEnd === ""){
         
          setValidFriday(false)
        }
        else if((fridayStart ==="OFF" || fridayEnd === "OFF") && (fridayStart !=="OFF" || fridayEnd !== "OFF")){
           
            setValidFriday(false)
        }
        else if((availibilty.get(fridayEnd)- availibilty.get(fridayStart) <3)&& (fridayStart !=="OFF" && fridayEnd!=="OFF")){
            
            setValidFriday(false)
        }
        else 
            setValidFriday(true)
                
            
        
    },[fridayStart,fridayEnd])
    useEffect (() => 
    { 
      
        if(saturdayStart === ""|| saturdayEnd === ""){
      
          setValidSaturday(false)
        }
        else if((saturdayStart ==="OFF" || saturdayEnd === "OFF") && (saturdayStart !=="OFF" || saturdayEnd !== "OFF")){
            
            setValidSaturday(false)
        }
        else if((availibilty.get(saturdayEnd)- availibilty.get(saturdayStart) <3)&& (saturdayStart !=="OFF" && saturdayEnd!=="OFF")){
       
            setValidSaturday(false)
        }
        else 
            setValidSaturday(true)
                
            
        
    },[saturdayStart,saturdayEnd])
    useEffect (() => 
    { 
      
        if(sundayStart === ""|| sundayEnd === ""){
          
          setValidSunday(false)
        }
        else if((sundayStart ==="OFF" || sundayEnd === "OFF") && (sundayStart !=="OFF" || sundayEnd !== "OFF")){
          
            setValidSunday(false)
        }
        else if((availibilty.get(sundayEnd)- availibilty.get(sundayStart) <3)&& (sundayStart !=="OFF" && sundayEnd!=="OFF")){
           
            setValidSunday(false)
        }
        else 
            setValidSunday(true)
                
            
        
    },[sundayStart,sundayEnd])

    // function to set start and end times called on page load
    const setTimes = (avails) =>{
        avails.map(day => {
            switch(day.day) {
            case "Monday":
              setMondayStart(day.startTime);
              setMondayEnd(day.endTime)
            break;
            case "Tuesday":
              setTuesdayStart(day.startTime);
              setTuesdayEnd(day.endTime)
            break;
            case "Wednesday":
              setWednesdayStart(day.startTime);
              setWednesdayEnd(day.endTime)
            break;
            case "Thursday":
              setThursdayStart(day.startTime);
              setThursdayEnd(day.endTime)
            break;
            case "Friday":
              setFridayStart(day.startTime);
              setFridayEnd(day.endTime)
            break;
            case "Saturday":
              setSaturdayStart(day.startTime);
              setSaturdayEnd(day.endTime)
            break;
            case "Sunday":
              setSundayStart(day.startTime);
              setSundayEnd(day.endTime)
            break;
            
}
        })
    }
    // page load hook checks if user has valid avail 
    useEffect( () => {
        setIsLoading(true)
            async function fetchData(){
                const id = localStorage.getItem("id")
                console.log(id)
                const user = await axiosPrivate.get(`https://schedularback-production.up.railway.app/employees/${id}`,{ headers:{"Content-type":"application/json"}, withCredentials:true})
                console.log(user)
                setAvailSet( user.data.availSet)
                console.log(user.data.availSet)
                if (user.data.availSet === false)
                {
                setIsLoading(false)
                    return
                }
                
                availArr = await axiosPrivate.get (`https://schedularback-production.up.railway.app/employeeAvail/${id}`,{ headers:{"Content-type":"application/json"}, withCredentials:true})
                console.log(availArr)
                setTimes(availArr.data)
                setIsLoading(false)
            }
            fetchData();
            
        },[])
    // handles submit of the form 
    const handleSubmit = (e) =>{
        e.preventDefault();
        submitMonday()
        submitTuesday()
        submitWednesday()
        submitThursday()
        submitFriday()
        submitSaturday()
        submitSunday() 
        setDBAvailSet()
        setAvailSet(true)
    }
    const setDBAvailSet= async ()=>{
        const id = localStorage.getItem("id")
        await axiosPrivate.patch(`https://schedularback-production.up.railway.app/employees`,JSON.stringify({ id:id,availSet:true}), { headers:{"Content-type":"application/json"}, withCredentials:true})
    }
    //functions to set edit to true
    const handleMondayEdit =()=>{
        setMondayEdit(true);
    }
    const handleTuesdayEdit =()=>{
        setTuesdayEdit(true);
    }
    const handleWednesdayEdit =()=>{
        setWednesdayEdit(true);
    }
    const handleThursdayEdit =()=>{
        setThursdayEdit(true);
    }
    const handleFridayEdit =()=>{
        setFridayEdit(true);
    }
    const handleSaturdayEdit =()=>{
        setSaturdayEdit(true);
    }
    const handleSundayEdit =()=>{
        setSundayEdit(true);
    }
    //functions to handle submitting days to backend
    const submitMonday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
         if (mondayEdit)
        {
        var id
        
          availArr.data.map((avail) =>{
            if(avail.day === "Monday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Monday",startTime:mondayStart, endTime:mondayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setMondayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Monday",startTime:mondayStart, endTime:mondayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }
    const submitTuesday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
            console.log(tuesdayEdit)
        if (tuesdayEdit)
        {
        var id
        availArr.data.map((avail) =>{
            if(avail.day === "Tuesday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Tuesday",startTime:tuesdayStart, endTime:tuesdayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setTuesdayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Tuesday",startTime:tuesdayStart, endTime:tuesdayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }
    const submitWednesday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
        if (wednesdayEdit)
        {
        var id
         availArr.data.map((avail) =>{
            if(avail.day === "Wednesday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Wednesday",startTime:wednesdayStart, endTime:wednesdayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setWednesdayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Wednesday",startTime:wednesdayStart, endTime:wednesdayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }
    const submitThursday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
        if (thursdayEdit)
        {
        var id
         availArr.data.map((avail) =>{
            if(avail.day === "Thursday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Thursday",startTime:thursdayStart, endTime:thursdayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setThursdayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Thursday",startTime:thursdayStart, endTime:thursdayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }
    const submitFriday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
         if (fridayEdit)
        {
        var id
         availArr.data.map((avail) =>{
            if(avail.day === "Friday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Friday",startTime:fridayStart, endTime:fridayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setFridayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Friday",startTime:fridayStart, endTime:fridayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }
    const submitSaturday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
         if (saturdayEdit)
        {
        var id
         availArr.data.map((avail) =>{
            if(avail.day === "Saturday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Saturday",startTime:saturdayStart, endTime:saturdayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setSaturdayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Saturday",startTime:saturdayStart, endTime:saturdayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }
    const submitSunday = async ()  =>{
        const empId = localStorage.getItem("id")
        try{
        if (sundayEdit)
        {
        var id
         availArr.data.map((avail) =>{
            if(avail.day === "Sunday")
            {
                id = avail.id;
            }
        })
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Sunday",startTime:sundayStart, endTime:sundayEnd,id:id}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setSundayEdit(false)
        }
        else{
        await axiosPrivate.post("https://schedularback-production.up.railway.app/employeeAvail",
        JSON.stringify({day:"Sunday",startTime:sundayStart, endTime:sundayEnd,employee:empId}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        }
        }
        catch(err){
            console.log(err)// TODO: future set err msg
        }
    }

  return (
  <div>
    <section className={isLoading ? " min-h-screen w-full bg-gray-800 border-gray-700:text-white flex flex-col m-auto items-center justify-center" : "hidden"} > 
         <div className='animate-spin text-2xl'> <VscLoading/> </div>
    </section>

        <section className={!isLoading ?" min-h-screen w-full bg-gray-800 border-gray-700 text-white flex flex-col m-auto items-center justify-center": "hidden"}> 
         
         <h1 className=" text-center font-semibold text-xl">Availibility</h1>
            <form className="flex flex-col  my-2" onSubmit={handleSubmit}>
               
                <div className='flex flex-row justify-between'>
                <label htmlFor= "Monday" className="mb-2 font-medium underline underline-offset-1">Monday</label>
                <button onClick={handleMondayEdit} className={mondayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>
                
                <div id={'MondayStart'} className={ mondayEdit || !availSet ? 'flex flex-col': "hidden"} >
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitMonday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setMondayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                <div className={!mondayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Monday Start Time:</h4>
                <p>{mondayStart}</p>
                <h4>Monday End Time:</h4>
                <p>{mondayEnd}</p>
                
                </div>
                
                  <div className='flex flex-row justify-between'>
                <label htmlFor= "Tuesday" className="mb-2 font-medium underline underline-offset-1">Tuesday</label>
                <button onClick={handleTuesdayEdit} className={tuesdayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>

                <div id={'TuesdayStart'} className={ tuesdayEdit || !availSet ? 'flex flex-col': "hidden"}  >
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitTuesday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setTuesdayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                
                 <div className={!tuesdayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Tuesday Start Time:</h4>
                <p>{tuesdayStart}</p>
                <h4>Tuesday End Time:</h4>
                <p>{tuesdayEnd}</p>
                
                </div>
                <div className='flex flex-row justify-between'>
                <label htmlFor= "Wednesday" className="mb-2 font-medium underline underline-offset-1">Wednesday</label>
                <button onClick={handleWednesdayEdit} className={wednesdayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>
                <div id={'WednesdayStart'} className={ wednesdayEdit || !availSet ? 'flex flex-col': "hidden"}  >
                     <label htmlFor= {`Wednesdaystart`} className="mb-2 " >Wednesday Start Time:</label>
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitWednesday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setWednesdayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                
                <div className={!wednesdayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Wendnesday Start Time:</h4>
                <p>{wednesdayStart}</p>
                <h4>Wendnesday End Time:</h4>
                <p>{wednesdayEnd}</p>
                </div>
                <div className='flex flex-row justify-between' >
                <label htmlFor= "Thursday" className="mb-2 font-medium underline underline-offset-1">Thursday</label>
                <button onClick={handleThursdayEdit} className={thursdayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>
                <div id={'ThursdayStart'} className={ thursdayEdit || !availSet ? 'flex flex-col': "hidden"} >
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitThursday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setThursdayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                
                <div className={!thursdayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Thursday Start Time:</h4>
                <p>{thursdayStart}</p>
                <h4>Thursday End Time:</h4>
                <p>{thursdayEnd}</p>
                </div>
                <div className='flex flex-row justify-between'>
                <label htmlFor= "Friday" className="mb-2 font-medium underline underline-offset-1">Friday</label>
                <button onClick={handleFridayEdit} className={fridayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>
                <div id={'FridayStart'}className={ fridayEdit || !availSet ? 'flex flex-col': "hidden"} >
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitFriday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setFridayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                
                <div className={!fridayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Friday Start Time:</h4>
                <p>{fridayStart}</p>
                <h4>Friday End Time:</h4>
                <p>{fridayEnd}</p>
                </div>
                <div className='flex flex-row justify-between'>
                <label htmlFor= "Saturday" className="mb-2 font-medium underline underline-offset-1">Saturday</label>
                <button onClick={handleSaturdayEdit} className={saturdayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>
                <div id={'SaturdayStart'}className={ saturdayEdit || !availSet ? 'flex flex-col': "hidden"}>
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitSaturday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setSaturdayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                
                <div className={!saturdayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Saturday Start Time:</h4>
                <p>{saturdayStart}</p>
                <h4>Saturday End Time:</h4>
                <p>{saturdayEnd}</p>
                </div>
               <div className='flex flex-row justify-between'>
                <label htmlFor= "Sunday" className="mb-2 font-medium underline underline-offset-1">Sunday</label>
                <button onClick={handleSundayEdit} className={sundayEdit  ? "disabled opacity-70":""} type ="button"><MdEdit/></button>
                </div>
                <div id={'SundayStart'}className={ sundayEdit || !availSet ? 'flex flex-col': "hidden"}>
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
                <div className={availSet ? 'flex flex-row justify-between' : 'hidden'}>
                <button type="button" onClick={submitSunday} className="bg-white rounded-md w-full text-gray-800 mr-1 font-semibold">Save</button>
                <button type="button" onClick={() => setSundayEdit(false)}  className="bg-white w-full ml-1 rounded-md text-gray-800 font-semibold">Cancel</button>
                </div>
                </div>
                
                <div className={!sundayEdit && availSet ? 'flex flex-col':"hidden"}>
                <h4> Sunday Start Time:</h4>
                <p>{sundayStart}</p>
                <h4>Sunday End Time:</h4>
                <p>{sundayEnd}</p>
                </div>
               <button className={availSet ? "hidden" :'rounded-sm bg-white text-gray-800 text-center'} value="Submit" type = "submit">Submit</button>
                
            </form>
            
    </section>
    </div>
  )
}

export default Availability