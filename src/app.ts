import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import handleErrorMiddleware from "./middlewares/handleError.middleware"


const app = express()
app.use(express.json())


app.use(handleErrorMiddleware)

export default app