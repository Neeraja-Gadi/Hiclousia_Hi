import HeroPage from './components/HomePage/HeroPage';
import Sec from './components/HomePage/Sec';
import Third from './components/HomePage/Third';
import Fourth from './components/HomePage/Fourth';
import Fifth from './components/HomePage/Fifth';
import UserProfile from './components/UserProfile.js';
import Login from "./components/loginPage/login.js"
// import JobForm from './components/formjob.js'
import EducationForm from './components/multiForm/EducationForm';
import ExperienceForm  from './components/multiForm/UserExperience';
import ProductSearch from "./components/Search.js";
import JobPostForm from  "./components/RecruiterForms/JobPostForm" ;
import RecruiterProfileForm from "../src/components/RecruiterForms/RecruiterForm"

import { Routes, Link, Route } from 'react-router-dom';
// import Form from './components/multiForm/MultiSelect';

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
                {/* <Route path ="multiform6" element={<JobForm />}/> */}
                <Route path ="multiform1" element={<UserProfile/>}/>
                <Route path= "multiform2" element={ <EducationForm/>}/>
                <Route path= "multiform3" element={ <ExperienceForm/>}/>
                
                <Route path= "multiform5" element={ <ProductSearch/>}/>
                <Route path= "multiform6" element ={<RecruiterProfileForm/>}/>
                <Route path=  "multiform7" element = {<JobPostForm/>}/>
                {/* <Route path=  "multiform7" element = {<Form/>}/> */}
            </Routes>
           
        </div>
    )
}
export default App;