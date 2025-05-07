import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
  _id: String,
  customerId: String,
  totalAmount: Number,
  orderDate: Date,
  status: String,
  products: [
    {
      productId: String,
      quantity: Number,
      priceAtPurchase: Number,
    },
  ],
});

ordersSchema.index({ customerId: 1 });
ordersSchema.index({ status: 1, orderDate: 1 });

const Orders = model("order", ordersSchema);

export default Orders;
