import  Doctors from "../../entities/doctor.entity"
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IDoctorRequest } from "../../interfaces/doctor";
import patchDoctorsService from "../../services/doctors/patchDoctors.service";


const patchDoctorsController = async (req: Request, res: Response) => {
        const {name,email,password, sex, address}: IDoctorRequest = req.body
        const id: string = req.params.id
        
                
        const updatedDoctor = await patchDoctorsService({name,email,password, sex, address}, id)
            return res.json(instanceToPlain(updatedDoctor))
        
       
   
}


export default patchDoctorsController