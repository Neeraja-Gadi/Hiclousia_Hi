// const mongoose = require('mongoose');
// const { Authority, Certificate, Education_Level, Experience } = require('../config/constants');

// const studentSchema = new mongoose.Schema({
//   userDetailsID: {
//     type: ObjectId,
//     ref: "user"
//   },
//   authority: {
//     type: String,
//     required: true,
//     enum: Object.keys(Authority),
//   },
//   certificate: {
//     type: String,
//     required: true,
//     enum: Object.keys(Certificate),
//   },
//   education_Level: {
//     type: String,
//     required: true,
//     enum: Object.keys(Education_Level),
//   },
//   experience: {
//     type: String,
//     required: true,
//     enum: Object.keys(Experience),
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);
