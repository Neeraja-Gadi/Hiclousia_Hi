const userModel = require("../Models/userModel");
// const educationModel = require("../Models/InfoModels/educationModel.js");
// const { EducationLevelPoints, AuthorityPoints } = require("../Constrains/authority.js");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const jobModel = require("../Models/jobModel");
const userprofileModel = require("../Models/userprofileModel");

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

    const user = await userModel.create({ firstName, lastName, email, password, recruiter });

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
    const { userDetailsID, gitLink, profileLink, gender, doB, phone } = req.body;

    const userprofileSchema = Joi.object({
      //resume:Joi.string().required(),
      //profileImage: Joi.string().required(),
      gitLink: Joi.string().required(),
      userDetailsID: Joi.string().required(),
      gender: Joi.string().required(),
      doB: Joi.date().required(),
      phone: Joi.string().required(),
      profileLink: Joi.string().required(),
    });

    const validationResult = userprofileSchema.validate(req.body,{ abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
    }

    const data = await userprofileModel.create(req.body,);
    if (data)
            return res.status(200).send({ status: true, data: data, message: 'User profile data created' });

  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// ************************************************


//&**************************&***********************&*****************************&****************
// // Import necessary modules
// const uploadToS3 = require('../utils/uploadToS3');

// // Define an async function to handle user general information
// const userGeneral = async function (req, res) {
//   try {
//     // Destructure request body
// const { gitLink, gender, doB, phone }= req.body;  //profileImage, resume// } 
//     // Find user by ID
//     const user = await userModel.findById(req.user._id);
    
//     // Return error if user not found
//     if (!user) {
//       return res.status(404).send({
//         status: false,
//         message: "User not found"
//       });
//     }
//     // Define validation schema using Joi library
//     const userprofileSchema = Joi.object({
//       resume: Joi.string().required(),
//       gitLink: Joi.string().required(),
//       profileImage: Joi.string().required(),
//       gender: Joi.string().required(),
//       doB: Joi.string().required(),
//       phone: Joi.string().max(10).required(),
//       userDetailsID: Joi.string().required(),
//     });

//     // Validate request body against schema
//     const validationResult = userprofileSchema.validate({
//       gitLink,
//       gender,
//       doB,
//       phone,
//       profileImage,
//       resume,
//       userDetailsID: req.user._id
//     });

//     // Return validation error if any
//     if (validationResult.error) {
//       return res.status(400).send({
//         status: false,
//         message: validationResult.error.details[0].message
//       });
//     }

//     // Upload profile image to S3 bucket
//     const s3Params = {
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: `${user._id}/profile/${profileImage}`,
//       Body: req.files.profileImage.data,
//       ContentType: req.files.profileImage.mimetype,
//       ACL: "public-read"
//     };
//     const profileImageUrl = await uploadToS3(s3Params);

//     // Upload resume to S3 bucket
//     const s3Params2 = {
//       Bucket: process.env.S3_BUCKET_NAME,
//       Key: `${user._id}/resume/${resume}`,
//       Body: req.files.resume.data,
//       ContentType: req.files.resume.mimetype,
//       ACL: "public-read"
//     };
//     const resumeUrl = await uploadToS3(s3Params2);

//     // Create user profile with validated data and uploaded file URLs
//     const userProfile = await userprofileModel.create({
//       gitLink,
//       gender,
//       doB,
//       phone,
//       profileImage: profileImageUrl,
//       resume: resumeUrl,
//       userDetailsID: req.user._id
//     });

//     // Send success response with status code 201
//     res.status(201).send({
//       status: true,
//       message: "Data created successfully"
//     });
//   } catch (err) {
//     // Send error response with status code 500 and error message
//     res.status(500).send({
//       status: false,
//       message: err.message
//     });
//   }
// }; 

// Export the userGeneral function for use in other files

module.exports = { register, loginUser,userGeneral};