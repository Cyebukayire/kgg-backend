import mongoose from 'mongoose';
import { EArticle, EStatus } from '../util/types/enums';
const NewsEventSchema = new mongoose.Schema({
    file_link:{
        type:String,
         
    },
    title:{
        type:String,
        required:true    
    },
    content:{
        type:String,
        required:true   
    },
    type:{
        type:String,
        enum:[EArticle.NEWS,EArticle.EVENT]
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


const NewsEvent = mongoose.model('NewsEvent', NewsEventSchema);
export {NewsEvent}