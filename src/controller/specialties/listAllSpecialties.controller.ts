import { Request, Response } from "express"
import listAllSpecialtiesService from "../../services/specialties/getSpecialties.service"

const listAllSpecialtyController = async (req: Request, res: Response) => {
  const listAllSpecialties = await listAllSpecialtiesService()

  return res.status(200).json(listAllSpecialties)
}

export default listAllSpecialtyController
