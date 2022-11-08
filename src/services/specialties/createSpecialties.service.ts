import AppDataSource from "../../data-source"
import Specialties from "../../entities/specialty.entity"
import AppError from "../../Error/AppError"
import { ISpecialtyRequest } from "../../interfaces/specialty"

const createSpecialtyService = async ({ name }: ISpecialtyRequest) => {
  const specialtyRepository = AppDataSource.getRepository(Specialties)

  const specialties = await specialtyRepository.find()

  const nameAlreadyExists = specialties.find((specialty) => specialty.name === name)

  if (nameAlreadyExists) {
    throw new AppError("Specialty already exists")
  }

  const specialty = new Specialties()

  specialty.name = name

  specialtyRepository.create(specialty)

  await specialtyRepository.save(specialty)

  return specialty
}

export default createSpecialtyService
