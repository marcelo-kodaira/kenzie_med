import { Request, Response } from "express"
import Schedules from "../../entities/schedule.entity"
import editScheduleService from "../../services/schedules/editSchedule.service"

const editScheduleController = async (req: Request, res: Response) => {
  const body = req.body
  const scheduleId = req.params.id

  const editedSchedule = await editScheduleService(body, scheduleId)

  if (editedSchedule instanceof Schedules) {
    return res.status(200).json({
      message: "Schedule updated with success!",
    })
  }
}

export default editScheduleController
