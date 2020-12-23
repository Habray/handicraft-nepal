// as we have already make the endpoint for gettig products details while woking on EditProduct on admin pannel
// so we will use same endpoint to display single product in single-product view page

import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {

  // creating state for single product
  const [product, setProduct] = useState({});

  // state for reated product
  const [related, setRelated] = useState([]);

  // state for star value
  const [star, setStar] = useState(0);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  // destructure slug from match
  const { slug } = match.params;

  // useEffect reruns when slug is change
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if(product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );
    existingRatingObject && setStar(existingRatingObject.star)  // current user start
    }
  })

  // requesting backend to loading single products and saving it in setProduct state
  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // immidiately we request to load related and save it in setRelated state
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  // for star rating function
  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">

      {/* single product component section */}
      <div className="row pt-4">
        <SingleProduct 
          product={product}
          onStarClick={onStarClick}
          star={star} 
        />
      </div>

      {/* Related Products section */}

      {/* Related Product Title */}
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      {/* Related Product Items */}
      <div className="row pb-5">
        
        {/* check if related product is null or not */}
        {related.length ? (

          // if have some product, map through each product to show the product
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (

          // if null 
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
