import mongoose from "mongoose";

const userResumeListSchema =new mongoose.Schema({
    email : {
        type:String,
        required : true
    },
    resumes : [{
        
    }]
});

export default mongoose.model('resumeList',userResumeListSchema);