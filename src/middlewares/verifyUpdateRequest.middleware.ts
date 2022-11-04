import { Request, Response, NextFunction } from "express";
import AppError from "../Error/AppError";

const verifyUpdateRequestUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const updateUserId = req.params.id;
	const reqUserId = req.user.id;
	const isAdmin = req.user.isAdmin;
	const updateRequest = req.body;

	if (reqUserId !== updateUserId && !isAdmin) {
		throw new AppError("Unauthorized", 401);
	}

	if (
		updateRequest.hasOwnProperty("id") ||
		updateRequest.hasOwnProperty("CPF") ||
		updateRequest.hasOwnProperty("isAdmin") ||
		updateRequest.hasOwnProperty("isActive") ||
		updateRequest.hasOwnProperty("createdAt") ||
		updateRequest.hasOwnProperty("updatedAt")
	) {
		throw new AppError(
			"Cannot update id, CPF, isAdim, isActive, createdAt or updatedAt"
		);
	}

	return next();
};

export default verifyUpdateRequestUserMiddleware;
