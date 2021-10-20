import {NewsEvent} from '../models/news_event.model';
import {Request,Response} from 'express';
import {INewsEvent} from '../util/types/interfaces'
import { getPaginationProps } from '../util/getPagination';
    
export class NewsEventController{
    async getAll(req: Request, res: Response) {
        try {
          let page = req.params.page;
          let limit = req.params.limit;
          let newsEvent = await NewsEvent.paginate({},getPaginationProps(parseInt(page),parseInt(limit)))
          return res.send({ success: true, data: newsEvent }).status(201)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
    
      async getOne(req: Request, res: Response) {
        try {
          let job = await NewsEvent.findById(req.params.id)
          if (job) return res.send({ success: true, data: job }).status(201)
          else return res.send({success:false, message: 'News or Event not found' }).status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
      async create(req: Request, res: Response) {
        try {
          let newsEvent: INewsEvent = req.body
          if (newsEvent) {
            let createdNewsEvent = await NewsEvent.create(newsEvent)
            if (createdNewsEvent)
              return res
                .send({
                  success: true,
                  message: 'NewsEvent created successfully',
                  data: createdNewsEvent
                })
                .status(201)
            else
              return res
                .send({ success: false, message: 'NewsEvent is not created', data: {} })
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
          let { id, ...requestBody }: INewsEvent = req.body // trim the id once submitted in  the request payload
          let newsEventToUpdate: INewsEvent = await NewsEvent.findById(_id)
          if (newsEventToUpdate) {
            let updatedNewsEvent = await NewsEvent.findByIdAndUpdate(_id, requestBody, {
              new: true
            })
            if (updatedNewsEvent) {
              return res
                .send({
                  success: true,
                  message: 'NewsEvent updated successfully',
                  data: updatedNewsEvent
                })
                .status(200)
            } else
              return res
                .send({ success: false, message: 'NewsEvent is not updated', data: {} })
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
          let newsEventToUpdate: INewsEvent = await NewsEvent.findById(_id)
          if (newsEventToUpdate) {
            let updatedNewsEvent = await NewsEvent.findByIdAndUpdate(
              _id,
              { status: action },
              { new: true }
            )
            if (updatedNewsEvent) {
              return res
                .send({
                  success: true,
                  message: 'Status updated successfully',
                  data: updatedNewsEvent
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
          let job: INewsEvent = await NewsEvent.findByIdAndRemove(id)
          if (job)
            return res
              .send({ success: true, message: 'NewsEvent is deleted successfully' })
              .status(200)
          else
            return res
              .send({ success: false, message: 'NewsEvent not found' })
              .status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }
    
    
      
    }
    