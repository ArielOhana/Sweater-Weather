const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const Controller = require("./controller");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/weather/:city", Controller.getWeather);
app.get("/stayactive", Controller.stayActive);

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
