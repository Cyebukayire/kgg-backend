import {Router} from 'express'
import { MessageController } from '../controllers/message.controller'
import { protect } from '../util/decode';
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
  router.put('/update/:id', protect, messageController.update)
  
 /**
 * @param id UserID
 */
  router.put('/update/:id/status', protect, messageController.updateStatus)



 export default router
 