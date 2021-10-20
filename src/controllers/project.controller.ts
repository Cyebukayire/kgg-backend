import {Project} from '../models/project.model';
import {Request,Response} from 'express';
import {IProject} from '../util/types/interfaces'
import { getPaginationProps } from '../util/getPagination';
    
export class ProjectController{
    async getAll(req: Request, res: Response) {
        try {
          let page = req.params.page;
          let limit = req.params.limit;
          let projects = await Project.paginate({},getPaginationProps(parseInt(page),parseInt(limit)))
          return res.send({ success: true, data: projects }).status(201)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
    
      async getOne(req: Request, res: Response) {
        try {
          let project = await Project.findById(req.params.id)
          if (project) return res.send({ success: true, data: project }).status(201)
          else return res.send({success:false, message: 'Project not found' }).status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message }).status(500)
        }
      }
      async create(req: Request, res: Response) {
        try {
          let project: IProject = req.body
          if (project) {
            let createdProject = await Project.create(project)
            if (createdProject)
              return res
                .send({
                  success: true,
                  message: 'Project created successfully',
                  data: createdProject
                })
                .status(201)
            else
              return res
                .send({ success: false, message: 'Project is not created', data: {} })
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
          let { id, ...requestBody }: IProject = req.body // trim the id once submitted in  the request payload
          let projectToUpdate: IProject = await Project.findById(_id)
          if (projectToUpdate) {
            let updatedProject = await Project.findByIdAndUpdate(_id, requestBody, {
              new: true
            })
            if (updatedProject) {
              return res
                .send({
                  success: true,
                  message: 'Project updated successfully',
                  data: updatedProject
                })
                .status(200)
            } else
              return res
                .send({ success: false, message: 'Project is not updated', data: {} })
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
          let projectToUpdate: IProject = await Project.findById(_id)
          if (projectToUpdate) {
            let updatedProject = await Project.findByIdAndUpdate(
              _id,
              { status: action },
              { new: true }
            )
            if (updatedProject) {
              return res
                .send({
                  success: true,
                  message: 'Status updated successfully',
                  data: updatedProject
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
          let project: IProject = await Project.findByIdAndRemove(id)
          if (project)
            return res
              .send({ success: true, message: 'Project is deleted successfully' })
              .status(200)
          else
            return res
              .send({ success: false, message: 'Project not found' })
              .status(404)
        } catch (e: any) {
          return res.send({ success: false, data: e.message })
        }
      }
    
    
      
    }
    