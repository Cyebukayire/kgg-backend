import {Router} from 'express'
import { FileController } from '../controllers/file.controller'
import { protect } from '../util/decode';
const router = Router();
const fileController = new FileController()


 /**
 * @param id UserID
 */
  router.post('/upload/:id/page', protect, fileController.upload)


 export default router
 