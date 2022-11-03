import { Request, Response } from "express";
import disableUserService from "../../services/users/disableUser.service";

const disableUserController = async (req: Request, res: Response) => {
	const userId = req.params.id;
	await disableUserService(userId);

	return res.status(204).send();
};

export default disableUserController;
