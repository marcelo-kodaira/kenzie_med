import { Request, Response } from "express"
import retrieveUserService from "../../services/users/retrieveUser.service"

const retrieveUserController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const findUser = await retrieveUserService(userId)
  return res.json(findUser)
}

export default retrieveUserController
