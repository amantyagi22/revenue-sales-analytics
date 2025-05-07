import Orders from "../db/models/orders.js";
import * as PIPELINES from "../constants/aggregations.js";

export async function getCustomerSpending(customerId) {
  const results = await Orders.aggregate(
    PIPELINES.CUSTOMER_SPENDING_AGGREGATION(customerId),
  );
  return results[0] || null;
}

export async function getTopSellingProducts(limit) {
  return await Orders.aggregate(
    PIPELINES.TOP_SELLING_PRODUCTS_AGGREGATION(limit),
  );
}

export async function getCategoryBreakdown(startDate, endDate) {
  return await Orders.aggregate(
    PIPELINES.CATEGORY_BREAKDOWN_AGGREGATION(startDate, endDate),
  );
}

export async function getOverallAnalytics(startDate, endDate) {
  const results = await Orders.aggregate(
    PIPELINES.OVERALL_ANALYTICS_AGGREGATION(startDate, endDate),
  );
  return results[0] || { totalRevenue: 0, completedOrders: 0 };
}
