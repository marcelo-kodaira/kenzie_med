import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import Users from "../../entities/user.entity"
import AppError from "../../Error/AppError"
import { IscheduleEdit } from "../../interfaces/schedule"

const softDeleteScheduleService = async (scheduleID:string) => {
    
    const scheduleRepository = AppDataSource.getRepository(Schedules)
    const userRepository = AppDataSource.getRepository(Users)

    const scheduleExists = await scheduleRepository.findOneBy({
        id: scheduleID
    }) 

    if(!scheduleExists){
        throw new AppError("Schedule not found", 404)
    }

    const newDate = new Date
  
        await scheduleRepository.update(
            scheduleID,
            {           
                updatedAt: newDate,
                isAvailable: true,
                user: undefined,                    
            }
        )      

    return !scheduleExists
}

export default softDeleteScheduleService