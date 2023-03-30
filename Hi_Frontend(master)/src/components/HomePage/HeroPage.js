import React from 'react';
import '../../styles/App.css';
import { useEffect } from 'react';
import LoginCard from '../loginPage/loginCard';
import {useNavigate} from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';

function App(){
const [user, setUser] = React.useState("");
const navigate=useNavigate()

useEffect(() => {
  setUser(  JSON.parse(localStorage.getItem("userDetails")))
 
}, [])

function logOut(){
  localStorage.removeItem('userDetails');
  localStorage.removeItem('token');
  window.location.reload();
}


  return(

    
    <div className="hero">
      <div className="nav">
        <div className="logo">
          <h1>H<span>i</span></h1>
        </div>
        <div className="search">
          
        </div>
        <div className="menu">
          <ul>
          <a href="/ProductSearch"><SearchIcon  sx={{ fontSize: 80 , color: "white" }} /></a>
            <li><a href="#talent">Talent Profile</a></li>
            <li><a href="/RecruiterProfileForm">Recruiter</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us </a></li>
            
            
            {
              user?<li style={{background: "red",cursor:'pointer'}} onClick={logOut}>Log Out</li>: <li><a href="/login">Login</a></li>
            }
            <a href="/UserProfile"> <LoginCard /></a>
           {/* <LoginCard onClick={()=>navigate("/UserProfile")}/> */}
          </ul>
        </div>
      </div>

      <div className="talent-recruiter">
        <ul>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <li className="talent"><h2>Talent</h2></li>
          <li className="recruiter"><h2>Recruiter</h2></li>
        </ul>
      </div>

      <div className="home-button">
        <br></br>
        <h2>Bridging the Gap between Employability and Jobs Landscape for the
          current and Future Jobs.</h2>
      </div>
    </div>
    
  )
}


export default App;
