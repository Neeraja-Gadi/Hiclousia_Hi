
// // import React, { useState } from 'react';
// // import { makeStyles } from '@material-ui/core/styles';
// // import { Button, Typography, Select, MenuItem, Grid, IconButton,TextField } from '@material-ui/core';
// // import { Add, Remove, AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
// // import { location, jobRole, primarySkills, secondarySkills } from '../../constraints/arrays';
// // import {Box,FormControl,InputLabel} from "@material-ui/core";
// // import CssBaseline from '@material-ui/core/CssBaseline';
// // const useStyles = makeStyles((theme) => ({
// //     root: {
// //         '& .MuiTextField-root': {
// //             margin: theme.spacing(2),
// //             paddingTop: theme.spacing(1),
// //             paddingLeft: theme.spacing(1),
// //             [theme.breakpoints.down('sm')]: {
// //                 //  backgroundColor: theme.palette.info.main 
// //             },
// //             width: '70ch',
// //         },
// //         //  width :"auto",
// //         //  height : "auto",
// //         color: theme.palette.primary.main,
// //         background: '#8ec9ff',
// //         boxShadow: '0px 3px 5px 2px rgba(255, 105, 135, .3)',
// //         padding: '50px 30px',
// //         margin: "0px,500px"
// //     },
// //     // feildColor: {
// //     //   color: "#000080"
// //     // },
// //     addButton: {
// //         margin: theme.spacing(5),

// //     },
// //     removeButton: {
// //         margin: theme.spacing(5),

// //     },
// // }));

// // const userId = JSON.parse(localStorage.getItem("userDetails"))
// // // console.log(userId)
// // const JobForm = () => {
// //     const classes = useStyles();
// //     const [jobData, setJobData] = useState([
// //         {
// //             userDetailsID: userId._id,
// //             jobRole: "",
// //             jobDescription: "",
// //             experience: "",
// //             primarySkills: "",
// //             secondarySkills: "",
// //             education: "",
// //             location: "",
// //             salary: "",
// //         },
// //     ]);

// //     const handleAddJob = () => {
// //         setJobData([
// //             ...jobData,
// //             {
// //                 userDetailsID: userId._id,
// //                 jobRole: "",
// //                 jobDescription: "",
// //                 experience: "",
// //                 primarySkills: "",
// //                 secondarySkills: "",
// //                 education: "",
// //                 location: "",
// //                 salary: "",
// //             },
// //         ]);
// //     };

// //     const handleRemoveJob = (index) => {
// //         const newJobs = [...jobData];
// //         newJobs.splice(index, 1);
// //         setJobData(newJobs);
// //     };

// //     const handleJobChange = (event, index) => {
// //         const { name, value } = event.target;
// //         const newJobs = [...jobData];
// //         newJobs[index] = {
// //             ...newJobs[index],
// //             [name]: value,
// //         };
// //         setJobData(newJobs);
// //     };

// //     function SaveJob() {

// //         // console.log(jobData)
// //         jobData.map((e, index) => {
// //             console.log("gfg",e)
// //         fetch("http://localhost:8000/job", {
// //             method: 'POST',
// //             headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(e)

// //         }).then(response => response.json().then(data => console.log(data)))
// //     })

// //     }
// //     function handlesubmitEvent(e) {
// //         // if (!jobData.jobRole || !jobData.jobDescription || !jobData.experience || !jobData.secondarySkills || !jobData.primarySkills || !jobData.education) alert("Please fill all the fields'")
// //         // else {
// //             // console.log(jobData)
// //             e.preventDefault()
// //             SaveJob()
// //         // }
// //     };

// //     return (
// //         <form className={classes.root} onSubmit={handlesubmitEvent}>
// //             <Typography textAlign="center" variant="h6" gutterBottom>
// //                 Post a job :
// //             </Typography>
// //             {jobData?.map((job, index) => (
// //                 <div key={index}>
// //                     <TextField
// //                         label="Job Role"
// //                         name="jobRole"
// //                         value={job.jobRole}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         size="Normal"
// //                         required
// //                     />

// //                     <TextField
// //                         label="Job Description"
// //                         name="jobDescription"
// //                         value={job.jobDescription}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />
// //                     <TextField
// //                         label="Experience"
// //                         name="experience"
// //                         value={job.experience}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />
// //                     <TextField

// //                         label ="Primary Skills"
// //                         name="primarySkills"
// //                         value={job.primarySkills}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />
// //                     <TextField
// //                         label = "Secondary Skills"
// //                         name="secondarySkills"
// //                         value={job.secondarySkills}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />
// //                     <TextField
// //                         name="education"
// //                         label="Education"
// //                         value={job.education}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />
// //                     <TextField
// //                         label="Job Location"
// //                         name="location"
// //                         value={job.location}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />
// //                     <TextField
// //                         label = "Salary"
// //                         name="salary"
// //                         value={job.salary}
// //                         onChange={(event) => handleJobChange(event, index)}
// //                         variant="outlined"
// //                         fullWidth
// //                         required
// //                     />

