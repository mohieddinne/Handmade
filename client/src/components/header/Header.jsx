import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import  Logo  from './logo.png' 
import Cart from '../cart/Cart'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
const Header = ({ logout, auth: { isAuthenticated, loading }, company: { profile }}) => {
    
    return isAuthenticated === false || loading ? 
    ( <div>
    <div className="header">
            <Link to="/" className="logo-container">
                <img src={Logo} className="logo"/>
            </Link>
            <div className='options'>
                <Link to='/' className="option">Home</Link>
                <Link to='/register' className="option">Register</Link>
                <Link to='/login' className="option">Login</Link>
                <Cart/>
            </div>
        </div>
    </div>
        ):( <Fragment>
            { profile === null || loading ? (
        <div className="header">
            <Link to="/" className="logo-container">
            <img src={Logo} className="logo"/>
            </Link>
            <div className='options'>
                <Link to='/' className="option">Home</Link>
                <Link to='/addCompany' className="option" style={{ color:'black', backgroundColor:'#00FF00'}}>Add your Shop</Link>
                <a onClick={logout} className="option"  href='#!'>Logout</a>
                <Cart/>
            </div>
        </div>
            ):(
                <div className="header">
                <Link to="/" className="logo-container">
                <img src={Logo} className="logo"/>
                </Link>
                <div className='options'>
                    <Link to='/' className="option">Home</Link>
                    <Link to='/company' className="option" > MY Shop</Link>
                    <a onClick={logout} className="option"  href='#!'>Logout</a>

                    <Cart/>
                </div>
            </div>
            )
            
        }
        </Fragment>

          
    )
}
const mapStateToProps = ({ auth, company }) =>({
    auth,
    company
})

export default connect(mapStateToProps, {logout})(Header);
