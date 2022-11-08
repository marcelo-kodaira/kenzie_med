import AppDataSource from "../../data-source"
import Doctors from "../../entities/doctor.entity"
import Schedules from "../../entities/schedule.entity"
import AppError from "../../Error/AppError"
import { IScheduleRequest } from "../../interfaces/schedule"

const createScheduleService = async ({ type, description, doctorsID, hour, date }: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules)

  const doctorRepository = AppDataSource.getRepository(Doctors)

  const doctor = await doctorRepository.findOneBy({
    id: doctorsID,
  })

  const scheduleAlreadyExist = await scheduleRepository.findOneBy({
    type,
    hour,
    date,
  })

  if (scheduleAlreadyExist) {
    throw new AppError("Schedule already exist!", 400)
  }

  if (!doctor) {
    throw new AppError("Doctor not found", 404)
  }

  const newSchedule = scheduleRepository.create({
    type,
    description,
    hour,
    date,
    doctor,
  })

  await scheduleRepository.save(newSchedule)

  return newSchedule
}

export default createScheduleService
