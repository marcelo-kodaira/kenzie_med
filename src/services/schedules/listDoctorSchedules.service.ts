import AppDataSource from "../../data-source";
import Schedules from "../../entities/schedule.entity";

const listDoctorSchedulesService = async (doctorCRM:string): Promise<Schedules[]> => {

	const scheduleRepository = AppDataSource.getRepository(Schedules)    

    const dcotorSchedules = await scheduleRepository.find({
        where:{
            doctor:{
                CRM: doctorCRM
            }
        }
    })   
	
	return dcotorSchedules;
};

export default listDoctorSchedulesService;