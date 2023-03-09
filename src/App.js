import HeroPage from './components/HomePage/HeroPage';
import Sec from './components/HomePage/Sec';
import Third from './components/HomePage/Third';
import Fourth from './components/HomePage/Fourth';
import Fifth from './components/HomePage/Fifth';
import UserProfile from './components/UserProfile.js';
// import RegisterForm from "./components/loginPage/Register.js"
import Login from "./components/loginPage/login.js"
// import JobForm from './components/formjob.js'
import FormUserDetails from './components/multiForm/FormUserDetails';
import FormPersonalDetails from "./components/multiForm/FormPersonalDetails";
import UserForm from "./components/multiForm/UserForm";
import Confirm from './components/multiForm/Confirm';
import Success from './components/multiForm/Success';
 import EducationForm from './components/multiForm/EducationForm';
import ExperienceForm  from './components/multiForm/UserExperience';
import ProductSearch from "./components/Search.js";
import JobPostForm from  "./components/RecruiterForms/JobPostForm" ;

import { Routes, Link, Route } from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<>  
                    {/* <SearchBar/>  */}
                    <HeroPage />
                    <Sec />
                    <Third />
                    <Fourth />
                    <Fifth />
                    
                      
                </>} />
                <Route path ="login" element={<Login />}/>
                <Route path ="multiform1" element={<FormUserDetails />}/>
                <Route path ="multiform2" element={<FormPersonalDetails />}/>
                <Route path ="multiform3" element={<UserForm />}/>
                <Route path ="multiform4" element={<Confirm />}/>
                <Route path ="multiform5" element={<Success />}/>
                {/* <Route path ="multiform6" element={<JobForm />}/> */}
                <Route path ="multiform7" element={<UserProfile/>}/>
                <Route path= "multiform8" element={ <ExperienceForm/>}/>
                <Route path= "multiform9" element={ <EducationForm/>}/>
                <Route path= "multiform10" element={ <ProductSearch/>}/>
                <Route path=  "multiform11" element = {<JobPostForm/>}/>

            </Routes>
           
        </div>
    )
}
export default App;