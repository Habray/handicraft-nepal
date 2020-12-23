import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Wishlist = () => {

    // store wishlist product
    const [wishlist, setWishlist] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadWishlist();
    }, []);

    // load wishlist
    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
    });

    // remove wishlist
    const handleRemove = (productId) =>
        removeWishlist(productId, user.token).then((res) => {
            toast.error('Removed from Wishlist');
            loadWishlist();
    });

    return (
        <div className="container-fluid">
            <div className="row">
                {/* User Sidebar */}
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">

                    {/* Title */}
                    <h4>Wishlist</h4>

                    {/* Wishlist Products List */}
                    {wishlist.map((p) => (
                        <div key={p._id} className="alert alert-secondary">
                            
                            {/* redirect to wishlisted product page */}
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>

                            {/* remove wishlist */}
                            <span
                                onClick={() => handleRemove(p._id)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
