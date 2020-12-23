import React, {useEffect, useState} from 'react';
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from '../cards/ProductCard'
import LoadingCard from "../cards/LoadingCard";
import {Pagination} from 'antd'

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // for storing to count products, default value is set to 0
  const [productsCount, setProductsCount] = useState(0)

  // for storing the page no. and default page no. will be 1
  const [page, setPage] = useState(1)

  // we can have more than one useEffect. it will run in order from top to bottom 
  // useEffect Dependency array([]) : useEffect runs when component mounts so sometime we need useEffect to run after some setState
  // variable changes the value
  // here while using pagination we need to run useEffect code and request to backend and phase new list of products based on page no 
  // only after user clicks and value of state will be change
  useEffect(() => {
    loadAllProducts()
  }, [page])

  useEffect(() => {
    // from here we get the total products in our database
    getProductsCount()
    .then((res) => setProductsCount(res.data))
  }, [])

  const loadAllProducts = () => {
    setLoading(true)

    // we need to send {sort, order, limit} to backend
    getProducts('createdAt', 'desc', page)
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
      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
          <Pagination 
            current={page} 
            total={(productsCount / 3 * 10)} // base on this pagination page will be generated max pagination link shown will be 10
            onChange={(value) => setPage(value)} // when we have the pagination, page that user click will be shown
          />
        </nav>
      </div>
    </>
  )
}
  
  export default NewArrivals;