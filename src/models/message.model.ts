import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
const MessageSchema = new mongoose.Schema({
    names:{
        type:String,
        minLength:[3,'Names should be at least 3 characters'],
        required:true
    },
    email:{
        type:String,
        required:true    
    },
    phone_number:{
        type:String    
    },
    
    message:{
        type:String,
        required:true    
    },
    read_by: [
        {
            type:mongoose.Types.ObjectId
        }
    ],
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

MessageSchema.plugin(pagination)
const Message : any = mongoose.model('Message', MessageSchema);
export {Message}