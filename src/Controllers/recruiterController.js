
const recruiterModel = require("../Models/recruiterModel");
const userprofileModel = require("../Models/userprofileModel");
const userModel = require("../Models/userModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jobModel = require("../Models/jobModel");
const educationModel = require("../Models/InfoModels/educationModel.js");
const experienceModel = require("../Models/InfoModels/experienceModel.js");
const { EducationLevelPoints, AuthorityPoints, ExperienceLevelPoints } = require("../Constrains/authority.js");


const Joi = require('joi');
const skillsModel = require("../Models/InfoModels/skillsModel");

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

    if (experience) {
      const experienceArray = experience.split(",");
      query.experience = { $in: experienceArray.map(experience => new RegExp(experience.trim(), 'i')) };
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
    const experienceDetails = await mongoose.model('Experience').find(query).populate('UserDetailsID.experience');

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

//*************************************************************************************************************** ***************************************/Main
//1
// async function recruiterSearch(req, res) {
//   try {
//     const { primarySkills, secondarySkills, experience, educationLevel } = req.query;
//     console.log(`Search params: primarySkills=${primarySkills}, secondarySkills=${secondarySkills}, experience=${experience}, educationLevel=${educationLevel}`);
//     const schema = Joi.object({
//       primarySkills: Joi.string().allow(''),
//       secondarySkills: Joi.string().allow(''),
//       experience: Joi.string().allow(''),
//       educationLevel: Joi.string().allow(''),
//     });
//     const validation = schema.validate(req.query);
//     if (validation.error) {
//       return res.status(400).send({ message: validation.error.details[0].message });
//     }

//     //Construct query based on search criteria
//     const skillsQuery = {};
//     if (primarySkills) {
//       skillsQuery.primarySkills = { $regex: new RegExp(`^${primarySkills}$`, 'i') };
//     }
//     if (secondarySkills) {
//       skillsQuery.secondarySkills = { $regex: new RegExp(`^${secondarySkills}$`, 'i') };
//     }
//     const educationQuery = {};
//     if (educationLevel) {
//       educationQuery.educationLevel = { $regex: new RegExp(`^${educationLevel}$`, 'i') };
//     }
//     const experienceQuery = {};
//     if (experience) {
//       experienceQuery.experience = { $in: experience.split(',') };}

//     // Perform search and return results
//     const users = await userModel.find({ recruiter: false });
//     const education = await educationModel.find(educationQuery, 'userDetailsID educationLevel collegeName authority discipline yearOfpassout');
//     const experienceResults = await experienceModel.find(experienceQuery, 'userDetailsID experience');
//     const skills = await skillsModel.find(skillsQuery, 'userDetailsID primarySkills secondarySkills');

//     // Map results to include all required fields
//     let results = users.map((user) => {
//       const userExperience = experienceResults.find(ex => ex.userDetailsID.toString() === user._id.toString()) || {};
//       const userEducation = education.find(e => e.userDetailsID.toString() === user._id.toString()) || {};
//       const userSkills = skills.find(s => s.userDetailsID.toString() === user._id.toString()) || {};
//       let matchCount = 0;

//       if (primarySkills && userSkills.primarySkills && new RegExp(`^${primarySkills}$`, 'i').test(userSkills.primarySkills)) {
//         matchCount++;
//       }
//       if (secondarySkills && userSkills.secondarySkills && new RegExp(`^${secondarySkills}$`, 'i').test(userSkills.secondarySkills)) {
//         matchCount++;
//       }
//       if (experience && userExperience.experience && userExperience.experience.toLowerCase() === experience.toLowerCase()) {
//         matchCount++;
//       }
//       if (educationLevel && userEducation.educationLevel && new RegExp(`^${educationLevel}$`, 'i').test(userEducation.educationLevel)) {
//         matchCount++;
//       }
//       if (matchCount === 0) {
//         return null;

//       } else {
//         return {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           educationLevel: userEducation.educationLevel || '',
//           collegeName: userEducation.collegeName || '',
//           authority: userEducation.authority || '',
//           discipline: userEducation.discipline || '',
//           yearOfpassout: userEducation.yearOfpassout || '',
//           experience: userExperience.experience || '',
//           primarySkills: userSkills.primarySkills || [],
//           secondarySkills: userSkills.secondarySkills || [],
//         };
//       }
//     });
//     results = results.filter(result => result !== null);
//     res.send(results);
//   } catch (error) {

//     res.status(500).send({ status: true,message: error.message });
//   }
// };

//2
// async function recruiterSearch(req, res) {
//   try {
//     const { primarySkills, secondarySkills, experience, educationLevel } = req.query;
//     console.log(`Search params: primarySkills=${primarySkills}, secondarySkills=${secondarySkills}, experience=${experience}, educationLevel=${educationLevel}`);
//     const schema = Joi.object({
//       primarySkills: Joi.string().allow(''),
//       secondarySkills: Joi.string().allow(''),
//       experience: Joi.string().allow(''),
//       educationLevel: Joi.string().allow(''),
//     });
//     const validation = schema.validate(req.query);
//     if (validation.error) {
//       return res.status(400).send({ message: validation.error.details[0].message });
//     }

//     //Construct query based on search criteria
//     const skillsQuery = {};
//     if (primarySkills) {
//       skillsQuery.primarySkills = { $regex: new RegExp(`^${primarySkills}$`, 'i') };
//     }
//     if (secondarySkills) {
//       skillsQuery.secondarySkills = { $regex: new RegExp(`^${secondarySkills}$`, 'i') };
//     }
//     const educationQuery = {};
//     if (educationLevel) {
//       educationQuery.educationLevel = { $regex: new RegExp(`^${educationLevel}$`, 'i') };
//     }
//     const experienceQuery = {};
//     if (experience) {
//       experienceQuery.experience = experience.split(',')
//       experienceQuery.experience = {$in : experienceQuery.experience.map(e=>e.trim())}
//     }
//     //console.log(experienceQuery.experience);
//     // Perform search and return results
//     const users = await userModel.find({ recruiter: false });
//     const education = await educationModel.find(educationQuery, 'userDetailsID educationLevel collegeName authority discipline yearOfpassout');
//     const experienceResults = await experienceModel.find(experienceQuery, 'userDetailsID experience');
//     console.log(experienceResults);
//     const skills = await skillsModel.find(skillsQuery, 'userDetailsID primarySkills secondarySkills');
//     // Map results to include all required fields
//     let result = users.map((user) => {
//       const userExperience = experienceResults.find(ex => ex.userDetailsID.toString() === user._id.toString()) || {};
//       //console.log(userExperience);
//       const userEducation = education.find(e => e.userDetailsID.toString() === user._id.toString()) || {};
//       //console.log(userEducation);
//       const userSkills = skills.find(s => s.userDetailsID.toString() === user._id.toString()) || {};
//       //console.log(userSkills);
//       let matchCount = 0;
//       if (primarySkills && userSkills.primarySkills && new RegExp(`^${primarySkills}$`, 'i').test(userSkills.primarySkills)) {
//         matchCount++;
//       }
//       if (secondarySkills && userSkills.secondarySkills && new RegExp(`^${secondarySkills}$`, 'i').test(userSkills.secondarySkills)) {
//         matchCount++;
//       }
//       if (experience && userExperience.experience && userExperience.experience.toLowerCase() === experience.toLowerCase()) {
//         matchCount++;
//         console.log(matchCount)
//       }
//       if (educationLevel && userEducation.educationLevel && new RegExp(`^${educationLevel}$`, 'i').test(userEducation.educationLevel)) {
//         matchCount++;
//       }
//       if (matchCount === 0) {
//         return null;
//       } else {
//         return {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           educationLevel: userEducation.educationLevel || '',
//           collegeName: userEducation.collegeName || '',
//           authority: userEducation.authority || '',
//           discipline: userEducation.discipline || '',
//           yearOfpassout: userEducation.yearOfpassout || '',
//           experience: userExperience.experience || {},
//           primarySkills: userSkills.primarySkills || [],
//           secondarySkills: userSkills.secondarySkills || [],
//         };
//       }
//     }
//     );
//     // console.log(result)
//     result = result.filter(result => result !== null);
//     res.send(result);
    
//   } catch (error) {

//     res.status(500).send({ status: false,message: error.message });
//   }
// };

//3 R
async function recruiterSearch(req, res) {
  try {
    const { primarySkills, secondarySkills, experience, educationLevel } = req.query;
    console.log(`Search params: primarySkills=${primarySkills}, secondarySkills=${secondarySkills}, experience=${experience}, educationLevel=${educationLevel}`);
    const schema = Joi.object({
      primarySkills: Joi.string().allow(''),
      secondarySkills: Joi.string().allow(''),
      experience: Joi.string().allow(''),
      educationLevel: Joi.string().allow(''),
    });
    const validation = schema.validate(req.query);
    if (validation.error) {
      return res.status(400).send({ message: validation.error.details[0].message });
    }

    //Construct query based on search criteria
    const skillsQuery = {};
    if (primarySkills) {
      skillsQuery.primarySkills = { $regex: new RegExp(`^${primarySkills}$`, 'i') };
    }
    if (secondarySkills) {
      skillsQuery.secondarySkills = { $regex: new RegExp(`^${secondarySkills}$`, 'i') };
    }
    const educationQuery = {};
    if (educationLevel) {
      educationQuery.educationLevel = { $regex: new RegExp(`^${educationLevel}$`, 'i') };
    }
    // Create an array of experiences
    const experienceArray = [];
    if (experience) {
      const experiences = experience.split(",");
      for (let i = 0; i < experiences.length; i++) {
        experienceArray.push(experiences[i].trim());
      }
    }

    // Perform search and return results
    const users = await userModel.find({ recruiter: false });
    const education = await educationModel.find(educationQuery, 'userDetailsID educationLevel collegeName authority discipline yearOfpassout');
    const experienceResults = await experienceModel.find({}, 'userDetailsID experience');
    console.log(experienceResults);
    const skills = await skillsModel.find(skillsQuery, 'userDetailsID primarySkills secondarySkills');

    // Map results to include all required fields
    let result = users.map((user) => {
      const userExperience = experienceResults.find(ex => ex.userDetailsID.toString() === user._id.toString()) || {};
      const userEducation = education.find(e => e.userDetailsID.toString() === user._id.toString()) || {};
      const userSkills = skills.find(s => s.userDetailsID.toString() === user._id.toString()) || {};
      let matchCount = 0;
      if (primarySkills && userSkills.primarySkills && new RegExp(`^${primarySkills}$`, 'i').test(userSkills.primarySkills)) {
        matchCount++;
      }
      if (secondarySkills && userSkills.secondarySkills && new RegExp(`^${secondarySkills}$`, 'i').test(userSkills.secondarySkills)) {
        matchCount++;
      }
      if (experienceArray.length > 0 && userExperience.experience && experienceArray.includes(userExperience.experience)) {
        matchCount++;
      }
      if (educationLevel && userEducation.educationLevel && new RegExp(`^${educationLevel}$`, 'i').test(userEducation.educationLevel)) {
        matchCount++;
      }
      if (matchCount === 0) {
        return null;
      } else {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          educationLevel: userEducation.educationLevel || '',
          collegeName: userEducation.collegeName || '',
          authority: userEducation.authority || '',
          discipline:userEducation.discipline || '',
          yearOfpassout: userEducation.yearOfpassout || '',
          experience: userExperience.experience || {},
          primarySkills: userSkills.primarySkills || [],
          secondarySkills: userSkills.secondarySkills || [],
        };
      }
    }
    );
    // console.log(result)
    result = result.filter(result => result !== null);
    res.send(result);
    
  } catch (error) {

    res.status(500).send({ status: false,message: error.message });
  }
};



//***********************************************************8888888888888888888888888888888888888888888 */
const recruiterInformation = async function (req, res) {
  try {
    const id = req.params.id;
    const recruiterData = await recruiterModel.find({ _id: id });
    res.status(200).json({ status: true, data: recruiterData });
  }
  catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

//*8888888888888888888888888888888888888888888888888888888

//based on Talentpool
// const searchjobseekers = async function (req, res){
//   try {

//     const allUsers = await userModel.find({ recruiter: false }).select({ firstName: 1, lastName: 1, email: 1 });
//     const userDetails = await Promise.all(allUsers.map(async (user) => {

//       const educationDetails = await educationModel.find({ userDetailsID: user._id }).select({ userDetailsID: 1, educationLevel: 1, authority: 1, discipline: 1 });
//       const experienceDetails = await experienceModel.find({ userDetailsID: user._id });
//       // const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
//       // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
//       // // console.log(educationDetails)

//       let score = 0
//       for (let i = 0; i < educationDetails.length; i++) {
//         if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] > score) {
//           score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]
//         }
//       }

//       return {

//         userDetails: user,
//         educationDetails,
//         PoolPoints: score,
//         experienceDetails,
//         //   skillsDetails,
//         //   projectDetails
//       }

//     }));

//     //   Creation of pools
//     let premiumPool = [], vipPool = [], normalPool = []
//     userDetails.map((userD) => {
//       if (userD.PoolPoints >= 1700) premiumPool.push(userD)
//       else if (userD.PoolPoints >= 1000) vipPool.push(userD)
//       else normalPool.push(userD)
//     })

//     //   Count the score of the jobpost created by recruiter   and refined the users acc to jobscore
//     const id = req.params.id                  //  get recruiter id from path
//     const jobposts = await jobModel.find({ userDetailsID: id })

//     let jobpostscore = 0; let jobPostinfo = [];

//     for (let i = 0; i < jobposts.length; i++) {
//       jobpostscore = 0;
//       for (let j = 0; j < jobposts[i].education.length; j++) {

//         jobpostscore = jobpostscore + EducationLevelPoints[jobposts[i].education[j].educationLevel] +
//           AuthorityPoints[jobposts[i].education[j].authority]


//         // console.log(jobpostscore)
//       }
//       let jobscoreavg = (jobposts[i].education.length)
//       // console.log("jobscoreavg -", jobscoreavg)
//       // console.log(jobpostscore)
//       jobpostscore = jobpostscore / jobscoreavg
//       jobPostinfo.push({ jobId: jobposts[i]._id, jobpoints: jobpostscore })
//     }

//     jobPostinfo.map((jpoints) => {
//       let refinedcandidates = []; // move this line inside the map function to avoid reusing old values

//       // Add refined candidates to the array
//       if (jpoints.jobpoints >= 1700) {
//         premiumPool.map((premiumCandidate) => {
//           if (premiumCandidate.PoolPoints >= jpoints.jobpoints) {
//             refinedcandidates.push(premiumCandidate);
//           }
//         });
//       } else if (jpoints.jobpoints < 1700 && jpoints.jobpoints >= 1000) {
//         vipPool.map((vipCandidate) => {
//           if (vipCandidate.PoolPoints >= jpoints.jobpoints) {
//             refinedcandidates.push(vipCandidate);
//           }
//         });
//       } else if (jpoints.jobpoints < 1000) {
//         normalPool.map((normalCandidate) => {
//           if (normalCandidate.PoolPoints >= jpoints.jobpoints) {
//             refinedcandidates.push(normalCandidate);
//           }
//         });
//       }

//       // Filter refined candidates based on education and experience requirements
//       jpoints.refinedcandidates = refinedcandidates.filter((candidate) => {
//         for (let i = 0; i < jobposts.length; i++) {
//           let educationRequirementMet = false;
//           let experienceRequirementMet = false;

//           // Check if candidate meets education requirement
//           for (let j = 0; j < jobposts[i].education.length; j++) {
//             const educationLevelPoints = EducationLevelPoints[jobposts[i].education[j].educationLevel];
//             const authorityPoints = AuthorityPoints[jobposts[i].education[j].authority];
//             const jobpostscore = educationLevelPoints + authorityPoints;

//             if (jobpostscore <= candidate.PoolPoints) {
//               educationRequirementMet = true;
//               break;
//             }
//           }

//           // Check if candidate meets experience requirement
//           if (candidate.yearsOfExperience >= jobposts[i].experience) {
//             experienceRequirementMet = true;
//           }

//           // If both requirements are met, keep the candidate
//           if (educationRequirementMet && experienceRequirementMet) {
//             return true;
//           }
//         }

//         // If none of the job posts requirements are met, filter out the candidate
//         return false;
//       });
//     });
//   


// const searchjobseekers = async function (req, res) {

//   try {

//     const allUsers = await userModel.find({ recruiter: false }).select({firstName:1 ,lastName:1,email:1});
//     const userDetails = await Promise.all(allUsers.map(async (user) => {

//       const educationDetails = await educationModel.find({ userDetailsID: user._id }).select({userDetailsID:1,educationLevel:1,authority:1,discipline:1});
//       const experienceDetails = await experienceModel.find({ userDetailsID: user._id } );
//       // const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
//       // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
//       // // console.log(educationDetails)

//       let score = 0
//       for (let i = 0; i < educationDetails.length; i++) {
//         if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] > score) {
//           score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]
//         }
//       }

//       return {

//         userDetails: user,
//         educationDetails,
//         PoolPoints: score,
//         experienceDetails,
//         //   skillsDetails,
//         //   projectDetails
//       }

//     }));

//     //   Creation of pools
//     let premiumPool = [], vipPool = [], normalPool = []
//     userDetails.map((userD) => {
//       if (userD.PoolPoints >= 1700) premiumPool.push(userD)
//       else if (userD.PoolPoints >= 1000) vipPool.push(userD)
//       else normalPool.push(userD)
//     })

//     //   Count the score of the jobpost created by recruiter
//     let jobPost = await jobModel.findById(req.params.id);
//     let jobScore = 0;
//     jobScore += jobPost.jobTitlePoints + jobPost.jobDescriptionPoints + jobPost.skillsRequiredPoints + jobPost.experienceRequiredPoints + jobPost.educationRequiredPoints;
//     // console.log(jobScore)

//     // Refining the users according to job score
//     let refinedUsers = [];
//     if (jobScore >= 1700) refinedUsers = [...premiumPool]
//     else if (jobScore >= 1000) refinedUsers = [...vipPool, ...normalPool]
//     else refinedUsers = [...normalPool]

//     // Filtering out the refined users who do not meet the experience requirement
//     let usersFilteredByExperience = refinedUsers.filter((user) => {
//       let experienceSum = 0;
//       for (let i = 0; i < user.experienceDetails.length; i++) {
//         experienceSum += user.experienceDetails[i].durationMonths;
//       }
//       return experienceSum >= jobPost.experienceRequired
//     });

//     res.status(200).json({
//       success: true,
//       message: "Search successful",
//       data: usersFilteredByExperience
//     });

//   } catch (error) {
//   res.status(500).send({ status: false, message: err.message })
// }
// }




const searchjobseekers = async function (req, res) {

  try {

    const allUsers = await userModel.find({ recruiter: false }).select({ firstName: 1, lastName: 1, email: 1 });
    const userDetails = await Promise.all(allUsers.map(async (user) => {

      //this code is a simple and effective way to get education and experience details for a specific user.//

      const educationDetails = await educationModel.find({ userDetailsID: user._id }).select({ userDetailsID: 1, educationLevel: 1, authority: 1 });
      const experienceDetails = await experienceModel.find({ userDetailsID: user._id }).select({ userDetailsID: 1, experience: 1 });
      // const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
      // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
      // // console.log(educationDetails)

      let score = 0
      //The EducationLevelPoints and AuthorityPoints are two objects which have predefined values assigned to them for each education level and authority.The code block calculates the score for each education and Experience detail by adding the points for the education level and the authority and experience. If the calculated score is greater than the existing score, the existing score is updated with the new score. This ensures that only the education detail with the highest score is considered for the final educational score.
      for (let i = 0; i < educationDetails.length; i++) {
        if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] + ExperienceLevelPoints[experienceDetails[i].experience] > score) {
          score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] + ExperienceLevelPoints[experienceDetails[i].experience]
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



    // Count the score of the job post created by recruiter and refine the users according to job score




    const jobId = req.params.id;
    const jobPost = await jobModel.findById(jobId);

    let matchingUsers = []

    for (let i = 0; i < userDetails.length; i++) {
      let candidateScore = 0
      const candidate = userDetails[i]

      // Check if candidate meets experience requirement
      if (jobPost.experienceRequired) {
        let yearsOfExperience = 0
        for (let j = 0; j < candidate.experienceDetails.length; j++) {
          yearsOfExperience += calculateExperience(candidate.experienceDetails[j].startDate, candidate.experienceDetails[j].endDate)
        }
        if (yearsOfExperience < jobPost.experienceRequired) {
          continue
        }
        candidateScore += ExperienceLevelPoints[yearsOfExperience]
      }

      // Check if candidate meets education requirement
      if (jobPost.educationRequired) {
        let highestEducationScore = 0
        for (let j = 0; j < candidate.educationDetails.length; j++) {
          const educationLevel = candidate.educationDetails[j].educationLevel
          const authority = candidate.educationDetails[j].authority
          const educationScore = EducationLevelPoints[educationLevel] + AuthorityPoints[authority]
          if (educationScore > highestEducationScore) {
            highestEducationScore = educationScore
          }
        }
        if (highestEducationScore < EducationLevelPoints[jobPost.educationRequired]) {
          continue
        }
        candidateScore += highestEducationScore
      }

      // Check if candidate meets skill requirements
      if (jobPost.skillsRequired) {
        let hasRequiredSkills = true
        for (let j = 0; j < jobPost.skillsRequired.length; j++) {
          const requiredSkill = jobPost.skillsRequired[j]
          const hasSkill = candidate.skillsDetails.some(skill => skill.name === requiredSkill.name && skill.level >= requiredSkill.level)
          if (!hasSkill) {
            hasRequiredSkills = false
            break
          }
        }
        if (!hasRequiredSkills) {
          continue
        }
        candidateScore += SkillPoints
      }

      // Check if candidate meets project requirements
      if (jobPost.projectsRequired) {
        let hasRequiredProjects = true
        for (let j = 0; j < jobPost.projectsRequired.length; j++) {
          const requiredProject = jobPost.projectsRequired[j]
          const hasProject = candidate.projectDetails.some(project => project.name === requiredProject.name && project.role === requiredProject.role)
          if (!hasProject) {
            hasRequiredProjects = false
            break
          }
        }
        if (!hasRequiredProjects) {
          continue
        }
        candidateScore += ProjectPoints
      }

      // If candidate passed all requirements, add them to the matching users array
      matchingUsers.push({
        userDetails: candidate.userDetails,
        educationDetails: candidate.educationDetails,
        PoolPoints: candidate.PoolPoints,
        experienceDetails: candidate.experienceDetails,
        score: candidateScore
      })
    }

    // Sort matching users by descending score
    matchingUsers.sort((a, b) => b.score - a.score)

    res.status(200).json({
      success: true,
      message: "Matching job seekers found",
      matchingUsers
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

module.exports = { recruiterInformation, recruiterInfo, updateRecruiterData, searchjobseekers, recruiterSearch, searchJobseekerGeneral };
