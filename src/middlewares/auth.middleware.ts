import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../error/AppError";

const autMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Invalid Token", 403);
      }
      req.user.id = decoded.sub;
      req.user.crm = decoded.crm;
      req.user.isAdm = decoded.isAdm;
      next();
    }
  );
};

export default autMiddleware;