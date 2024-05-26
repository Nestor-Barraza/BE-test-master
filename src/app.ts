import express, { Application } from "express";
import "colors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import { errorHandler } from "./middlewares/errors";
import bodyParser from "body-parser";
import * as path from "path";
import { corsMiddleware } from "./middlewares/cors";
import { createServer } from "http";
import { URL } from "url";

const app: Application = express();
const port = process.env.PORT ?? 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "utils", "templates")));
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(bodyParser.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = require("./utils/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

// Routes
RegisterRoutes(app);

app.get("/", (req, res) => {
  res.send("Server running");
});

const server = createServer(app);

server.listen(port, () => {
  const address = server.address();
  if (typeof address === "string" || address === null) {
    console.log(`Server listening on ${address}`.cyan);
  } else {
    const hostname = address.address === "::" ? "localhost" : address.address;
    const baseUrl = new URL(`http://${hostname}:${address.port}`).href;
    const swaggerUrl = `${baseUrl}api-docs`.bgBlue;
    console.log(`Server listening on port ${port}`.cyan);
    console.log(
      `Swagger documentation available at:`.bgGreen + ` ${swaggerUrl.white.underline}`
    );
  }
});