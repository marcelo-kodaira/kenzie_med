import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IDoctor, IDoctorRequest } from "../../interfaces/doctor";
import createDoctorService from "../../services/doctors/createDoctors.service";



const createDoctorController = async(req: Request, res: Response) => {

const createDoctors:IDoctorRequest = req.body;

    const newDoctor = await createDoctorService(createDoctors );

return res.status(201).json(instanceToPlain(newDoctor));

};

export default createDoctorController
