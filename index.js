import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import routes from "./routes/router.js";

dotenv.config()
const app = express()
app.use(cors({
    origin: function (origin, callback) {
        if (origin === 'https://novactech-helpdesk.freshservice.com') {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json())
app.use("/", routes)
app.listen(process.env.PORT, () => {
    console.log("node_connected");
})