import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes/router.js";

dotenv.config()
const app = express()
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ["https://novactech-helpdesk.freshservice.com"];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json())
app.use("/", routes)
app.listen(process.env.PORT, () => {
    console.log("node_connected");
})