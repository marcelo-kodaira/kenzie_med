import AppDataSource from "../../data-source";
import Doctors from "../../entities/doctor.entity";
import AppError from "../../Error/AppError";

const softDeleteTargetDoctorService = async (id: string) => {
  const doctorRepository = AppDataSource.getRepository(Doctors);

  const account = await doctorRepository.findOne({ where: { id } });
  if (!account) {
    throw new AppError("Doctor not found", 404);
  }

  account!.isActive = false;

  await doctorRepository.save(account!);

  return account;
};

export default softDeleteTargetDoctorService;
