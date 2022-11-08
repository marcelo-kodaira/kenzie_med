import AppDataSource from "../../data-source"
import Doctors from "../../entities/doctor.entity"
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
    
   const deletando =  await scheduleRepository.update(
        scheduleID, {
        user: undefined,
        doctor: undefined,
    })  
     
    await scheduleRepository.delete(schedule)
    
    
}
    

export default deleteScheduleService