import React, { useEffect} from 'react'
import Spinner from '../../utils/Spinner'
import {  Redirect } from 'react-router-dom'
import './products.css'
import { connect } from 'react-redux'
import ProductItem from './ProductItem'
import Alert from '../Alert'
const Products = ({ auth,  produit: { products, loading } }) => {
   
  
    return products.filter(product => product.user === auth.user._id).length===0 ? (
     <h1>there is No Produc For You</h1>
      // <Redirect to='/company'/>
    ):(
      <div style={{padding : '50px'}}>
          <Alert/>
        <table>
         <thead>
          <tr>
           <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th> 
           <th>Description</th>
           <th> Image</th>
           <th style={{ backgroundColor:'red', color: 'black'}}> Delete</th>
          </tr>
         </thead>
        { 
            products
            .filter(product => product.user === auth.user._id)
            .map(product => <ProductItem key={product._id} product={product}/>)
        }
        </table>
        </div>
    )
}
const mapStateToProps = state =>({
    produit: state.produit, 
    auth: state.auth
})

export default connect(mapStateToProps)(Products)
