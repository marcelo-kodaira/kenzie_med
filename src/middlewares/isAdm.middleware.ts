import { NextFunction, Request, Response } from "express"
import AppError from "../Error/AppError"

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.user.isAdmin

  if (!isAdmin) {
    throw new AppError("User is not an Administrator", 401)
  }

  next()
}

export default isAdmMiddleware
