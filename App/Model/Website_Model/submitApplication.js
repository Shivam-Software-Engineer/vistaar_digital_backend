let mongoose = require("mongoose");

let submitApplicationSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    currentLocation: {
        type: String
    },
    currentWork: String,
    joinDate: String,
    staticPath:String,
    resume:String,
    appliedFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Jobs'
    },

    status: {
        type: String,
        
         enum: ['Pending', 'Shortlisted', 'Selected','Rejected'],
         default: "Pending"
    },
    applideDate: {
        type: Date,
        default: Date.now
    }
})


let submitApplication = mongoose.model("Applications", submitApplicationSchema);
module.exports={submitApplication};