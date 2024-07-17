import express from "express"
import { updation } from "../controlls/controllers.js"

const routes = express.Router()

routes.use("/update",updation)


export default routes