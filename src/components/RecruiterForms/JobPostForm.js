// import React, { useState } from "react";
// import '../../styles/JobPostForm.css';
// import { location, jobRole, primarySkills, secondarySkills } from '../../constraints/arrays';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             [theme.breakpoints.down('sm')]: {
//                 //  backgroundColor: theme.palette.secondary.main,
//             },
//             width: '45ch',
//         },
//     },
//     addButton: {
//         margin: theme.spacing(5),
//     },
//     removeButton: {
//         margin: theme.spacing(5),
//     },
// }));

// function JobPostForm() {

//     const [jobData, setJobData] = useState({
//         jobRole: "",
//         jobDescription: "",
//         experience: "",
//         primarySkills: "",
//         secondarySkills: "",
//         education: "",
//         location: "",
//         salary: ""
//     });

//     function HandleEvent(event) {
//         const { name, value } = event.target
//         setJobData({ ...jobData, [name]: value })
//     }

//     function submitEvent(e) {
//         if (!jobData.jobRole || !jobData.jobDescription || !jobData.experience || !jobData.secondarySkills || !jobData.primarySkills || !jobData.education) alert("Please fill all the fields'")
//         else {
//             console.log(jobData)
//             e.preventDefault()
//         }
//     }

//     function SaveJob() {
//         let info = { ...jobData }

//         fetch("http://localhost:8000/job", {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(info)

//         }).then(response => response.json().then(data => console.log(data)))

//     }
//     return (
//         <div className="Jobpost">

//             <br></br>
//             <br></br>

//             <form onSubmit={submitEvent}>

//                 <h1>Post a Job</h1>


//                 <option type="text" placeholder="enter  jobRole" value={jobData.jobRole} name="jobRole" onChange={HandleEvent}></option>
//                 <select id="job-role" value={jobData.jobRole} name="jobRole" onChange={HandleEvent}>
//                     {
//                         jobRole.map((item, index) =>
//                             <option key={index}>{item}</option>
//                         )
//                     }
//                 </select>
//                 <br></br><br></br>
//                 <input type="text" placeholder="enter  jobDescription" value={jobData.jobDescription} name="jobDescription" onChange={HandleEvent}></input>
//                 <br></br>
//                 <input type="number" placeholder="enter  experience" value={jobData.experience} name="experience" onChange={HandleEvent}></input>
//                 <option type="text" placeholder="enter  primarySkills" value={jobData.primarySkills} name=" primarySkills" onChange={HandleEvent}></option>
//                 <select id="pri-skill" value={jobData.primarySkills} name="primarySkills" onChange={HandleEvent}>
//                     {
//                         primarySkills.map((item, index) =>
//                             <option key={index}>{item}</option>
//                         )
//                     }
//                 </select>

//                 <option type="text" placeholder="enter  secondarySkills" value={jobData.secondarySkills} name="secondarySkills" onChange={HandleEvent}></option>
//                 <select id="sec-skill" value={jobData.secondarySkills} name="secondarySkills" onChange={HandleEvent}>
//                     {
//                         secondarySkills.map((item, index) =>
//                             <option key={index}>{item}</option>
//                         )
//                     }
//                 </select><br></br><br></br>
//                 <input type="text" placeholder="enter  education" value={jobData.education} name="education" onChange={HandleEvent}></input>
//                 <br></br>
//                 <select id="select-loc" value={jobData.location} name="location" onChange={HandleEvent}>
//                     {
//                         location.map((item, index) =>
//                             <option key={index}>{item}</option>

//                         )
//                     }
//                 </select>
//                 <br></br>
//                 <br></br>
//                 <br></br>
//                 <input type="text" placeholder="enter  salary" value={jobData.salary} name="salary" onChange={HandleEvent}></input><br></br><br></br>

//                 <br></br><br></br>
//                 <button id="btn" type="submit" onClick={SaveJob}>submit</button>
//                 <br></br>
//                 <br></br>

//             </form>

//         </div>
//     )
// }

// export default JobPostForm;



import React, { useState } from "react";
import {
    TextField,
    IconButton,
    Button,
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                backgroundColor: theme.palette.secondary.main,
            },
            width: '45ch',
            color: theme.palette.info.main

        },
    },
    addButton: {
        margin: theme.spacing(5),
    },
    removeButton: {
        margin: theme.spacing(5),
    },
}));

