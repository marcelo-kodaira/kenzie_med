import AppDataSource from "../../data-source"
import Specialties from "../../entities/specialty.entity"
import AppError from "../../Error/AppError"

const listSpecialtyByIdService = async (id: string) => {
  const specialtyRepository = AppDataSource.getRepository(Specialties)

  const findSpecialtyById = await specialtyRepository.findOne({
    where: {
      id,
    },
    relations: {
      doctors: true,
    },
  })

  if (!findSpecialtyById) {
    throw new AppError("Specialty not found!", 404)
  }

  return findSpecialtyById
}

export default listSpecialtyByIdService
