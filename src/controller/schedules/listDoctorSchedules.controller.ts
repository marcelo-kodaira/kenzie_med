import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listDoctorSchedulesService from "../../services/schedules/listDoctorSchedules.service";

const listDoctorSchedulesController = async (req: Request, res: Response) => {

    const doctorCRM = req.user.crm
	const doctorSchedules = await listDoctorSchedulesService(doctorCRM)
	return res.json(instanceToPlain(doctorSchedules))

}

export default listDoctorSchedulesController