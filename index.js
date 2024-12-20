const express = require("express");
const globalErrorHandler = require("./utils/ErrorHandler");
const routeErrorHandler = require("./utils/routeErrorHandler");
const connectDb = require("./config/db");
const authRouter = require("./routes/auth");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// connect to mongodb database
connectDb();

app.use(express.json());
app.use("/api/v1/auth", authRouter);

// server check route
app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

// global error checking route
app.get("/example", (req, res, next) => {
  try {
    // simulate the error
    throw { status: 400, message: "Bad Request" };
  } catch (error) {
    next(error);
  }
});

// auth routes

// handling undefined route
app.use(routeErrorHandler);

// handling global error
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
