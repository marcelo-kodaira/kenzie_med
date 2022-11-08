import { Router } from "express"

import authMiddleware from "../middlewares/auth.middleware"
import isAdmMiddleware from "../middlewares/isAdm.middleware"
import verifyUpdateRequestUserMiddleware from "../middlewares/verifyUpdateRequest.middleware"

import creteUserController from "../controller/users/createUser.controller"
import listAllUsersController from "../controller/users/listAllUsers.controller"
import retrieveUserController from "../controller/users/retrieveUser.controller"
import updateUserController from "../controller/users/updateUser.controller"
import disableUserController from "../controller/users/disableUser.constroller"
import isOwnerMiddleware from "../middlewares/isOwner.middleware"

const userRoutes = Router()

userRoutes.post("", creteUserController)
userRoutes.get("", authMiddleware, isAdmMiddleware, listAllUsersController)
userRoutes.get("/profile", authMiddleware, retrieveUserController)
userRoutes.patch("/:id", authMiddleware, verifyUpdateRequestUserMiddleware, updateUserController)
userRoutes.delete("/:id", authMiddleware, isOwnerMiddleware, disableUserController)

export default userRoutes
