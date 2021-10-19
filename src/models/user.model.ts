import mongoose from 'mongoose';
import { ERole, EStatus } from '../util/types/enums';
const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        minLength:[3,'The firstname should be atleast 3 characters'],
        required:true
    },
    last_name:{
        type:String,
        minLength:[3,'The lastname should be atleast 3 characters']
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:[5,'The password should be atleast 5 characters'],
        
    },
    title:{
        type:String,
        required:true,
        default: 'WORKER'
    },
    role:{
        type:String,
        enum:[ERole.ADMIN,ERole.USER1, ERole.USER2]
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




const User = mongoose.model('User',UserSchema);
export {User}