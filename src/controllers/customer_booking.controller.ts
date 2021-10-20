import { CustomerBooking } from '../models/customer_booking.model'
import { Request, Response } from 'express'
import { ICustomerBooking } from '../util/types/interfaces'
import { User } from '../models/user.model'
import { getPaginationProps } from '../util/getPagination';
export class BookingController {
  async getAll(req: Request, res: Response) {
    try {
      let page = req.params.page;
      let limit = req.params.limit;
      let bookings = await CustomerBooking.paginate({},getPaginationProps(parseInt(page),parseInt(limit),'visit'))
      return res.send({ success: true, data: bookings }).status(200)
    } catch (e: any) {
      return res.send({ success: false, data: e.message }).status(400)
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      let booking = await CustomerBooking.findById(req.params.id).populate(
        'visit'
      )
      if (booking) return res.send({ success: true, data: booking }).status(200)
      else
        return res
          .send({ success: false, message: 'Booking not found' })
          .status(404)
    } catch (e: any) {
      return res.send({ success: false, data: e.message }).status(400)
    }
  }
  async create(req: Request, res: Response) {
    try {
      let booking: ICustomerBooking = req.body

      let createdBooking = await CustomerBooking.create(booking)
      if (createdBooking)
        return res
          .send({
            success: true,
            message: 'Booking successfully sent',
            data: createdBooking
          })
          .status(201)
      else
        return res
          .send({ success: false, message: 'Booking not created' })
          .status(400)
    } catch (e: any) {
      return res.send({ success: false, data: e.message })
    }
  }
  async delete(req: Request, res: Response) {
    try {
      let id: any = req.params.id
      let booking: ICustomerBooking = await CustomerBooking.findByIdAndRemove(
        id
      )
      if (booking)
        return res
          .send({ success: true, message: 'Booking is deleted successfully' })
          .status(200)
      else
        return res
          .send({ success: false, message: 'Booking not found' })
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
      let bookingToUpdate: ICustomerBooking = await CustomerBooking.findById(
        _id
      )
      if (bookingToUpdate) {
        let updatedBooking = await CustomerBooking.findByIdAndUpdate(
          _id,
          { status: action },
          { new: true }
        )
        if (updatedBooking) {
          return res
            .send({
              success: true,
              message: 'Status updated successfully',
              data: updatedBooking
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
      let bookingToUpdate: ICustomerBooking = await CustomerBooking.findById(
        _id
      )
      if (bookingToUpdate) {
        if (await User.findById(user_id)) {
          if (!bookingToUpdate.read_by.includes(user_id))
            bookingToUpdate.read_by.push(user_id)
          let updatedBooking = await CustomerBooking.findByIdAndUpdate(
            _id,
            { read_by: bookingToUpdate.read_by },
            { new: true }
          )
          if (updatedBooking) {
            return res
              .send({
                success: true,
                message: 'Booking is read successfully',
                data: updatedBooking
              })
              .status(200)
          } else
            return res
              .send({
                success: false,
                message: 'Reading booking failed',
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
