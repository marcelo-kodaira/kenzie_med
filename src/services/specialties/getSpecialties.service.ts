import AppDataSource from "../../data-source"
import Specialties from "../../entities/specialty.entity"

const getSpecialtiesService = async () => {
  const specialtiesRepository = AppDataSource.getRepository(Specialties)

  const specialties = await specialtiesRepository.find()

  return specialties
}

export default getSpecialtiesService
