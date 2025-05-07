# GraphQL API for E-commerce Analytics

This project provides a GraphQL API for retrieving e-commerce analytics data including customer spending, top-selling products, and sales analytics.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (or connection to a MongoDB Atlas cluster)

## Setup Instructions

1. **Clone the repository**

   ```bash
    git clone git@github.com:amantyagi22/revenue-sales-analytics.git
    cd revenue-sales-analytics
   ```

2. Install dependencies

   ```bash
   yarn install
   # or
   npm install
   ```

3. Configure environment variables

   Rename .env.example to .env and it will work.

4. Start the server
   ```bash
   yarn start
   # or
   npm start
   ```

The server will start on http://localhost:4000

## Testing the API

### Using Ruru GraphQL IDE

The application comes with Ruru GraphQL IDE built-in. Simply visit http://localhost:4000 in your browser to access the interactive GraphQL playground.

I've created a file by the name of `queries.graphql` which contains all the sample queries.

### Folder Structure

```bash
revenue-sales-analytics/
├── src/
│   ├── api/
│   │   ├── graphql/
│   │   │   ├── resolvers.js
│   │   │   ├── schema.js
│   │   │   └── types.js
│   │   └── routes/
│   │       └── graphqlRouter.js
│   ├── config/
│   │   └── database.js
│   ├── constants/
│   │   └── aggregations.js
│   ├── db/
│   │   ├── models/
│   │       └── orders.js
│   ├── services/
│   │   └── index.js
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── queries.graphql
├── yarn.lock
└── server.js
```
