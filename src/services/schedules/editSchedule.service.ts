import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import AppError from "../../Error/AppError"
import { IscheduleEdit } from "../../interfaces/schedule"

const editScheduleService = async (body:IscheduleEdit, scheduleId: string) => {

    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const scheduleExists = await scheduleRepository.findOneBy({
        id: scheduleId
    })

    if(!scheduleExists){
        throw new AppError("Schedule not found", 404)
    }

    if(scheduleExists.user){
        throw new AppError("Cant modificate schedule! Is already schedule for a user",400)
    }

    const newDate = new Date


    await scheduleRepository.update(
        scheduleId,
        {
            type: body.type ? body.type : scheduleExists.type,
            description: body.description ? body.description : scheduleExists.description,
            hour: body.hour ? body.hour : scheduleExists.hour,
            date: body.date ? body.date : scheduleExists.date,
            updatedAt: newDate
        }
    )

    return scheduleExists
    
}

export default editScheduleService