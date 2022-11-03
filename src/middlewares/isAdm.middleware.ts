import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.isAdm) {
    next();
  }

  throw new AppError("User is not an Administrator", 401);
};

export default isAdmMiddleware;
