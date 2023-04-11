const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const userinfoSchema = new mongoose.Schema({
    
    personalDetails :{
        type : ObjectId , 
        ref : "user"
    },
    educationDetails : {
        type : ObjectId , 
        ref : "education"
    },
    expereinceDetails : {
        type : ObjectId , 
        ref : "Experience"
    },
    projectDetails : {
        type : ObjectId , 
        ref : "projects"
    },
    skills: {
        type : ObjectId , 
        ref : "Skills"
    }
},
    { timestamps: true }
    )
    
    module.exports = mongoose.model("InfoUser", userinfoSchema);