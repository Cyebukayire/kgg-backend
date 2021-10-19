import {Router} from 'express'
import { ResidenceProfileController } from '../controllers/residence_profile.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const residenceProfileController = new ResidenceProfileController()

router.get('/', protect, protect, residenceProfileController.getAll)
 /**
 * @param action year q
 */
  router.get('/year', protect, residenceProfileController.getByYear)

/**
 * @param id JOBID
 */
 router.get('/:id', protect, residenceProfileController.getOne)

 /**
 * @param id JOBID
 */
  router.delete('/delete/:id', protect, residenceProfileController.delete)

 router.post('/create',protect, residenceProfileController.create)

 /**
 * @param id JOBID
 */
  router.put('/update/:id', protect, residenceProfileController.update)
  
 /**
 * @param id JOBID
 */
  router.put('/update/:id/status', protect, residenceProfileController.updateStatus)


 export default router
 