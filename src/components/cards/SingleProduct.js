import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import defaultImage from '../../images/defaultImage.jpg'
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import {showAverage} from '../../functions/rating'
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {

  // storing tooltip value
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  // destructure user and cart
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // router
  let history = useHistory();

  // destructure
  const { title, images, description, _id } = product;

  // we will store add to cart product in local storage
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {   // cart is a key in local storage
        cart = JSON.parse(localStorage.getItem("cart"));     // items saved in a local storage will be in JSON format 
      }
      // push new product to cart
      cart.push({
        ...product,  // we spreate out all the properties of product object
        count: 1,    // then we add one property called count on product object
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);   // using lodash
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
    }
  }

  // wishlist
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      
      {/* Product Image View section */}
      <div className="col-md-7">

        {/* implementing carousel for images */}
        {/* check if product got image or not if not show default */}
        {images && images.length ? 
              (<Carousel showArrows={true} autoPlay infiniteLoop>
                {/* map through each images and display each image with its respective url */}
                {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
              </Carousel> 
             ) : ( 
               // showing defaultImage
              <Card>
                  <img
                      src={defaultImage}
                      className='mb-3 card-image'
                  />
              </Card> )
        }

        {/* Product Description and other more tabs */}
        <Tabs type="card">

          {/* contains of Description Tab */}
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>

          {/* contains of More Tab */}
          <TabPane tab="More" key="2">
            Learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      {/* Product Details section */}
      <div className="col-md-5">

        {/* Product Title */}
        <h1 className="bg-info p-3">{title}</h1>

        {/* Showing start rating */}
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div className="text-center pt-1 pb-3">No rating yet</div>}

        {/* Button to Add to cart and Add to wishlist */}
        <Card
          actions={[

            // added to cart
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" /> <br />
                {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
              </a>
            </Tooltip>,

            // wishlist
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,

            // Rating
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >

          {/* details of prodcut */}
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
