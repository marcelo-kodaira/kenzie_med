import AppDataSource from "../../data-source";
import Doctors from "../../entities/doctor.entity";



const getDoctorsService = async () => {

    const doctorsRepository = AppDataSource.getRepository(Doctors);
    const doctors = await doctorsRepository.find({
        where:{
            isActive: true
        },
        relations:{
            address: true,
            specialties: true
        }
    });

    return doctors;

}

export default getDoctorsService;