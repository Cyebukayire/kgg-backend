import {User} from '../models/user.model';
import {Request,Response} from 'express';
import {IUser} from '../util/types/interfaces'
import { comparePassword, hashPassword } from '../util/hash';
import { generateToken } from '../util/generateAuthToken';
    
export class UserController{
    async getAll(req:Request, res:Response){
        try{
            let users = await User.find();
            return res.send({success:true, data:users}).status(201);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500);}
    }

    async getOne(req:Request, res:Response){
        try{
            let user = await User.findById(req.params.id);
            if(user) return res.send({success:true, data:user}).status(201);
            else return res.send({message:'User not found'}).status(404);
        }catch(e:any){ return res.send({success:false, data:e.message}).status(500)}
    }
    async create(req:Request,res:Response){
        try{    
            let user:IUser = req.body
            user.password = await hashPassword(user.password)
            if(user){
                let createUser = await User.create(user)
                if(createUser) return res.send({success:true, message:"User created successfully",data:createUser}).status(201)
                else return res.send({success:false,message:"User is not created",data: {}}).status(400)
            }
                else return res.send({success:false,message:"Invalid inputs",data: {}}).status(400)
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
    async update(req:Request,res:Response){
        try{    
            let _id = req.params.id
            let {id,password,status,...requestBody}:IUser = req.body // trim the id once submitted in  the request payload
            let userToUpdate:IUser = await User.findById(_id)
            if(userToUpdate){
                let updateUser = await User.findByIdAndUpdate(_id,requestBody, {new:true})
                if(updateUser){
                    return res.send({success:true, message:"User updated successfully", data: updateUser}).status(200)
                }
                else return res.send({success:false,message:"User is not updated",data: {}}).status(400)
            }
                else return res.send({success:false,message:"Invalid inputs",data: {}}).status(400)
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
    async updateStatus(req:Request,res:Response){
        try{    
            let _id = req.params.id
            let action = req.query.action
            let userToUpdate:IUser = await User.findById(_id)
            if(userToUpdate){
                let updateUser = await User.findByIdAndUpdate(_id,{status:action}, {new:true})
                if(updateUser){
                    return res.send({success:true, message:"Status updated successfully", data: updateUser}).status(200)
                }
                else return res.send({success:false,message:"Status is not updated",data: {}}).status(400)
            }
                else return res.send({success:false,message:"Invalid inputs",data: {}}).status(400)
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
  
  
    async delete(req:Request,res:Response){
        try{
            let id:any = req.params.id
            let user:IUser = await User.findOneAndRemove(id)
            if(user) return res.send({success:true, message:'Account is deleted successfully'}).status(200)
            else return res.send({success:false,message:'User not found'}).status(404)
        }catch(e:any){return res.send({success:false, data:e.message})}
    }

    async changePassword(req: Request, res: Response){
        try{

            let id = req.params.id;
            let user:IUser = await User.findById(id);
            if(user){
                if(await comparePassword(req.body.old_password,user.password)){
                    let new_password = await hashPassword(req.body.new_password)
                    user.password = new_password;
                    await User.findByIdAndUpdate(id,{password:user.password},{new:true})
                    return res.send({success:true, message:"Password changed successfully"}).status(200)
                }  return res.send({success:true, message:"Invalid old password"}).status(400)
            }
        }catch(e:any){return res.send({success:false, data:e.message})}
    }
    // login

    async login(req:Request, res:Response){
        try{
            let {email,password} = req.body
            if(email && password){
                let user  = await User.findOne({email})
                if(user){
                    if(await comparePassword(password,user.password)){
                        let token = generateToken(user._id,user.role)
                        return res.send({success:true,message:'Successfully logged in',data:token}).status(200)
                    } 
                    else return res.send({success:false,message:'Invalid email or password'}).status(404)
                }  else return res.send({success:false,message:'Invalid email or password'}).status(404)
            }
         }catch(e:any){return res.send({success:false, data:e.message}).status(400)}
    }

}
