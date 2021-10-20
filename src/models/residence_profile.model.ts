import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
const ResidenceProfileSchema = new mongoose.Schema({
    file_link:{
        type:String,
         
    },
    names:{
        type:String,
        required:true    
    },
    content:{
        type:String,
        requried:true
    },
    year:{
        type:Number,
        required:true
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

ResidenceProfileSchema.plugin(pagination)

const ResidenceProfile: any = mongoose.model('ResidenceProfile', ResidenceProfileSchema);
export {ResidenceProfile}