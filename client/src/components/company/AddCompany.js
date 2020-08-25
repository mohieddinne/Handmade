import React, { Fragment, useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { createCompany, getCurrentProfile } from '../../redux/actions/profile';

import '../auth/login.css'
const AddCompany = ({ getCurrentProfile, createCompany, company: { profile } }) => {
    const [formData, setFormData] = useState({
        name:'', location :'', phone:'', website:'', description:'' ,twitter:'', facebook:'', youtube:'' ,instagram:'' , linkedin:''
    });
    useEffect(() => {
        getCurrentProfile()
            },
        [getCurrentProfile]);
  

const [displaySocialInputs, toggledSocialInputs]=useState(false)

const [imageUrl, setFile] = useState('');

    const { name, location, phone, website, description, twitter, facebook, youtube,instagram, linkedin } = formData;
   
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    } 
    const onAddImage = e => {
        setFile(e.target.files[0]);
      };

    const onSubmit = e => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('name', name);
        newFormData.append('location', location);
        newFormData.append('phone', phone);
        newFormData.append('website', website);
        newFormData.append('description', description);
        newFormData.append('twitter', twitter);
        newFormData.append('facebook', facebook);
        newFormData.append('youtube', youtube);
        newFormData.append('instagram', instagram);
        newFormData.append('linkedin', linkedin);
        newFormData.append('imageUrl', imageUrl);
        createCompany(newFormData);
    }
    if(profile !== null){
        return <Redirect to='/company'/>
    }
    return (
          <div  className="wrapper fadeInDown">
            <form onSubmit={e=>onSubmit(e)}>
            <div id="formContent">
        <h2 className="inactive underlineHover">ADD COMPANY </h2>
                
                 
           
            <input
            className='infoCompany'
            type="text"
            name="name"
            placeholder = "Company Name"
            value = {name}
            onChange = {e => onChange(e)}
            required
            />
          
           <input className='infoCompany'
           type="text"
            name="location"
            placeholder = "Location"
            value={location}
            onChange = {e=> onChange(e)}
            required
           />  
            <input className='infoCompany'
            className='infoCompany'
            type="text"
            name="phone"
            placeholder = "Phone Number"
            value={phone}
            onChange = {e=> onChange(e)}
            required
           />     
         
           <input className='infoCompany'
           type="text"
            name="website"
            placeholder = "Web Site Link "
            value={website}
            onChange = {e=> onChange(e)}
           />
         
           <textarea className='infoCompany'
           style={{ width: '70%'}}
           name = "description"
           placeholder="Say Somthing about Your Company"
           value={description}
           onChange={e =>onChange(e)}
           required 
           />
            {imageUrl ? (
                       <div className='image-piker'
                        style={{
                        backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                         }} 
                       > <input style={{ bottom:'0', height: '250px',  width:'100%'}} type='file'  onChange={e => onAddImage(e)}  /></div>
                
                  ):( 
                    <div className='image-piker'>
                        <button className='btn-avatar'  type='button' ><i class="far fa-user-circle fa-3x"> COVER IMAGE </i></button>
                        <input  type='file'  onChange={e => onAddImage(e)}  />
                    </div>
                        )
                  }
           <button style= {{marginLeft: '30px', marginTop: '10px'}} className='btn-c' onClick={()=>toggledSocialInputs(!displaySocialInputs)} type='button'>Add Social Network Links </button>
           {displaySocialInputs && (
            <Fragment>
            
            <input className='infoCompany'
                type="text"
                placeholder="Twitter Account"
                name = "twitter"
                value={twitter}
                onChange = {e=> onChange(e)}
               />
               
               <input className='infoCompany'
                type="text"
                placeholder="Facebook Account"
                name = "facebook"
                value={facebook}
                onChange = {e=> onChange(e)}
                
               />
                
               <input className='infoCompany'
                type="text"
                placeholder="Youtube Account"
                name = "youtube"
                value={youtube}
                onChange = {e=> onChange(e)}
                
               />
               
               <input className='infoCompany'
                type="text"
                placeholder="Instagram Account"
                name = "instagram"
                value={instagram}
                onChange = {e=> onChange(e)}
               />
               <input className='infoCompany'
               type="text"
               placeholder=" Linkedin Account"
               name = "linkedin"
               value={linkedin}
               onChange = {e=> onChange(e)}
               
              />
           </Fragment>
           )}
            <button className='btn-c' style ={{ gridColumnStart: '1', gridColumnEnd: '3', marginLeft: '30px'}} type="submit" > Add Company</button>
            
            </div>
            </form>
           
            </div>
    )
}
const mapStateToProps = ({ company })=> ({
    company
})
export default connect(mapStateToProps, { createCompany, getCurrentProfile })(AddCompany)
