import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import loginRouter from "./routes/login.routes";
import doctorsRoutes from "./routes/doctor.routes";
import specialtyRoutes from "./routes/specialties.routes";

const app = express();
app.use(express.json());

app.use("/login", loginRouter);
app.use(handleErrorMiddleware);
app.use("/doctors", doctorsRoutes);
app.use("/specialties", specialtyRoutes);

export default app;
