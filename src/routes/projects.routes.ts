import {Router} from 'express'
import { ProjectController } from '../controllers/project.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const projectController = new ProjectController()

router.get('/', protect, protect, projectController.getAll)

/**
 * @param id JOBID
 */
 router.get('/:id', protect, projectController.getOne)

 /**
 * @param id JOBID
 */
  router.delete('/delete/:id', protect, projectController.delete)

 router.post('/create',protect, projectController.create)

 /**
 * @param id JOBID
 */
  router.put('/update/:id', protect, projectController.update)
  
 /**
 * @param id JOBID
 */
  router.put('/update/:id/status', protect, projectController.updateStatus)


 export default router
 