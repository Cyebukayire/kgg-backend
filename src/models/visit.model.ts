import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const VisitSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'Kigali Green Gallery Visit day',
        required:true
    },
    date:{
        type:Date,
        required:true    
    },
    status:{
        type:String,
        enum:[EStatus.ACTIVE, EStatus.INACTIVE],
        default: EStatus.ACTIVE
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


const Visit = mongoose.model('Visit', VisitSchema);
export {Visit}