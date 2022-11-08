import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"

const listSchedulesService = async (): Promise<Schedules[]> => {
  const scheduleRepository = AppDataSource.getRepository(Schedules)

  const schedules = await scheduleRepository.find()

  return schedules
}

export default listSchedulesService
