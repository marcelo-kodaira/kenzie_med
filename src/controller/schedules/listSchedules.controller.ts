import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listSchedulesService from "../../services/schedules/listSchedules.service";

const listSchedulesController = async (req: Request, res: Response) => {

	const schedules = await listSchedulesService()
	return res.json(instanceToPlain(schedules))

}

export default listSchedulesController