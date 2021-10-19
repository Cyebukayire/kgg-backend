import {Router} from 'express'
import { NewsEventController } from '../controllers/news_event.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const newsEventController = new NewsEventController()

router.get('/', protect, protect, newsEventController.getAll)

/**
 * @param id JOBID
 */
 router.get('/:id', protect, newsEventController.getOne)

 /**
 * @param id JOBID
 */
  router.delete('/delete/:id', protect, newsEventController.delete)

 router.post('/create',protect, newsEventController.create)

 /**
 * @param id JOBID
 */
  router.put('/update/:id', protect, newsEventController.update)
  
 /**
 * @param id JOBID
 */
  router.put('/update/:id/status', protect, newsEventController.updateStatus)


 export default router
 