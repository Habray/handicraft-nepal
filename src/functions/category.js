// For crowding our catergories

import axios from 'axios';

// requesting backend to get all categoies we created
export const getCategories = async () => 
    await axios.get(`${process.env.REACT_APP_API}/categories`)

// requesting backend to get only one (in value in slug) category
export const getCategory = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

// requesting backend to remove one (in value in slug) category
// we define 2nd argument because we need to verify the user
export const removeCategory = async (slug, authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken,
        }
    })

// requesting backend to remove one (in value in slug) category
// we define 2nd argument updated category
export const updateCategory = async (slug, category, authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers: {
            authtoken,
        }
    })

export const createCategory = async (category, authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: {
            authtoken,
        }
    })

// for get the subcategory from category
export const getCategorySubs = async (_id) => 
await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`)