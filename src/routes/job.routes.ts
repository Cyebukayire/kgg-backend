import {Router} from 'express'
import { JobController } from '../controllers/job.controller'
import { protect } from '../util/decode';
const router = Router();
const jobController = new JobController()

router.get('/', protect, protect,jobController.getAll)

/**
 * @param id JOBID
 */
 router.get('/:id', protect,jobController.getOne)

 /**
 * @param id JOBID
 */
  router.delete('/delete/:id', protect,jobController.delete)

 router.post('/create',protect,jobController.create)

 /**
 * @param id JOBID
 */
  router.put('/update/:id', protect,jobController.update)
  
 /**
 * @param id JOBID
 */
  router.put('/update/:id/status', protect,jobController.updateStatus)


 export default router
 