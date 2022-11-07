import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listDoctorSchedulesService from "../../services/schedules/listDoctorSchedules.service";

const listDoctorSchedulesController = async (req: Request, res: Response) => {

    const doctorID = req.user.id
	const doctorSchedules = await listDoctorSchedulesService(doctorID)
	return res.json(instanceToPlain(doctorSchedules))

}

export default listDoctorSchedulesController