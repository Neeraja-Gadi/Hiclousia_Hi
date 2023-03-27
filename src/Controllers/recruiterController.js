
const recruiterModel = require("../Models/recruiterModel");

const userModel = require("../Models/userModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const jobModel = require("../Models/jobModel");
const educationModel = require("../Models/InfoModels/educationModel.js");
const experienceModel =require("../Models/InfoModels/experienceModel.js")
const { EducationLevelPoints, AuthorityPoints } = require("../Constrains/authority.js");


const Joi = require('joi');

const recruiterInfo = async function (req, res) {
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

const updateRecruiterData = async function (req, res) {
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
        let recruiterData = await recruiterModel.findById({ _id: id });
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

        const updatedData = await recruiterModel.findByIdAndUpdate({ _id: id }, recruiterData, { new: true });
        return res.status(200).send({ status: true, data: updatedData, message: 'Recruiter data updated' });


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


//88888//



// const getallUsers = async function (req, res) {

//   try {

//       const searchJobseeker = await userModel.find({ recruiter: false });
//       const userDetails = await Promise.all(searchJobseeker.map(async (user) => {

//           const educationDetails = await educationModel.find({ userDetailsID: user._id });
//           const experienceDetails = await experienceModel.find({ userDetailsID: user._id } );
        //   const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
        //   const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
          // console.log(educationDetails)
//           let score = 0
//           for (let i = 0; i < educationDetails.length; i++) {
//               if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]+ experienceLevelPoints[experienceDetails[i].experienceLevel] > score) {
//                   score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] + experienceLevelPoints[experienceDetails[i].experienceLevel]
//               }

//           }
//           return {
//               userDetails: user,
//               educationDetails,
//               experienceDetails,
//               PoolPoints: score
//           }
//             }));
//             let premiumPool=[],vipPool=[],normalPool=[]
//             userDetails.map((userD)=>{
//                 if(userD.PoolPoints>=1700)premiumPool.push(userD)
//                 else if(userD.PoolPoints>=1000)vipPool.push(userD)
//                 else normalPool.push(userD)
//             })


//             res.json({premiumPool,vipPool,normalPool});

//             } 
//             catch (error) {
//             console.error(error);
//             res.status(500).json({ msg: error.message });
//         }

//       }
//7777777777777777777777777777777777777777777777777777777777777777777777
const searchJobseekerGeneral = async (req, res) => {
    try {
      const { experience, educationalLevel, discipline, primarySkills } = req.query;
  
      const query = {};
  
      if (experience){
        query.experience = { $regex: experience, $options: 'i' };
      }
  
      if (educationalLevel) {
        query.educationLevel = { $regex: educationalLevel, $options: 'i' };
      }
  
      if (discipline) {
        query.discipline = { $regex: discipline, $options: 'i' };
      }
  
      if (primarySkills) {
        query.primarySkills = { $regex: primarySkills, $options: 'i' };
      }
  
      const skillDetails = await mongoose.model('Skills').find(query).populate('userDetailsID.skills');

      const educationDetails = await mongoose.model('Education').find(query).populate('userDetailsID.education');
      const experienceDetails = await mongoose.model('Experience').find(query).populate( 'UserDetailsID.experience');
  
      console.log('skillDetails:', skillDetails);
      console.log('educationDetails:', educationDetails);
      console.log('experienceDetails:', experienceDetails);
  
      if (skillDetails.length === 0 && educationDetails.length === 0 && experienceDetails.length === 0) {
        return res.status(404).json({ status: false, message: 'Data not found' });
      }
  
      return res.status(200).json({ status: true, skillDetails, educationDetails, experienceDetails });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: 'Server error' });
    }
  };
  

const recruiterSearch = async (req, res) => {
    try {
      const {
        fullName,
        email,
        phoneNumber,
        professionalSummary,
        company,
        jobTitle,
        linkedin,
        twitter
      } = req.query;
  
      const query = {};
  
      if (fullName) {
        const fullNameArray = fullName.split(",");
        query.fullName = { $in: fullNameArray.map(name => new RegExp(name.trim(), 'i')) };
      }
  
      if (email) {
        const emailArray = email.split(",");
        query.email = { $in: emailArray.map(email => new RegExp(email.trim(), 'i')) };
      }
  
      if (phoneNumber) {
        const phoneNumberArray = phoneNumber.split(",");
        query.phoneNumber = { $in: phoneNumberArray.map(phoneNumber => new RegExp(phoneNumber.trim(), 'i')) };
      }
  
      if (professionalSummary) {
        const professionalSummaryArray = professionalSummary.split(",");
        query.professionalSummary = { $in: professionalSummaryArray.map(summary => new RegExp(summary.trim(), 'i')) };
      }
  
      if (company) {
        const companyArray = company.split(",");
        const workExperienceQuery = { company: { $in: companyArray.map(company => new RegExp(company.trim(), 'i')) } };
        if (jobTitle) {
          const jobTitleArray = jobTitle.split(",");
          workExperienceQuery.jobTitle = { $in: jobTitleArray.map(jobTitle => new RegExp(jobTitle.trim(), 'i')) };
        }
        query.workExperience = { $elemMatch: workExperienceQuery };
      }
  
      if (linkedin) {
        const linkedinArray = linkedin.split(",");
        query['socialMediaLinks.linkedin'] = { $in: linkedinArray.map(linkedin => new RegExp(linkedin.trim(), 'i')) };
      }
  
      if (twitter) {
        const twitterArray = twitter.split(",");
        query['socialMediaLinks.twitter'] = { $in: twitterArray.map(twitter => new RegExp(twitter.trim(), 'i')) };
      }
  
      const recruiters = await recruiterModel.find({ $or: [ query ] });
      if (recruiters.length === 0) {
        return res.status(404).json({ status: false, message: "No recruiters found" });
      }
      return res.status(200).json({ status: true, data: recruiters });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Server error" });
    }
  };
  

//*8888888888888888888888888888888888888888888888888888888

//Based on Talentpool
// const searchjobseekers = async function (req, res) {

//     try {
  
//       const allUsers = await userModel.find({ recruiter: false }).select({firstName:1 ,lastName:1,email:1});
//       const userDetails = await Promise.all(allUsers.map(async (user) => {
  
//         const educationDetails = await educationModel.find({ userDetailsID: user._id }).select({userDetailsID:1,educationLevel:1,authority:1,discipline:1});
//         const experienceDetails = await experienceModel.find({ userDetailsID: user._id } );
//         // const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
//         // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
//         // // console.log(educationDetails)
  
//         let score = 0
//         for (let i = 0; i < educationDetails.length; i++) {
//           if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] > score) {
//             score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]
//           }
//         }
  
//         return {
  
//           userDetails: user,
//           educationDetails,
//           PoolPoints: score,
//           experienceDetails,
//           //   skillsDetails,
//           //   projectDetails
//         }
  
//       }));

//     //   Creation of pools
//       let premiumPool = [], vipPool = [], normalPool = []
//       userDetails.map((userD) => {
//         if (userD.PoolPoints >= 1700) premiumPool.push(userD)
//         else if (userD.PoolPoints >= 1000) vipPool.push(userD)
//         else normalPool.push(userD)
//       })
  
//     //   Count the score of the jobpost created by recruiter   and refined the users acc to jobscore
//       const id = req.params.id                  //  get recruiter id from path
//       const jobposts = await jobModel.find({ userDetailsID: id })

//       let jobpostscore = 0; let jobPostinfo = []; 

//       for (let i = 0; i < jobposts.length; i++) {
//         jobpostscore = 0;
//         for (let j = 0; j < jobposts[i].education.length; j++) {
  
//           jobpostscore = jobpostscore + EducationLevelPoints[jobposts[i].education[j].educationLevel] + 
//           AuthorityPoints[jobposts[i].education[j].authority]
       
  
//           // console.log(jobpostscore)
//         }
//         let jobscoreavg = (jobposts[i].education.length )
//         // console.log("jobscoreavg -", jobscoreavg)
//         // console.log(jobpostscore)
//         jobpostscore = jobpostscore / jobscoreavg
//         jobPostinfo.push({ jobId: jobposts[i]._id, jobpoints: jobpostscore })
//       }
  
//       let refinedcandidates = []
//       // console.log(jobPostinfo) 
//       jobPostinfo.map((jpoints) => {
//         if (jpoints.jobpoints >= 1700) {
//           premiumPool.map((premiumCandidate) => {
  
//             if (premiumCandidate.PoolPoints >= jpoints.jobpoints) {
//               refinedcandidates.push(premiumCandidate)
//               jpoints.refinedcandidates = refinedcandidates
//             }
                 
//           })
//           jpoints.refinedcandidates = refinedcandidates
          
//         }
//         else if (jpoints.jobpoints < 1700 && jpoints.jobpoints >= 1000) {
//           jpoints.refinedcandidates = vipPool.map((vipCandidate) => {
//             if (vipCandidate.PoolPoints >= jpoints.jobpoints) {
//               refinedcandidates.push(vipCandidate)
//             }
//             //  console.log(vipCandidate)
//           })
//           jpoints.refinedcandidates = refinedcandidates
//         }
//         else if (jpoints.jobpoints < 1000) {
//           jpoints.refinedcandidates = normalPool.map((normalCandidate) => {
//             if (normalCandidate.PoolPoints >= jpoints.jobpoints) {
//               refinedcandidates.push(normalCandidate)
              
//               //  console.log(normalCandidate)
//             }
//           })
//           jpoints.refinedcandidates = refinedcandidates
//         }
//       }
//       )
  
//       res.json({ staus: true, data: jobPostinfo });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: error.message });
//     }
  
//   }
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

    // Create pools
    let premiumPool = [], vipPool = [], normalPool = []
    userDetails.map((userD) => {
      if (userD.PoolPoints >= 1700) premiumPool.push(userD)
      else if (userD.PoolPoints >= 1000) vipPool.push(userD)
      else normalPool.push(userD)
    })

    // Return pool data
    res.json({ status: true, data: { premiumPool, vipPool, normalPool } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }

}

module.exports = { recruiterInfo, updateRecruiterData ,searchjobseekers, recruiterSearch, searchJobseekerGeneral};

