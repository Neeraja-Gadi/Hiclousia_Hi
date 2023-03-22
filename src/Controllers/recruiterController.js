
const recruiterModel = require("../Models/recruiterModel");

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



// const searchJobseeker = async function (req, res) {

//   try {

//       const searchJobseeker = await userModel.find({ recruiter: false });
//       const userDetails = await Promise.all(searchJobseeker.map(async (user) => {

//           const educationDetails = await educationModel.find({ userDetailsID: user._id });

//           //const experienceDetails = await experienceModel.find({ userDetailsID: user._id } );
//           //const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
//           // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
//           // // console.log(educationDetails)
//           let score = 0
//           for (let i = 0; i < educationDetails.length; i++) {
//               if (EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority] > score) {
//                   score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]
//               }
//           }
//           return {
//               userDetails: user,
//               educationDetails,
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
const userModel = require("../Models/recruiterModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
  
      const skillDetails = await mongoose.model('Skills').find(query).populate('userDetailsID', 'firstName lastName email');
      const educationDetails = await mongoose.model('Education').find(query).populate('userDetailsID', 'firstName lastName email');
      const experienceDetails = await mongoose.model('Experience').find(query).populate('userDetailsID', 'firstName lastName email');
  
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
  
module.exports = {recruiterInfo, updateRecruiterData, updateRecruiterData, searchJobseekerGeneral };

