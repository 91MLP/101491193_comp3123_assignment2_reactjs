const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/_ping", (req, res) => {
  return res.status(200).json({ ok: true, route: "/api/v1/user/_ping" });
});

userRouter.route("/signup").post(userController.signUp);
userRouter.route("/login").post(userController.logIn);

module.exports = userRouter;
