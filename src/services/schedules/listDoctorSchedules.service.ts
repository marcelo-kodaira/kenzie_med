import AppDataSource from "../../data-source";
import Schedules from "../../entities/schedule.entity";

const listDoctorSchedulesService = async (doctorCRM:string): Promise<Schedules[]> => {

	const scheduleRepository = AppDataSource.getRepository(Schedules)    

    const doctorSchedules = await scheduleRepository.find({
        where:{
            doctor:{
                CRM: doctorCRM
            }
        }
    })   
	
	return doctorSchedules;
};

export default listDoctorSchedulesService;