import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import makeRoutes from "./routes/make.js";
import modelRoutes from "./routes/model.js";
import partRoutes from "./routes/part.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
// const port = 8000;

const app = express();

mongoose.set("strictQuery", true);

// db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB conencted"))
  .catch((err) => console.log(`DB ERROR => ${err}`));

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", makeRoutes);
app.use("/api", modelRoutes);
app.use("/api", partRoutes);

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
