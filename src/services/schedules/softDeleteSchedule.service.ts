import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import Users from "../../entities/user.entity"
import AppError from "../../Error/AppError"
import { IscheduleEdit } from "../../interfaces/schedule"

const softDeleteScheduleService = async (scheduleID: string) => {

    const scheduleRepository = AppDataSource.getRepository(Schedules)
    const userRepository = AppDataSource.getRepository(Users)

    const schedule = await scheduleRepository.findOneBy({
        id: scheduleID
    })

    if (!schedule) {
        throw new AppError("Schedule not found", 404)
    }


    await scheduleRepository.update(
        scheduleID,
        {
        }
    )

    return schedule
}

export default softDeleteScheduleService
