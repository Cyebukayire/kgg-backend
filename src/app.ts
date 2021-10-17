import './config/db'
import express,{Request, Response} from 'express'
import routes from './routes'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/',(req:Request, res:Response) => {
    res.send('Welcome to the KGG App')
})

app.use(routes)

app.listen(process.env.PORT || 4040,()=>{
    console.log(`[${new Date()}] Server running on port... ${process.env.PORT}`)
})