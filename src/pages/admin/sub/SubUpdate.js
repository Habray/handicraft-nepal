import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getCategories} from '../../../functions/category'
import {updateSub, getSub} from '../../../functions/sub'
import CategoryForm from '../../../components/forms/CategoryForm'

const SubUpdate = ({match, history}) => {

    // destructure object state to get the user and usertoken down below
    const {user} = useSelector(state => ({...state}))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    // once we get all the categories we can populate in the state
    // meaning list of categories which is show in the options
    const [categoies, setCategories] = useState([])

    const [parent, setParent] = useState('')

    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    // this function will load all the categoies and will be available in a state
    const loadCategories = () => getCategories().then((c) => setCategories(c.data))

    // this function will load all the sub categoies and will be available in a state
    const loadSub = () => 
        getSub(match.params.slug).then((s) => {
            setName(s.data.name)
            setParent(s.data.parent)
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(name)
        setLoading(true)
        updateSub(match.params.slug, {name: name, parent: parent}, user.token)
        .then( res => {
            // console.log(res)
            setLoading(false)
            setName('')
            toast.success(`Sub-Category "${res.data.name}" is UPDATED`)

            // auto load the categories so we don't have to reload the page every time
            history.push('/admin/sub')
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
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Sub Category</h4>}

                    <div className='form-group'>
                        <label>Paren t Category</label>
                        <select 
                          name='category' 
                          className='form-control' 
                          onChange={event => setParent(event.target.value)}
                        >
                            <option>Please Select</option>
                            {categoies.length > 0 && categoies.map((category) => (
                                <option 
                                  key={category._id} 
                                  value={category._id} 
                                  selected={category._id === parent}
                                >
                                      {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <CategoryForm 
                      handleSubmit={handleSubmit} 
                      name={name} 
                      setName={setName} 
                    />
                </div>
            </div>
        </div>
    )
}

export default SubUpdate;