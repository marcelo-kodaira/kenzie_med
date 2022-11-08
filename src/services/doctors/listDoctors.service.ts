import AppDataSource from "../../data-source"
import Doctors from "../../entities/doctor.entity"

const listDoctorsService = async () => {
  const doctorsRepository = AppDataSource.getRepository(Doctors)

  const doctors = await doctorsRepository.find({ relations: { specialties: true }})

  return doctors
}

export default listDoctorsService
