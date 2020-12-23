import React from 'react'
import {Select} from 'antd'

const {Option} = Select

const ProductCreateForm = ({
    handleChange,
    handleSubmit, 
    values, 
    setValues,
    handleCategoryChange, 
    subOptions,
    showSub,
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
        categories,
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
                >
                    <option>Please Select</option>
                    {categories.length > 0 && categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* we will had the sub category at first and after user select the category then we will list out sub category with belongs to that category */}
            
            {showSub && 
                <div>
                    <label>Sub Categories</label>
                    <Select
                        mode='multiple'
                        style={{width: '100%'}}
                        placeholder="Please select"
                        value={subs} // value store in ProductCreate.js subCategories: []
                        onChange={(value) => setValues({...values, subs: value})}
                    >
                        {subOptions.length &&
                        subOptions.map((s) => 
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>)}
                    </Select>
                </div>}
            
            <br />

            <button className='btn btn-outline-info'>Save</button>
        </form>
    )
}

export default ProductCreateForm