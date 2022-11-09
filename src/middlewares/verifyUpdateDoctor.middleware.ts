import { Request, Response, NextFunction } from "express"
import AppError from "../Error/AppError"

const verifyUpdateDoctorRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const updateRequest = req.body

  if (
    updateRequest.hasOwnProperty("id") ||
    updateRequest.hasOwnProperty("CRM") ||
    updateRequest.hasOwnProperty("specialties") ||
    updateRequest.hasOwnProperty("isActive") ||
    updateRequest.hasOwnProperty("createdAt") ||
    updateRequest.hasOwnProperty("updatedAt")
  ) {
    throw new AppError("Cannot update id, CRM, isActive, createdAt or updatedAt")
  }

  return next()
}

export default verifyUpdateDoctorRequestMiddleware