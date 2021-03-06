import { Message } from '../models/message.model'
import { Request, Response } from 'express'
import { IMessage } from '../util/types/interfaces'
import { User } from '../models/user.model'
import { getPaginationProps } from '../util/getPagination';

export class MessageController {
  async getAll(req: Request, res: Response) {
    try {
      let page = req.params.page;
      let limit = req.params.limit;
      let messages = await Message.paginate({},getPaginationProps(parseInt(page),parseInt(limit)))
      return res.send({ success: true, data: messages }).status(200)
    } catch (e: any) {
      return res.send({ success: false, data: e.message }).status(400)
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      let message = await Message.findById(req.params.id)
      if (message) return res.send({ success: true, data: message }).status(200)
      else return res.send({ message: 'Message not found' }).status(404)
    } catch (e: any) {
      return res.send({ success: false, data: e.message }).status(400)
    }
  }
  async create(req: Request, res: Response) {
    try {
      let message: IMessage = req.body

      let createdMessage = await Message.create(message)
      if (createdMessage)
        return res
          .send({
            success: true,
            message: 'Message sent successfully',
            data: createdMessage
          })
          .status(201)
      else
        return res
          .send({ success: false, message: 'Message not created' })
          .status(400)
    } catch (e: any) {
      return res.send({ success: false, data: e.message })
    }
  }
  async delete(req: Request, res: Response) {
    try {
      let id: any = req.params.id
      let message: IMessage = await Message.findByIdAndRemove(id)
      if (message)
        return res
          .send({ success: true, message: 'Message is deleted successfully' })
          .status(200)
      else
        return res
          .send({ success: false, message: 'Message not found' })
          .status(404)
    } catch (e: any) {
      return res.send({ success: false, data: e.message })
    }
  }

  //   activate and diactivate
  async updateStatus(req: Request, res: Response) {
    try {
      let _id = req.params.id
      let action = req.query.action
      let messageToUpdate: IMessage = await Message.findById(_id)
      if (messageToUpdate) {
        let updateMessage = await Message.findByIdAndUpdate(
          _id,
          { status: action },
          { new: true }
        )
        if (updateMessage) {
          return res
            .send({
              success: true,
              message: 'Status updated successfully',
              data: updateMessage
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
  //   update read message status
  async updateReadStatus(req: Request, res: Response) {
    try {
      let _id = req.params.id
      let user_id = req.body.user_id
      let messageToUpdate: IMessage = await Message.findById(_id)
      if (messageToUpdate) {
        if (await User.findById(user_id)) {
          if (!messageToUpdate.read_by.includes(user_id))
            messageToUpdate.read_by.push(user_id)
          let updateMessage = await Message.findByIdAndUpdate(
            _id,
            { read_by: messageToUpdate.read_by },
            { new: true }
          )
          if (updateMessage) {
            return res
              .send({
                success: true,
                message: 'Message is read successfully',
                data: updateMessage
              })
              .status(200)
          } else
            return res
              .send({
                success: false,
                message: 'Reading message failed',
                data: {}
              })
              .status(400)
        }
      } else
        return res
          .send({ success: false, message: 'Invalid inputs', data: {} })
          .status(400)
    } catch (e: any) {
      return res.send({ success: false, data: e.message })
    }
  }
}
