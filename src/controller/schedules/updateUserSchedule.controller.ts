import updateScheduleService from "../../services/schedules/updateUserSchedule.service"
import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import Schedules from "../../entities/schedule.entity"

const updateScheduleController = async (req: Request, res: Response) => {
  const scheduleID = req.params.id
  const userID = req.user.id

  const updatedSchedule = await updateScheduleService(scheduleID, userID)

  const updated = {
    updatedSchedule,
    message: "Schedule with sucess",
  }

  return res.status(200).send(instanceToPlain(updated))
}

export default updateScheduleController
