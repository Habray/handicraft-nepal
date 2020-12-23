import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {

  // destructure
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">

      {/* Price section */}
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          Rs. {price}
        </span>
      </li>

      {/* Category section */}
      {/* we have populate the category in controllers/product so that we can have data here */}
      {category && (
        <li className="list-group-item">
          Category{" "}
          {/* to go to category pages as filter to show all the category products with has same category name */}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {/* Subcategories section */}
      {/* we have populate the subcategory in controllers/product so that we can have data here */}
      {subs && (
        <li className="list-group-item">
          Sub Categories
          {/* mapping to all Subcategories to show all */}
          {subs.map((s) => (
            // to go to subscategory pages as filter to show all the subscategory products with has same Subcategory name
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      {/* Shipping available section */}
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      {/* Color section */}
      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      {/* Brand section */}
      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      {/* Available Product section */}
      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      {/* Number of Sold section */}
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
