import {Router} from 'express'
import { UserController } from '../controllers/user.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const userController = new UserController()

router.get('/', protect, protect, userController.getAll)

/**
 * @param id UserID
 */
 router.get('/:id', protect, userController.getOne)

 /**
 * @param id userId
 */
  router.delete('/delete/:id', protect, userController.delete)

 router.post('/create', userController.create)

 /**
 * @param id UserID
 */
  router.put('/update/:id', protect, userController.update)
  
 /**
 * @param id UserID
 */
  router.put('/update/:id/status', protect, userController.updateStatus)

//   authentication


 /**
 * @param id UserID
 */
  router.post('/:id/changepassword', protect, userController.changePassword)


 /**
 * @param id UserID
 */
  router.post('/login', userController.login)

 export default router
 