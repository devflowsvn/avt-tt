import cors from "cors";
import express from "express";
import "dotenv/config";
import { connectDB } from "./db/db.js";
import farmRouter from "./routes/farm-routes.js";
import animalRouter from "./routes/animals-routes.js";
import fishRouter from "./routes/fish-routes.js";
import userRouter from "./routes/user-routes.js";
import automationRouter from "./routes/automation-routes.js";
import accountsRouter from "./routes/accounts-routes.js";
import proxyRouter from "./routes/proxy-routes.js";
import { startUserOnlineJob } from "./cron/userStatusJob.js";
const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use("/api", farmRouter);
app.use("/api", animalRouter);
app.use("/api", fishRouter);
app.use("/api", userRouter);
app.use("/api", automationRouter);
app.use("/api", accountsRouter);
app.use("/api", proxyRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  startUserOnlineJob();
});
