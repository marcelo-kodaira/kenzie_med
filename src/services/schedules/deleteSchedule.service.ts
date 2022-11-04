import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"
import AppError from "../../Error/AppError"


const deleteScheduleService = async (scheduleID:string) => {
    
    const scheduleRepository = AppDataSource.getRepository(Schedules)   

    const schedule = await scheduleRepository.findOneBy({
        id: scheduleID
    })
       
    if(!schedule){
        throw new AppError("Schedule not found", 404)
    }
     
        await scheduleRepository.delete(schedule)
    
    
}
    

export default deleteScheduleService