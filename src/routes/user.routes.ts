import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

import creteUserController from "../controller/users/createUser.controller";
import listAllUsersController from "../controller/users/listAllUsers.controller";
import retrieveUserController from "../controller/users/retrieveUser.controller";
import updateUserController from "../controller/users/updateUser.controller";
import disableUserController from "../controller/users/disableUser.constroller";
import deleteUserController from "../controller/users/deleteUser.controller";

const userRoutes = Router();

userRoutes.post("", creteUserController);
userRoutes.get("", authMiddleware, isAdmMiddleware, listAllUsersController);
userRoutes.get("/profile", authMiddleware, retrieveUserController);
userRoutes.patch("/:id", authMiddleware, updateUserController);
userRoutes.delete("/:id", authMiddleware, disableUserController);
userRoutes.delete("/delete/:id", authMiddleware, isAdmMiddleware, deleteUserController);

export default userRoutes;
