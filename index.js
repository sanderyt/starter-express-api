const { errorHandler, errorConverter } = require("./middlewares/error");
const { jwtStrategy } = require("./config/passport");
const ApiError = require("./utils/ApiError");
const app = require("express")();
const bodyParser = require("express").json;
const cors = require("cors");
const httpStatus = require("http-status");
const passport = require("passport");
const routes = require("./routes");
const sequelize = require("./config/sequelize");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync();

// PORT fallback ✅
const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.log(`⚡⚡⚡ API is running on http://localhost:${port}`);
});

app.use(cors());

app.use(bodyParser());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", async (req, res) => {
  res.status(200).send("⚡⚡⚡ Welcome to Node.js (Express) API");
});

// v1 api routes
app.use("/api/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);
app.use(errorConverter);

module.exports = app;
