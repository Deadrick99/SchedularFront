import React from 'react'
import {AiFillEdit} from "react-icons/ai"
import "../output.css" 
import { useState,useEffect } from 'react';

import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import Availability from './Availability'
function StoreHours() {
    const axiosPrivate = useAxiosPrivate()
    //constants for option map
    const availibityArr = ["OPEN","9AM","10AM", "11AM","12PM","1PM", "2PM","3PM","4PM", "5PM", "6PM","7PM", "8PM","CLOSE"]
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
    
    ]);
    //state for handling and rerendering edits
    const [edit, setEdit] = useState(false);
    //sets Id for edit 
    const [editId,setEditId] = useState("");
    var dayCheckDay;
    // state for all store hours
    const [days, setDays] = useState([])
    // sate for adding to a a day
    const [mondayAdd, setMondayAdd] = useState(false);
    const [tuesdayAdd, setTuesdayAdd] = useState(false);
    const [wednesdayAdd, setWednesdayAdd] = useState(false);
    const [thursdayAdd, setThursdayAdd] = useState(false);
    const [fridayAdd, setFridayAdd] = useState(false);
    const [saturdayAdd, setSaturdayAdd] = useState(false);
    const [sundayAdd, setSundayAdd] = useState(false);
    const [showMondayAdd, setShowMondayAdd] = useState(false)
    const [showTuesdayAdd, setShowTuesdayAdd] = useState(false)
    const [showWednesdayAdd, setShowWednesdayAdd] = useState(false)
    const [showThursdayAdd, setShowThursdayAdd] = useState(false)
    const [showFridayAdd, setShowFridayAdd] = useState(false)
    const [showSaturdayAdd, setShowSaturdayAdd] = useState(false)
    const [showSundayAdd, setShowSundayAdd] = useState(false)
    //state for add for days
    const [start ,setStart]=useState("");
    const [end,setEnd]=useState("");
   
     //state for focus
    const [focus,setFocus] = useState(false)
    //states for validation
    const [valid,setValid] = useState(false)
    //state for hours
    const [numEmployees, setNumEmployees] = useState(0);
    const [numEmployeesFocus, setNumEmployeesFocus] = useState(false);
    const [validNumEmployees, setValidNumEmployees] = useState(false);

    //varable to hold day to send to API
   
    // user is doing something so dont let other edits
    const [action, setAction ] = useState(false)
    const [editAction, setEditAction] = useState(false) 
    //function to check validty of hours
     const checkNumEmployees=(numEmployees)=>{
        
        if( numEmployees> 0 && numEmployees<12){
        setNumEmployees(numEmployees);
        setValidNumEmployees(true)
        }
        else
        setValidNumEmployees(false)
    } 
    const getStoreHours= async ()=>{

            const res =await axiosPrivate.get(`https://schedularback-production.up.railway.app/day`,{ headers:{"Content-type":"application/json"}, withCredentials:true})
            setDays(res.data)
            
    }
    useEffect(() =>{
        
        getStoreHours()
        
       
    },[])
    const checkDay= (dayOfWeekP) =>{
        console.log(dayOfWeekP)
        const daysToValidate = days.filter(day => day.dayOfWeek === dayOfWeekP )
        for(let i = 0; i< daysToValidate.length; i++){
            
            if((availibilty.get(daysToValidate[i].endTime) > availibilty.get(start)) && (availibilty.get(daysToValidate[i].startTime) < availibilty.get(end))){
                
                if (daysToValidate[i].id !== editId){
                    setValid(false)
                    console.log("hi")
                    return
                }
            }
        };
         if(start === ""|| end === ""){
          setValid(false)
           console.log("hi1")
        }
        else if((availibilty.get(end)- availibilty.get(start) <1)){
            setValid(false)
             console.log("hi2")
             console.log(availibilty.get(end)- availibilty.get(start))
             console.log(end)
             console.log(start)
             
        }
        else 
            setValid(true)
                
    }
    const checkStart = (startP,day) =>{
        dayCheckDay = day
        setStart(startP)
        //checkDay(day)
    }
    const checkEnd = (endP,day) =>{
       dayCheckDay = day
        setEnd(endP)
        
    }
    useEffect(()=>{
        checkDay(dayCheckDay)
    },[end,start])
    
    const saveHours = async (day, setAdd) => {
        await axiosPrivate.post("https://schedularback-production.up.railway.app/day",
        JSON.stringify({day:day,startTime:start, endTime:end,storeId: localStorage.getItem("storeId"), numEmployees:parseInt(numEmployees)  }), { headers:{"Content-type":"application/json"}, withCredentials:true})
        const res =await axiosPrivate.get(`https://schedularback-production.up.railway.app/day`,{ headers:{"Content-type":"application/json"}, withCredentials:true})
        setDays(res.data)
        setAction(false)
         switch (day){
            case "Monday":
                 setShowMondayAdd(false);
                 setMondayAdd(false);
                
            break;
            case "Tuesday":
                 setShowTuesdayAdd(false);
                 setTuesdayAdd(false);
                
            break;
            case "Wednesday":
                setShowWednesdayAdd(false);
                setWednesdayAdd(false);
                
            break;
            case "Thursday":
                setShowThursdayAdd(false);
                setThursdayAdd(false);
               
            break;
            case "Friday":
                 setShowFridayAdd(false);
                 setFridayAdd(false);
               
            break;
            case "Saturday":
                 setShowSaturdayAdd(false);
                 setSaturdayAdd(false);
                
            break;
            case "Sunday":
                setShowSundayAdd(false);
                setSundayAdd(false);
                
            break;
         }
    }
    const displayGrid = (dayToDisplay) => {
       
       
        const daysToDisplay = days.filter(day => day.dayOfWeek === dayToDisplay )
        daysToDisplay.sort((shift1, shift2) => (availibilty.get(shift1.endTime) > availibilty.get(shift2.endTime)) ? 1 : (availibilty.get(shift1.endTime) < availibilty.get(shift2.endTime)) ? -1 : 0 )
        return(
            <>
            {daysToDisplay.map((shift) => (
                <>
                <p className={(shift.id === editId) ? "hidden": ""}>{shift.startTime}</p>    
                <p className={(shift.id === editId) ? "hidden": ""}>{shift.endTime}</p>    
                <p className={(shift.id === editId) ? "hidden": ""}>{shift.numEmployees}</p>
                <button  className={(shift.id === editId ) ? "hidden ": "" } disabled={ action || editAction ? true: false} onClick={() => editShift(shift.id)}><AiFillEdit /></button>
                  {/* start of edit */}
                <select id={`Mondaystart`} defaultValue={shift.startTime} onChange={(e)=> checkStart(e.target.value,shift.dayOfWeek)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={ (shift.id === editId) ? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm"): "hidden" }>
                
                {
                availibityArr.map((time)=> (
                <option key={`Monday:${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
            <select id={`Mondaystart`} defaultValue={shift.endTime} onChange={(e)=> checkEnd(e.target.value,shift.dayOfWeek)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={(shift.id === editId) ? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm"): "hidden" }>
                
                {
                availibityArr.map((time)=> (
                <option key={`Monday:${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
            <input className={(shift.id === editId) ? (validNumEmployees && numEmployeesFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validNumEmployees && numEmployeesFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"):"hidden"}
            type="number"
            min='1'
            max='12'
            defaultValue={shift.numEmployees}
            onChange={(e)=> checkNumEmployees(e.target.value)}
            onFocus={()=> setNumEmployeesFocus(true)}
            onBlur={() => setNumEmployeesFocus(false)}
            >
            </input>
            <div className={(shift.id === editId)?"":"hidden"}>
                <button onClick={() => updateShift(shift)} className={(shift.id === editId)?"bg-white rounded-md w-full text-gray-800":"hidden"}>Save</button>
                <button onClick={() => cancelEdit()} className={(shift.id === editId)?"bg-white rounded-md w-full text-gray-800":"hidden"}>Cancel</button>
                <button onClick={() => deleteShift(shift)} className={(shift.id === editId)?"bg-white rounded-md w-full text-gray-800":"hidden"}>Delete</button>
            </div>
                </>
                ))}
                </>
            
        )
    }

    const cancelEdit = () =>{
        setEditAction (false);
        setEditId("")
    } 
    const deleteShift = async (shift) => {
        cancelEdit ()
        
        await axiosPrivate.delete(`https://schedularback-production.up.railway.app/day/${shift.id}`,
        { headers:{"Content-type":"application/json"}, withCredentials:true})
        getStoreHours()
    }
    const updateShift = async (day)  => {
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/day",
        JSON.stringify({day:day.dayOfWeek, startTime:start, endTime:end, numEmployees:parseInt(numEmployees),id:day.id  }), { headers:{"Content-type":"application/json"}, withCredentials:true})
        const res =await axiosPrivate.get(`https://schedularback-production.up.railway.app/day`,{ headers:{"Content-type":"application/json"}, withCredentials:true})
        setDays(res.data)
        setEditId("")
        setEditAction(false)

    }
    const editShift = (shiftId) =>{
        setEditId(shiftId)
       setEditAction(true);
    }
    // function for edit
    const addGrid = (day) =>{
        var setAdd;
        var showAdd;
        switch (day){
            case "Monday":
                setAdd = setMondayAdd;
                showAdd = showMondayAdd
            break;
            case "Tuesday":
                setAdd = setTuesdayAdd;
                showAdd = showTuesdayAdd
            break;
            case "Wednesday":
                setAdd = setWednesdayAdd;
                showAdd = showWednesdayAdd
            break;
            case "Thursday":
                setAdd = setThursdayAdd;
                showAdd = showThursdayAdd
            break;
            case "Friday":
                setAdd = setFridayAdd;
                showAdd = showFridayAdd
            break;
            case "Saturday":
                setAdd = setSaturdayAdd;
                showAdd = showSaturdayAdd
            break;
            case "Sunday":
                setAdd = setSundayAdd;
                showAdd = showSundayAdd
            break;
        }
        return (
            <>
           <select id={`Mondaystart`} defaultValue={"DEFAULT"} onChange={(e)=> checkStart(e.target.value,day)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={showAdd  ? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm"): "hidden" }>
                <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                {
                availibityArr.map((time)=> (
                <option key={`Monday:${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
            <select id={`Mondaystart`} defaultValue={"DEFAULT"} onChange={(e)=> checkEnd(e.target.value,day)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={showAdd ? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm"): "hidden" }>
                <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                {
                availibityArr.map((time)=> (
                <option key={`Monday:${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
            <input className={showAdd ? (validNumEmployees && numEmployeesFocus? "border-green-500 mb-1 border-4 rounded-sm text-black ": !validNumEmployees && numEmployeesFocus? "border-red-500 mb-1 border-4 rounded-sm text-black":"mb-1 border-4 rounded-sm text-black"):"hidden"}
            type="number"
            min='1'
            max='12'
            onChange={(e)=> checkNumEmployees(e.target.value)}
            onFocus={()=> setNumEmployeesFocus(true)}
            onBlur={() => setNumEmployeesFocus(false)}
            >
            </input>
            <button onClick={() => saveHours(day,setAdd)} className={showAdd?"bg-white rounded-md w-full text-gray-800":"hidden"}>Save</button>
            </>
        )
    }
    const handleAdd = (setAdd,add,setShowAdd,showAdd) => {
        setAdd(!add)
        setShowAdd(!showAdd)
        setAction(!action);
    }
  return (
    <section className='border-gray-200 bg-gray-50 min-h-screen w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col m-auto items-center justify-center'>
        <h1 className='text-center font-semibold text-xl mb-8'>Store Hours</h1>
        <div className='flex flex-row justify-between w-3/4'>
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='mondayInfo'>Monday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setMondayAdd,mondayAdd, setShowMondayAdd,showMondayAdd)} disabled={editAction || action == true ? true :false} className={mondayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setMondayAdd,mondayAdd, setShowMondayAdd,showMondayAdd)} className={mondayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
         
        <div id="MondayInfo" className='grid grid-cols-4 mb-3 gap-3 w-3/4'>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Monday")}
           {addGrid("Monday")}
        </div>
        <div className='flex flex-row justify-between w-3/4 mt-4'>
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='TuesdayInfo'>Tuesday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setTuesdayAdd,tuesdayAdd,setShowTuesdayAdd,showTuesdayAdd)} disabled={editAction || action == true ? true :false} className={tuesdayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setTuesdayAdd,tuesdayAdd,setShowTuesdayAdd,showTuesdayAdd)} className={tuesdayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
         
        <div id="TuesdayInfo" className='grid grid-cols-4 mb-3 gap-3 w-3/4'>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Tuesday")}
           {addGrid("Tuesday")}
        </div>
        <div className='flex flex-row justify-between w-3/4 mt-4'>
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='WednesdayInfo'>Wednesday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setWednesdayAdd,wednesdayAdd, setShowWednesdayAdd,showWednesdayAdd)} disabled={editAction || action == true ? true :false} className={wednesdayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setWednesdayAdd,wednesdayAdd, setShowWednesdayAdd,showWednesdayAdd)} className={wednesdayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
         
        <div id="WednesdayInfo" className='grid grid-cols-4 mb-3 gap-3 w-3/4'>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Wednesday")}
           {addGrid("Wednesday")}
        </div>
        <div className='flex flex-row justify-between  w-3/4 mt-4'>
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='ThursdayInfo'>Thursday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setThursdayAdd,thursdayAdd, setShowThursdayAdd, showThursdayAdd)} disabled={editAction || action == true ? true :false} className={thursdayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setThursdayAdd,thursdayAdd, setShowThursdayAdd, showThursdayAdd)} className={thursdayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
         
        <div id="ThursdayInfo" className='grid grid-cols-4 mb-3  w-3/4 '>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Thursday")}
           {addGrid("Thursday")}
        </div>
        <div className='flex flex-row justify-between  w-3/4 mt-4' >
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='FridayInfo'>Friday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setFridayAdd,fridayAdd, setShowFridayAdd,showFridayAdd)} disabled={editAction || action == true ? true :false} className={fridayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setFridayAdd,fridayAdd, setShowFridayAdd,showFridayAdd)} className={fridayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
         
        <div id="FridayInfo" className='grid grid-cols-4 mb-3 gap-3 w-3/4 '>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Friday")}
           {addGrid("Friday")}
        </div>
        <div className='flex flex-row justify-between w-3/4 mt-4'>
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='SaturdayInfo'>Saturday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setSaturdayAdd,saturdayAdd, setShowSaturdayAdd,showSaturdayAdd)} disabled={editAction || action == true ? true :false} className={saturdayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setSaturdayAdd,saturdayAdd, setShowSaturdayAdd,showSaturdayAdd)} className={saturdayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
       
        <div id="SaturdayInfo" className='grid grid-cols-4 mb-3 gap-3 w-3/4 '>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Saturday")}
           {addGrid("Saturday")}
        </div>
          <div className='flex flex-row justify-between w-3/4 mt-4'>
            <label className="mb-2 font-medium underline underline-offset-1" htmlFor='SundayInfo'>Sunday Hours</label>
            <div className='flex flex-row '>
                <button onClick={() =>handleAdd(setSundayAdd,sundayAdd, setShowSundayAdd, showSundayAdd)} disabled={editAction || action == true ? true :false} className={sundayAdd?"hidden":'dark:bg-white dark:text-black p-2 rounded-full mr-1'}>{ "Add"}</button>
                <button onClick={() =>handleAdd(setSundayAdd,sundayAdd, setShowSundayAdd, showSundayAdd)} className={sundayAdd?' dark:bg-white dark:text-black p-2 rounded-full mr-1':"hidden"}>{"Cancel"}</button>

                
            </div>
        </div>
         
        <div id="SundayInfo" className='grid grid-cols-4 gap-3 mb-3 w-3/4'>
           <div>Start Time</div>
           <div>End Time</div>
           <div># Employees</div>
           <div></div>
          {displayGrid("Sunday")}
           {addGrid("Sunday")}
        </div>
        <span className='h-10 w-full screen fixed bottom-0 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700
            flex flex-wrap items-center mx-auto'>
        <p className='self-center mx-auto text-md dark:text-white'>© William Simmons 2023</p>
         </span>
       
    </section>
  )
}

export default StoreHours