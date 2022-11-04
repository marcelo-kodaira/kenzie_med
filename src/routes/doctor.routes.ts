import { Router } from "express";
import createDoctorController from "../controller/doctors/createDoctors.controller";
import getDoctorsController from "../controller/doctors/getDoctors.controller";
import patchDoctorsController from "../controller/doctors/patchDoctors.controller";





const doctorsRoutes = Router()


doctorsRoutes.post("", createDoctorController)
doctorsRoutes.get("", getDoctorsController)
doctorsRoutes.patch("/:id", patchDoctorsController)



export default doctorsRoutes