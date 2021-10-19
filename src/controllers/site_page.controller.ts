import {SitePage} from '../models/site_page.model';
import {Request,Response} from 'express';
import {ISitePage} from '../util/types/interfaces'
    
export class SitePageController{
    async getAll(req: Request, res: Response) {
        try {
          let pages = await SitePage.find()
          return res.send({ success: true, data: pages }).status(201)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
    
      async getOne(req: Request, res: Response) {
        try {
          let page = await SitePage.findById(req.params.id)
          if (page) return res.send({ success: true, data: page }).status(201)
          else return res.send({success:false, message: 'Page not found' }).status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
      async getOneBySection(req: Request, res: Response) {
        try {
          let page = await SitePage.find({section:req.query.q})
          if (page) return res.send({ success: true, data: page }).status(201)
          else return res.send({success:false, message: 'Page not found' }).status(404)
        } catch (e: any) {
          return res.send({ success: false, data: 'asfdads'+e.message }).status(500)
        }
      }

      async create(req: Request, res: Response) {
        try {
          let page: ISitePage = req.body
          if (page) {
            let createdPages = await SitePage.create(page)
            if (createdPages)
              return res
                .send({
                  success: true,
                  message: 'Page created successfully',
                  data: createdPages
                })
                .status(201)
            else
              return res
                .send({ success: false, message: 'Page is not created', data: {} })
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
          let { id, ...requestBody }: ISitePage = req.body // trim the id once submitted in  the request payload
          let pageToUpdate: ISitePage = await SitePage.findById(_id)
          if (pageToUpdate) {
            let updatedPage = await SitePage.findByIdAndUpdate(_id, requestBody, {
              new: true
            })
            if (updatedPage) {
              return res
                .send({
                  success: true,
                  message: 'Page updated successfully',
                  data: updatedPage
                })
                .status(200)
            } else
              return res
                .send({ success: false, message: 'Page is not updated', data: {} })
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
          let pageToUpdate: ISitePage = await SitePage.findById(_id)
          if (pageToUpdate) {
            let updatedPage = await SitePage.findByIdAndUpdate(
              _id,
              { status: action },
              { new: true }
            )
            if (updatedPage) {
              return res
                .send({
                  success: true,
                  message: 'Status updated successfully',
                  data: updatedPage
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
          let page: ISitePage = await SitePage.findByIdAndRemove(id)
          if (page)
            return res
              .send({ success: true, message: 'Page is deleted successfully' })
              .status(200)
          else
            return res
              .send({ success: false, message: 'Page not found' })
              .status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }
    
    
      
    }
    