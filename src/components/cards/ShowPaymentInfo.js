import React from "react";

const ShowPaymentInfo = ({ order, showStatus=true }) => (
  <div>
    <p>
      {/* Order Id */}
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}

      {/* Amount */}
      <span>
        Amount:{" "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}

      {/* Currency */}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}

      {/* Payment Method */}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}

      {/* Payment Result */}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}

      {/* Order Date and Time */}
      <span>
        Orderd on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}

      <br />
      {/* Order Status */}
      { showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
