import mongoose from 'mongoose';
import { ENotification } from '../util/types/enums';
const CustomerBookingSchema = new mongoose.Schema({
    names:{
        type:String,
        minLength:[3,'The names should be atleast 3 characters'],
        required:true
    },
    email:{
        type:String,
        required:true    
    },
    phone_number:{
        type:String,
        unique:true,
        required:true
    },
    
    date_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        default:ENotification.UNREAD,
        enum:[ENotification.UNREAD,ENotification.READ]

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

CustomerBookingSchema.virtual('c_booking',{
    ref:"Visit",
    localField:"date_id",
    foreignField:'_id',
    justOne:true
})


const CustomerBooking = mongoose.model('CustomerBooking', CustomerBookingSchema);
export {CustomerBooking}