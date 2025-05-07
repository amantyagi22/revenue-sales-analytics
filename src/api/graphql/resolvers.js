import * as services from "../../services/index.js";

const resolvers = {
  // Health check resolver
  healthCheck: () => "OK",

  // Customer data resolver
  getCustomerSpending: async ({ customerId }) => {
    return await services.getCustomerSpending(customerId);
  },

  // Product data resolver
  getTopSellingProducts: async ({ limit }) => {
    return await services.getTopSellingProducts(limit);
  },

  // Analytics data resolver
  getSalesAnalytics: async ({ startDate, endDate }) => {
    const [overallAnalytics, categoryBreakdown] = await Promise.all([
      services.getOverallAnalytics(startDate, endDate),
      services.getCategoryBreakdown(startDate, endDate),
    ]);

    return {
      totalRevenue: overallAnalytics.totalRevenue,
      completedOrders: overallAnalytics.completedOrders,
      categoryBreakdown,
    };
  },
};

export default resolvers;
