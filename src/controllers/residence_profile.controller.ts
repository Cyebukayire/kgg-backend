import {ResidenceProfile} from '../models/residence_profile.model';
import {Request,Response} from 'express';
import {IResidenceProfile} from '../util/types/interfaces'
    
export class ResidenceProfileController{
    async getAll(req: Request, res: Response) {
        try {
          let profiles = await ResidenceProfile.find()
          return res.send({ success: true, data: profiles }).status(201)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
    
      async getOne(req: Request, res: Response) {
        try {
          let profile = await ResidenceProfile.findById(req.params.id)
          if (profile) return res.send({ success: true, data: profile }).status(201)
          else return res.send({success:false, message: 'Profile not found' }).status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
      async create(req: Request, res: Response) {
        try {
          let profile: IResidenceProfile = req.body
          if (profile) {
            let createdProfile = await ResidenceProfile.create(profile)
            if (createdProfile)
              return res
                .send({
                  success: true,
                  message: 'Profile created successfully',
                  data: createdProfile
                })
                .status(201)
            else
              return res
                .send({ success: false, message: 'Profile is not created', data: {} })
                .status(400)
          } else
            return res
              .send({ success: false, message: 'Invalid inputs', data: {} })
              .status(400)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }
      async update(req: Request, res: Response) {
        try {
          let _id = req.params.id
          let { id, ...requestBody }: IResidenceProfile = req.body // trim the id once submitted in  the request payload
          let jobToUpdate: IResidenceProfile = await ResidenceProfile.findById(_id)
          if (jobToUpdate) {
            let updatedJob = await ResidenceProfile.findByIdAndUpdate(_id, requestBody, {
              new: true
            })
            if (updatedJob) {
              return res
                .send({
                  success: true,
                  message: 'Residence profile updated successfully',
                  data: updatedJob
                })
                .status(200)
            } else
              return res
                .send({ success: false, message: 'Residence profile is not updated', data: {} })
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
          let jobToUpdate: IResidenceProfile = await ResidenceProfile.findById(_id)
          if (jobToUpdate) {
            let updatedJob = await ResidenceProfile.findByIdAndUpdate(
              _id,
              { status: action },
              { new: true }
            )
            if (updatedJob) {
              return res
                .send({
                  success: true,
                  message: 'Status updated successfully',
                  data: updatedJob
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
          let profile: IResidenceProfile = await ResidenceProfile.findByIdAndRemove(id)
          if (profile)
            return res
              .send({ success: true, message: 'Residence profile  is deleted successfully' })
              .status(200)
          else
            return res
              .send({ success: false, message: 'Residence profile  not found' })
              .status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }
    
    
      
    }
    