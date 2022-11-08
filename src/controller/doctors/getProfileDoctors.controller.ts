import { Request, Response } from "express"
import getProfileDoctorsService from "../../services/doctors/getProfileDoctors.service"

const getProfileDoctorsController = async (req: Request, res: Response) => {
  const doctorId: string = req.user.id

  const doctorProfile = await getProfileDoctorsService(doctorId)

  return res.json(doctorProfile)
}

export default getProfileDoctorsController
