import { Router } from "express";
import createSpecialtyController from "../controller/specialties/createSpecialties,controller";
import getSpecialtyController from "../controller/specialties/getSpecialties.controller";

const specialtyRoutes = Router()

specialtyRoutes.post("", createSpecialtyController)
specialtyRoutes.get("", getSpecialtyController)


export default specialtyRoutes