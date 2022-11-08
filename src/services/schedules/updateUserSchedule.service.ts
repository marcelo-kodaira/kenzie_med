import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import Users from "../../entities/user.entity"
import AppError from "../../Error/AppError"

const updateScheduleService = async (scheduleID: string, userID: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules)
  const userRepository = AppDataSource.getRepository(Users)

  const scheduleExists = await scheduleRepository.findOneBy({
    id: scheduleID,
  })

  if (!scheduleExists) {
    throw new AppError("Schedule not found", 404)
  }

  const userExists = await userRepository.findOneBy({
    id: userID,
  })

  if (userExists) {
    await scheduleRepository.update(scheduleID, {
      isAvailable: false,
      user: userExists,
    })
  }

  const updatedSchedule = await scheduleRepository.findOne({
    where: {
      id: scheduleID,
    },
    relations: {
      user: true,
      doctor: true
    }
  })

  return updatedSchedule
}

export default updateScheduleService
