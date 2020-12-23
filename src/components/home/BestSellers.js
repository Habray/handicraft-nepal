import React, {useEffect, useState} from 'react';
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from '../cards/ProductCard'
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  // after the page no is update this code will rerun
  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true)

    // we need to send {sort, order, page} to backend
    getProducts('sold', 'desc', page)
    .then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  return (
    <>
    <div className="container">
        
        {/* we use loadingcard to make more fancy looking while loading our card */}
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">

            {/* mapping through each product and show it as card */}
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* implemeting pagination */}
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  )
}
  
  export default BestSellers;