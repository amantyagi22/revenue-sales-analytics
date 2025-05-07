export const types = `
  type CustomerSpending {
    customerId: ID!
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: Date!
  }
  type TopProduct {
    productId: ID!
    name: String!
    totalSold: Int!
  }
  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    categoryBreakdown: [CategoryBreakdown!]!
  }
  
  type CategoryBreakdown {
    category: String!
    revenue: Float!
  }
`;
