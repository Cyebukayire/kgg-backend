import {Router}  from 'express'
import user_routes from '../routes/user.routes'
import message_routes from '../routes/message.routes'

const router = Router()
router.use('/users',user_routes)
router.use('/messages',message_routes)

export default router;