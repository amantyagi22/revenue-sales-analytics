import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "../graphql/schema.js";
import rootResolver from "../graphql/resolvers.js";

const router = express.Router();

// Create GraphQL handler with schema and resolvers
const graphqlHandler = createHandler({
  schema: schema,
  rootValue: rootResolver,
});

// Mount the GraphQL handler
router.use("/", graphqlHandler);

export default router;
