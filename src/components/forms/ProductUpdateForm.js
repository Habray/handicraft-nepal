import React from 'react'
import {Select} from 'antd'

const {Option} = Select

const ProductUpdateForm = ({
    handleChange,
    handleSubmit, 
    values, 
    handleCategoryChange,
    categories,
    subOptions,
    setValues,
    arrayOfSubs,
    setArrayOfSubs,
    selectedCategory,
}) => { 

    // destructure
    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        color,
        brands,
        brand,
    } = values


    return (
        <form onSubmit={handleSubmit}>

            {/* For Title */}
            <div className='form-group'>
                <label>Title</label>
                <input 
                    type='text' 
                    name='title' 
                    className='form-control' 
                    value={title} 
                    onChange={handleChange}
                />
            </div>

            {/* For Description */}
            <div className='form-group'>
                <label>Description</label>
                <input 
                    type='text' 
                    name='description' 
                    className='form-control' 
                    value={description} 
                    onChange={handleChange}
                />
            </div>

            {/* For Price */}
            <div className='form-group'>
                <label>Price</label>
                <input 
                    type='number' 
                    name='price' 
                    className='form-control' 
                    value={price} 
                    onChange={handleChange}
                />
            </div>

            {/* For Shipping */}
            <div className='form-group'>
                <label>Shipping</label>
                <select 

                    // for pre populating the shipping option
                    value={shipping}
                    name='shipping' 
                    className='form-control' 
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    <option value='No'>No</option>
                    <option value='Yes'>Yes</option>
                </select>
            </div>

            {/* For Quantity */}
            <div className='form-group'>
                <label>Quantity</label>
                <input 
                    type='number' 
                    name='quantity' 
                    className='form-control' 
                    value={quantity} 
                    onChange={handleChange}
                />
            </div>

            {/* For Color Option */}
            <div className='form-group'>
                <label>Color</label>
                <select 
                    // pre populating the color option
                    value={color}
                    name='color' 
                    className='form-control' 
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {colors.map((c) => 
                        <option key={c} value={c}>
                            {c}
                        </option>
                    )}
                </select>
            </div>

            {/* For Brands Option */}
            <div className='form-group'>
                <label>Brand</label>
                <select 

                    // pre populating the brand option
                    value={brand}
                    name='brand' 
                    className='form-control' 
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {brands.map((b) => 
                        <option key={b} value={b}>
                            {b}
                        </option>
                    )}
                </select>
            </div>

            {/* For Categories Option */}
            <div className='form-group'>
                <label>Category</label>
                <select 
                    name='category' 
                    className='form-control' 
                    onChange={handleCategoryChange}
                    // update from previous as it will show default value and don't repeat on option again
                    // also show the previous sub category if user select it back again
                    value={selectedCategory ? selectedCategory : category._id} 
                >
                    {categories.length > 0 && categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Sub Categories</label>
                <Select
                    mode='multiple'
                    style={{width: '100%'}}
                    placeholder="Please select"
                    // value={subs} // this doen't work because it Antdesign Select and the value should be id to work
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubs(value)} // updating value
                >
                    {subOptions.length &&
                      subOptions.map((s) => 
                        <Option key={s._id} value={s._id}>
                            {s.name}
                        </Option>)}
                </Select>
            </div>

            <br />

            <button className='btn btn-outline-info'>Save</button>
        </form>
    )
}

export default ProductUpdateForm