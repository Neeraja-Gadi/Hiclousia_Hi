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
      const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET_KEY); // should be kept in the env file
      res.status(200).send({ status: true, message: "User logged in successfully", token: token, data: user });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

// **********************************************************************************************

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

    const validationResult = userprofileSchema.validate(req.body, { abortEarly: false });

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
// Export the userGeneral function for use in other files
module.exports = { register, loginUser, userGeneral };