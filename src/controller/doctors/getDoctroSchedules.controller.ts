import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import getDoctorSchedulesServiceByID from "../../services/doctors/getDoctorSchedules.service";

const getDoctorSchedulesControllerByID = async (req: Request, res: Response) => {

    const doctorID = req.params.id
	const doctorSchedules = await getDoctorSchedulesServiceByID(doctorID)
	return res.json(instanceToPlain(doctorSchedules))

}

export default getDoctorSchedulesControllerByID