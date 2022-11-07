import { Request, Response } from "express";
import listTargetDoctorService from "../../services/doctors/listTargetDoctor.service";

const listTargetDoctorController = async(req: Request, res: Response) => {

    const id = req.params.id

    const listDoctorsById = await listTargetDoctorService(id);

    return res.status(200).json(listDoctorsById);
}

export default listTargetDoctorController;