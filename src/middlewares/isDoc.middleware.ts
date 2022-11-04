import { NextFunction, Request, Response } from "express";
const isDocMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    if(req.user.crm){
        next()
    }
    
    throw new AppError("You need to be a doctor to acess this route",401)
}
export default isDocMiddleware