import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import Users from "../../entities/user.entity"
import AppError from "../../Error/AppError"

const softDeleteScheduleService = async (scheduleID: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules)
  const userRepository = AppDataSource.getRepository(Users)

  const schedule = await scheduleRepository.findOneBy({
    id: scheduleID,
  })

  if (!schedule) {
    throw new AppError("Schedule not found", 404)
  }

  schedule.user = null
  schedule.isAvailable = true

  await scheduleRepository.update(scheduleID, schedule)

  return schedule
}

export default softDeleteScheduleService
