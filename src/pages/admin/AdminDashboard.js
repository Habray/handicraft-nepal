import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav'
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {

    // store orders
    const [orders, setOrders] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders();
    }, []);

    // load Orders in Admin Dashboard
    const loadOrders = () =>
        getOrders(user.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
        });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
        toast.success("Status updated");
        loadOrders();
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">

                {/* Admin Sidebar */}
                <div className="col-md-2">
                    <AdminNav />
                </div>

                {/* Main Section */}
                <div className="col-md-10">
                    <h4>Admin Dashboard</h4>
                    {/* {JSON.stringify(orders)} */}
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;