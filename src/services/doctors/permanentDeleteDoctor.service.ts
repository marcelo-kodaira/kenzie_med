/* import AppDataSource from "../../data-source";
import Addresses from "../../entities/address.entity";
import Doctors from "../../entities/doctor.entity";
import Specialties from "../../entities/specialty.entity";
import AppError from "../../Error/AppError";
import Schedules from "../../entities/schedule.entity";

const permanentDeleteDoctorService = async (id: string) => {

    const doctorRepository = AppDataSource.getRepository(Doctors);

    const specialty = AppDataSource.getRepository(Specialties)

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const addressRepository = AppDataSource.getRepository(Addresses);

    const doctor = await doctorRepository.findOneBy({ id: id });
    
    const targertSpecialties = await specialty.findOne({where:{
        id: doctor?.specialties
    }});

    
    if(!doctor){
        throw new AppError("Doctor not Found!", 404)
    }

    const removeSpecialty = targertSpecialties.find
    await doctorRepository.delete(id)

    await addressRepository.delete(doctor.address.id)
}

export default permanentDeleteDoctorService; */
