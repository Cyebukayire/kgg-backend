import {Job} from '../models/job.model';
import {Request,Response} from 'express';
import {IJob} from '../util/types/interfaces'
import { getPaginationProps } from '../util/getPagination';
    
export class JobController{
    async getAll(req: Request, res: Response) {
        try {
          let page = req.params.page;
          let limit = req.params.limit;
          let jobs = await Job.paginate({},getPaginationProps(parseInt(page),parseInt(limit)))
          return res.send({ success: true, data: jobs }).status(201)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
    
      async getOne(req: Request, res: Response) {
        try {
          let job = await Job.findById(req.params.id)
          if (job) return res.send({ success: true, data: job }).status(201)
          else return res.send({success:false, message: 'Job not found' }).status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
      async create(req: Request, res: Response) {
        try {
          let job: IJob = req.body
          if (job) {
            let createdJob = await Job.create(job)
            if (createdJob)
              return res
                .send({
                  success: true,
                  message: 'Job created successfully',
                  data: createdJob
                })
                .status(201)
            else
              return res
                .send({ success: false, message: 'Job is not created', data: {} })
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
          let { id, ...requestBody }: IJob = req.body // trim the id once submitted in  the request payload
          let jobToUpdate: IJob = await Job.findById(_id)
          if (jobToUpdate) {
            let updatedJob = await Job.findByIdAndUpdate(_id, requestBody, {
              new: true
            })
            if (updatedJob) {
              return res
                .send({
                  success: true,
                  message: 'Job updated successfully',
                  data: updatedJob
                })
                .status(200)
            } else
              return res
                .send({ success: false, message: 'Job is not updated', data: {} })
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
          let jobToUpdate: IJob = await Job.findById(_id)
          if (jobToUpdate) {
            let updatedJob = await Job.findByIdAndUpdate(
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
          let job: IJob = await Job.findByIdAndRemove(id)
          if (job)
            return res
              .send({ success: true, message: 'Job is deleted successfully' })
              .status(200)
          else
            return res
              .send({ success: false, message: 'Job not found' })
              .status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }
    
    
      
    }
    