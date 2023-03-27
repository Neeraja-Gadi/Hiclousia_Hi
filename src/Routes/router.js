
const userController = require("../Controllers/userController")
const infoController=require("../Controllers/infoController")
const jobController=require("../Controllers/jobController")
const recruiterController = require("../Controllers/recruiterController")

const express = require("express");
const router = express.Router();
const{body, validationResult} =require('express-validator');
// 88888888888888888888888888888888888888888888888888888888888888888888888
// const { getTopTwoRankedStudents } = require('../controllers/rankController');

// router.get('/ranked-students', getTopTwoRankedStudents);
// 88888888888888888888888888888888888888888888888888888888888888888888888



router.post("/create",userController.register);
router.post("/login",userController.loginUser);
router.post("/experience",infoController.experienceInfo);
router.post("/education",infoController.educationInfo);
router.post("/project",infoController.projectInfo);
router.post("/skill",infoController.skillsInfo);
router.post("/job",jobController.jobInfo);
router.post("/recruiter",recruiterController.recruiterInfo)

//88888888888888888888888888888888888888888888888888888

router.put("/experience/:id",infoController.updateExperienceData);
router.put("/education/:id",infoController.updateEducationData);
router.put("/skill/:id",infoController.updateSkillsData);
router.put("/job/:id",jobController.updateJobData);

//888888888888888888888888888888888888888888888888888888

router.get("/personal/:id",infoController.personalInfo);
router.get("/job",jobController.searchJobs); //general job search for user or jobseeker
router.get("/jobseeker",recruiterController.recruiterSearch);


router.get("/allrecruiter",recruiterController.searchJobseekerGeneral);// general recruiter search for candidate

router.get("/allusers/:id",recruiterController.searchjobseekers) //pool based serach for Recruiter








module.exports = router;
