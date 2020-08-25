import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../utils/Spinner';
import ProductsItem from './ProductsItem'
const profilesItem = ({profile: { name, user}, products: { products, loading } }) => {
   
    return products === null || loading ? ( <Spinner/> ):(
        <div>
             <Link to ={`/profile/${user}`}> <h1>{name.toUpperCase()}</h1></Link>
           
             <div className='products-item'>
            {
                products
                .filter((item) => item.user === user) 
                .filter((item, index) => index<4) 
                .map(product => 
                <ProductsItem key={product._id} product= {product}/>
               
                )
            }
            
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    products: state.produit,
    auth: state.auth,
    company: state.company
})
export default connect(mapStateToProps)(profilesItem)
