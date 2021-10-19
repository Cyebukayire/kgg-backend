import {Router} from 'express'
import { MessageController } from '../controllers/message.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const messageController = new MessageController()

router.get('/', protect, protect, messageController.getAll)

/**
 * @param id UserID
 */
 router.get('/:id', protect, messageController.getOne)

 /**
 * @param id userId
 */
  router.delete('/delete/:id', protect, messageController.delete)

 router.post('/create', messageController.create)

 /**
 * @param id UserID
 */
  router.put('/update/:id/status', protect, messageController.updateStatus)

 /**
 * @param id UserID
 */
  router.put('/update/:id/read-status', protect, messageController.updateReadStatus)


 export default router
 