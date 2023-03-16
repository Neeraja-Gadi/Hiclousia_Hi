// import React, { useState } from "react";
// import {location} from "../arrays.js"

// function Drop() {

//     // const [tc, setTc] = useState(false)
//     const [recruiterData, setRecruiterData] = useState({
//         fullName: "",
//         title: "",
//         email: "",
//         phone: "",
//         socialMediaURL :"" ,
//         companyName: "",
//         companyType: "",
//         companyLocation: "",
//         jobPost: "",
//         status: "active"
//     });
        
//     let name , value ;

//     function HandleEvent(e) {
       
//         name= e.target.name 
//         value = e.target.value
//         setRecruiterData({...recruiterData, [name]: value})     
//     }
//     function submitEvent(e) {
//         if(!recruiterData.fname ||!recruiterData.lname ||!recruiterData.title ||!recruiterData.email ||!recruiterData.phone ||!recruiterData.companyName) alert("Please fill all the fields'")
//         else{
//          console.log( recruiterData)
//          e.preventDefault()
//         }
//     }

//     function SaveRecruiter() {
//         let info = {...recruiterData}
    
//         fetch("http://localhost:8000/recruiter", {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(info)
    
//         }).then(response => response.json().then(data => console.log(data)))
    
//     }
//     return (
//         <div className="App">
//             <form onSubmit={submitEvent}>

//                 <input type="text" placeholder="enter  fname" value={recruiterData.fname} name="fname" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  lname" value={recruiterData.lname} name="lname" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  title" value={recruiterData.title} name="title" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  phone" value={recruiterData.phone} name="phone" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  Email" value={recruiterData.email} name="email" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  companyName" value={recruiterData.companyName} name="companyName" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  companyType" value={recruiterData.companyType} name="companyType" onChange={HandleEvent}></input><br></br><br></br>
//                 {/* <input type="text" placeholder="enter  companyLocation" value={recruiterData.companyLocation} name="companyLocation" onChange={HandleEvent}></input><br></br><br></br> */}
//                 <input type="text" placeholder="enter  jobPost" value={recruiterData.jobPost} name="jobPost" onChange={HandleEvent}></input><br></br><br></br>
//                 <input type="text" placeholder="enter  status" value={recruiterData.status} name="status" onChange={HandleEvent}></input><br></br><br></br>

//                 <select value={recruiterData.companyLocation} name = "companyLocation" onChange={HandleEvent}>
//                    { 
//                     location.map((item,index) => 
//                         <option key={index}>{item}</option>                    
//                     )
//                     }

//                 </select><br></br><br></br>
//                 {/* <input type="checkbox" onChange={HandleEvent} />

//                 <span>Agree T/C</span><br></br><br></br> */}
//                 <button type="submit" onClick={SaveRecruiter}>submit</button>
//                 <br></br>
//                 <br></br>

//             </form>
//         </div>
//     )
// }

// export default Drop

