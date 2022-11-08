import { Request, Response } from "express"
import { ISpecialtyRequest } from "../../interfaces/specialty"
import listSpecialtyByIdService from "../../services/specialties/listSpecialtyById.service"

const ListPropertiesController = async (req: Request, res: Response) => {
  const id = req.params.id

  const specialtiesList: ISpecialtyRequest = await listSpecialtyByIdService(id)

  return res.status(200).send(specialtiesList)
}

export default ListPropertiesController
