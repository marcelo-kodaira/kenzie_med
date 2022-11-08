import AppDataSource from "../../data-source"
import Specialties from "../../entities/specialty.entity"

const getSpecialtiesService = async () => {
  const specialtiesRepository = AppDataSource.getRepository(Specialties)

  const specialties = await specialtiesRepository.find({ relations: { doctors: true }})

  return specialties
}

export default getSpecialtiesService
