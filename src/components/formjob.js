
// import '../styles/form.css';
import "../styles/jobFormup.css"
import React, { useEffect, useState } from 'react';
// import '../styles/userProfile.css';
import { Routes, Link, Route, useNavigate } from 'react-router-dom';


function JobForm() {

      return (
        <div className="container">
        <header>Education</header>

        <form action="#">
            <div className="form first">
                <div className="details personal">
                    <span className="title">Post Graduation</span>

                    <div className="fields">
                        <div className="input-field">
                            <label>Institute</label>
                            <input type='text' placeholder="Enter Institute" />
                        </div>

                        <div className="input-field">
                            <label>Year of Passout</label>
                            <input type="date" placeholder="Enter birth date"  />
                        </div>

                        <div className="input-field">
                            <label>Score Type</label>
                            <select>
                              <option disabled selected>Select</option>
                              <option>Grade</option>
                              <option>Percentage</option>
                              <option>CGPA</option>
                            </select>

                        </div>

                        <div className="input-field">
                            <label>Score</label>
                            <input type="text" placeholder=""  />
                        </div>

                        <div className="input-field">
                            <label>Course</label>
                            <select>
                              <option disabled selected>Select</option>
                              <option>M.Tech/M.E</option>
                              <option>M.Sc</option>
                              <option>M.A</option>
                              <optio>M.Com</optio>
                              <option>M.B.A</option>
                              <option>L.L.M</option>
                            </select>

                        </div>

                        <div className="input-field">
                            <label>Field of Study</label>
                            <input type="text" placeholder="Enter field of study"  />
                        </div>
                    </div>
                </div>

                <div className="details ID">
                    <span className="title">Graduation</span>

                    <div className="fields">
                        <div className="input-field">
                            <label>Institute</label>
                            <input type="text" placeholder="Enter institute" required />
                        </div>

                        <div className="input-field">
                            <label>Year of Passout</label>
                            <input type='date' required />
                        </div>

                        <div className="input-field">
                            <label>Score Type</label>
                            <select required>
                              <option disabled selected>Select</option>
                              <option>Grade</option>
                              <option>Percentage</option>
                              <option>C.G.P.A</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label>Score</label>
                            <input type="text" placeholder="" required />
                        </div>

                        <div className="input-field">
                            <label>Course</label>
                            <select>
                              <option disabled selected>Select</option>
                              <option>B.Tech/B.E</option>
                              <option>B.Sc</option>
                              <option>B.A</option>
                              <option>B.Com</option>
                              <option>L.L.B</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label>Field of Study</label>
                            <input type="text" placeholder="Enter field of study" required />
                        </div>
                    </div>

                    <button className="nextBtn">
                        <span className="btnText">Next</span>
                        <i className="uil uil-navigator"/>
                    </button>
                </div> 
            </div>

            <div className="form second">
                <div className="details address">
                    <span className="title">Experience</span>

                    <div className="fields">
                        <div className="input-field">
                            <label>Organization</label>
                            <input type="text" placeholder="" required />
                        </div>

                        <div className="input-field">
                            <label>Job Type</label>
                            <select>
                                <option disabled selected>Select</option>
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label>Job Role</label>
                            <input type="text" placeholder="Enter Job role" required />
                        </div>

                        <div className="input-field">
                            <label>Job Duration</label>
                            <input type="date" placeholder="Enter Start Date" required />
                            <input type="date" placeholder='Enter End date' />
                        </div>

                        <div className="input-field">
                            <label>Project</label>
                            <input type="text" placeholder="Enter project name" required />
                        </div>

                        <div className="input-field">
                            <label>Project Duration in days</label>
                            <input type="number" placeholder="" required />
                        </div>
                    </div>
                </div>



                    <div className="buttons">
                        <div className="backBtn">
                            <i className="uil uil-navigator"/>
                            <span className="btnText">Back</span>
                        </div>

                        <button className="sumbit">
                            <span className="btnText">Submit</span>
                            <i className="uil uil-navigator"/>
                        </button>
                    </div>
                </div> 

        </form>


    </div>

    )
    }



export default JobForm;











