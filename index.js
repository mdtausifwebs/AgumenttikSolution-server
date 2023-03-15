const express = require("express");
const App = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./database/.env" });
const db = require("./database/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
App.use(express.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    origin: true,
  })
);
const userRoute = require("./src/router/userroute");
App.use("/api/v1", userRoute);
// App.options("*", cors());
App.listen(process.env.PORT, async () => {
  await db();
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
