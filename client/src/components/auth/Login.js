import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'
import './login.css'
import Alert from '../Alert'
const Login = ({  auth: { isAuthenticated },  login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData
    const onChange = e =>{
     setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = async(e) => {
        e.preventDefault()
        login(email, password)
    }
    if (isAuthenticated) {
        return <Redirect to='/' />;
      }
    return (
        <div className="wrapper fadeInDown">
              <form onSubmit={e=>onSubmit(e)}>
              <div id="formContent">
              <h2 className="inactive underlineHover">Sign Up </h2>
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
            <input className='login-btn' type="submit" value= "Login"/></div>
            </form>
        
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { login })(Login); 
