import axios from 'axios';
import { setAlert } from './alert'
const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

//Get Current Company Profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile/current/company');
        dispatch({
            type: "GET_CURRENT_PROFILE",
            payload: res.data
        })
    } catch (err) {
       
        console.log(err);
    }
}

// Get All Profiles
export const getProfiles = () => async dispatch => {
    console.log("jkklm")
    try {
       const res = await axios.get('/profile/all');
       dispatch({
           type: 'GET_PROFILES',
           payload: res.data
       }) 
    } catch (err) {
        console.log(err);
    }
}

//Get Profile By Id
export const getProfileByID = ID => async dispatch => {
    const res = await axios.get(`/profile/company/${ID}`)
 try {
     dispatch({
         type: 'GET_PROFILE_BY_USER_ID',
         payload: res.data
     })
 } catch (err) {
  console.log(err)
 }

}

//Create Company
export const createCompany = (formData) => async dispatch =>{

try {
    const res = await axios.post('/profile/add/company', formData, config);
    dispatch({
        type: 'ADD_COMPANY',
        payload: res.data
    })
} catch (err) {
    console.log(err)
}
}

//Update Company
export const updateCompany = (id, formData) => async dispatch =>{

const res = await axios.post(`/profile/${id}`, formData);
  try {
    //history.push('/dashboard')
    dispatch({
        type: 'ADD_COMPANY',
        payload: res.data
    })
    dispatch(setAlert('Profile Updated', 'success'));
  } catch (err) {
      console.log(err)
  }
}



//Delete Company 
export const deleteCompany = (id, history) => async dispatch =>{
    if (window.confirm('Are you sure? This can NOT be undone! And All Your Products will be Deleted ... ? ')) {
  await axios.delete(`/profile/${id}`);
  try {
    history.push('/')
    dispatch({ type: 'CLEAR_PROFILE' });
    dispatch({ type: 'DELETE_COMPANY' });
    dispatch(setAlert('Your Company has been permanantly deleted', 'success'));
  } catch (err) {
      console.log(err)
  }
}
}



//Add Comment 
export const addComment = (productId, formData) => async dispatch => {
    const conf = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/profile/comment/${productId}`, formData, conf);
        dispatch({
            type: 'ADD_COMMENT', 
            payload: res.data
        });
    } catch (err) {
        
    } 
}


//Add like 
export const addLike = id => async dispatch => {
    const res = await axios.post(`/profile/like/${id}`);
    try {
        dispatch({
            type: 'UPDATE_LIKES',
            payload: { id, likes: res.data }
        })
        
    } catch (err) {
        
    }
}
//remove like
export const removeLike = id => async dispatch => {
    const res = await axios.post(`/profile/unlike/${id}`);
    try {
        dispatch({
            type: 'UPDATE_LIKES',
            payload: { id, likes: res.data }
        })
    } catch (err) {
        console.log(err)
        
    }
}
