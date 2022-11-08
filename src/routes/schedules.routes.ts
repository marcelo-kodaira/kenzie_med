import { Router } from "express"
import createScheduleController from "../controller/schedules/createSchedule.controller"
import editScheduleController from "../controller/schedules/editSchedule.controller"
import listDoctorSchedulesController from "../controller/schedules/listDoctorSchedules.controller"
import listSchedulesController from "../controller/schedules/listSchedules.controller"
import listUserSchedulesController from "../controller/schedules/listUserSchedules.controller"
import softDeleteScheduleController from "../controller/schedules/softDeleteSchedule.controller"
import updateScheduleController from "../controller/schedules/updateUserSchedule.controller"

import authMiddleware from "../middlewares/auth.middleware"
import isAdmMiddleware from "../middlewares/isAdm.middleware"
import isDocMiddleware from "../middlewares/isDoc.middleware"

const scheduleRoutes = Router()

scheduleRoutes.post("", authMiddleware, isDocMiddleware, createScheduleController)
scheduleRoutes.patch("/edit/:id", authMiddleware, isDocMiddleware, editScheduleController)
scheduleRoutes.patch("/:id", authMiddleware, updateScheduleController)
scheduleRoutes.delete("/:id", authMiddleware, softDeleteScheduleController)
scheduleRoutes.get("", authMiddleware, isAdmMiddleware, listSchedulesController)
scheduleRoutes.get("/doctors", authMiddleware, isDocMiddleware, listDoctorSchedulesController)
scheduleRoutes.get("/users", authMiddleware, listUserSchedulesController)

export default scheduleRoutes
