import {Router, Request, Response} from 'express'
import { UserController } from '../controllers/user.controller'
const router = Router();
const userController = new UserController()

router.get('/', userController.getAll)

router.get('/yooo', (req:Request, res:Response) => {
    console.log("yooooo")
})

/**
 * @param id UserID
 */
 router.get('/:id', userController.getOne)

 /**
 * @param id userId
 */
  router.delete('/delete/:id', userController.delete)

 router.post('/create', userController.create)

 /**
 * @param id UserID
 */
  router.put('/update/:id', userController.update)
  
 /**
 * @param id UserID
 */
  router.put('/update/:id/status', userController.updateStatus)

 export default router
 