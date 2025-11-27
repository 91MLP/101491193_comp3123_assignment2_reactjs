const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./index");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("Db connection error:", err));

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, (req, res) => {
  console.log(`The ${SERVER_PORT} was running...`);
});
