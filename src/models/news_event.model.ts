import mongoose from 'mongoose';
import { EArticle, EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
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

NewsEventSchema.plugin(pagination)
const NewsEvent : any = mongoose.model('NewsEvent', NewsEventSchema);
export {NewsEvent}