import { Request, Response } from "express";
import getDoctorsService from "../../services/doctors/getDoctor.service";



const getDoctorsController = async(req: Request, res: Response) => {

    
    
    const getDoctors = await getDoctorsService();

    return res.status(200).json((getDoctors));


};

export default getDoctorsController