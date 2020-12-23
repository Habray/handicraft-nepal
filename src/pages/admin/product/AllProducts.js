import React, {useEffect, useState} from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    // redux
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadAllProducts();
      }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
            setProducts(res.data);
            setLoading(false);
            })
            .catch((err) => {
            setLoading(false);
            console.log(err);
            });
    };

    // when have edit and delele icons in cards/AdminProductCard.js file but we need to pass the method from parent component
    // we don't directly import function in cards/AdminProductCard because when we delete a product we need to update a state
    // whereas state come from parent component. when action is done in children component parent component won't notice it 
    // hence our program won't work
    const handleRemove = (slug) => {
        
        // for checking delele conformation with window pop up feature
        let answer = window.confirm('Are you Sure want to DELETE?')
        if (answer) {
            // console.log('Send Delete Request', slug)
            // this slug we are sending back to backend as request to delete
            removeProduct(slug, user.token)
            .then((res) => {
                loadAllProducts()
                toast.error(`${res.data.title} is DELETED`)
            })
            .catch((err) => {
                if(err.response.status === 400) toast.error(err.response.data)
                console.log(err)
            })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                <AdminNav />
                </div>

                <div className="col">
                {loading ? (
                    <h4 className="text-danger">Loading...</h4>
                ) : (
                    <h4>All Products</h4>
                )}

                {/* map for each products */}
                <div className="row">
                    {products.map((product) => (
                    <div key={product._id} className="col-md-4 pb-3">
                        <AdminProductCard 
                          product={product} 
                          handleRemove={handleRemove}
                        />
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts;