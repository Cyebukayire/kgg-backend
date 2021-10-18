import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = ''
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return next(
      res
        .send({ success: false, message: 'Unauthorized to access the service' })
        .status(401)
    )
  }
  try {
    let secreKey: any = process.env.JWT_SECRET
    const decoded: any = jwt.verify(token, secreKey)
    let user_id = decoded.id
    if (!user_id) {
      return next(
        res
          .send({
            success: false,
            message: 'Unauthorized to access the service'
          })
          .status(401)
      )
    }
    next()
  } catch (e: any) {
    return res.send({ success: false, data: e.message })
  }
}
