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
    const availibiltyRev= new Map([
    [-1,"OPEN"],
    [0,"9AM"],
    [1,"10AM"],
    [2,"11AM"],
    [3,"12PM"],
    [4,"1PM"],
    [5,"2PM"],
    [6,"3PM"],
    [7,"4PM"],
    [8,"5PM"],
    [9,"6PM"],
    [10,"7PM"],
    [11,"8PM"],
    [12,"CLOSE"],
    
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
   /// beginning of make schedule
   const [employeesArr, setEmployeesArr] = useState([])
   const [storeHoursArr, setStoreHoursArr] = useState([])
   const [shiftsArr, setShiftsArr] = useState([])
   const employeesScheduled  =[]; 

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    
    
    async function handleShift (){
            const array = [];
            await axiosPrivate.get(`https://schedularback-production.up.railway.app/shiftType`,
            { headers:{"Content-type":"application/json"}, withCredentials:true}).then(results => {
                const shiftsRes = results.data;
                shiftsRes.forEach( shift => {
                    const hours = Math.abs(availibilty.get(shift.startTime)- availibilty.get(shift.endTime))
                const obj = {
                    id: shift.id,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                    hours:hours
                }
                array.push(obj)
                })
           
            })
           setShiftsArr(array)
          const array2 = [];
            await axiosPrivate.get(`https://schedularback-production.up.railway.app/day`,
            { headers:{"Content-type":"application/json"}, withCredentials:true}).then(results =>{
                const storeHoursRes = results.data;
                storeHoursRes.forEach(block => {
                    var start= availibilty.get(block.startTime)
                    while (start != availibilty.get(block.endTime)){
                        const obj ={
                            day: block.dayOfWeek,
                            startTime: availibiltyRev.get(start),
                            endTime: availibiltyRev.get(start+1),
                            numEmployees:block.numEmployees,
                            hasLead: false
                        }
                        array2.push(obj)
                        start++
                    }
                })
                array2.sort((a, b) =>{ 
                    if(a.day<b.day)
                    return -1
                    else if(a.day> b.day)
                    return 1
                    else if (availibilty.get(a.startTime)>availibilty.get( b.startTime))
                    return 1
                    else 
                    return -1
                })
            })
            setStoreHoursArr( array2)
            const array3 = [];
            await axiosPrivate.get(`https://schedularback-production.up.railway.app/employees`,
            { headers:{"Content-type":"application/json"}, withCredentials:true}).then(results => {
                const resultsArr = results.data;
                const getEmployeeAvail =async (id) =>{
                    const availArr = []
                    await axiosPrivate.get(`https://schedularback-production.up.railway.app/employeeAvail/${id}`,
                    { headers:{"Content-type":"application/json"}, withCredentials:true}).then(employeeRes => {
                        const resArray = employeeRes.data
                        resArray.forEach(avail => {
                        const availObj = {
                            day:avail.day,
                            startTime: avail.startTime,
                            endTime: avail.endTime
                        }
                    availArr.push(availObj)
                     });
                    })
                   
                return availArr
            }
            resultsArr.forEach( async employee => {
                const availArr =  await getEmployeeAvail(employee.id)
                const empObject = {
                    id:  employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    userName: employee.userName,
                    hours: employee.numHours,
                    avail: availArr,
                    roles:employee.roles,
                    hoursScheduled:0
                }
                array3.push(empObject)
            });           
            })
            setEmployeesArr(array3)  
            make()
    }
    const make =()=>{
        function isOpen(employee){
            
            if(employee.roles.includes(4327)){
                
            return employee
            }
        }
        function isLead(employee){
            
            if(employee.roles.includes(6844)){
                
            return employee
            }
        }
        
        const openersArr = employeesArr.filter(isOpen);
        const shiftLeadsArr = employeesArr.filter(isLead)
        for (var i =0; i< storeHoursArr.length; i ++){
            
            while (storeHoursArr[i].numEmployees > 0){
                
                if(storeHoursArr[i].startTime == "OPEN"){
                     var availEmps = openersArr.filter(employee => (employee.avail.some(day => (day.day == storeHoursArr[i].day) && (day.startTime ==storeHoursArr[i].startTime)))).sort((a,b) => {
                        if(a.hoursScheduled < b.hoursScheduled){
                            return -1;
                        }
                        else return 1; 
                     })
                     if(availEmps.length == 0)
                     {
                        console.log("NO AVAIL EMPLOYEES")
                        break;
                     }
                     var employee = availEmps[0]

                     var availShifts = shiftsArr.filter(shift => shift.startTime == "OPEN")
                     var availShifts2 = availShifts.filter(shift => employee.avail.some(day => (day.day== storeHoursArr[i].day) && (availibilty.get(day.endTime) >= availibilty.get(shift.endTime))))

                     const assignedShift = availShifts2[Math.floor(Math.random() * (availShifts2.length-1))]

                     employee.hoursScheduled += assignedShift.hours;
                     const obj = {
                        employeeId: employee.id,
                        shiftId: assignedShift.id,
                        day: storeHoursArr[i].day,
                        endTime: assignedShift.endTime,
                        startTime: assignedShift.startTime,
                        date: currentDate,
                        roles: employee.roles
                     }
                    employeesScheduled.push(obj)
                    for (var j = i; j< assignedShift.hours +i; j++ ){
                        storeHoursArr[j].hasLead = true;
                        storeHoursArr[j].numEmployees--;
                    }
                   
                } 
                else if(storeHoursArr[i].hasLead == false){
                    var availShifts2 = shiftsArr.filter(shift => shift.startTime == storeHoursArr[i].startTime)
                        if(availShifts2.length == 0){
                            var problemShift = employeesScheduled.filter(emp => (emp.endTime == storeHoursArr[i].startTime ) && (emp.day == storeHoursArr[i].day) && emp.roles.filter(role => role == 6844))
                            var solutionShift = shiftsArr.filter(shift => (shift.startTime == problemShift[0].startTime) && (shift.endTime != problemShift[0].endTime))
                            var loopCounter = availibilty.get(solutionShift[0].endTime) - availibilty.get(problemShift[0].endTime)
                            problemShift[0].shiftId = solutionShift[0].id
                            problemShift[0].startTime = solutionShift[0].startTime
                            problemShift[0].endTime = solutionShift[0].endTime
                            for (var k = i; k< i+ loopCounter ; k++){
                                storeHoursArr[k].numEmployees--;
                            }
                            continue;
                        }
                    // filters out the avail employees based on the employee day matching the block day
                    // and the employee avail makes sure the employee start time is befor or ron block start tiem 
                    var availEmps = shiftLeadsArr.filter(employee => (employee.avail.some(day => (day.day == storeHoursArr[i].day) && (availibilty.get(day.startTime) <=(availibilty.get(storeHoursArr[i].startTime)))))).sort((a,b) => {
                        //then sorts employees based on hours scheduled
                        if(a.hoursScheduled < b.hoursScheduled){
                            return -1;
                        }
                        else return 1; 
                    })
                    // if no avail employees print error and exit
                    if(availEmps.length == 0)
                    {
                        console.log("NO AVAIL EMPLOYEES")
                        return; 
                    }
                    // go through all employees and find shifts that match employees avail 
                    for (var j =0 ; j< availEmps.length; j ++){ 
                        var employee = availEmps[j]
                        
                        var availShifts = shiftsArr.filter(shift => shift.startTime == storeHoursArr[i].startTime)
                      
                        var availShifts2 = availShifts.filter(shift => employee.avail.some(day => (day.day== storeHoursArr[i].day) &&  (availibilty.get(day.endTime) >= availibilty.get(shift.endTime))))
                        
                        //if none break 
                        if (availShifts2.length > 0){
                        break
                        }
                        else if (j == availEmps.length)
                        {
                            console.log("NO AVAIL SHIFTS")
                            return
                        }
                        
                    }
                    // pick a random shift from avail shift 
                     const assignedShift = availShifts2[Math.floor(Math.random() * (availShifts2.length))]
                    // increment employees hours scheduled 
                     employee.hoursScheduled += assignedShift.hours;
                     const obj = {
                        employeeId: employee.id,
                        shiftId: assignedShift.id,
                        day: storeHoursArr[i].day,
                        endTime: assignedShift.endTime,
                        startTime: assignedShift.startTime,
                        date: currentDate,
                        roles: employee.roles
                     }
                    
                    // decrement number of employees for blocks and set has lead = true for employees that have shift lead

                    for (var j = i; j< assignedShift.hours +i; j++ ){
                        if(storeHoursArr[j].numEmployees == 0){
                            
                            var problemShift = assignedShift
                            var solutionShift = shiftsArr.filter(shift => (shift.startTime == problemShift.startTime) && (availibilty.get(shift.endTime) == availibilty.get(problemShift.endTime)-1))
                            obj.shiftId = solutionShift[0].id
                            obj.startTime = solutionShift[0].startTime
                            obj.endTime = solutionShift[0].endTime
                            
                             break;
                             }
                         
                         else{                           
                        storeHoursArr[j].hasLead = true;
                        storeHoursArr[j].numEmployees--;
                        }
                    }
                    employeesScheduled.push(obj)
                }
                else {
                     var availShifts2 = shiftsArr.filter(shift => shift.startTime == storeHoursArr[i].startTime)
                        if(availShifts2.length == 0){
                            var problemShift = employeesScheduled.filter(emp => (emp.endTime == storeHoursArr[i].startTime ) && (emp.day == storeHoursArr[i].day) )
                            var solutionShift = shiftsArr.filter(shift => (shift.startTime == problemShift[0].startTime) && (shift.endTime != problemShift[0].endTime))
                            var loopCounter = availibilty.get(solutionShift[0].endTime) - availibilty.get(problemShift[0].endTime)
                            problemShift[0].shiftId = solutionShift[0].id
                            problemShift[0].startTime = solutionShift[0].startTime
                            problemShift[0].endTime = solutionShift[0].endTime
                            for (var k = i; k< i+ loopCounter ; k++){
                               
                                storeHoursArr[k].numEmployees--;
                            }
                            continue;
                        }
                    var availEmps = employeesArr.filter(employee => (employee.avail.some(day => (day.day == storeHoursArr[i].day) && (availibilty.get(day.startTime) <=(availibilty.get(storeHoursArr[i].startTime)))))).sort((a,b) => {
                        if(a.hoursScheduled < b.hoursScheduled){
                            return -1;
                        }
                        else return 1; 
                    })
                    if(availEmps.length == 0)
                    {
                        console.log("NO AVAIL EMPLOYEES")
                        break;
                    }
                    for (var j =0 ; j< availEmps.length; j ++){ 
                       
                        var employee = availEmps[j]
                        
                        var availShifts = shiftsArr.filter(shift => shift.startTime == storeHoursArr[i].startTime)
                      
                        var availShifts2 = availShifts.filter(shift => employee.avail.some(day => (day.day== storeHoursArr[i].day) &&  (availibilty.get(day.endTime) >= availibilty.get(shift.endTime))))
                        if (availShifts2.length > 0)
                        break
                        else if (j == availEmps.length)
                        {
                            console.log("NO AVAIL SHIFTS")
                            return
                        }
                    }
                     const assignedShift = availShifts2[Math.floor(Math.random() * (availShifts2.length))]
                    //  console.log("---------------------------------------")
                    // console.log(assignedShift)
                    // console.log(storeHoursArr[i])
                    // console.log(availEmps)
                    // console.log(employee)
                    // console.log(shiftsArr)
                    // console.log(storeHoursArr)
                    // console.log(employeesScheduled)
                    // console.log("---------------------------------------")
                     employee.hoursScheduled += assignedShift.hours
                     const obj = {
                        employeeId: employee.id,
                        shiftId: assignedShift.id,
                        day: storeHoursArr[i].day,
                        endTime: assignedShift.endTime,
                        startTime: assignedShift.startTime,
                        date: currentDate,
                        roles: employee.roles
                     }
                    
                    for (var j = i; j< assignedShift.hours +i; j++ ){
                      if(storeHoursArr[j].numEmployees == 0){
                            
                            var problemShift = assignedShift
                            var solutionShift = shiftsArr.filter(shift => (shift.startTime == problemShift.startTime) && (availibilty.get(shift.endTime) == availibilty.get(problemShift.endTime)-1))
                            obj.shiftId = solutionShift[0].id
                            obj.startTime = solutionShift[0].startTime
                            obj.endTime = solutionShift[0].endTime
                            
                            break;
                            }
                        else                       
                        storeHoursArr[j].numEmployees--;
                        
                    }
                    employeesScheduled.push(obj)
                }
                
                
            }
        }
        console.log(storeHoursArr)
        console.log(employeesScheduled)
    }
    return(
         <section className='border-gray-200 bg-gray-50 min-h-screen w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col m-auto items-center justify-center'>
            <button onClick={() =>handleShift()}>Make Schedule</button>
            
             <h1 className='mb-6 underline'> Store Shifts</h1>
           <button disabled= {edit? true: false} onClick={() => handleAdd()} className='bg-white rounded-md w-1/2 text-gray-800 my-5'>{!add? "Add" : "Cancel"}</button>
        <div className= "grid grid-cols-3 gap-4 w-3/4">
        <h3>Start Time</h3>
        <h3>End Time</h3>
        <div></div>
        {displayShifts()}
        {addShfits()}
        
      
    </div>
        </section>
  )
}

export default StoreShifts