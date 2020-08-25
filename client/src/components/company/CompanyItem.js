import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './company.css'
import AddProduct from '../product/AddProduct'
import AddCompany from './AddCompany'
import Dashboard from '../dashboard/Dashborboard'
import Products from '../product/Products'
import EditCompany from './EditCompany'
const CompanyItem = ({ profile: {  imageUrl, name, location, website, phone, social } }) => {
  const[hide, setHide]  = useState('dashboard')
  return (
        <div className='companyContainer'>
          <div className='col1'>
            <div style ={{ display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center' }}>
            <img style ={{ width: '30%', height: '15%', borderRadius: '50%'}} src={imageUrl} alt='img'/>
          <h3> {name.toUpperCase()} </h3>
          </div>
          <hr style= {{ width:'50%', borderTop: '1px solid white'}} />
         
          <button className='btn-c' style ={{ gridColumnStart: '1', gridColumnEnd: '3', marginLeft: '30px'}}  type="button" onClick={()=>setHide('editCompany')}> <h3> Profile      </h3> </button>
          <button className='btn-c' style ={{ gridColumnStart: '1', gridColumnEnd: '3', marginLeft: '30px'}}  type="button" onClick={()=>setHide('products')}>    <h3> products     </h3> </button>
          <button className='btn-c' style ={{ gridColumnStart: '1', gridColumnEnd: '3', marginLeft: '30px'}} type="button" onClick={()=>setHide('addProduct')}>  <h3> Add Product   </h3> </button>

       

          </div>
          <div className='col2'>
          { hide === 'addProduct'&&  <AddProduct/>  }
          { hide === 'dashboard'&&   <Dashboard/>   }
          { hide === 'addCompany'&&  <AddCompany/>  }
          { hide === 'products'&&    <Products/>    }
          { hide === 'editCompany'&& <EditCompany/> }
           </div>
        
      </div>
    )
}

export default CompanyItem
