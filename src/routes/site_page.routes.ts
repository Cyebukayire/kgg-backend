import {Router} from 'express'
import { SitePageController } from '../controllers/site_page.controller'
import { protect } from '../middlewares/auth';
const router = Router();
const sitePageController = new SitePageController()

router.get('/', protect, protect, sitePageController.getAll)

/**
 * @param action q
 */
 router.get('/section', protect, sitePageController.getOneBySection)
/**
 * @param id JOBID
 */
 router.get('/:id', protect, sitePageController.getOne)

 /**
 * @param id JOBID
 */
  router.delete('/delete/:id', protect, sitePageController.delete)

 router.post('/create',protect, sitePageController.create)

 /**
 * @param id JOBID
 */
  router.put('/update/:id', protect, sitePageController.update)
  
 /**
 * @param id JOBID
 */
  router.put('/update/:id/status', protect, sitePageController.updateStatus)


 export default router
 