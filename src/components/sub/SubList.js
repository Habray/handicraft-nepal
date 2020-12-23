import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {

  // state to store all the subcategories from backend
  const [subs, setSubs] = useState([]);

  // for showing loading screen
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // requesting endpoint to get subcategories and populate on setSubs state
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>

    // map through all the subcategories in database
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        {/* redirect each of them in there own named page */}
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (

    // display subcategories list section
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