// //                     {index === jobData?.length - 1 &&
// //                         <Button
// //                             className={classes.addButton}
// //                             variant="contained"
// //                             color="primary"
// //                             startIcon={<Add />}
// //                             onClick={handleAddJob}
// //                         >
// //                             Add
// //                         </Button>
// //                     }
// //                     {index !== jobData?.length - 1 &&
// //                         <Button
// //                             className={classes.removeButton}
// //                             variant="contained"
// //                             color="primary"
// //                             startIcon={<Remove />}
// //                             onClick={() => handleRemoveJob(index)}
// //                         >
// //                             Remove
// //                         </Button>
// //                     }
// //                 </div>
// //             ))}
// //             <Button onClick={handlesubmitEvent}
// //                 type="submit"
// //                 variant="contained"
// //                 color="primary"
// //             >
// //                 Submit

// //             </Button>
// //             <br></br>
// //         </form>
// //     );

// // };

// // export default JobForm;




import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Paper
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(7),
        backgroundColor: theme.palette.info.light,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '70%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,

    },
    formControl: {
        width: '100%',
        marginBottom: theme.spacing(5),
        marginRight: theme.spacing(5),
        
        // paddingBottom: theme.spacing(3)

    },
    submitButton: {
        marginTop: theme.spacing(2)
    }
}));

const RecruiterProfileForm = () => {
    const navigate=useNavigate();
    const classes = useStyles();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        professionalSummary: '',
        workExperience: [],
        awards: [],
        socialMediaLinks: {
            linkedin: '',
            twitter: ''
        }
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExperienceChange = (index, field, value) => {
        const experiences = [...formData.workExperience];
                          experiences[index][field] = value;
                          setFormData({...formData, workExperience: experiences });
      };
      
      const handleInputChange2 = (e, index) => {
        const {name, value} = e.target;
        const [field, propertyIndex] = name.split(".");
        handleExperienceChange(index, field, value);
      };
      
    function SaveRecruiter() {
        let info = { ...formData }
     
        info.socialMediaLinks.linkedin=info.linkedin
        info.socialMediaLinks.twitter=info.twitter
        delete info["linkedin"];
        delete info["twitter"];
        // console.log(info)
        fetch("http://localhost:8000/recruiter", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)

        }).then(response => response.json().then(data => {
                console.log(data)
                if(data.status===true){
                    alert("Created Profile Sucessfully")
                    navigate("/JobPostForm")
                }

        }))

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        SaveRecruiter()
        // console.log(formData);
    };


    return (
        <Box className={classes.root}>
            <Paper className={classes.form}>
                <Typography variant="h5" gutterBottom>
                    Recruiter Profile Form

                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        variant="outlined"
                        className={classes.formControl}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        className={classes.formControl}
                        required
                    />
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        className={classes.formControl}
                        required
                    />
                    <TextField
                        label="Professional Summary"
                        name="professionalSummary"
                        value={formData.professionalSummary}
                        onChange={handleInputChange}
                        variant="outlined"
                        className={classes.formControl}
                        multiline
                        rows={4}
                    />

                    <Typography variant="h6" gutterBottom>
                        Work Experience
                    </Typography>
                    <Box className={classes.formControl}>
                        {formData.workExperience.map((experience, index) => (
                            <Box key={index}>
                                <TextField
                                    label="Company"
                                    name={`company.${index}`}
                                    value={experience.company}
                                    onChange={(e) => handleInputChange2(e, index)}
                                    variant="outlined"
                                    
                                />
                                <TextField
                                    label="Job Title"
                                    name={`jobTitle.${index}`}
                                    value={experience.jobTitle}
                                    onChange={(e) => handleInputChange2(e, index)}
                                    variant="outlined"
                                />
                            </Box>
                        ))}
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            setFormData({
                                ...formData,
                                workExperience: [
                                    ...formData.workExperience,
                                    { company: "", jobTitle: "" },
                                ],
                            })
                        }
                    >
                        Add Work Experience
                    </Button>

                    {/* <Typography variant="h6" gutterBottom>
                        Awards
                    </Typography>
                    <Box className={classes.formControl}>
                        {formData.awards.map((award, index) => (

                            <Box key={index}>
                                <TextField
                                    label="award given by Company"
                                    name={`awards[${index}]`}
                                    value={award}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                />
                            </Box>
                        ))}
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            setFormData(
                                ...formData,
                                ...formData.awards
                            )
                        }
                    >
                        Add++
                    </Button> */}

                    <Typography variant="h6" gutterBottom>
                        SocialMedia Links:
                    </Typography>
                    <Box className={classes.formControl}>

                        <TextField
                            label="LinkedIn Url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            label="twitter Url"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            variant="outlined"
                            
                        />

                    </Box>

                    {/* <FormControl className={classes.formControl}>
                        <InputLabel>Recruiting Specialties</InputLabel>
                        <Select
                            multiple
                            name="recruitingSpecialties"
                            value={formData.recruitingSpecialties}
                            onChange={handleInputChange}
                            variant="outlined"
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                            <MenuItem value="Engineering">Engineering</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Human Resources">Human Resources</MenuItem>
                        </Select>
                    </FormControl> */}

                    <Button variant="contained" color="primary" type="submit">
                        Save Profile
                    </Button>
                </form>

            </Paper>
        </Box >

    );
}

export default RecruiterProfileForm;
