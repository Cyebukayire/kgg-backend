import mongoose from 'mongoose';
import { EPageSection, EStatus } from '../util/types/enums';
const SitePageschema = new mongoose.Schema({
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


const SitePage = mongoose.model('SitePage', SitePageschema);
export {SitePage}