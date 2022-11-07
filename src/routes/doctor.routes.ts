import { Router } from "express";
import createDoctorController from "../controller/doctors/createDoctors.controller";
import getProfileDoctorsController from "../controller/doctors/getProfileDoctors.controller";
import listDoctorsController from "../controller/doctors/listDoctors.controller";
import listTargetDoctorController from "../controller/doctors/listTargetDoctor.controller";
import patchDoctorsController from "../controller/doctors/patchDoctors.controller";
/* import permantentDeleteController from "../controller/doctors/permanentDeleteDoctor.controller"; */
import softDeleteController from "../controller/doctors/softDeleteTargetDoctor.controller"
import autMiddleware from "../middlewares/auth.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import isOwnerMiddleware from "../middlewares/isOwner.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post("", createDoctorController);
doctorsRoutes.get("", listDoctorsController);
doctorsRoutes.get("/:id", listTargetDoctorController);
doctorsRoutes.get("/profile", autMiddleware, getProfileDoctorsController);
doctorsRoutes.patch("/:id", patchDoctorsController);
doctorsRoutes.delete("/:id", autMiddleware, isOwnerMiddleware, softDeleteController);
/* doctorsRoutes.delete("/delete/:id", autMiddleware, isAdmMiddleware ,permantentDeleteController); */

export default doctorsRoutes;