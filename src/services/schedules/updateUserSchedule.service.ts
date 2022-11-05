import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import Users from "../../entities/user.entity"
import AppError from "../../Error/AppError"
import { IscheduleEdit } from "../../interfaces/schedule"

const updateScheduleService = async (scheduleID:string, userID:string) => {
    
    const scheduleRepository = AppDataSource.getRepository(Schedules)
    const userRepository = AppDataSource.getRepository(Users)

    const scheduleExists = await scheduleRepository.findOneBy({
        id: scheduleID
    })

    const userExists = await userRepository.findOneBy({
        id: userID
    })

    if(!scheduleExists){
        throw new AppError("Schedule not found", 404)
    }

    const newDate = new Date

    if(userExists){
        await scheduleRepository.update(
            scheduleID,
            {           
                updatedAt: newDate,
                isAvailable: false,
                user:userExists,                    
            }
        )
    }    

    return scheduleExists
}

export default updateScheduleService