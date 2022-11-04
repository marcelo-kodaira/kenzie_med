import AppDataSource from "../../data-source";
import Doctors from "../../entities/doctor.entity";
import AppError from "../../Error/AppError";

const getProfileDoctorsService = async (id: string) => {

  const doctorRepository = AppDataSource.getRepository(Doctors);

  const getDoctorProfile = await doctorRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      address: true,
      schedules: true,
      specialties: true,
    },
  });

  if (!getDoctorProfile) {
    throw new AppError("Doctor not found!", 404);
  }

  return getDoctorProfile;
};

export default getProfileDoctorsService;
