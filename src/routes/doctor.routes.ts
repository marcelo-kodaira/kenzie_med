import { verify } from "crypto"
import { Router } from "express"
import createDoctorController from "../controller/doctors/createDoctors.controller"
import getDoctorSchedulesControllerByID from "../controller/doctors/getDoctroSchedules.controller"
import getProfileDoctorsController from "../controller/doctors/getProfileDoctors.controller"
import listDoctorsController from "../controller/doctors/listDoctors.controller"
import listTargetDoctorController from "../controller/doctors/listTargetDoctor.controller"
import patchDoctorsController from "../controller/doctors/patchDoctors.controller"
import softDeleteController from "../controller/doctors/softDeleteTargetDoctor.controller"
import authMiddleware from "../middlewares/auth.middleware"
import isOwnerMiddleware from "../middlewares/isOwner.middleware"
import verifyUpdateDoctorRequestMiddleware from "../middlewares/verifyUpdateDoctor.middleware"

const doctorsRoutes = Router()

doctorsRoutes.post("", createDoctorController)
doctorsRoutes.get("/profile", authMiddleware, getProfileDoctorsController)
doctorsRoutes.get("/:id/schedules", authMiddleware, getDoctorSchedulesControllerByID)
doctorsRoutes.get("/:id", listTargetDoctorController)
doctorsRoutes.get("", listDoctorsController)
doctorsRoutes.patch("/:id", authMiddleware, isOwnerMiddleware, verifyUpdateDoctorRequestMiddleware, patchDoctorsController)
doctorsRoutes.delete("/:id", authMiddleware, isOwnerMiddleware, softDeleteController)

export default doctorsRoutes
