import { Request, Response } from "express"
import { IDoctorUpdate } from "../../interfaces/doctor"
import updateUserService from "../../services/doctors/patchDoctors.service"

const updateUserController = async (req: Request, res: Response) => {
  const { name, email, password, age, sex, address }: IDoctorUpdate = req.body

  const userId = req.params.id

  const updatedUser = await updateUserService({ name, email, password, age, sex, address }, userId)

  return res.json(updatedUser)
}
export default updateUserController
