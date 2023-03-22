const educationModel = require("../Models/InfoModels/educationModel.js");
const experienceModel = require("../Models/InfoModels/experienceModel.js");
const projectsModel = require("../Models/InfoModels/projectsModel.js");

const skillsModel = require("../Models/InfoModels/skillsModel.js")
const userModel = require("../Models/userModel.js")
const { AuthorityPoints, EducationLevelPoints ,ExperienceLevelPoints } = require("../Constrains/authority.js");
const Joi = require('joi');
// *************************************************************************///
const educationInfo = async function (req, res) {
    try {     

        const educationSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            educationLevel: Joi.string().required(),
            collegeName: Joi.string().required(),
            authority: Joi.string().required(),
            discipline: Joi.string().required(),
            yearOfpassout: Joi.string().required()
        });

        const validationResult = educationSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };

        // Create new education data
        const data = await educationModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Education data created' });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
};

// *************************************************************
const updateEducationData = async function (req, res) {
    try {
        
        const educationSchema = Joi.object({
            userDetailsID: Joi.string(),
            educationLevel: Joi.string(),
            collegeName: Joi.string(),
            authority: Joi.string(),
            discipline: Joi.string(),
            yearOfpassout: Joi.string()
        });
        const validationResult = educationSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const id = req.params.id;
        let educationData = {};
        educationData = await educationModel.findById({ _id: id });
        if (!educationData) {
            return res.status(404).send({ status: false, message: 'Education data not found' });
        }
        // if (req.method === 'PUT') {
        // Update education data
        educationData.userDetailsID = req.body.userDetailsID;
        educationData.educationLevel = req.body.educationLevel;
        educationData.collegeName = req.body.collegeName;
        educationData.authority = req.body.authority;
        educationData.discipline = req.body.discipline;
        educationData.yearOfpassout = req.body.yearOfpassout;

        const updatedData = await educationModel.findByIdAndUpdate({ _id: id }, educationData, { new: true });
        return res.status(200).send({ status: true, data: updatedData, message: 'Education data updated' });
        // 
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

/**
88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888**/


const experienceInfo = async function (req, res) {
    try {
        const { userDetailsID, jobStatus, jobTitle, companyName, companyType, companyLocation, skills } = req.body;
        const experienceSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            jobStatus: Joi.string(),
            jobTitle: Joi.string().required(),
            companyName: Joi.string().required(),
            companyType: Joi.string(),
            companyLocation: Joi.string().required(),
            skills: Joi.string().required()

        });
        const validationResult = experienceSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await experienceModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Experience data created' })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

};

const updateExperienceData = async function (req, res) {
    try {
        const { userDetailsID, jobStatus, jobTitle, companyName, companyType, companyLocation, skills } = req.body;
        const experienceSchema = Joi.object({
            userDetailsID: Joi.string(),
            jobStatus: Joi.string(),
            jobTitle: Joi.string(),
            companyName: Joi.string(),
            companyType: Joi.string(),
            companyLocation: Joi.string(),
            skills: Joi.string(),
        });
        const validationResult = experienceSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const id = req.params.id;
        let experienceData = {};
        experienceData = await experienceModel.findById({ _id: id });
        if (!experienceData) {
            return res.status(404).send({ status: false, message: 'Experience data not found' });
        }
        // Update experience data
        experienceData.userDetailsID = req.body.userDetailsID;
        experienceData.jobStatus = req.body.jobStatus;
        experienceData.jobTitle = req.body.jobTitle;
        experienceData.companyName = req.body.companyName;
        experienceData.companyType = req.body.companyType;
        experienceData.companyLocation = req.body.companyLocation;
        experienceData.skills = req.body.skills;

        const updatedData = await experienceModel.findByIdAndUpdate({ _id: id }, experienceData, { new: true });
        return res.status(200).send({ status: true, data: updatedData, message: 'Experience data updated' });
        // 
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
/**
88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888**/

const projectInfo = async function (req, res) {
    try {
        const projectSchema = Joi.object({

            userDetailsID: Joi.string().required(),
            projectTitle: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            typeOfjobs: Joi.string().required(),
            organizationName: Joi.string().required(),
            description: Joi.string().required(),

            Url: Joi.string().required(),
        });
        const validationResult = projectSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await projectsModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Project data created' });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


/**
88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888**/

const skillsInfo = async function (req, res) {
    try {
        const skillsSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            primarySkills: Joi.string().required(),
            secondarySkills: Joi.string().required(),
        });
        const validationResult = skillsSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await skillsModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Skills data created' });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
// **********************************************************************************
const updateSkillsData = async function (req, res) {
    try {
        const skillsSchema = Joi.object({
            userDetailsID: Joi.string(),
            primarySkills: Joi.string(),
            secondarySkills: Joi.string()
        });
        const validationResult = skillsSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };

        const id = req.params.id;
        let skillData = {};
        skillData = await skillsModel.findById({ _id: id });
        if (!skillData) {
            return res.status(404).send({ status: false, message: 'Skill data not found' });
        }
        // if (req.method === 'PUT') {
        skillData.userDetailsID = req.body.userDetailsID;
        skillData.primarySkills = req.body.primarySkills;
        skillData.secondarySkills = req.body.secondarySkills;

        const updatedData = await skillsModel.findByIdAndUpdate({ _id: id }, skillData, { new: true });
        return res.status(200).send({ status: true, data: updatedData, message: 'Skill data updated' });
        // 
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

/**
888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888**/

const personalInfo = async function (req, res) {
    try {

        const id = req.params.id

        const user = await userModel.find({ _id: id })
        const educationData = await educationModel.find({ userDetailsID: id })
        const experienceData = await experienceModel.find({ userDetailsID: id })
        const skills = await skillsModel.find({ userDetailsID: id })

        const data = { user, educationData, experienceData, skills }
        return res.status(200).send({ status: true, data: data })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// **********************************************************************************





module.exports = { educationInfo, updateEducationData, experienceInfo, updateExperienceData, projectInfo, skillsInfo, updateSkillsData, personalInfo};