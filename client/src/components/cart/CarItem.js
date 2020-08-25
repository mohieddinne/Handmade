import React from 'react'
import './cartItem.css'

const CarItem = ({item: {imageUrl, category, price, quantity }}) => {
    
    return (
        <div className='cart-item'>
        <img src ={imageUrl} alt='item'/>
        <div className='item-details'>
            <span className='name'>{category}</span>
            <span className='price'>{quantity}*{price}</span>
        </div>
     </div>
    )
}

export default CarItem
