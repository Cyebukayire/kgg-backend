import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
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

VisitSchema.plugin(pagination)

const Visit: any = mongoose.model('Visit', VisitSchema);
export {Visit}