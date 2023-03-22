import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import ConnectDB from "./Source/MongoDB/Connect.js"
import PropertyRouter from "./Source/Routes/Property.Routes.js"
import UserRouter from "./Source/Routes/User.Routes.js"

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Heyy there, I am a Cat.',
  });
});

app.use("/api/v1/Properties", PropertyRouter)
app.use("/api/v1/Users", UserRouter)

// let PORT;

// if (process.env.STATUS === 'development') {
//     PORT = process.env.DEV_ENDPOINT_URL;
// } else {
//     PORT = process.env.PROD_ENDPOINT_URL;
// }

const StartServer = async () => {
  try {
    ConnectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Cooking")
      // console.log(`Server is in ${process.env.STATUS} mode, listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();