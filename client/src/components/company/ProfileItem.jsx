import React, { Fragment, useState } from 'react'
import './profile.css'
import ProductsItem from '../../pages/ProductsItem'
import Spinner from '../../utils/Spinner'
import { connect } from 'react-redux';
import { addComment, addLike, removeLike } from '../../redux/actions/profile'
import Moment from 'react-moment';
const ProfileItem = ({ auth, products: { products, loading }, profileById : { likes, imageUrl, location,  name, website, phone, user, social, _id, comments }}) => {    
const { isAuthenticated } = auth  

 if(isAuthenticated){

   var { avatar } = auth.user
 } 


    return products === null || loading ? ( <Spinner/> ):(
        <Fragment>
           <div  className='cover-image-container'>
            <div className='cover-image'
            style={{    
            backgroundImage: `url(${imageUrl})`,
             }}/> 
             </div>
             
               {/* {
                   isAuthenticated ?(
                    <div className='like'>
                    <h1>{name.toUpperCase()} </h1>
                    <input type = 'submit' value ='Like' className='Write-a-Review' onClick= {() => addLike(_id)}/>
                      <h1>{likes.length>0 && <span>{likes.length}</span>}</h1>
                   <input type = 'submit' value ='UnLike' className='Write-a-Review' onClick={()=> removeLike(_id)}/>
                   </div> 
                   ):(
                    <div className='like'>
                    <h1>{name.toUpperCase()} </h1>
                    <span>{likes.length>0 && <span><h1>{likes.length}</h1>{'  '}person like this Company </span>}</span>
                    </div>
                   )
               } */}
             <div className='wraper'>
             <div className='wraper-1'>
               <div  className='intro'>
               <i style={{ display: 'flex',justifyContent:'space-between' }} className='fas fa-map-marker fa-2x' > <h5>{location}</h5> </i>
               <i style={{ display: 'flex',justifyContent:'space-between', margin:'20px 0 20px 0' }}className="fa fa-phone" aria-hidden="true"> <h5>{phone}</h5></i>
                   <div className='links'><i className="fa fa-share-alt" aria-hidden="true"></i>  
                   {website && (
           <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x' />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a> 
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
                   </div>
               </div>
             <div className='products'>
             {
                products
                .filter((item) => item.user === user) 
                .filter((item, index) => index<9) 
                .map(product => <ProductsItem key={product._id} product= {product} nineProduct={true} />)
              }
             </div>
            { 
              isAuthenticated &&<div className='review'>
          
             </div>
            }
        
             </div>
             <div className='wraper-2'>
             <div className='single-product '>
                   {
                products
                .filter((item) => item.user === user) 
                .map(product => <ProductsItem key={product._id} product= {product} singleProduct={true}/>)
                    }
             </div>
             </div>
             </div>
           
        </Fragment>
       
       
    )
}
const mapStateToProps = state => ({
  products: state.produit,
  auth: state.auth,
  company: state.company
})
export default connect(mapStateToProps)(ProfileItem) 