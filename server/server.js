const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const Controller = require("./controller");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const allowedOrigins = [process.env.CLIENT_URL, process.env.CRONJOB_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/weather/:city", Controller.getWeather);
app.get("/stayactive", Controller.stayActive);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});