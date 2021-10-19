import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
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
        type:String
    },
    status:{
        type:String,
        default: EStatus.ACTIVE,
        enum:[EStatus.ACTIVE, EStatus.INACTIVE]
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