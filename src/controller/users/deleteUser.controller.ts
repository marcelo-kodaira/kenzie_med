import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service"

const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.body.params.id;
    await deleteUserService(userId);

    return res.status(204);
}

export default deleteUserController;