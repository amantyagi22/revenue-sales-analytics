import dotenv from "dotenv";
import app from "./src/app.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`,
  );
});
