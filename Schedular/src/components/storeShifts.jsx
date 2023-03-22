import React from 'react'
import {useState,useEffect} from 'react'
import "../output.css"
import {AiFillEdit} from "react-icons/ai"
import useAxiosPrivate from '../Hooks/useAxiosPrivate'


function StoreShifts() {
    
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
  
    const [add, setAdd] = useState(false)
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)
    const [focus,setFocus] = useState(false)
    const [valid, setValid] = useState(false)
    const [shifts, setShifts] = useState([])
    const [edit, setEdit ] = useState(false)
    const [editId,setEditId] = useState(false)

    const handleEdit = (id) => {
        setEdit(!edit)
        setEditId(id)
    }
    const handleCancel = () => {
        setEdit(!edit)
        setEditId("")
    }

    const handleAdd = ()  => {
        setAdd(!add)
    }
    const handleDelete = async (shift) => {
        setEdit(!edit)
        setEditId("")
        await axiosPrivate.delete(`https://schedularback-production.up.railway.app/shiftType/${shift.id}`,
        { headers:{"Content-type":"application/json"}, withCredentials:true})
        getStoreShifts()

    }
    const handleSave = async (shift) => {
        if(add){
        await axiosPrivate.post("https://schedularback-production.up.railway.app/shiftType",
        JSON.stringify({endTime: end, startTime: start, store: localStorage.getItem("storeId")}), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setAdd(!add)
        }
        else{
        await axiosPrivate.patch("https://schedularback-production.up.railway.app/shiftType",
        JSON.stringify({endTime: end, startTime: start, id:shift.id }), { headers:{"Content-type":"application/json"}, withCredentials:true})
        setEdit(!edit)
        setEditId("")
        }
        getStoreShifts()
        
       

    }
    useEffect (() => {
        if (availibilty.get(end) > availibilty.get(start) )
        {
            setValid(true);
        }
    },[end,start])
    const getStoreShifts = async () => {
        const res = await axiosPrivate.get(`https://schedularback-production.up.railway.app/shiftType`,{ headers:{"Content-type":"application/json"}, withCredentials:true})
        setShifts(res.data)
        
    }
    useEffect(() => {
        getStoreShifts();
    },[])
    const addShfits = () => {
        return (
          <>
              <select id={`start`} defaultValue={"DEFAULT"} onChange={(e)=> setStart(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={add? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm") : "hidden" }>
                <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                {
                availibityArr.map((time)=> (
                <option key={`${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
           <select id={`end`} defaultValue={"DEFAULT"} onChange={(e)=> setEnd(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={add? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm") : "hidden" }>
                <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                {
                availibityArr.map((time)=> (
                <option key={`${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
           <div className={add? "" : "hidden"}>
            <button disabled={valid? false : true} onClick={() => handleSave()} className='bg-white rounded-md w-full text-gray-800'>Save</button>
           </div>
        </>
        )
    }
    const displayShifts = () => {
        
        const shiftsToDisplay = shifts.filter(shift => shift.storeId === localStorage.getItem("storeId"))
        shiftsToDisplay.sort((shift1, shift2) => (availibilty.get(shift1.startTime) > availibilty.get(shift2.startTime)) ? 1 : (availibilty.get(shift1.startTime) < availibilty.get(shift2.startTime)) ? -1 : 0 )
       
        return (<>{shiftsToDisplay.map((shift)=>(
            <>
            <p className={(shift.id === editId) ? "hidden": ""}>{shift.startTime}</p>
            <p className={(shift.id === editId) ? "hidden": ""}>{shift.endTime}</p>
            <button className={(shift.id === editId) ? "hidden": ""} disabled= {add || edit ? true : false} onClick={() => handleEdit(shift.id)}>edit</button>
            <select id={`start`} defaultValue={shift.startTime} onChange={(e)=> setStart(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={(shift.id === editId)? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm") : "hidden" }>
                <option value={"DEFAULT"} disabled hidden>Select Your Start Time -{">"}</option>
                {
                availibityArr.map((time)=> (
                <option key={`${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
           <select id={`end`} defaultValue={shift.endTime} onChange={(e)=> setEnd(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className={(shift.id === editId)? (valid && focus ? "border-green-500 text-black mb-1 border-4 rounded-sm": 
                !valid && focus? "border-red-500 text-black mb-1 border-4 rounded-sm":" text-black mb-1 border-4 rounded-sm") : "hidden" }>
                <option value={"DEFAULT"} disabled hidden>Select Your End Time -{">"}</option>
                {
                availibityArr.map((time)=> (
                <option key={`${time}`} value={time}>{time}</option>
                ))                        
                }
            </select>
           <div className={(shift.id === editId)? "" : "hidden"}>
            <button disabled={valid? false : true} onClick={() => handleSave(shift)} className='bg-white rounded-md w-full text-gray-800'>Save</button>
            <button onClick={() => handleCancel()} className='bg-white rounded-md w-full text-gray-800'>Cancel</button>
            <button onClick={() => handleDelete(shift)} className='bg-white rounded-md w-full text-gray-800'>Delete</button>
           </div>
            </>
        ))}
        
              
        </>
        )
    }
        return(
             <section className='border-gray-200 bg-gray-50 min-h-screen w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col m-auto items-center justify-center'>
            
             <h1 className='mb-6 underline'> Store Shifts</h1>
           <button disabled= {edit? true: false} onClick={() => handleAdd()} className='bg-white rounded-md w-1/2 text-gray-800 my-5'>{!add? "Add" : "Cancel"}</button>
        <div className= "grid grid-cols-3 gap-4 w-3/4">
        <h3>Start Time</h3>
        <h3>End Time</h3>
        <div></div>
        {displayShifts()}
        {addShfits()}
        
      
    </div>
    <span className='h-10 w-full screen fixed bottom-0 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700
            flex flex-wrap items-center mx-auto'>
        <p className='self-center mx-auto text-md dark:text-white'>© William Simmons 2023</p>
         </span>
        </section>
  )
}

export default StoreShifts