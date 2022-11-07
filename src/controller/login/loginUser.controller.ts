import { Request, Response } from "express"
import { ILogin } from "../../interfaces/login"
import loginUserService from "../../services/login/loginUser.service"

const loginUserController = async (req: Request, res: Response) =>{

    const data:ILogin = req.body
    const token = await loginUserService(data)
    return res.status(200).json({ token })

}
export default loginUserController
