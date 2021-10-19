import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
    file_link:{
        type:String,
         
    },
    name:{
        type:String,
        required:true    
    },
    content:{
        type:String,
        requried:true
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


const Project = mongoose.model('Project', ProjectSchema);
export {Project}