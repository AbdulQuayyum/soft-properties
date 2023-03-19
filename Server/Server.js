import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

let PORT
process.env.STATUS === "development"
    ? (PORT = process.env.DEV_ENDPOINT_URL)
    : (PORT = process.env.PROD_ENDPOINT_URL)

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

const StartServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is in ${process.env.STATUS} mode, listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
};

StartServer()