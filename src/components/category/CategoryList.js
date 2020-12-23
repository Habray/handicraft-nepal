import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {

  // state to store all the categories from backend
  const [categories, setCategories] = useState([]);

  // for showing loading screen
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // requesting endpoint to get categories and populate on setCategoreies state
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>

    // map through all the categories in database
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3" // using button classname make it looks like button
      >
        {/* redirect each of them in there own named page */}
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (

    // display categories list section
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
