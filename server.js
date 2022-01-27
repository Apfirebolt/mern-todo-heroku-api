import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error-handler.js";

// import routes
import authRoutes from "./routes/auth-routes.js";
import toDoRoutes from "./routes/todo-routes.js";

dotenv.config();

connectDB();

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1", // YOU NEED THIS
    info: {
      title: "MERN Heroku Boilerplate",
      description: "This is a simple ready to deploy MERN app on Heroku",
      contact: {
        name: "Apfirebolt",
        email: "aspper20@gmail.com",
      },
      tags: [
        {
          name: "users",
          description: "Users API",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: ["http://localhost:5000/"],
    },
  },
  apis: ["./routes/auth-routes.js", "./routes/todo-routes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/todos", toDoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
