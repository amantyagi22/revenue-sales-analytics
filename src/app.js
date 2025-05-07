import express from "express";
import { ruruHTML } from "ruru/server";
import { connectToDatabase } from "./config/database.js";
import graphqlRouter from "./api/routes/graphqlRouter.js";

// Initialize database connection
connectToDatabase();

// Create Express application
const app = express();

// GraphQL UI using Ruru
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Mount GraphQL router
app.use("/graphql", graphqlRouter);
export default app;
