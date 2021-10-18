import mongoose from 'mongoose';
import { ENotification } from '../util/types/enums';
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
    status:{
        type:String,
        default: ENotification.UNREAD,
        enum:[ENotification.UNREAD, ENotification.READ]

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


const Message = mongoose.model('Message', MessageSchema);
export {Message}