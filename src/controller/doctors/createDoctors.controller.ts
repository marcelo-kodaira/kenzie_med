import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import { IDoctor, IDoctorRequest } from "../../interfaces/doctor"
import createDoctorService from "../../services/doctors/createDoctors.service"
import * as yup from "yup"
import { ValidationError } from "yup"
import AppError from "../../Error/AppError"
import schema from "../../validations/createeDoctor.schema"

const createDoctorController = async (req: Request, res: Response) => {
  try {
    await schema.validate(req.body)
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new AppError(error.message)
    }
  }

  const createDoctors: IDoctorRequest = req.body

  const newDoctor = await createDoctorService(createDoctors)

  return res.status(201).json(instanceToPlain(newDoctor))
}

export default createDoctorController
