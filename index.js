import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes/router.js";

dotenv.config()
const app = express()
const corsOptions = {
    origin: "https://novactech-helpdesk.freshservice.com",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json())
app.use("/", routes)
app.listen(process.env.PORT, () => {
    console.log("node_connected");
})