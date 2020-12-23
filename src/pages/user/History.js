import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {

    // store user orders
    const [orders, setOrders] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
    }, []);

    // user orders
    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
    });
    
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

    // Invoice PDF download
    const showDownloadLink = (order) => (
    <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="Handicraft-Nepal-Invoice.pdf"
        className="btn btn-sm btn-block btn-outline-primary"
    >
        Download PDF
    </PDFDownloadLink>
    );

    // Each Order
    const showEachOrders = () =>
        // map through each order with index
        orders.reverse().map((order, i) => ( // reverse will list the latest one at top
        <div key={i} className="m-5 p-3 card">

            {/* payment info */}
            <ShowPaymentInfo order={order} />

            {/* Orders Table */}
            {showOrderInTable(order)}

            {/* Download Oders in PDF */}
            <div className="row">
                <div className="col">
                    {showDownloadLink(order)}
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container-fluid">
        <div className="row">

            {/* Sidebar Section */}
            <div className="col-md-2">
            <UserNav />
            </div>
            
            {/* Main Section */}
            {/* Title */}
            <div className="col text-center">
                <h4>
                    {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
                </h4>

                {/* Order Details */}
                {showEachOrders()}
            </div>
        </div>
        </div>
    );
}
export default History;