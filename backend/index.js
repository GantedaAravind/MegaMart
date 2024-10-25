const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require('cookie-parser')


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(morgan("combined")); // Use "combined" for detailed logs or "dev" for concise output


app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(cors(
  {
    origin:process.env.FRONTEND_URL,
    credentials:true
  }
));


app.use("/api", router);

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.json({ name: "aravind" });
});

app.use((err, req, res, next) => {
  res.json({
    error: true,
    succuss: false,
    messege: err.message,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started....😎😎😎 at ${PORT}`);
  });
});
