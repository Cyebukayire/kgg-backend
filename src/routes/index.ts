import {Router}  from 'express'
import user_routes from '../routes/user.routes'
import message_routes from '../routes/message.routes'
import visit_routes from '../routes/visit.routes'

const router = Router()
router.use('/users',user_routes)
router.use('/messages',message_routes)
router.use('/visits',visit_routes)


export default router;