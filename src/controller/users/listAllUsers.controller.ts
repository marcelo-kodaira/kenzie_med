import { Request, Response } from "express"
import listAllUsersService from "../../services/users/listAllUsers.service"
import { instanceToPlain } from "class-transformer"

const listUsersController = async (req: Request, res: Response) => {
  const allUsers = await listAllUsersService()
  return res.json(instanceToPlain(allUsers))
}

export default listUsersController
