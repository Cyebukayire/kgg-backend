import {Job} from '../models/job.model';
import {Request,Response} from 'express';
import {IJob} from '../types/interfaces'
import { ObjectId } from 'bson';
    
export class JobController{
    async getAll(req:Request, res:Response){
        try{
            let jobs = await Job.find();
            return res.send({success:true, data:jobs}).status(201);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500);}
    }

    async getOne(req:Request, res:Response){
        try{
            let job = await Job.findById(req.params.id);
            if(job) return res.send({success:true, data:job}).status(201);
            else return res.send({message:'Job not found'}).status(404);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500)}
    }
    async create(req:Request,res:Response){
        try{    
            let job:IJob = req.body
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
    async delete(req:Request,res:Response){
        try{
            let id:any = req.params.id
            let job:IJob = await Job.findOneAndRemove(id)
            if(job) return res.send({success:true, message:'Job is is deletedsuccessfully'})
        }catch(e:any){return res.send({success:false, data:e.message})}
    }

}
