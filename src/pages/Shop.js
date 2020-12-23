import React, { useState, useEffect } from "react";
import { 
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import { 
  DollarOutlined, 
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";

// destructure SubMenu
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {

  // to storing proudcts
  const [products, setProducts] = useState([]);

  // for loading
  const [loading, setLoading] = useState(false);

  // for storing price
  const [price, setPrice] = useState([0, 0]);

  // for storing true, false to send request to server preventing from too many request
  const [ok, setOk] = useState(false);

  // storing product categories
  const [categories, setCategories] = useState([]);

  // storing product category Id when checkbox is clicked
  const [categoryIds, setCategoryIds] = useState([]);

  // storing star values 
  const [star, setStar] = useState("");

  // storing sub categories 
  const [subs, setSubs] = useState([]);

  // storing subcategories
  const [sub, setSub] = useState("");

  // brands state
  const [brands, setBrands] = useState([
    'Nepali', 
    'Homemade', 
    'Indian', 
    'Chinese',
  ]);
  // storing band
  const [brand, setBrand] = useState("");

  // colors state
  const [colors, setColors] = useState([
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
  ]);
  // storing colors
  const [color, setColor] = useState("");
  
  // storing shipping
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  // destructure search
  let { search } = useSelector((state) => ({ ...state }));

  // for storing search text
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    // when user land on this page by default meaning without searching we want to req backend to show 12 random products
    getProductsByCount(12).then((p) => {
      // storing response data to state
      setProducts(p.data);
      // to stop loading screen
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    // each time user type in search field it will request to backend hence there will be too many request
    // to prevent that from happening we use delay approach to delay the request to backend for some fraction of time
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });     // format as backend controllers/product under searchFilters
      if (!text) {
        loadAllProducts();  // even there is not text load the products
      }
    }, 300);     // set time to 300 mili seconds
    return () => clearTimeout(delayed);
  }, [text]); // text as dependency so that useEffect will run each time text changes

  const fetchProducts = (arg) => {
    // requesting backend to show result based on argument user entered
    fetchProductsByFilter(arg).then((res) => {
      // storing response data to state
      setProducts(res.data);
    });
  };

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });     // format as backend controllers/product under searchFilters
  }, [ok]); // when ok becomes true then code here will be execuated

  const handleSlider = (value) => {
    dispatch({   // use to update the redux state
      type: "SEARCH_QUERY",
      payload: { text: "" },   // empty because we are filtering with price
    });
    setPrice(value);   // using value here will clear the search text query if any and req backend to filter with price range
    setTimeout(() => {    // limiting from making too many request to backend
      setOk(!ok);      // tuggle value from false to true or true to false
    }, 300);     // set time to 300 mili seconds
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    // map through all categories list
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}  // checking categories id in state must include give category id 
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // resetting the value of search and the perivous price range to zero when user check mark the categories
    dispatch({                  // use to update the redux state
      type: "SEARCH_QUERY",
      payload: { text: "" },    // empty because we are filtering with category
    });
    setPrice([0, 0]);           // reset price
    // console.log(e.target.value);
    
    // to store all the categories Ids in the state
    let inTheState = [...categoryIds];
    // for storing user check and uncheck value
    let justChecked = e.target.value;
    // for checking if user check is in state or not
    let foundInTheState = inTheState.indexOf(justChecked); // this will return index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      // if not found push to justChecked state
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    // fetch Proudcts which ids are in the state 
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({                // use to update the redux state
      type: "SEARCH_QUERY",
      payload: { text: "" },  // empty because we are filtering with stars
    });
    setPrice([0, 0]);         // reset price
    setCategoryIds([]);       // reset categories
    setStar(num);             // for showing starts
    fetchProducts({ stars: num });     // request products to backend based on average stars rating
  };
  // showing number of stars
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    // map though all sub categories and show each of there names
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({                  // reset state
      type: "SEARCH_QUERY",     
      payload: { text: "" },    // reset text state
    });
    setPrice([0, 0]);           // reset price state
    setCategoryIds([]);         // reset category state
    setStar("");                // reset star state
    fetchProducts({ sub });     // request to backend for all the sub categories
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR SECTION */}

        {/* Title of Sidebar */}
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          {/* Menus Components */}
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} mode="inline"> 

            {/* Price Section */}
            {/* Title */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              {/* Price Slider */}
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `Rs. ${v}`} // value will Currency type
                  range
                  value={price}
                  onChange={handleSlider}
                  max="50000" // Max Price
                />
              </div>
            </SubMenu>

            {/* Category Section */}
            {/* Title */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              {/* list of categories */}
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* Stars Section */}
            {/* Title */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              {/* list of stars */}
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* Subcategory Section */}
            {/* Title */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              {/* list of all sub categoires */}
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* Brands Section */}
            {/* Title */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              {/* list of all brands */}
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            {/* Colors Section */}
            {/* Title */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              {/* list of all colors */}
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* Shipping Section */}
            {/* Title */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              {/* list of all shipping */}
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>

          </Menu>
        </div>


        {/* MAIN SECTION */}

        {/* title of the page */}
        <div className="col-md-9 pt-2">
          {loading ? (
            <h3 className="text-danger">Loading...</h3>
          ) : (
            <h3 className="text-danger">Products</h3>
          )}

          {/* showing products result */}

          {/* if not result found */}
          {products.length < 1 && <p>No products found</p>}

          {/* loop through products and so the products */}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
