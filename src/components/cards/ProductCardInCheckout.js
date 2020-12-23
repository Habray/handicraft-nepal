import React from "react";
import ModalImage from "react-modal-image";
import defaultImage from '../../images/defaultImage.jpg'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {

  const colors = [
    'Black', 
    'Brown', 
    'Pink', 
    'White', 
    'Blue', 
    'Red', 
    'Orange', 
    'Gray', 
    'Yellow', 
    'Green', 
    'Purple',
  ];
  let dispatch = useDispatch();

  // Color Adjustment
  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {     // cart is a key in local storage
        cart = JSON.parse(localStorage.getItem("cart"));   // items saved in a local storage will be in JSON format 
      }
      
      // map thorugh cart to get product
      cart.map((product, i) => {
        if (product._id === p._id) {     // p._id = actal product we get in ProductCardInCheckout component. this is children component of Card page
          cart[i].color = e.target.value;   // get color of product and set it to new color choose by user
        }
      });

      //  console.log('cart udpate color', cart)
      // add to local storage 
      localStorage.setItem("cart", JSON.stringify(cart));
      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  // Quantity Adjustment
  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;   // prevent users from entering negative quanitity number

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);  // max quantity reached message
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));  // items saved in a local storage will be in JSON format
      }

      cart.map((product, i) => {
        if (product._id == p._id) {   // p._id = actal product we get in ProductCardInCheckout component. this is children component of Card page
          cart[i].count = count;  // asign the new quantity value of count to cart count property
        }
      });

      // add to local storage 
      localStorage.setItem("cart", JSON.stringify(cart));
      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  // Remove products
  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {   // while maping we get product and its index
        if (product._id === p._id) {
          cart.splice(i, 1);    // splice only that item where the index is found, so the 2nd argument is 1, meaning takeout only 1 item from list
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>

        {/* Image */}
        <td>
          <div style={{ width: "100px", height: "auto" }}>
              {p.images.length ? (
                <ModalImage small={p.images[0].url} large={p.images[0].url} /> // only showing first image from array
              ) : (
                <ModalImage small={defaultImage} large={defaultImage} />
              )}
          </div>
        </td>

        {/* title */}
        <td className="align-middle">{p.title}</td>

        {/* Price */}
        <td className="align-middle">Rs.{p.price}</td>

        {/* Brand */}
        <td className="align-middle">{p.brand}</td>

        {/* Color */}
        <td className="align-middle">
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>  // if there is existing color show that existing color
            ) : (
              <option>Select</option>                     // if not show the Select option
            )}
            {colors
              .filter((c) => c !== p.color)               // to prevent from repeating default color in color option
              .map((c) => (                               // map through each color to show all colors option
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>

        {/* Quantity */}
        <td className="text-center align-middle">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>

        {/* Shipping Icon */}
        <td className="text-center align-middle" style={{ fontSize: "18px" }}>
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>

        {/* Remove Icon */}
        <td className="text-center align-middle" style={{ fontSize: "15px" }}>
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
