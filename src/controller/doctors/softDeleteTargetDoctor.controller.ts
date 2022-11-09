import { Request, Response } from "express"
import AppError from "../../Error/AppError"
import softDeleteTargetDoctorService from "../../services/doctors/softDeleteTargetDoctor.service"

const softDeleteController = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    await softDeleteTargetDoctorService(id)

    return res.status(204).json({ message: "User disabled" })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(403).send({
        error: error.name,
        message: error.message,
      })
    }
  }
}

export default softDeleteController
