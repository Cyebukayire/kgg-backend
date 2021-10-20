import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
const JobSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true    
    },
    file_link:{ // pdf file for the job position info
        type:String,
        
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

JobSchema.plugin(pagination)

const Job : any = mongoose.model('Job', JobSchema);
export {Job}