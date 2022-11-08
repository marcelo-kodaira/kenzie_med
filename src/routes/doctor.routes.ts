import { Router } from "express";
import createDoctorController from "../controller/doctors/createDoctors.controller";
import getDoctorSchedulesControllerByID from "../controller/doctors/getDoctroSchedules.controller";
import getProfileDoctorsController from "../controller/doctors/getProfileDoctors.controller";
import listDoctorsController from "../controller/doctors/listDoctors.controller";
import listTargetDoctorController from "../controller/doctors/listTargetDoctor.controller";
import patchDoctorsController from "../controller/doctors/patchDoctors.controller";
import softDeleteController from "../controller/doctors/softDeleteTargetDoctor.controller";
<<<<<<< HEAD
import auth from "../middlewares/auth.middleware";
=======
import authMiddleware from "../middlewares/auth.middleware";
>>>>>>> 77d79ad22d42b7c5157da5416dd13d3ba016bab0
import isOwnerMiddleware from "../middlewares/isOwner.middleware";

const doctorsRoutes = Router();

doctorsRoutes.post("", createDoctorController);
doctorsRoutes.get("/profile", authMiddleware, getProfileDoctorsController);
doctorsRoutes.get(
  "/:id/schedules",
  authMiddleware,
  getDoctorSchedulesControllerByID
);
doctorsRoutes.get("/:id", listTargetDoctorController);
<<<<<<< HEAD
doctorsRoutes.get("/profile", auth, getProfileDoctorsController);
doctorsRoutes.get("/:id/schedules", auth, getDoctorSchedulesControllerByID);
doctorsRoutes.patch("/:id", patchDoctorsController);
doctorsRoutes.delete("/:id", auth, isOwnerMiddleware, softDeleteController);
=======
doctorsRoutes.get("", listDoctorsController);
doctorsRoutes.patch(
  "/:id",
  authMiddleware,
  isOwnerMiddleware,
  patchDoctorsController
);
doctorsRoutes.delete(
  "/:id",
  authMiddleware,
  isOwnerMiddleware,
  softDeleteController
);
>>>>>>> 77d79ad22d42b7c5157da5416dd13d3ba016bab0

export default doctorsRoutes;
