import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {

  // Orders Table for Each Products
  const showOrderInTable = (order) => (
    <table className="table table-bordered">

      {/* Table Heading */}
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      {/* Table Contains */}
      <tbody>
        {/* map thought each products in orders */}
        {order.products.map((p, i) => (
            <tr key={i}>
                
                {/* Title */}
                <td>
                <b>{p.product.title}</b>
                </td>

                {/* Price */}
                <td>Rs. {p.product.price}</td>

                {/* Brand */}
                <td>{p.product.brand}</td>

                {/* Color */}
                <td>{p.color}</td>

                {/* Quantity */}
                <td>{p.count}</td>

                {/* Total */}
                <td>{order.paymentIntent.amount}</td>

                {/* Shipping */}
                <td>
                {p.product.shipping === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                )}
                </td>
            </tr>
        ))}
      </tbody>
    </table>
  );

  return (
  <>
    {/* map through each order */}
    {orders.map((order) => (
      <div key={order._id} className="row pb-5">
        <div className="btn btn-block bg-light">

          {/* showing order details */}
          <ShowPaymentInfo order={order} showStatus={false} />

          {/* Delivery Status Table */}
          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-8">
              <select
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
                name="status"
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        {showOrderInTable(order)}
      </div>
    ))}
  </>)
};

export default Orders;
