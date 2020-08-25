import React, { Fragment, useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { updateCompany, getCurrentProfile, deleteCompany } from '../../redux/actions/profile';
import './addCompany.css'
const EditCompany = ({ getCurrentProfile, updateCompany,deleteCompany, company: { profile }, history }) => {
    useEffect(() => {
        getCurrentProfile()
            },
        [getCurrentProfile]);
    const [formData, setFormData] = useState({
        name:'', location :'', phone:'', website:'', description:'' ,twitter:'', facebook:'', youtube:'' ,instagram:'' , linkedin:''
    });

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
        updateCompany(profile._id, newFormData);
    }
  
 
    return (
          <div>
            <form className='addCompany-container' onSubmit={e=>onSubmit(e)}>
                 <div className='leftGrid'>
                     <h4>Add Image </h4>
                     {imageUrl &&  <img style={{ width:'100%', height: '240px'}} src={URL.createObjectURL(imageUrl)} alt='productImage'/>} 
                
                    <input type='button' className='btn-p' value= 'UPLOAD FILE'/>

               <input
               className='btn-p'
                type='file'
                onChange={e => onAddImage(e)}
                />
                 </div>
                 <div className='rightGrid'>
                              
            <div>  
         Nom:   <input
            type="text"
            name="name"
            placeholder = {profile.name}
            value = {name}
            onChange = {e => onChange(e)}
            required
            /> </div>   
         <div>
         Adresse:  <input
           type="text"
            name="location"
            placeholder = {profile.location}
            value={location}
            onChange = {e=> onChange(e)}
            required
           />  </div> 
           <div>
            Telephone :<input
            type="text"
            name="phone"
            placeholder = {profile.phone}
            value={phone}
            onChange = {e=> onChange(e)}
            required
           />     </div>
         
          <div> siteweb:<input
           type="text"
            name="website"
            placeholder = {profile.website}
            value={website}
            onChange = {e=> onChange(e)}
           /></div> 
         
         <div>commentaire <textarea
           name = "description"
           placeholder={profile.description}
           value={description}
           onChange={e =>onChange(e)}
           required 
           /></div> 
           <button className='btn-c' onClick={()=>toggledSocialInputs(!displaySocialInputs)} type='button'>Add Social Network Links </button>
           {displaySocialInputs && (
            <Fragment>
            
            <input
                type="text"
                placeholder="Twitter Account"
                name = "twitter"
                value={twitter}
                onChange = {e=> onChange(e)}
               />
               
               <input
                type="text"
                placeholder="Facebook Account"
                name = "facebook"
                value={facebook}
                onChange = {e=> onChange(e)}
                
               />
                
               <input
                type="text"
                placeholder="Youtube Account"
                name = "youtube"
                value={youtube}
                onChange = {e=> onChange(e)}
                
               />
               
               <input
                type="text"
                placeholder="Instagram Account"
                name = "instagram"
                value={instagram}
                onChange = {e=> onChange(e)}
               />
               <input
               type="text"
               placeholder=" Linkedin Account"
               name = "linkedin"
               value={linkedin}
               onChange = {e=> onChange(e)}
               
              />
           </Fragment>
           )}
            <button className='btn-c' style ={{ gridColumnStart: '1', gridColumnEnd: '3', marginLeft: '30px'}} type="submit" > Edit Company</button>
            </div>
            </form>
            <button onClick={() => deleteCompany(profile._id, history)} className='btn-c' style ={{ gridColumnStart: '1', gridColumnEnd: '3', marginLeft: '30px'}} type="submit" > Delete Company</button>
            </div>
    )
}
const mapStateToProps = ({ company })=> ({
    company
})
export default withRouter(connect(mapStateToProps, { updateCompany, getCurrentProfile, deleteCompany })(EditCompany))
