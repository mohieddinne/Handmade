

// Redux thunk don't care about function object for that we will using reselect 
export const addItemToCart = item => async dispatch => {
    dispatch({
        type: 'ADD_TO_CART',
        payload: item
    })
}
