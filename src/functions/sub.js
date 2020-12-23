// For crowding our subCategory

import axios from 'axios';

// requesting backend to get all subCategory we created
export const getSubs = async () => 
    await axios.get(`${process.env.REACT_APP_API}/subs`)

// requesting backend to get only one (in value in slug) category
export const getSub = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

// requesting backend to remove one (in value in slug) subCategory
// we define 2nd argument because we need to verify the user
export const removeSub = async (slug, authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken,
        }
    })

// requesting backend to remove one (in value in slug) subCategory
// we define 2nd argument updated subCategory
export const updateSub = async (slug, sub, authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken,
        }
    })

export const createSub = async (sub, authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken,
        }
    })