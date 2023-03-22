

const recruiterModel = require("../Models/recruiterModel");
const jobModel = require("../Models/jobModel");
const educationModel = require("../Models/InfoModels/educationModel.js");
const experienceModel =require("../Models/InfoModels/experienceModel.js")
const { EducationLevelPoints, AuthorityPoints } = require("../Constrains/authority.js");
const userModel =require ("../Models/userModel")
const Joi = require('joi');

const recruiterInfo = async function (req, res){
    try {
        const recruiterSchema = Joi.object({
            fullName: Joi.string().required(),
            email: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            professionalSummary: Joi.string(),
            workExperience: Joi.array().items(
                Joi.object({
                    company: Joi.string().required(),
                    jobTitle: Joi.string().required()
                })
            ).required(),
            awards: Joi.array().items(Joi.string()),
            socialMediaLinks: Joi.object({
                linkedin: Joi.string(),
                twitter: Joi.string()
            })
        });
        const validationResult = recruiterSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        }

        // Create new recruiter data
        const data = await recruiterModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Recruiter data created' });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

const updateRecruiterData = async function(req, res){
    try {
        const recruiterSchema = Joi.object({
            fullName: Joi.string(),
            email: Joi.string(),
            phoneNumber: Joi.string(),
            professionalSummary: Joi.string(),
            workExperience: Joi.array().items(
                Joi.object({
                    company: Joi.string().required(),
                    jobTitle: Joi.string().required()
                })
            ),
            awards: Joi.array().items(Joi.string()),
            socialMediaLinks: Joi.object({
                linkedin: Joi.string(),
                twitter: Joi.string()
            })
        });

        const validationResult = recruiterSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        }

        const id = req.params.id;
        let recruiterData = await recruiterModel.findById({_id: id});
        if (!recruiterData) {
            return res.status(404).send({ status: false, message: 'Recruiter data not found' });
        }

        recruiterData.fullName = req.body.fullName || recruiterData.fullName;
        recruiterData.email = req.body.email || recruiterData.email;
        recruiterData.phoneNumber = req.body.phoneNumber || recruiterData.phoneNumber;
        recruiterData.professionalSummary = req.body.professionalSummary || recruiterData.professionalSummary;
        recruiterData.workExperience = req.body.workExperience || recruiterData.workExperience;
        recruiterData.awards = req.body.awards || recruiterData.awards;
        recruiterData.socialMediaLinks = req.body.socialMediaLinks || recruiterData.socialMediaLinks;

        const updatedData = await recruiterModel.findByIdAndUpdate({_id: id}, recruiterData, {new: true});
        return res.status(200).send({ status: true, data: updatedData, message: 'Recruiter data updated' });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


const searchjobseekers = async function (req, res) {

    try {
  
      const allUsers = await userModel.find({ recruiter: false }).select({firstName:1 ,lastName:1,email:1});
      const userDetails = await Promise.all(allUsers.map(async (user) => {
  
        const educationDetails = await educationModel.find({ userDetailsID: user._id }).select({userDetailsID:1,educationLevel:1,authority:1,discipline:1});
        const experienceDetails = await experienceModel.find({ userDetailsID: user._id } );
        // const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
        // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
        // // console.log(educationDetails)
  
        let score = 0
        for (let i = 0; i < educationDetails.length; i++) {
          if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] > score) {
            score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]
          }
        }
  
        return {
  
          userDetails: user,
          educationDetails,
          PoolPoints: score,
          experienceDetails,
          //   skillsDetails,
          //   projectDetails
        }
  
      }));

    //   Creation of pools
      let premiumPool = [], vipPool = [], normalPool = []
      userDetails.map((userD) => {
        if (userD.PoolPoints >= 1700) premiumPool.push(userD)
        else if (userD.PoolPoints >= 1000) vipPool.push(userD)
        else normalPool.push(userD)
      })
  
    //   Count the score of the jobpost created by recruiter   and refined the users acc to jobscore
      const id = req.params.id                  //  get recruiter id from path
      const jobposts = await jobModel.find({ userDetailsID: id })

      let jobpostscore = 0; let jobPostinfo = []; 

      for (let i = 0; i < jobposts.length; i++) {
        jobpostscore = 0;
        for (let j = 0; j < jobposts[i].education.length; j++) {
  
          jobpostscore = jobpostscore + EducationLevelPoints[jobposts[i].education[j].educationLevel] + 
          AuthorityPoints[jobposts[i].education[j].authority]
       
  
          // console.log(jobpostscore)
        }
        let jobscoreavg = (jobposts[i].education.length )
        // console.log("jobscoreavg -", jobscoreavg)
        // console.log(jobpostscore)
        jobpostscore = jobpostscore / jobscoreavg
        jobPostinfo.push({ jobId: jobposts[i]._id, jobpoints: jobpostscore })
      }
  
      let refinedcandidates = []
      // console.log(jobPostinfo) 
      jobPostinfo.map((jpoints) => {
        if (jpoints.jobpoints >= 1700) {
          premiumPool.map((premiumCandidate) => {
  
            if (premiumCandidate.PoolPoints >= jpoints.jobpoints) {
              refinedcandidates.push(premiumCandidate)
              jpoints.refinedcandidates = refinedcandidates
            }
                 
          })
          jpoints.refinedcandidates = refinedcandidates
          
        }
        else if (jpoints.jobpoints < 1700 && jpoints.jobpoints >= 1000) {
          jpoints.refinedcandidates = vipPool.map((vipCandidate) => {
            if (vipCandidate.PoolPoints >= jpoints.jobpoints) {
              refinedcandidates.push(vipCandidate)
            }
            //  console.log(vipCandidate)
          })
          jpoints.refinedcandidates = refinedcandidates
        }
        else if (jpoints.jobpoints < 1000) {
          jpoints.refinedcandidates = normalPool.map((normalCandidate) => {
            if (normalCandidate.PoolPoints >= jpoints.jobpoints) {
              refinedcandidates.push(normalCandidate)
              
              //  console.log(normalCandidate)
            }
          })
          jpoints.refinedcandidates = refinedcandidates
        }
      }
      )
  
      res.json({ staus: true, data: jobPostinfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  
  }
module.exports = { recruiterInfo, updateRecruiterData ,searchjobseekers};
