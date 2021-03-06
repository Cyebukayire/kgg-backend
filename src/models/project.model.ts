import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
const ProjectSchema = new mongoose.Schema({
    file_link:{
        type:String,
         
    },
    name:{
        type:String,
        required:true    
    },
    content:{
        type:String,
        requried:true
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

ProjectSchema.plugin(pagination)

const Project : any = mongoose.model('Project', ProjectSchema);
export {Project}