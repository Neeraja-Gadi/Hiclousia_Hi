const jobModel = require("../Models/jobModel");
const Joi = require('joi');

const jobInfo = async (req, res) =>{
    try {
        const { userDetailsID, jobRole, experience, primarySkill, secondarySkills, jobDiscription, location, company, education, salary, sector} = req.body;
        const jobSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            jobRole: Joi.string().required(),
            experience: Joi.string().required(),
            primarySkills: Joi.string().required(),
            secondarySkills: Joi.string().required(),
            jobDiscription: Joi.string().required(),
            salary: Joi.string().required(),
            location: Joi.string().required(),
            company: Joi.string().required(),
            sector: Joi.string().required(),
            education: Joi.array().items(
              Joi.object({
                  authority: Joi.string().required(),
                  educationLevel: Joi.string().required(),
              })
            ).required(),
        });
        const validationResult = jobSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await jobModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Job-Post data created' });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
const updateJobData = async function(req, res){
  try {
      const jobSchema = Joi.object({

          userDetailsID: Joi.string(),
          jobRole: Joi.string(),
          experience: Joi.string(),
          primarySkills: Joi.string(),
          secondarySkills: Joi.string(),
          jobDiscription: Joi.string(),
          salary: Joi.string(),
          location: Joi.string(),
          company: Joi.string(),
          education: Joi.array().items(
            Joi.object({
                authority: Joi.string().required(),
                educationLevel: Joi.string().required()
            })
        ).required(),
          sector: Joi.string(),
      });
      const validationResult = jobSchema.validate(req.body, { abortEarly: false });
      if (validationResult.error) {
          return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
      };
      const id  = req.params.id;
          let jobData = {};
          jobData=  await jobModel.findById({_id: id});
          if (!jobData) {
              return res.status(404).send({ status: false, message: 'Job data not found' });
          }
   // if (req.method === 'PUT') {
          jobData.userDetailsID = req.body.userDetailsID;
          jobData.primarySkills = req.body.primarySkills;
          jobData.secondarySkills = req.body.secondarySkills;
          jobData.jobDiscription = req.body.jobDiscription;
          jobData.salary = req.body.salary;
          jobData.location = req.body.locajotion;
          jobData.company = req.body.company;
          jobData.education= req.body.education;
          jobData.sector= req.body.sector;
          jobData.experience=req.body.experience;
          jobData.jobRole=req.body.jobRole;

      const updatedData = await jobModel.findByIdAndUpdate({_id: id}, jobData, {new:true});
      return res.status(200).send({ status: true, data: updatedData, message: 'Job data updated' });
      // 
  } catch (err) {
  return res.status(500).send({ status: false, message: err.message })
}
}


const searchJobs = async (req, res) => {
  try {
    const {
      jobRole,
      experience,
      primarySkills,
      secondarySkills,
      jobDescription,
      education,
      company,
      location
    } = req.query;

    const query = {};

    if (jobRole) {
      query.jobRole = { $regex: jobRole, $options: 'i' };
    }

    if (experience) {
      query.experience = { $regex: experience, $options: 'i' };
    }

    if (primarySkills) {
      query.primarySkills = { $regex: primarySkills, $options: 'i' };
    }

    if (secondarySkills) {
      query.secondarySkills = { $regex: secondarySkills, $options: 'i' };
    }

    if (jobDescription) {
      query.jobDescription = { $regex: jobDescription, $options: 'i' };
    }

    if (education) {
      query.education = { $regex: education, $options: 'i' };
    }

    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const jobs = await jobModel.find(query );
    if (!jobs){
      return res.status(404).json({status: false, message: "Data not found" });
    }
    return res.status(200).json({ status: true, data: jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

module.exports = { jobInfo,  searchJobs, updateJobData };


