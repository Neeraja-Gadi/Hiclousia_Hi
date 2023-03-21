const userModel = require("../Models/userModel");
const educationModel = require("../Models/InfoModels/educationModel.js");
const { EducationLevelPoints,AuthorityPoints  } = require("../Constrains/authority.js");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const jobModel = require("../Models/jobModel");


const register = async function (req, res) {
  try {
    const { firstName, lastName, email, recruiter, password } = req.body;

    const userSchema = Joi.object({
      firstName: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      lastName: Joi.string().pattern(new RegExp("^[a-zA-Z]")).required(),
      email: Joi.string().email().required(),
      recruiter: Joi.boolean().required(),
      password: Joi.string().min(8).max(15).required()
    });

    const validationResult = userSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
    }

    const userEmail = await userModel.findOne({ email });

    if (userEmail) {
      return res.status(400).send({ status: false, message: "User already exists" });
    }

    const user = await userModel.create({ firstName, lastName, email, password,recruiter });

    if (user) {
      return res.status(201).send({ status: true, message: "User created successfully", data: user });
    } else {
      return res.status(400).send({ status: false, message: "User creation failed" });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};


const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    const userSchema = Joi.object({
      password: Joi.string().min(8).max(15).required(),
      email: Joi.string().email().required()
    });

    const validationResult = userSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
    }

    const user = await userModel.findOne({ email, password });

    if (!user) {
      res.status(400).send({ status: false, message: "Invalid username or password" });
    } else {
      const token = jwt.sign(user._id.toString(), "Hiclousia"); // should be kept in the env file
      res.status(200).send({ status: true, message: "User logged in successfully", token: token, data: user });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};
const userGeneral = async function (req, res) {
  try {
    const { gitLink, profileLink, gender, doB, phone } = req.body;

    const generaluserinfoSchema = Joi.object({
      gitLink: Joi.string().required(),
      profileLink: Joi.string().required(),
      gender: Joi.string().required(),
      doB: Joi.string().required(),
      phone: Joi.string().max().startwith(8).required(),
    });

    const validationResult = generaluserinfoSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
    }

    const user = await userModel.create(req.body);

    res.status(201).send({ status: true, message: "Data created successfully" });
  }

  catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  };

// *********************************************************************************************

  const searchjobseekers = async function (req, res) {

    try {

        const allUsers = await userModel.find({ recruiter: false });
        const userDetails = await Promise.all(allUsers.map(async (user) => {

            const educationDetails = await educationModel.find({ userDetailsID: user._id });
            // const experienceDetails = await experienceModel.find({ userDetailsID: user._id } );
            // const skillsDetails = await skillsModel.find({ userDetailsID: user._id } );
            // const projectDetails = await projectsModel.find({ userDetailsID: user._id } );
            // // console.log(educationDetails)
           
            let score = 0
            for (let i = 0; i < educationDetails.length; i++) {
                if (EducationLevelPoints[educationDetails[i].educationLevel]+ AuthorityPoints[educationDetails[i].authority] > score) {
                    score = EducationLevelPoints[educationDetails[i].educationLevel] + AuthorityPoints[educationDetails[i].authority]
                }
             }
        
            return {

                userDetails: user,
                educationDetails,
                PoolPoints: score
                //   experienceDetails,
                //   skillsDetails,
                //   projectDetails
            }

        }));
        let premiumPool=[],vipPool=[],normalPool=[]
        userDetails.map((userD)=>{
            if(userD.PoolPoints>=1700)premiumPool.push(userD)
            else if(userD.PoolPoints>=1000)vipPool.push(userD)
            else normalPool.push(userD)
        })

        const id = req.params.id
        const jobposts = await jobModel.find({userDetailsID :id})
        let jobpostscore = 0 ;  let jobPostinfo = []  ;
        for (let i = 0; i < jobposts.length; i++) {
           jobpostscore = 0 ;
          for (let j = 0 ; j <jobposts[i].education.length ; j++){
        
            jobpostscore =jobpostscore+ EducationLevelPoints[jobposts[i].education[j].educationLevel] + AuthorityPoints[jobposts[i].education[j].authority]
          
          // console.log(jobpostscore)
        }
        let jobscoreavg = (jobposts[i].education.length? jobposts[i].education.length : 1)
        // console.log("jobscoreavg -", jobscoreavg)
        // console.log(jobpostscore)
        jobpostscore = jobpostscore /jobscoreavg
        jobPostinfo.push({jobId: jobposts[i]._id , jobpoints : jobpostscore})
       }
          //  console.log(scores) 
          jobPostinfo.map((jpoints)=> {
              if(jpoints.jobpoints >=1700 ){
               jpoints.refinedcandidates=  premiumPool.map((premiumuser)=>{
                  // console.log(premiumuser)
                  premiumuser.PoolPoints>=jpoints.jobpoints                
                })
              }
              else if(jpoints.jobpoints <1700 && jpoints.jobpoints >=1000  ){
                jpoints.refinedcandidates=  vipPool.map((vipUser)=>{
                  vipUser.PoolPoints>=jpoints.jobpoints
                  console.log(vipUser)
                 })
               }
               else if (jpoints.jobpoints <1000 ){
                jpoints.refinedcandidates=  normalPool.map((normalUser)=>{
                  normalUser.PoolPoints>=jpoints.jobpoints                  
                 })
               }
          }            
          )

        res.json({staus:true ,data: jobPostinfo  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }

}

  module.exports = { register, loginUser, userGeneral ,searchjobseekers };
