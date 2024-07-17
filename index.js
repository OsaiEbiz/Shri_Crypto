import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes/router.js";

dotenv.config()
const app = express()
app.use(cors({ origin: "https://novactech-helpdesk.freshservice.com/" }))
app.use(express.json())
app.use("/", routes)
app.listen(3000, () => {
    console.log("node_connected");
})