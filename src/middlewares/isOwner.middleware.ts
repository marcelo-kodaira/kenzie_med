import { NextFunction, Request, Response } from "express"
import AppError from "../Error/AppError"

const isOwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const updateUserId = req.params.id

  const reqUserId = req.user.id

  const isAdmin = req.user.isAdmin

  if (reqUserId !== updateUserId && !isAdmin) {
    throw new AppError("Unauthorized", 401)
  }
  next()
}
export default isOwnerMiddleware
