import React, { useState } from 'react'
import './addProduct.css'
import { connect } from 'react-redux'; 
import { addProduct } from '../../redux/actions/product'
const AddProduct = ({profile,  addProduct }) => {
    const [formData, setFormData] = useState({
        category:'', price:'', quantity:'', description:'', name:'', size: ''
    });
    const [imageUrl, setFile] = useState('');
    const {category, price, quantity, description, name, size } = formData; 
    
    const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
}
const onAddImage = e => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);

  };
const onSubmit = e => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('category', category);
    newFormData.append('price', price);
    newFormData.append('quantity', quantity);
    newFormData.append('imageUrl', imageUrl);
    newFormData.append('company', profile._id);
    newFormData.append('description', description);
    newFormData.append('name', name);
    newFormData.append('size', size);
    addProduct(newFormData);
} 
    return (
      
            <div className='addProduct-container'>
                <form onSubmit={e => onSubmit(e)}>
                <div className='form-container'>
               <div className='caro-1'>
                 <h2> Add Product </h2>
                 <h4>Product Name</h4>
                 <input type ="text" name = "name" placeholder="Name" value={name} onChange={e => onChange(e)} required />
                  <h4>Price</h4>
                  <input type ="text" name = "price" placeholder="Price" value={price} onChange={e => onChange(e)}  />
                  <h4>Quantity</h4>
                  <input type ="text" name = "quantity" placeholder="Quantity In Stock"value={quantity} onChange={e => onChange(e)}/>
                  <h4>size</h4>
                  <input type ="text" name = "size" placeholder="Size" value={size} onChange={e => onChange(e)} required />

                  <h4>Description</h4>
                   <textarea
                   name = "description"
                   rows='3'
                   cols='2'
                   placeholder="Description"
                   value={description}
                   onChange={e =>onChange(e)}
                   required 
                    />
                  <h4>Category</h4>
             <div className="select">
                   <select name="category" value={category} onChange={e=>onChange(e)}>
                    <option selected disabled> Choose an option     </option>
                    <option value="Produit">      Produit alimentaire            </option>
                    <option value="artisanat">  artisanat              </option>
                    <option value="vetement">       vetement         </option>
                   </select>
            </div>
                  
                  </div>
               <div className='caro-2'> 
               <div className='caro2Content'>
                {imageUrl &&  <img style={{ width:'100%', height: '240px'}} src={URL.createObjectURL(imageUrl)} alt='productImage'/>} 
                </div>
                    <input type='button' className='btn-p' value= 'UPLOAD FILE'/>
               <input
               className='btn-p'
                type='file'
                onChange={e => onAddImage(e)}
                />
                  <input className='btn-p' style={{ marginLeft: '40px' }}  type="submit" value="Add Product"/>
               </div>
               </div>
             
               </form>
           </div>
        
    )
}

const mapStateToProps = state =>({
    profile: state.company.profile
})
export default connect(mapStateToProps, { addProduct })(AddProduct)