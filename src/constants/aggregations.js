export function CUSTOMER_SPENDING_AGGREGATION(customerId) {
  return [
    {
      $match: {
        customerId: customerId,
      },
    },
    {
      $group: {
        _id: "$customerId",
        totalSpent: {
          $sum: "$totalAmount",
        },
        averageOrderValue: {
          $avg: "$totalAmount",
        },
        lastOrderDate: {
          $max: "$orderDate",
        },
      },
    },
    {
      $project: {
        _id: 0,
        customerId: "$_id",
        totalSpent: 1,
        averageOrderValue: 1,
        lastOrderDate: 1,
      },
    },
  ];
}

export function TOP_SELLING_PRODUCTS_AGGREGATION(limit) {
  return [
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.productId",
        totalSold: {
          $sum: "$products.quantity",
        },
      },
    },
    {
      $sort: {
        totalSold: -1,
      },
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        totalSold: 1,
        name: {
          $arrayElemAt: ["$productDetails.name", 0],
        },
      },
    },
  ];
}

export function CATEGORY_BREAKDOWN_AGGREGATION(startDate, endDate) {
  return [
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        status: "completed",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$productDetails.category",
        revenue: {
          $sum: {
            $multiply: ["$products.quantity", "$products.priceAtPurchase"],
          },
        },
      },
    },
    {
      $project: {
        category: "$_id",
        revenue: 1,
        _id: 0,
      },
    },
  ];
}

export function OVERALL_ANALYTICS_AGGREGATION(startDate, endDate) {
  return [
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        status: "completed",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        completedOrders: { $sum: 1 },
      },
    },
  ];
}
export function SALES_ANALYTICS_AGGREGATION(startDate, endDate) {
  return [
    {
      $match: {
        // orderDate: {
        //   $gte: new Date(startDate),
        //   $lte: new Date(endDate),
        // },
        status: "completed",
      },
    },
    {
      $facet: {
        categoryBreakdown: [
          {
            $unwind: "$products",
          },
          {
            $lookup: {
              from: "products",
              localField: "products.productId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $unwind: "$productDetails",
          },
          {
            $group: {
              _id: "$productDetails.category",
              revenue: {
                $sum: {
                  $multiply: [
                    "$products.quantity",
                    "$products.priceAtPurchase",
                  ],
                },
              },
            },
          },
          {
            $project: {
              category: "$_id",
              revenue: 1,
              _id: 0,
              totalOrders: 1,
            },
          },
        ],
        overallAnalytics: [
          {
            $group: {
              _id: null,
              total: {
                $sum: "$totalAmount",
              },
              completed: {
                $sum: 1,
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        categoryBreakdown: 1,
        totalRevenue: {
          $arrayElemAt: ["$overallAnalytics.total", 0],
        },
        completedOrders: {
          $arrayElemAt: ["$overallAnalytics.completed", 0],
        },
      },
    },
  ];
}
