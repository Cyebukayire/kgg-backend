import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true    
    },
    file:{ // pdf file for the job position info
        type:String
    },

    job_link:{
        type:String,
        required:true
    }


},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})


const Job = mongoose.model('Job', JobSchema);
export {Job}