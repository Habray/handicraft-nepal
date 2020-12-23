import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {getCategories, getCategorySubs} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'

const initialState = {
    // for testing we are filling up the form here
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    quantity: '',
    images: [],
    shipping: '',
    colors: [
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
    ], // these are for options
    color: '', // this will store the vlaue enter by users
    brands: [
        'Nepali', 
        'Homemade', 
        'Indian', 
        'Chinese',
    ],
    brand: '', // this will store the vlaue enter by users
}

const ProductCreate = () => {

    const [values, setValues] = useState(initialState)

    // For holding subCategories in Category
    const [subOptions, setSubOptions] = useState([])

    // hiding the SubCategories Option before selecting Category
    const [showSub, setShowSub] = useState(false)

    // for loading screen
    const [loading, setLoading] = useState(false)

    // redux for geting user token
    const {user} = useSelector((state) => ({...state}))

    // this function will load all the categoies and will be available in a state
    const loadCategories = () => getCategories().then((c) => setValues({...values, categories: c.data}))

    // when the component mounts it will load all the categories
    useEffect(() => {
        loadCategories()
    }, [])

    // This will be used to send the product back into cart
    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
        .then(res => {
            console.log(res)
            
            // Alert window we use window instead of toast here 
            // because we need reload page with which toast will disappear and will not be seen
            window.alert(`"${res.data.title}" is CREATED`)
            // Page will reload so that input fields will be empty
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
            // if(err.response.status === 400) toast.error(err.response.data)

            // grabing the error message here from back-end
            toast.error(err.response.data.err)
        })
    }

    const handleChange = (e) => {
        // we'll grab the even target name so its input will have the name with target name 
        // so that we'll dynamically know how where input is coming from and then save value in state
        // ... (3 dots) will spreads out all the value in setValues state so that we can update each of them
        setValues({...values, [e.target.name]: e.target.value})
        // console.log(e.target.name, '------', e.target.value)
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()

        // based on this changes value we are going to request backend for category
        console.log('CLICKED CATEGORY', e.target.value)
        setValues({...values, subs: [], category: e.target.value})
        getCategorySubs(e.target.value)
        .then(res => {
            // this category contains all of it's sub categories
            // so that we put it in state 
            console.log('SUBCATEGORIES ON CATGORY CLICK', res)
            setSubOptions(res.data)
        })
        setShowSub(true)
    }

    return (
        <div className= 'container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>

                <div className='col-md-10'>
                    {loading ? <LoadingOutlined className='text-danger h1'/> : <h4>Product Create</h4>}
                    
                    <hr/>

                    {/* {JSON.stringify(values.images)} */}
                    
                    <div className='p-3'>
                        <FileUpload 
                          values={values} 
                          setValues={setValues} 
                          setLoading={setLoading} 
                        />
                    </div>

                    <ProductCreateForm 
                      handleSubmit={handleSubmit} 
                      handleChange={handleChange} 

                      // instead of passing destructure value, we pass values which consist of all value
                      // and we will destructure in ProductCreateForm
                      values={values}

                      // because we cannot use name inside the antdesign Select
                      setValues={setValues}

                      handleCategoryChange = {handleCategoryChange}
                      subOptions = {subOptions}
                      showSub = {showSub}
                    />
                    
                </div>
            </div>
        </div>
    )
}      

export default ProductCreate