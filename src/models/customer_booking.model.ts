import mongoose from 'mongoose';
import { EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
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

CustomerBookingSchema.plugin(pagination)


const CustomerBooking : any = mongoose.model('CustomerBooking', CustomerBookingSchema);
export {CustomerBooking}