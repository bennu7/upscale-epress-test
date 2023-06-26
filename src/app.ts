import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

import DB from "./config/db.config";
import Routers from "./routes";
import ErrorMiddleware from "./middleware/error.middleware";
import NotFoundMiddleware from "./middleware/notFound.middleware";

const { PORT } = process.env;
const registerRoute = new Routers();
const app = express();
dotenv.config();
DB.connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(registerRoute.router);
app.use(ErrorMiddleware);
app.use(NotFoundMiddleware);

app.listen(PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
