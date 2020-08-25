import React, { useState, useEffect, Fragment } from 'react'
import openSocket from 'socket.io-client'
import { connect } from 'react-redux'
import Spinner from '../../utils/Spinner'
import './dashboard.css'
const Dashborboard = ({auth, company : { likes }}) => {
   const socket=  openSocket();

  const [notification, setNotifications] = useState([]);

  useEffect(() => {
     socket.on('aime', data =>{
       console.log(data)
       setNotifications(data.likes);
      })
       return () => {
        socket.off("aime");
      };
  }, [socket]) 
  console.log(notification) 
    return (
        <div className='dashborad-container '>
          <div className='test-box'>This Page will contain graphical statistics 
        
             </div> 
        
      
        
        </div>



  
      
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    company: state.company.profile
})
export default connect(mapStateToProps)(Dashborboard)
