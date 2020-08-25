import React, {useEffect, Fragment} from 'react'
import {  Redirect, withRouter } from 'react-router-dom'
import { connect }from 'react-redux'
import Spinner from '../../utils/Spinner'
import './profile.css'
import ProfileItem from './ProfileItem'
import { getProfileByID } from '../../redux/actions/profile'
const Profile = ({ getProfileByID, match, company: { profileById ,loading }, auth }) => {
    useEffect(() => {
          getProfileByID(match.params.id)
    }, [ getProfileByID,  match.params.id])
    return (
        <div className='p'>
        <div className='profile'>
           {  profileById === null || loading ? (<Spinner/> 
                         ):(
                                   <div> 
                                   { auth.user !== null ?(
                                       <Fragment>
                                       { auth.user._id == profileById.user &&<Redirect to='/company'/>}
                                        <ProfileItem  key={profileById._id}  profileById={profileById} /> 
                                       </Fragment>
                                        ):(
                                    <Fragment>
                                    <h1>this Part is for not authenticated user</h1>
                                    <ProfileItem key={profileById._id} profileById={profileById} />
                                    
                                    </Fragment>
                                    )}</div>
                  
                  )}  
        </div>
        </div>
            )
                 }
const mapStateToProps = state =>({
    company: state.company,
    auth: state.auth,
    productsById: state.produit
   
})
export default withRouter(connect(mapStateToProps, { getProfileByID })(Profile))




