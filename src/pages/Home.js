import React from 'react';
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>

    {/* Main holding board with titles */}
    <div className="jumbotron text-danger h1 font-weight-bold text-center">

      {/* passing 3 text as props to Jumbotron*/}
      <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
    </div>
    
    {/* Sub title: New Arrivals */}
    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      New Arrivals
    </h4>

    {/* New Arrivals Components */}
    <NewArrivals />

    {/* Sub title: Best Sellers */}
    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      Best Sellers
    </h4>

    {/* Best Sellers Components */}
    <BestSellers />

    {/* Categories List */}
    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

    {/* Subcategories List */}
    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
      Sub Categories
    </h4>
    <SubList />

    <br/>
    <br/>
    </>
  )
}
  
  export default Home;
  