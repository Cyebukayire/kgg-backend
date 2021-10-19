import {Router}  from 'express'
import user_routes from '../routes/user.routes'
import message_routes from '../routes/message.routes'
import visit_routes from '../routes/visit.routes'
import booking_routes from '../routes/booking.routes'
import file_routes from '../routes/file.routes'
import job_routes from '../routes/job.routes'
import news_event_routes from '../routes/news_event.routes'
import projects_routes from '../routes/projects.routes'

const router = Router()
router.use('/users',user_routes)
router.use('/messages',message_routes)
router.use('/visits',visit_routes)
router.use('/booking',booking_routes)
router.use('/jobs',job_routes)
router.use('/news-event',news_event_routes)
router.use('/projects',projects_routes)
router.use('/files',file_routes)


export default router;