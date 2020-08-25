import React, {useState} from 'react'
import { register } from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './login.css'
import Alert from '../Alert'
const Register = ({  register, isAuthenticated }) => {
  
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });
    const [imageUrl, setFile] = useState('');
    const { email, password, password2 } = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onAddImage = e => {
        setFile(e.target.files[0]);
      };
    const onSubmit = e =>{
        e.preventDefault()
        const newFormData = new FormData();
        newFormData.append('email', email);
        newFormData.append('password', password);
        newFormData.append('imageUrl', imageUrl);
        register(newFormData)
    }
    if(isAuthenticated) {
      return  <Redirect to ='/'/>
    }
    return (
        <div className="wrapper fadeInDown">
        <form onSubmit={e=>onSubmit(e)}>
        <div id="formContent">
        <h2 className="inactive underlineHover">Register </h2>
   <Alert/>
      <input 
      className='custom-input'
      type = "email"
      name="email"
      placeholder = "Email Adress"
      value = {email}
      onChange = {e => onChange(e)}
      required
      />
      <input 
      className='custom-password-input'
      type = "password"
      name = "password"
      placeholder = "Password"
      value = {password}
      onChange = {e => onChange(e)}
      required
      />
<input 
 className='custom-password-input'
type = "password"
name = "password2"
placeholder = "Confirm Password"
value = {password2}
onChange = {e => onChange(e)}
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
                        <button style={{left: '0', marginTop: '30px'}} className='btn-avatar'  type='button' ><i className="far fa-user-circle fa-4x"> avatar</i></button>
                        <input  type='file'  onChange={e => onAddImage(e)}  />
                    </div>
                        )
                  }
                 
      <input style= {{ marginTop: '10px'}} className='login-btn' type="submit" value= "Register"/></div>
      
      </form>
    
  </div>
    )
}
const mapStateToProps = ( state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    
})
export default connect(mapStateToProps, { register })(Register)
