import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";
<<<<<<< HEAD
const isDocMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.crm) {
    next();
  }

  throw new AppError("You need to be a doctor to acess this route", 401);
};
export default isDocMiddleware;
=======

const isDocMiddleware = (req:Request, res:Response, next:NextFunction) => {   

    if(!req.user.crm  && !req.user.isAdmin){
        throw new AppError("You need to be a doctor to access this route", 401)
    }
     next()    

}
export default isDocMiddleware
>>>>>>> tests/doctors
