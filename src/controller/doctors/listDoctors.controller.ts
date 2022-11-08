import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import listDoctorsService from "../../services/doctors/listDoctors.service"

const listDoctorsController = async (req: Request, res: Response) => {
  const listDoctors = await listDoctorsService()

  return res.status(200).json(instanceToPlain(listDoctors))
}

export default listDoctorsController