const JobForm = () => {
    const classes = useStyles();
    const [jobData, setJobData] = useState([
        {
            jobRole: "",
            jobDescription: "",
            experience: "",
            primarySkills: "",
            secondarySkills: "",
            education: "",
            location: "",
            salary: "",
        },
    ]);

    const handleAddJob = () => {
        setJobData([
            ...jobData,
            {
                jobRole: "",
                jobDescription: "",
                experience: "",
                primarySkills: "",
                secondarySkills: "",
                education: "",
                location: "",
                salary: "",
            },
        ]);
    };

    const handleRemoveJob = (index) => {
        const newJobs = [...jobData];
        newJobs.splice(index, 1);
        setJobData(newJobs);
    };

    const handleJobChange = (event, index) => {
        const { name, value } = event.target;
        const newJobs = [...jobData];
        newJobs[index] = {
            ...newJobs[index],
            [name]: value,
        };
        setJobData(newJobs);
    };
    function SaveJob() {
        let info = { ...jobData }

        fetch("http://localhost:8000/job", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)

        }).then(response => response.json().then(data => console.log(data)))

    }
    function submitEvent(e) {
        if (!jobData.jobRole || !jobData.jobDescription || !jobData.experience || !jobData.secondarySkills || !jobData.primarySkills || !jobData.education) alert("Please fill all the fields'")
        else {
            console.log(jobData)
            e.preventDefault()
        }
    }


    return (
        <Box mt={3} className={classes.root}>
            <Typography variant="h5" gutterBottom>
                Create a Job
            </Typography>
            {jobData.map((job, index) => (
                <Box mb={3} key={index}>
                    <Typography variant="h6">Job {index + 1}</Typography>
                    <Box display="flex" alignItems="center" mb={10}>
                        <Typography variant="body1" mr={1}>
                            Job Role:
                        </Typography>
                        <TextField
                            name="jobRole"
                            value={job.jobRole}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            size="Normal"
                            required
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mb={10}>
                        <Typography variant="body1" mr={1}>
                            Job Description:
                        </Typography>
                        <TextField
                            name="jobDescription"
                            value={job.jobDescription}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mb={10}>
                        <Typography variant="body1" mr={1}>
                            Experience:
                        </Typography>
                        <TextField
                            name="experience"
                            value={job.experience}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mb={10}>
                        <Typography variant="body1" mr={1}>
                            Primary Skills:
                        </Typography>
                        <TextField
                            name="primarySkills"
                            value={job.primarySkills}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>
                    <Box display="flex" alignItems="center"
                        mb={2}>
                        <Typography variant="body1" mr={1}>
                            Secondary Skills:
                        </Typography>
                        <TextField
                            name="secondarySkills"
                            value={job.secondarySkills}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" mr={1}>
                            Education:
                        </Typography>
                        {/* <FormControl variant="outlined" size= "Normal" required>
                  <InputLabel>Education</InputLabel>
                  <Select
                    name="education"
                    value={job.education}
                    onChange={(event) => handleJobChange(event, index)}
                    label="Education"
                  >
                    <MenuItem value={"High School"}>High School</MenuItem>
                    <MenuItem value={"Associate's Degree"}>Associate's Degree</MenuItem>
                    <MenuItem value={"Bachelor's Degree"}>Bachelor's Degree</MenuItem>
                    <MenuItem value={"Master's Degree"}>Master's Degree</MenuItem>
                    <MenuItem value={"PhD"}>PhD</MenuItem>
                  </Select>
                </FormControl> */}
                        <TextField
                            
                            select
                            label="Education"
                            value={job.education}
                            onChange={handleJobChange}
                            helperText="Please select your Education"
                            variant="outlined"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" mr={1}>
                            Location:
                        </Typography>
                        <TextField
                            name="location"
                            value={job.location}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" mr={1}>
                            Salary:
                        </Typography>
                        <TextField
                            name="salary"
                            value={job.salary}
                            onChange={(event) => handleJobChange(event, index)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>
                    {index === jobData.length - 1 && (
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={handleAddJob} color="primary">
                                <Add />
                            </IconButton>
                            {jobData.length > 1 && (
                                <IconButton onClick={() => handleRemoveJob(index)} color="primary">
                                    <Remove />
                                </IconButton>
                            )}
                        </Box>
                    )}
                </Box>
            ))}
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button variant="contained" color="primary" disableElevation>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default JobForm;
