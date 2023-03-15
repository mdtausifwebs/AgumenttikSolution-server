const { auth } = require("../../middleware/auth");
const { fileupload } = require("../controller/fileuploadcontroller");
const {
  registerLogin,
  getuser,
  logout,
} = require("../Controller/UserController");
const routers = require("express").Router();

routers.post("/register", registerLogin);
routers.get("/getuser", auth, getuser);
routers.get("/logout", auth, logout);
routers.post("/upload", auth, fileupload);
routers.get("/getfile", auth, fileupload);

module.exports = routers;
