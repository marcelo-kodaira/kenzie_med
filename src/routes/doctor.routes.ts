import { Router } from "express";
import createDoctorController from "../controller/doctors/createDoctors.controller";
import getProfileDoctorsController from "../controller/doctors/getProfileDoctors.controller";
import listDoctorsController from "../controller/doctors/listDoctors.controller";
import listTargetDoctorController from "../controller/doctors/listTargetDoctor.controller";
import patchDoctorsController from "../controller/doctors/patchDoctors.controller";
import permantentDeletController from "../controller/doctors/permanentDeletDoctor.controller";
import softDeleteController from "../controller/doctors/softDeleteTargetDoctor.controller"

const doctorsRoutes = Router();

doctorsRoutes.post("", createDoctorController);
doctorsRoutes.get("", listDoctorsController);
doctorsRoutes.get("/:id", listTargetDoctorController);
doctorsRoutes.get("/profile", getProfileDoctorsController);
doctorsRoutes.patch("/:id", patchDoctorsController);
doctorsRoutes.delete("/:id", softDeleteController);
doctorsRoutes.delete("/delete/:id", permantentDeletController);

export default doctorsRoutes;