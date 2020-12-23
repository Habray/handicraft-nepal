
// we leave state variables in parent state because we want to make LocalSearch component reuseable
// so that we can later import in other pages as well i.e. sub categories, products
// let the parent component have setp 1 state
// we just handle change and have the input field in here
import React from 'react'

const LocalSearch = ({keyword, setKeyword}) => {

    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase()) // we change all user input value to lowercase
    }

    return (
            <input 
                type='search' 
                placeholder='Search Category' 
                value={keyword} 
                onChange={handleSearchChange} 
                className='form-control mb-4' 
            />
    )
}

export default LocalSearch