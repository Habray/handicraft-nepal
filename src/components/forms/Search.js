import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {

  // for dispatch action with action type
  const dispatch = useDispatch();

  // for redux store destructure search from state
  const { search } = useSelector((state) => ({ ...state }));

  // destructure text from search (check: reducers/searchReducer)
  const { text } = search;

  // used when we have to redirect to the shop page after search entered
  const history = useHistory();

  const handleChange = (e) => {
    // track user input in search bar and push to redux store with dispatch
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value }, // format as reducers/searchReducer
    });
  };

  const handleSubmit = (e) => {
    // prevent page from reloading
    e.preventDefault();
    // redirecting user to shop page as we are showing result there
    history.push(`/shop?${text}`);
  };

  return (

    // search bar in nav bar
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
      />

      {/* search icon */}
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
