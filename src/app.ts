import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import userRoutes from "./routes/user.routes";
import loginRouter from "./routes/login.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRouter);

app.use(handleErrorMiddleware);

export default app;
