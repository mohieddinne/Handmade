import React, { Fragment, useState } from 'react'
import { connect }from 'react-redux'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { addItemToCart } from '../redux/actions/cart'
const ProductsItem = ({ addItemToCart, product,nineProduct = false, singleProduct=false}) => {
    const [showModal, setShowModal] = useState(false)
    const  { name, price, imageUrl, _id, date  } = product
    const ModelComponent =  ReactDOM.createPortal(
      <div className='modal'>
     <div className='modal-container'>
       <div className='modal-header'>
         <i class="far fa-window-close fa-4x"  onClick={()=>setShowModal(!showModal)}></i>
         <img src={product.imageUrl} alt ={product.imageUrl}/>
       </div>
       <div className='modal-sections'>
       <div className='modal-style'>
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        {product.name} {' '} {product.price.toUpperCase()} {' '} {product.size}
  </div>
     
      <p><input onClick={()=> addItemToCart(product)} type = 'submit' value ='ADD To Cart' className='addtocart'/> </p> 
      
      <Link to = {`/product/${product._id}`}>
      <button className='addtocart'>vIEW MORE DETAILS</button> 
      </Link>
      
      
      </div>
       </div>
       <div className='modal-footer'></div>
     </div>
      </div>,
      document.getElementById('root')
    )
    return singleProduct ?(
        <div style= {{ marginBottom: '15px'}}>
           <div className='single-product '>
               <div className='box-1'><h4>{name}</h4>
                 <h5> {'  ' + price + ' '} DT</h5>
                 </div>
               <div className='box-2'>
                   <img src={imageUrl} onClick={()=>setShowModal(!showModal)}/>
                    {showModal&& ModelComponent}
 
                   </div>
           </div>
           </div>
    ):(
        <Fragment>
        {  nineProduct ? (
           <Link to ={`/product/${_id}`}><img src={imageUrl}/></Link>
        ):(
            <div>
            <div
               onClick={()=>setShowModal(!showModal)}
               className='product-item'
               style={{    
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
                 }}>   
                 </div> 
                 
                {showModal&& ModelComponent}
            </div>
        )}
        </Fragment>
    )
}

export default connect(null, { addItemToCart })(ProductsItem)
