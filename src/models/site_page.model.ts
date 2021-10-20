import mongoose from 'mongoose';
import { EPageSection, EStatus } from '../util/types/enums';
const pagination = require('mongoose-paginate-v2')
const SitePageSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    file_link:{
        type:String,
         
    },
    content:{ 
        type:String,
        required:true
    },
    section:{
        type:String,
        enum:[EPageSection.LANDING,EPageSection.ABOUTUS]
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

SitePageSchema.plugin(pagination)

const SitePage : any = mongoose.model('SitePage', SitePageSchema);
export {SitePage}