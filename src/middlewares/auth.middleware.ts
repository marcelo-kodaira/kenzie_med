import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../Error/AppError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
		return res.status(401).json({
			message: "Missing authorization headers"
		});
	}

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error, decoded: any) => {
      if (error) {
        throw new AppError("Invalid Token", 403);
      }
      req.user = {
        id: decoded.sub,
        crm: decoded.CRM,
        isAdmin: decoded.isAdmin
      };
      next();
    }
  );
};

export default authMiddleware;
