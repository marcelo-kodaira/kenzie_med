import AppDataSource from "../../data-source";
import Doctors from "../../entities/doctor.entity";
import AppError from "../../Error/AppError";

const listTargetDoctorService = async ( id: string ) => {
    const doctorRepository = AppDataSource.getRepository( Doctors );

    const doctor = await doctorRepository.findOne({
    where: 
    {
      id: id
    },
    relations: 
    {
        address: true,
        specialties: true,
        schedules: true
    }
    });
  
    if ( !doctor ) {
      throw new AppError("Doctor not found!", 404 )
    }
  
    return doctor;
}

export default listTargetDoctorService;