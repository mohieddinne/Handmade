import { addItemToCart } from './cart-utils'
const initState = {
    cartItems: []
}

export default function(state = initState, action){
    const { type, payload } = action
    switch(type){
        case 'ADD_TO_CART': 
        return {
            ...state,
            cartItems: addItemToCart(state.cartItems, payload)
        }

        default: 
        return state
    }
}
