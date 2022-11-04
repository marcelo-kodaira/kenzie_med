import { Router } from "express";
import loginDoctorController from "../controller/login/loginDoctor.controller";
import loginUserController from "../controller/login/loginUser.controller";

const loginRouter = Router();


loginRouter.post("/doctors", loginDoctorController);
loginRouter.post("/users", loginUserController);

export default loginRouter;