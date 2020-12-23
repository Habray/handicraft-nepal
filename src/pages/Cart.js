import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {

  // destructure and access from redux state
  const { cart, user } = useSelector((state) => ({ ...state }));

  // to update redux we use dispatch
  const dispatch = useDispatch();

  // calculating total amount
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {    // reduce add set of two items in sequence until end 
      return currentValue + nextValue.count * nextValue.price;
    }, 0);  // initial value is set to 0
  };

  // payment with card
  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");  // if data is true then we will redirect user to checkout page
      })
      .catch((err) => console.log("cart save err", err));  // if error occur
  };

  // cash on delivery
  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    // update redux
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  // table of Products on Card
  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        {/* titles of column of table */}
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {/* table body */}
      {/* map through all the products in cart, one product one row of table */}
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">

        {/* Products Section */}

        {/* Title */}
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {/* checking card is empty or not */}
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>


        {/* Order Summary Section */}

        {/* Title */}
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />

          {/* List of Ordered Products  */}
          <p>Products</p>
          {/* get cart from redux state and map through all cart array */}
          {cart.map((c, i) => ( // c = cart, i = index
            <div key={i}>
              <p>
                {c.title} x {c.count} = Rs.{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />

          {/* Total Sum of Orderd Products */}
          Total: <b>Rs.{getTotal()}</b>
          <hr />

          {/* Checkout */}
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}   // diable cart is empty
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}   // diable cart is empty
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" }, // after login user will redirect to cart page i.e intented page Login->roleBasedRedirect->intended.from
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
