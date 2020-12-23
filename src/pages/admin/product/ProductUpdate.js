import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getProduct, updateProduct} from '../../../functions/product'
import {getCategories, getCategorySubs} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState = {
    // for testing we are filling up the form here
    title: '',
    description: '',
    price: '',
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

const ProductUpdate = ({match, history}) => {

    // state 
    const [values, setValues] = useState(initialState)
    // state for subcategories
    const [subOptions, setSubOptions] = useState([])

    // state for categories
    const [categories, setCategories] = useState([])

    // for holding new id's value
    const [arrayOfSubs, setArrayOfSubs] = useState([])

    // for holiding the new subcategory value
    const [selectedCategory, setSelectedCategory] = useState('')

    // for loading screen
    const [loading, setLoading] = useState(false)

    // redux for geting user token
    const {user} = useSelector((state) => ({...state}))

    // router
    const {slug} = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    // for loading product title, description, price, shipping, color, brand, quantity in state
    const loadProduct = () => {
        getProduct(slug)
        .then((p) => {
            // console.log("Single Product", p)
            
            // step 1: load single product
            // populate the values in initstate with sperated operator
            setValues({...values, ...p.data})

            // step 2: load single product category subs
            getCategorySubs(p.data.category._id)
            .then((res) => {
                setSubOptions(res.data)  // on first load, show default subs
            })

            // step 3: prepare array of sub ids to show as default sb values in antd Select
            let arr = []
            // we map thourgh all the subcategories and push each of there id's to arrry (arr)
            p.data.subs.map((s) => {
                arr.push(s._id)
            })
            console.log('ARR', arr)
            // assiging new ids value in state to replace the previous values
            setArrayOfSubs((prev) => arr) // required for ant design select to work
        })
    }

    // for loading category in state
    const loadCategories = () => getCategories().then((c) => setCategories(c.data))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        // send all the values in state to backend
        // keep in mind: subcategories and categories are not inside the value
        values.subs = arrayOfSubs

        // check admin make change or not in category if change update if not value will be existing value
        values.category = selectedCategory ? selectedCategory : values.category

        // submitting values to backend, structure routes/product
        updateProduct(slug, values, user.token)
        .then((res) => {
            setLoading(false)
            toast.success(`"${res.data.title}" is UPDATED`)

            // redirect user to the products page. if they change the slug and the url update that page won't be found 
            // for safe landing
            history.push('/admin/products')
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
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

    // whenever user picks the category, sub categories will be shown
    const handleCategoryChange = (e) => {
        e.preventDefault()

        // based on this changes value we are going to request backend for category
        console.log('CLICKED CATEGORY', e.target.value)
        setValues({...values, subs: []})

        // for saving the values of newly selected option seperatly so that we can have the old values when admin click back the 
        // the same catergory again
        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value)
        .then(res => {
            // this category contains all of it's sub categories
            // so that we put it in state 
            console.log('SUBCATEGORIES ON CATGORY CLICK', res)
            setSubOptions(res.data)
        })

        // as the subcategory field is pre pouplated and if admin change the categroy it won't reset the value of subcategorey field
        // if admin click the back original category as pervious we want to prepopulate with default sub category rather than just blank
        if(values.category._id === e.target.value) {
            loadProduct()
        }

        // to reset the subcaterogry field
        setArrayOfSubs([])
    }

    return (
        <div className= 'container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>

                <div className='col-md-10'>
                    {loading ? <LoadingOutlined className='text-danger h1'/> : <h4>Product Update</h4>}
                    
                    {/* {JSON.stringify(values)} */}

                    <div className='p-3'>
                        <FileUpload 
                          values={values} 
                          setValues={setValues} 
                          setLoading={setLoading} 
                        />
                    </div>

                    <ProductUpdateForm 
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                         // instead of passing destructure value, we pass values which consist of all value
                        // and we will destructure in ProductCreateForm
                        values={values}
                        // because we cannot use name inside the antdesign Select
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs} // for sending values in backend of subcategories
                        selectedCategory={selectedCategory}
                    />
                    <hr/>
                    
                </div>
            </div>
        </div>
    )
}      

export default ProductUpdate