import { buildSchema } from "graphql";
import { types } from "./types.js";

// Combine all type definitions
const typeDefs = `
  scalar Date

  ${types}

  type Query {
    healthCheck: String
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
  }
`;

// Build and export the schema
const schema = buildSchema(typeDefs);

export default schema;
