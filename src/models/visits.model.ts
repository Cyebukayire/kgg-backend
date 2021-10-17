import mongoose from 'mongoose';
const VisitSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'Kigali Green Gallery Visit day',
        required:true
    },
    date:{
        type:Date,
        required:true    
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