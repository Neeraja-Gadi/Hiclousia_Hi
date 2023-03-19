

const recruiterModel = require("../Models/recruiterModel");
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

module.exports = { recruiterInfo, updateRecruiterData };
