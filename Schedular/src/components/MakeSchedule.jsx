import React from 'react'
import {AiFillEdit} from "react-icons/ai"
import "../output.css" 
import { useState,useEffect } from 'react';
import domtoimage from 'dom-to-image';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
function MakeSchedule() {
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
  
 /// beginning of make schedule
   const [employeesArr, setEmployeesArr] = useState([])
   const [storeHoursArr, setStoreHoursArr] = useState([])
   const [shiftsArr, setShiftsArr] = useState([])
   const employeesScheduled  =[]; 
   const [shifts, setShifts] = useState([])
   const displayEmployeeArr =[]
   const [algoDone, setAlgoDone] = useState(false)
    //function used to screenshot schedule 
    const screenShot = async () =>{
     domtoimage.toJpeg(document.getElementById('screenshot'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
    }
   useEffect(() =>{
    getShiftsArr();
    getStoreHoursArr();
    getEmployeeShifts();
   }, [])
   const getEmployeeShifts = async () =>{
    
            const array = [];
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
                const days = [0];
                const empObject = {
                    id:  employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    userName: employee.userName,
                    hours: employee.numHours,
                    avail: availArr,
                    roles:employee.roles,
                    hoursScheduled:0,
                    daysScheduled: days
                }
                array.push(empObject)
            });           
            })
            setEmployeesArr(array)  
   }
   const getShiftsArr = async () =>{
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
   }
   const getStoreHoursArr = async () =>{
    const array = [];
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
                        array.push(obj)
                        start++
                    }
                })
                array.sort((a, b) =>{ 
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
            setStoreHoursArr( array)
   }
   const getScheduledDate = (dayScheduled) => {

    var date = new Date();
    let dOW = date.getDay();
    switch (dOW){
        case(0):
            dOW = 1
        break;
        case(1):
            dOW =7
        break;
        case(2):
            dOW =6
        break;
        case(3):
            dOW =5
        break;
        case(4):
            dOW =4
        break;
        case(5):
            dOW =3
        break;
        case(6):
            dOW =2
        break;
    }
    switch( dayScheduled) {
        case("Monday"):
            dOW += 0
        break;
        case("Tuesday"):
            dOW +=1
        break;
        case("Wednesday"):
            dOW +=2
        break;
        case("Thursday"):
            dOW +=3
        break;
        case("Friday"):
            dOW +=4
        break;
        case("Saturday"):
            dOW +=5
        break;
        case("Sunday"):
            dOW +=6
        break;
    }
    date.setTime(date.getTime() + (dOW *86400000))
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
    const make = () =>{
        
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
                        
                        if(a.hoursScheduled/a.hours < b.hoursScheduled/b.hours){
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
                     employee.daysScheduled.push(storeHoursArr[i].day)
                     const obj = {
                        employeeId: employee.id,
                        employeeFN: employee.firstName,
                        employeeLN: employee.lastName,
                        shiftId: assignedShift.id,
                        day: storeHoursArr[i].day,
                        endTime: assignedShift.endTime,
                        startTime: assignedShift.startTime,
                        date: getScheduledDate(storeHoursArr[i].day),
                        roles: employee.roles,
                        hours: employee.hours,
                        hoursScheduled: employee.hoursScheduled
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
                        if(a.hoursScheduled/a.hours < b.hoursScheduled/b.hours){
                            return -1;
                        }
                        else return 1; 
                    })
                    var availEmps2 = [];
                    availEmps.forEach(emp => {
                        var isE = false
                        var employeeDay = employeesScheduled.filter(employee => emp.id == employee.employeeId && employee.day == storeHoursArr[i].day)
                        emp.daysScheduled.forEach(dayOfWeek =>{
                            if (employeeDay.length >1)
                            isE= true
                            if ((dayOfWeek == storeHoursArr[i].day) && (availibilty.get(employeeDay[0].startTime)<1) )
                            isE = true
                            
                            if ( (dayOfWeek == storeHoursArr[i].day) &&(availibilty.get(employeeDay[0].endTime) - availibilty.get(storeHoursArr[i].startTime) >0))
                            isE =true
                            
                        })
                        if(isE == false)
                        availEmps2.push(emp) 
                    });

                
                    // if no avail employees print error and exit
                    if(availEmps2.length == 0)
                    {
                        console.log("NO AVAIL EMPLOYEES")
                        return; 
                    }
                    // go through all employees and find shifts that match employees avail 
                    for (var j =0 ; j< availEmps2.length; j ++){ 
                        var employee = availEmps2[j]
                        
                        var availShifts = shiftsArr.filter(shift => shift.startTime == storeHoursArr[i].startTime)
                      
                        var availShifts2 = availShifts.filter(shift => employee.avail.some(day => (day.day== storeHoursArr[i].day) &&  (availibilty.get(day.endTime) >= availibilty.get(shift.endTime))))
                        
                        //if none break 
                        if (availShifts2.length > 0){
                        break
                        }
                        else if (j == availEmps2.length-1)
                        {
                            console.log("Lead")
                            console.log(storeHoursArr[i].startTime)
                            
                            console.log(storeHoursArr[i].day)
                            console.log(employeesScheduled)
                            console.log(availEmps2)
                            
                            console.log(employeesArr)
                            console.log("NO AVAIL SHIFTS")
                            return
                        }
                        
                    }
                    // pick a random shift from avail shift 
                     const assignedShift = availShifts2[Math.floor(Math.random() * (availShifts2.length))]
                    // increment employees hours scheduled 
                     employee.hoursScheduled += assignedShift.hours;
                     employee.daysScheduled.push(storeHoursArr[i].day)
                     const obj = {
                        employeeId: employee.id,
                        employeeFN: employee.firstName,
                        employeeLN: employee.lastName,
                        shiftId: assignedShift.id,
                        day: storeHoursArr[i].day,
                        endTime: assignedShift.endTime,
                        startTime: assignedShift.startTime,
                        date: getScheduledDate(storeHoursArr[i].day),
                        roles: employee.roles,
                        hours: employee.hours,
                        hoursScheduled: employee.hoursScheduled
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
                         
                        
                        if(a.hoursScheduled/a.hours < b.hoursScheduled/b.hours){
                            return -1;
                        }
                        else return 1; 
                    })

                    var availEmps2 = [];
                    availEmps.forEach(emp => {
                        var isE = false
                        var employeeDay = employeesScheduled.filter(employee => emp.id == employee.employeeId && employee.day == storeHoursArr[i].day)
                        emp.daysScheduled.forEach(dayOfWeek =>{
                              if (employeeDay.length >1)
                            isE= true
                            if ((dayOfWeek == storeHoursArr[i].day) && (availibilty.get(employeeDay[0].startTime)<1) )
                            isE = true
                            
                            if ( (dayOfWeek == storeHoursArr[i].day) &&(availibilty.get(employeeDay[0].endTime) - availibilty.get(storeHoursArr[i].startTime) >0))
                            isE =true
                            
                        })
                        if(isE == false)
                        availEmps2.push(emp) 
                    });
                     
                    if(availEmps2.length == 0)
                    {
                        console.log("NO AVAIL EMPLOYEES")
                        break;
                    }
                    for (var j =0 ; j< availEmps2.length; j ++){ 
                       
                        var employee = availEmps2[j]
                        
                        var availShifts = shiftsArr.filter(shift => shift.startTime == storeHoursArr[i].startTime)
                      
                        var availShifts2 = availShifts.filter(shift => employee.avail.some(day => (day.day== storeHoursArr[i].day) &&  (availibilty.get(day.endTime) >= availibilty.get(shift.endTime))))
                        if (availShifts2.length > 0)
                        break
                        else if (j == availEmps2.length-1)
                        {
                            console.log("Normal")
                            console.log(storeHoursArr[i].startTime)
                            console.log(storeHoursArr[i].day)
                            console.log(employeesScheduled)
                            console.log(availEmps2)
                            console.log(employeesArr)
                            console.log("NO AVAIL SHIFTS")
                            return
                        }
                    }
                     const assignedShift = availShifts2[Math.floor(Math.random() * (availShifts2.length))]
                     employee.hoursScheduled += assignedShift.hours
                     employee.daysScheduled.push(storeHoursArr[i].day)
                     const obj = {
                        employeeId: employee.id,
                        employeeFN: employee.firstName,
                        employeeLN: employee.lastName,
                        shiftId: assignedShift.id,
                        day: storeHoursArr[i].day,
                        endTime: assignedShift.endTime,
                        startTime: assignedShift.startTime,
                        date: getScheduledDate(storeHoursArr[i].day),
                        roles: employee.roles,
                        hours: employee.hours,
                        hoursScheduled: employee.hoursScheduled
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
        console.log("Done:")
        console.log(storeHoursArr)
        console.log(employeesScheduled)
        console.log(employeesArr)
        setShifts(employeesScheduled)
        setAlgoDone(true);
        console.log("Done:")
        // employeesScheduled.forEach(async employee => {
        //     await axiosPrivate.post("https://schedularback-production.up.railway.app/day",
        // JSON.stringify({day:employee.day,shiftType:employee.shiftId,employee:employee.employeeId, date:employee.date }), { headers:{"Content-type":"application/json"}, withCredentials:true})
        // });
    }
    //function to put shifts in an easy to use order
    const niceShifts = (shifts) => {
        const retArray = [];
        shifts.forEach( shift => {
            retArray[0] = `${shift.employeeFN} ${shift.employeeLN}` 
            switch(shift.day){
                case "Monday": 
                    if (retArray[1] == undefined){
                        retArray[1]= `${shift.startTime}-${shift.endTime}`
                    }
                    else
                    retArray[1]+= `-${shift.startTime}-${shift.endTime}`
                break;
                case "Tuesday": 
                    if (retArray[2] == undefined){
                        retArray[2]= `${shift.startTime}-${shift.endTime}`
                    }
                    else
                    retArray[2]+= `-${shift.startTime}-${shift.endTime}`
                break;
                case "Wednesday": 
                    if (retArray[3] == undefined){
                        retArray[3]= `${shift.startTime}-${shift.endTime}`
                    }
                    else
                    retArray[3]+= `-${shift.startTime}-${shift.endTime}`
                break;
                case "Thursday":
                    if (retArray[4] == undefined){
                        retArray[4]= `${shift.startTime}-${shift.endTime}`
                    }
                    else 
                    retArray[4]+= `-${shift.startTime}-${shift.endTime}`
                break;
                case "Friday": 
                    if (retArray[5] == undefined){
                        retArray[5]= `${shift.startTime}-${shift.endTime}`
                    }
                    else
                    retArray[5]+= -`${shift.startTime}-${shift.endTime}`
                break;
                case "Saturday":
                    if (retArray[6] == undefined){
                        retArray[6]= `${shift.startTime}-${shift.endTime}`
                    }
                    else
                    retArray[6]+= `-${shift.startTime}-${shift.endTime}`
                break;
                case "Sunday":
                    if (retArray[7] == undefined){
                        retArray[7]= `${shift.startTime}-${shift.endTime}`
                    }
                    else
                    retArray[7]+= `-${shift.startTime}-${shift.endTime}`
                break;
            }
                retArray[8]= `${shift.hours}|${shift.hoursScheduled}`
            
        })

        return retArray;
    }
    const displayRows = () => {
        
        employeesArr.forEach(employee => {
            displayEmployeeArr.push(niceShifts(shifts.filter(shift => shift.employeeId == employee.id)))
        });
        displayEmployeeArr.forEach(employee => {
           for (var i = 0; i< 9; i++){
            if(!employee[i]){
                employee[i] = "X"
            }
           }
        })
        return (
                <>
                    {displayEmployeeArr.map((employee) => (
                        <div className=  'flex-row flex'>
                        {employee.map(day => (
                            
                            <div className='min-w-[100px] border-2 px-1'>{day}</div>
                        ))}
                        </div>
                    ))}
                    
             </>
        )
    }

    return(
         <section className=' min-h-screen h-full w-full bg-gray-800 border-gray-700 text-white flex flex-col m-auto items-center justify-center pb-10' >
            <button onClick={() =>make()}>Make Schedule</button>
            
            <div  className='w-full overflow-x-scroll'>
                <div id= "screenshot">
                <div className='flex-row flex'>
                    
                        <div className='px-1 border-2 min-w-[100px]'>Employee:</div>
                        <div className='px-1 border-2 min-w-[100px]'>Monday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Tuesday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Wednesday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Thursday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Friday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Saturday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Sunday</div>
                        <div className='px-1 border-2 min-w-[100px]'>Req|Sched</div>
                        
                </div>
                {algoDone?
                 displayRows():<>Hi</>}
                 </div>
            </div>
            <button onClick={() =>screenShot()}>take screenshot</button>
            
           
           <span className='h-10 w-full screen fixed bottom-0 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700
            flex flex-wrap items-center mx-auto'>
        <p className='self-center mx-auto text-md dark:text-white'>© William Simmons 2023</p>
         </span>
            </section>
            
            )
}

export default MakeSchedule