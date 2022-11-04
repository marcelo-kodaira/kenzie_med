import { Router } from "express";
import createSpecialtyController from "../controller/specialties/createSpecialties.controller";
import listAllSpecialtyController from "../controller/specialties/listAllSpecialties.controller";
import ListPropertiesController from "../controller/specialties/listSpecialtyById.controller";

const specialtyRoutes = Router();

specialtyRoutes.post("", createSpecialtyController);
specialtyRoutes.get("", listAllSpecialtyController);
specialtyRoutes.get("/:id", ListPropertiesController);

export default specialtyRoutes;