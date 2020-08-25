import axios from 'axios';
import {setAlert} from './alert'
const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};
//Add Product
export const addProduct = (formData) => async dispatch => {
    try {
        const res = await axios.post('/products/add', formData, config);
        dispatch({
            type: "ADD_PRODUCT",
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

//Get All Products
export const getProducts = () => async dispatch =>{
    try {
        const res = await axios.get('/products/all');
        
        dispatch({
            type: "GET_PRODUCTS", 
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
}


// Get Product
export const getProduct = id => async dispatch => {
    console.log(id)
    try {
        const res = await axios.get(`/products/product/${id}`);
        dispatch({
            type: "GET_PRODUCT",
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};
// Get Product
export const deleteProduct = id => async dispatch => {
    console.log(id)
    try {
        const res = await axios.delete(`/products/product/${id}`);
        dispatch({
            type: "DELETE_PRODUCT",
            payload: id
        });
        dispatch(setAlert('Product Removed', 'success'));
    } catch (err) {
        console.log(err)
    }
};

//Add Comment 
export const addComment = (productId, formData) => async dispatch => {
    const conf = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/products/product/comment/${productId}`, formData, conf);
        dispatch({
            type: 'ADD_COMMENT', 
            payload: res.data
        })
        
    } catch (err) {
        
    }
}
//add Like
export const addLike = id => async dispatch => {
     const res = await axios.post(`/products/product/like/${id}`);
     try {
         dispatch({
             type: 'UPDATE_LIKES',
             payload: { id, likes: res.data }
         })
     } catch (err) {
         console.log(err)
         
     }
}
export const removeLike = id => async dispatch => {
    const res = await axios.post(`/products/product/unlike/${id}`);
    try {
        dispatch({
            type: 'UPDATE_LIKES',
            payload: { id, likes: res.data }
        })
    } catch (err) {
        console.log(err)
        
    }
}
