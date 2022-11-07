import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service"

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    await deleteUserService(userId);

    return res.status(204).send();
}

export default deleteUserController;