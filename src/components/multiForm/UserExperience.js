import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Add, Remove } from '@material-ui/icons';
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

function ExperienceForm() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    experiences: [
      {
        projectTitle: '',
        description: '',
        skillsUsed: '',
        startDate: '',
        endDate: '',
        Url: '',
        organizationName: ''
      }
    ]
  });

  const handleExperienceChange = (event , index) => {
    const { name, value } = event.target;
    const experiences = [...formData.experiences];
    experiences[index] = {
      ...experiences[index],
      [name]: value
    };
    setFormData({
      experiences
    });
  }

  const  handleAddExperience= () => {
    const experiences = [...formData.experiences, {
      projectTitle: '',
      description: '',
      skillsUsed: '',
      startDate: '',
      endDate: '',
      Url: '',
      organizationName: ''
    }];
    setFormData({
      experiences
    });
  }

  const handleRemoveExperience = (index) => {
    const experiences = [...formData.experiences];
    experiences.splice(index, 1);
    setFormData({
      experiences
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {formData.experiences.map((experience, index) => (
        <div key={index}>
          <TextField 
            label="Project Title"
            name="projectTitle"
            variant="outlined"
            required
            value={experience.projectTitle}
            onChange={(event) => handleExperienceChange(index, event)}
          />
          
          <TextField
            label="Skills"
            name="skillsUsed"
            variant="outlined"
            required
            value={experience.skillsUsed}
            onChange={(event) => handleExperienceChange(index, event)}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            variant="outlined"
            required
            value={experience.startDate}
            onChange={(event) => handleExperienceChange(index, event)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            variant="outlined"
            required
            value={experience.endDate}
            onChange={(event) => handleExperienceChange(index, event)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="URL"
            name="Url"
            variant="outlined"
            required
            value={experience.Url}
            onChange={(event) => handleExperienceChange(index, event)}
          />
          <TextField
            label="Organization Name"
            name="organizationName"
            type="text"
            variant="outlined"
            required
            value={experience.organizationName}
            onChange={(event) => handleExperienceChange(index, event)}
          />
          <TextField
            label="Description"
            name="description"
            value={experience.description}
            variant="outlined"
            required
            fullWidth
            multiline
            maxRows={2}
            defaultValue="Text limit 250 characters"
            color="success"
            focused 
            onChange={(event) => handleExperienceChange(index, event)}
          />
          {index === formData.experiences.length - 1 &&
            <Button
              className={classes.addButton}
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddExperience}
              >
              Add
              </Button>
              }
              {index !== formData.experiences.length - 1 &&
              <Button
              className={classes.removeButton}
              variant="contained"
              color="teritiary"
              startIcon={<Remove />}
              onClick={() => handleRemoveExperience(index)}
              >
              Remove
              </Button>
              }
              </div>
              ))}
              <Button
                   type="submit"
                   variant="contained"
                   color="primary"
                 >
              Submit
              </Button>
              </form>
              );
              }
              
              export default ExperienceForm;
