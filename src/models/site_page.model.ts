import mongoose from 'mongoose';
import { EPageSection } from '../types/enums';
const SitePageschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    featured_image:{
        type:String
    },
    content:{ 
        type:String,
        required:true
    },
    section:{
        type:String,
        enum:[EPageSection.LANDING,EPageSection.ABOUTUS, EPageSection]
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