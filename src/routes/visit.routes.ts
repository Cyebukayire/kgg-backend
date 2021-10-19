import {Router} from 'express'
import { VisitController } from '../controllers/visits.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const visitController = new VisitController()

router.get('/', protect, protect, visitController.getAll)

/**
 * @param id UserID
 */
 router.get('/:id', protect, visitController.getOne)

 /**
 * @param id userId
 */
  router.delete('/delete/:id', protect, visitController.delete)

 router.post('/create',protect, visitController.create)

 /**
 * @param id UserID
 */
  router.put('/update/:id', protect, visitController.update)
  
 /**
 * @param id UserID
 */
  router.put('/update/:id/status', protect, visitController.updateStatus)

 export default router
 