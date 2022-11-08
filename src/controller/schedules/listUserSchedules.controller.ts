import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import listUserSchedulesService from "../../services/schedules/listUserSchedules.service"

const listUserSchedulesController = async (req: Request, res: Response) => {
  const userID = req.user.id

  const userSchedules = await listUserSchedulesService(userID)
  return res.json(instanceToPlain(userSchedules))
}

export default listUserSchedulesController
