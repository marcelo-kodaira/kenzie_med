import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import loginRouter from './routes/login.routes'
import userRoutes from './routes/user.routes'
import scheduleRoutes from './routes/schedules.routes'
import doctorsRoutes from "./routes/doctor.routes";
import specialtyRoutes from "./routes/specialties.routes";


const app = express();
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRoutes);
app.use("/doctors", doctorsRoutes);
app.use("/specialties", specialtyRoutes);
app.use("/schedules", scheduleRoutes)

app.use(handleErrorMiddleware);


export default app;
