import {Visit} from '../models/visit.model';
import {Request,Response} from 'express';
import {IVisit} from '../util/types/interfaces'
    
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
    async create(req: Request, res: Response) {
        try {
          let visit: IVisit = req.body
    
          let createdVisit = await Visit.create(visit)
          if (createdVisit)
            return res
              .send({
                success: true,
                visit: 'Visit created successfully',
                data: createdVisit
              })
              .status(201)
          else
            return res
              .send({ success: false, message: 'Visit not created' })
              .status(400)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }

      async update(req: Request, res: Response) {
        try {
          let _id = req.params.id
          let requestBody: IVisit = req.body // trim the id once submitted in  the request payload
          let visitToUpdate: IVisit = await Visit.findById(_id)
          if (visitToUpdate) {
            let updateVisit = await Visit.findByIdAndUpdate(_id, requestBody, {
              new: true
            })
            if (updateVisit) {
              return res
                .send({
                  success: true,
                  message: 'Visit updated successfully',
                  data: updateVisit
                })
                .status(200)
            } else
              return res
                .send({ success: false, message: 'Failed to update', data: {} })
                .status(400)
          } else
            return res
              .send({ success: false, message: 'Invalid inputs', data: {} })
              .status(400)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }

        //   activate and diactivate
  async updateStatus(req: Request, res: Response) {
    try {
      let _id = req.params.id
      let action = req.query.action
      let visitToUpdate: IVisit = await Visit.findById(_id)
      if (visitToUpdate) {
        let updatedVisit = await Visit.findByIdAndUpdate(
          _id,
          { status: action },
          { new: true }
        )
        if (updatedVisit) {
          return res
            .send({
              success: true,
              message: 'Status updated successfully',
              data: updatedVisit
            })
            .status(200)
        } else
          return res
            .send({
              success: false,
              message: 'Status is not updated',
              data: {}
            })
            .status(400)
      } else
        return res
          .send({ success: false, message: 'Invalid inputs', data: {} })
          .status(400)
    } catch (e: any) {
      return res.send({ success: false, data: e.message })
    }
  }
  async delete(req: Request, res: Response) {
    try {
      let id: any = req.params.id
      let visit: IVisit = await Visit.findByIdAndRemove(id)
      if (visit)
        return res
          .send({ success: true, message: 'Visit is deleted successfully' })
          .status(200)
      else
        return res
          .send({ success: false, message: 'Visit not found' })
          .status(404)
    } catch (e: any) {
      return res.send({ success: false, data: e.message })
    }
  }

}
