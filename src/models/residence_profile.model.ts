import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
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


const ResidenceProfile = mongoose.model('ResidenceProfile', ResidenceProfileSchema);
export {ResidenceProfile}