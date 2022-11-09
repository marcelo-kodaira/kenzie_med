import { Router } from "express"
import createSpecialtyController from "../controller/specialties/createSpecialties.controller"
import listAllSpecialtyController from "../controller/specialties/listAllSpecialties.controller"
import ListPropertiesController from "../controller/specialties/listSpecialtyById.controller"
import authMiddleware from "../middlewares/auth.middleware"
import isAdmMiddleware from "../middlewares/isAdm.middleware"

const specialtyRoutes = Router()

specialtyRoutes.post("", createSpecialtyController, authMiddleware, isAdmMiddleware)
specialtyRoutes.get("", listAllSpecialtyController)
specialtyRoutes.get("/:id/doctors", ListPropertiesController)

export default specialtyRoutes
