const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./lib/db");
const userRouter = require("./routers/userRouter");
const employeeRouter = require("./routers/employeerouter");

app.use(cors({
  origin: "http://localhost:3003",
  credentials: false,
}));

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
});

app.use(async (req, res, next) => {
  if (req.path.startsWith("/api/health")) return next();
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use((req, res, next) => {
  console.log("→", req.method, req.path);
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/emp", employeeRouter);


module.exports = app;
//username:pyylppppx382_db_user, password:rw8nuHCWgyoRJBt0
