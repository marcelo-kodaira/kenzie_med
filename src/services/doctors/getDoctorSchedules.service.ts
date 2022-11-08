import AppDataSource from "../../data-source"
import Schedules from "../../entities/schedule.entity"

const getDoctorSchedulesServiceByID = async (doctorID: string): Promise<Schedules[]> => {
  const scheduleRepository = AppDataSource.getRepository(Schedules)

  const doctorSchedules = await scheduleRepository.find({
    where: {
      doctor: {
        id: doctorID,
      },
    },
  })

  return doctorSchedules
}

export default getDoctorSchedulesServiceByID
