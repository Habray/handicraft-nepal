import React, { useState } from 'react'
import { Card, Tooltip } from "antd";
import defaultImage from '../../images/defaultImage.jpg'
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash"; // we can also write import lodash from 'lodash'
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({product}) => {

    // storing tooltip value
    const [tooltip, setTooltip] = useState("Click to add");

    // redux
    // destructure user and cart
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    // we will store add to cart product in local storage
    const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {   // cart is a key in local storage
                cart = JSON.parse(localStorage.getItem("cart"));  // items saved in a local storage will be in JSON format 
            }
            // push new product to cart
            cart.push({
                ...product,  // we spreate out all the properties of product object
                count: 1,  // then we add one property called count on product object
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);  // using lodash
            
            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
                setTooltip("Added");

            // add to reeux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });

            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
      };

    // destructure
    const { images, title, description, slug, price } = product;

    return (
        <>

        {/* for showing average star ratings */}
        {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        
        {/* Card contains product image and details component */}
        <Card

            // this is for showing Image
            cover={
                <img
                    // if we have imgae then it will be shown if no image is found defaultImage will be shown
                    src={images && images.length ? images[0].url : defaultImage}
                    style={{ height: "300px", objectFit: "contain" }}
                    className="p-1"
                />
            }

            // for View and Add to cart sections
            actions={[

                // whenever user click on the View icon he/she will be redirect to this link
                <Link to={`/product/${slug}`}>
                    <EyeOutlined className="text-success" /> <br /> View Product
                </Link>,

                // Add to card 
                // Tooltip for indicating product is "added" when mouse is hover
                <Tooltip title={tooltip}> 
                    <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                        <ShoppingCartOutlined className="text-danger" /> <br />
                        {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                    </a>
                </Tooltip>,
            ]}
            >
    
            {/* for title and descriptions */}
            {/* we use substing so that our all description will not be shown but only 40 letter from beginning */}
            <Meta
                title={`${title} - Rs.${price}`}
                description={`${description && description.substring(0, 40)}...`}
            />
            
        </Card>

        </>
    )
}


export default ProductCard