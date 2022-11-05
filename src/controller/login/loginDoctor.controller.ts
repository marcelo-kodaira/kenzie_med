import { Request, Response } from "express"
import { ILogin } from "../../interfaces/login"
import loginDoctorService from "../../services/login/loginDoctor.service"

const loginDoctorController = async (req: Request, res: Response) =>{

    const data:ILogin = req.body
    const token = await loginDoctorService(data)
    return res.status(200).json({ token })

}

export default loginDoctorController;