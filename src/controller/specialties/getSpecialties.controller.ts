import { Request, Response } from "express";
import getSpecialtiesService from "../../services/specialties/getSpecialties,service";


const getSpecialtyController = async(req: Request, res: Response) => {

    
    const getSpecialties = await getSpecialtiesService();

    return res.status(200).json((getSpecialties));


};

export default getSpecialtyController