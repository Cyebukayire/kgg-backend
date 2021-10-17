import {Visit} from '../models/visits.model';
import {Request,Response} from 'express';
import {IVisit} from '../types/interfaces'
import { ObjectId } from 'bson';
    
export class VisitController{
    async getAll(req:Request, res:Response){
        try{
            let visits = await Visit.find();
            return res.send({success:true, data:visits}).status(201);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500);}
    }

    async getOne(req:Request, res:Response){
        try{
            let visit = await Visit.findById(req.params.id);
            if(visit) return res.send({success:true, data:visit}).status(201);
            else return res.send({message:'Visit not found'}).status(404);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500)}
    }
    async create(req:Request,res:Response){
        try{    
            let visit:IVisit = req.body
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
    async delete(req:Request,res:Response){
        try{
            let id:any = req.params.id
            let visit:IVisit = await Visit.findOneAndRemove(id)
            if(visit) return res.send({success:true, message:'Account is deletedsuccessfully'})
        }catch(e:any){return res.send({success:false, data:e.message})}
    }

}
