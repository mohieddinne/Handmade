import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import { setAlert } from './alert';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
 

// Load User (Get Current User)
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/users/current');
        
        dispatch({
            type: "CURRENT_USER",
            payload: res.data
        });
    } catch (err) {
        console.log(err.msg)
    }
}

//Register New User 
export const register =(formData) => async dispatch => {
    const conf = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
   
    try {
         const res = await axios.post('/users/add', formData, conf);
         dispatch({
             type: "REGISTER_SUCCESS",
             payload: res.data
         });
         dispatch(loadUser());

    } catch (err) {
          dispatch(setAlert(err.response.data.msg, 'danger'));


    dispatch({
      type: 'REGISTER_FAIL'
    });
    }
}
// Login User  
export const login = (email, password,role) => async dispatch => {
    const body = JSON.stringify({ email, password , role });
    try {
        const res = await axios.post('/users/login',body, config);
        dispatch({
          type : "LOGIN_SUCCESS",
          payload: res.data
  });
        dispatch(loadUser()); 
    } catch (err) {
        const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }else{
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
    dispatch({
        type : "LOGIN_FAIL"
});
    }

}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CLEAR_PROFILE' });
  };