// For crowding our catergories

import axios from 'axios';

export const createProduct = async (product, authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        }
    })


// requesting backend to get products we created by :count (see routes/product)
export const getProductsByCount = async (count) => 
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

// requesting backend to delete the created product with slug
export const removeProduct = async (slug, authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        }
    })


// requesting backend to get a single products with the help of slug
export const getProduct = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

// for updating a product
export const updateProduct = async (slug, product, authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        }
    })

// for sorted list product 
export const getProducts = async (sort, order, page) => 
    await axios.post(`${process.env.REACT_APP_API}/products`, {sort, order, page,})


// requesting backend to get total numbers of products
export const getProductsCount = async () => 
    await axios.get(`${process.env.REACT_APP_API}/products/total`)

// for star rating
export const productStar = async (productId, star, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/product/star/${productId}`,
        { star },
        {
        headers: {
            authtoken,
        },
    }
);

// for related product
export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);


// for searching filter based on text entered
export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
