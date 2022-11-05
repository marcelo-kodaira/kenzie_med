import { classToPlain, instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/user";
import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
	const { name, email, password, age, sex, address }: IUserUpdate = req.body;
	const userId = req.params.id;
	const updatedUser = await updateUserService(
		{ name, email, password, age, sex, address },
		userId
	);
	return res.json(instanceToPlain(updatedUser));
};

export default updateUserController;
