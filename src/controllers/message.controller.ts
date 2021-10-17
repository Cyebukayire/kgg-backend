import {Message} from '../models/message.model';
import {Request,Response} from 'express';
import {IMessage} from '../types/interfaces'
    
export class MessageController{
    async getAll(req:Request, res:Response){
        try{
            let messages = await Message.find();
            return res.send({success:true, data:messages}).status(201);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500);}
    }

    async getOne(req:Request, res:Response){
        try{
            let message = await Message.findById(req.params.id);
            if(message) return res.send({success:true, data:message}).status(201);
            else return res.send({message:'Message not found'}).status(404);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500)}
    }
    async create(req:Request,res:Response){
        try{    
            let message:IMessage = req.body
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
    async delete(req:Request,res:Response){
        try{
            let id:any = req.params.id
            let message:IMessage = await Message.findOneAndRemove(id)
            if(message) return res.send({success:true, message:'Message is deletedsuccessfully'})
        }catch(e:any){return res.send({success:false, data:e.message})}
    }

}
