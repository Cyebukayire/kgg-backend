import mongoose from 'mongoose';
import { ENotification, EStatus } from '../util/types/enums';
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
    
    visit_id:{
        type:mongoose.Types.ObjectId,
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

CustomerBookingSchema.virtual('visit',{
    ref:"Visit",
    localField:"visit_id",
    foreignField:'_id',
    justOne:true
})


const CustomerBooking = mongoose.model('CustomerBooking', CustomerBookingSchema);
export {CustomerBooking}