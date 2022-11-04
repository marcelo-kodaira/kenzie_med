import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";

const isDocMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    if(req.user.crm){
        next()
    }
    
    throw new AppError("You need to be a doctor to access this route",401)
}
export default isDocMiddleware