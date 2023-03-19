const express = require('express');
const router = express.Router();
const Joi = require('joi');
const recruiterModel = require('../Models/recruiterModel');


// // *****************************************************************************************

const educationModel = require("../Models/InfoModels/educationModel.js");
const experienceModel = require("../Models/InfoModels/experienceModel.js");
const projectsModel = require("../Models/InfoModels/projectsModel.js");

const skillsModel = require("../Models/InfoModels/skillsModel.js")
const userModel = require("../Models/userModel.js")

const recruiterInfo = async function (req, res){
  try {
      const recruiterSchema = Joi.object({
          fullName: Joi.string().required(),
          email: Joi.string().required(),
          phoneNumber: Joi.string().required(),
          professionalSummary: Joi.string(),
          workExperience: Joi.array().items(
              Joi.object({
                  company: Joi.string(),
                  jobTitle: Joi.string()
              })
          ),
          awards: Joi.array().items(Joi.string()),
          socialMediaLinks: Joi.object({
              linkedin: Joi.string().required(),
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

module.exports={recruiterInfo}
