import { Router } from "express";
import createDoctorController from "../controller/doctors/createDoctors.controller";
import getDoctorSchedulesControllerByID from "../controller/doctors/getDoctroSchedules.controller";
import getProfileDoctorsController from "../controller/doctors/getProfileDoctors.controller";
import listDoctorsController from "../controller/doctors/listDoctors.controller";
import listTargetDoctorController from "../controller/doctors/listTargetDoctor.controller";
import patchDoctorsController from "../controller/doctors/patchDoctors.controller";
import softDeleteController from "../controller/doctors/softDeleteTargetDoctor.controller";
import auth from "../middlewares/auth.middleware";
import isOwnerMiddleware from "../middlewares/isOwner.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post("", createDoctorController);
doctorsRoutes.get("/profile", auth, getProfileDoctorsController);
doctorsRoutes.get("/:id/schedules", auth, getDoctorSchedulesControllerByID);
doctorsRoutes.get("/:id", listTargetDoctorController);
doctorsRoutes.get("", listDoctorsController);
doctorsRoutes.patch("/:id", patchDoctorsController);
doctorsRoutes.delete("/:id", auth, isOwnerMiddleware, softDeleteController);

export default doctorsRoutes;
