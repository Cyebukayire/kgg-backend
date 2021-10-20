import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()
export function sendMail(req: Request, res: Response){

   
    const API_KEY:any = process.env.SENDGRID_API_KEY
    console.log(API_KEY)
    sgMail.setApiKey(API_KEY)

    const message = {
        to: req.body.email,
        from:"gersh250@gmail.com",
        subject:"Booking Confirmation Email",
        html: "<h1>Thank you for your booking. This is to let you know that we have received your information.</>"
    }
    sgMail.send(message)
    .then(response => {
        return res.send({success:false, message:"Message sent successfully", data:response})
    })
    .catch((e:any)=>{
        return res.send({success:false, message:e})
    })

}   