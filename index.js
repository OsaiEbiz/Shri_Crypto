import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes/router.js";

dotenv.config()
const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use("/", routes)
app.listen(process.env.PORT, () => {
    console.log("node_connected");
})