import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory, getCategories, removeCategory} from '../../../functions/category'
import { Link } from 'react-router-dom';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {

    // destructure object state to get the user and usertoken down below
    const {user} = useSelector(state => ({...state}))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    // once we get all the catogries we can populate in the state
    const [categoies, setCategories] = useState([])

    // Search Filter Step 1
    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        loadCategories()
    }, [])

    // this function will load all the categoies and will be available in a state
    const loadCategories = () => getCategories().then(c => setCategories(c.data))

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(name)
        setLoading(true)
        createCategory({name: name}, user.token)
        .then( res => {
            // console.log(res)
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)

            // auto load the categories so we don't have to reload the page every time
            loadCategories()
        })
        .catch(err => {
            // console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async(slug) => {
        // let answer = (window.confirm('Are sure want to Delete?'))
        // console.log(answer, slug)

        if(window.confirm('Are sure want to Delete?')){
            setLoading(true)
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.error(`${res.data.name} deleted`)
                // auto load the categories so we don't have to reload the page every time
                loadCategories()
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setLoading(false)
                    toast.error(err.response.data)
                }
            })
        }
    }

    // Search Filter Step 3
    // handleSearchChange was here before the refactor
    // removed because it only update the state so we can pass setKeyword to it which we will do in Step 2 down below

    // Search Filter Step 4
    const searched = (keyword) => (c) =>c.name.toLowerCase().includes(keyword)

    return (
        <div className= 'container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create Category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                    {/* Search Filter Step 2 */}
                    {/* input component was here before refactor */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* Search Filter Step 5 */}
                    {/* in between categoies map we will use the searched, which need keyword i.e. available in state because of input in step 2*/}
                    {/* wrap searched with filter so that it will only show the searched keyword result */}
                    {categoies.filter(searched(keyword)).map((c)=> (
                        <div className='alert alert-secondary' key={c._id}>
                            {c.name} 
                            <span
                             onClick={() => handleRemove(c.slug)} 
                             className='btn btn-sm float-right'
                            >
                                <DeleteOutlined className='text-danger'/>
                            </span>
                            <Link to={`/admin/category/${c.slug}`}> 
                                <span className='btn btn-sm float-right'>
                                    <EditOutlined className='text-primary'/>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate;