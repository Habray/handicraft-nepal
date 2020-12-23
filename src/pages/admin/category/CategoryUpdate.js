import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {updateCategory, getCategory} from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({history, match}) => {

    // destructure object state to get the user and usertoken down below
    const {user} = useSelector(state => ({...state}))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadCategory()
    }, [])

    // this function will load all the categoies and will be available in a state
    const loadCategory = () => getCategory(match.params.slug).then(c => setName(c.data.name))

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(name)
        setLoading(true)
        updateCategory(match.params.slug, {name: name}, user.token)
        .then( res => {
            // console.log(res)
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is updated`)
            history.push('/admin/category')
        })
        .catch(err => {
            // console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    return (
        <div className= 'container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                    <hr/>
                    
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate