import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { ISpecialtyRequest } from "../../interfaces/specialty";
import createSpecialtyService from "../../services/specialties/createSpacialties.services";


const createSpecialtyController = async(req: Request, res: Response) => {

    const createspecialty:ISpecialtyRequest = req.body;
    const newSpecialty = await createSpecialtyService(createspecialty);

    return res.status(201).json(instanceToPlain(newSpecialty));

};
export default createSpecialtyController