import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import AppError from "../../Error/AppError"
import { IscheduleEdit } from "../../interfaces/schedule"

const editScheduleService = async ({hour,date,type,description}:IscheduleEdit, scheduleId: string) => {

    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const scheduleExists = await scheduleRepository.findOneBy({
        id: scheduleId
    })

    if(!scheduleExists){
        throw new AppError("Schedule not found", 404)
    }

    if(scheduleExists.user){
        throw new AppError("Cant modify schedule! Is already schedule for a user",400)
    }

    const newDate = new Date


    await scheduleRepository.update(
        scheduleId,
        {
            type: type ? type : scheduleExists.type,
            description: description ? description : scheduleExists.description,
            hour: hour ? hour : scheduleExists.hour,
            date: date ? date : scheduleExists.date,
            updatedAt: newDate
        }
    )

    return scheduleExists
    
}

export default editScheduleService