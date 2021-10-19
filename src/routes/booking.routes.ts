import {Router} from 'express'
import { BookingController } from '../controllers/customer_booking.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const bookingController = new BookingController()

router.get('/', protect, protect, bookingController.getAll)

/**
 * @param id UserID
 */
 router.get('/:id', protect, bookingController.getOne)

 /**
 * @param id userId
 */
  router.delete('/delete/:id', protect, bookingController.delete)

 router.post('/create', bookingController.create)

 /**
 * @param id UserID
 */
  router.put('/update/:id/status', protect, bookingController.updateStatus)

 /**
 * @param id UserID
 */
  router.put('/update/:id/read-status', protect, bookingController.updateReadStatus)


 export default router
 