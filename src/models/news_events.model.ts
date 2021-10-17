import mongoose from 'mongoose';
import { EArticle } from '../types/enums';
const NewsEventSchema = new mongoose.Schema({
    featured_image:{
        type:String,
        required:true
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